import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = schema.parse(body);

    console.log('Lead capture:', { email });

    // In production, persist to DB or send to ESP/CRM
    return NextResponse.json({ success: true });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: e.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
