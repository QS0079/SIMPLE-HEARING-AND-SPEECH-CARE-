import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

const VALID_STATUSES = ['New', 'Contacted', 'Scheduled', 'Completed', 'Cancelled'];

export async function PATCH(request, context) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const leadId = parseInt(id, 10);
  if (isNaN(leadId)) {
    return NextResponse.json({ error: 'Invalid lead ID' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: ' + VALID_STATUSES.join(', ') },
        { status: 400 }
      );
    }

    const updated = await prisma.appointmentLead.update({
      where: { id: leadId },
      data: { status },
    });

    return NextResponse.json({ success: true, lead: updated });
  } catch (err) {
    console.error('Error updating lead status:', err);
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const leadId = parseInt(id, 10);
  if (isNaN(leadId)) {
    return NextResponse.json({ error: 'Invalid lead ID' }, { status: 400 });
  }

  try {
    await prisma.appointmentLead.delete({
      where: { id: leadId },
    });
    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (err) {
    console.error('Error deleting lead:', err);
    return NextResponse.json({ error: 'Failed to delete lead' }, { status: 500 });
  }
}
