import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { createSession } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);
    const normalizedEmail = email.trim().toLowerCase();

    console.log('[Auth] Login attempt for email:', normalizedEmail);

    const admin = await prisma.admin.findUnique({
      where: { email: normalizedEmail },
    });

    if (!admin) {
      console.warn('[Auth] No admin found for email:', normalizedEmail);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isMatch =
      (await bcrypt.compare(password, admin.passwordHash)) ||
      (await bcrypt.compare(password.trim(), admin.passwordHash));

    if (!isMatch) {
      console.warn('[Auth] Password mismatch for email:', normalizedEmail);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    await createSession({ adminId: admin.id, email: admin.email });
    console.log('[Auth] Login successful for admin:', admin.email);

    return NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      admin: { id: admin.id, email: admin.email },
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: err.errors[0]?.message || 'Invalid input' },
        { status: 400 }
      );
    }
    console.error('Login error:', err);
    return NextResponse.json(
      { error: 'An unexpected server error occurred' },
      { status: 500 }
    );
  }
}
