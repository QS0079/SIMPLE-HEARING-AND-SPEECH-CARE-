import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const appointmentSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  phone: z.string().trim().min(10, 'Phone number must be at least 10 digits'),
  service: z.string().optional().nullable(),
  forWhom: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  email: z.string().email().optional().nullable().or(z.literal('')),
  appointmentDate: z.string().optional().nullable(),
  appointmentTime: z.string().optional().nullable(),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const validated = appointmentSchema.parse(body);

    const lead = await prisma.appointmentLead.create({
      data: {
        fullName: validated.name,
        phoneNumber: validated.phone,
        service: validated.service || 'General Consultation',
        forWhom: validated.forWhom || null,
        message: validated.message || null,
        email: validated.email || null,
        appointmentDate: validated.appointmentDate ? new Date(validated.appointmentDate) : null,
        appointmentTime: validated.appointmentTime || null,
        status: 'New',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment request received successfully',
        lead: {
          id: lead.id,
          fullName: lead.fullName,
          phoneNumber: lead.phoneNumber,
          service: lead.service,
          status: lead.status,
          createdAt: lead.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error creating appointment lead:', err);
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: err.errors[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: 'Database error. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}
