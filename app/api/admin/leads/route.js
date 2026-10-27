import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim() || '';
    const status = searchParams.get('status') || '';
    const sort = searchParams.get('sort') === 'asc' ? 'asc' : 'desc';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '10', 10)));
    const skip = (page - 1) * limit;

    const where = {};

    if (status && status !== 'All') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { phoneNumber: { contains: search, mode: 'insensitive' } },
        { service: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [leads, total, countsRaw] = await Promise.all([
      prisma.appointmentLead.findMany({
        where,
        orderBy: { createdAt: sort },
        skip,
        take: limit,
      }),
      prisma.appointmentLead.count({ where }),
      prisma.appointmentLead.groupBy({
        by: ['status'],
        _count: { status: true },
      }),
    ]);

    const counts = {
      total: 0,
      new: 0,
      contacted: 0,
      scheduled: 0,
      completed: 0,
      cancelled: 0,
    };

    let allLeadsCount = 0;
    for (const item of countsRaw) {
      const s = (item.status || '').toLowerCase();
      const count = item._count.status;
      allLeadsCount += count;
      if (s === 'new') counts.new = count;
      else if (s === 'contacted') counts.contacted = count;
      else if (s === 'scheduled') counts.scheduled = count;
      else if (s === 'completed') counts.completed = count;
      else if (s === 'cancelled') counts.cancelled = count;
    }
    counts.total = allLeadsCount;

    return NextResponse.json({
      leads,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
      counts,
    });
  } catch (err) {
    console.error('Error fetching admin leads:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve leads from database' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Please provide an array of lead IDs to delete' },
        { status: 400 }
      );
    }

    const validIds = ids.map((id) => parseInt(id, 10)).filter((id) => !isNaN(id));

    if (validIds.length === 0) {
      return NextResponse.json(
        { error: 'No valid lead IDs provided' },
        { status: 400 }
      );
    }

    // Permanently erase records directly from PostgreSQL database
    const deleteResult = await prisma.appointmentLead.deleteMany({
      where: {
        id: { in: validIds },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deleteResult.count} lead(s) from database`,
      deletedCount: deleteResult.count,
    });
  } catch (err) {
    console.error('Error during bulk delete of leads:', err);
    return NextResponse.json(
      { error: 'Failed to erase selected leads from database' },
      { status: 500 }
    );
  }
}
