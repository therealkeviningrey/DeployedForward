import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // In production, send email via Resend or save to database
    console.log('Contact form submission:', validatedData);

    // TODO: Implement actual email sending
    // await resend.emails.send({
    //   from: 'hello@deployedforward.com',
    //   to: 'support@deployedforward.com',
    //   subject: `Contact: ${validatedData.name}`,
    //   text: validatedData.message,
    // });

    return NextResponse.json(
      { success: true, message: 'Message received. We'll respond within 24 hours.' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}

