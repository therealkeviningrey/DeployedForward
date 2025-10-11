import { NextResponse } from 'next/server';
import { ImageResponse } from '@vercel/og';
import { prisma } from '@/lib/prisma';

export const runtime = 'edge';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const certificate = await prisma.certificate.findUnique({
      where: { id },
      include: {
        user: true,
        course: true,
      },
    });

    if (!certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0D0D0D',
            padding: '80px',
            fontFamily: 'sans-serif',
            position: 'relative',
          }}
        >
          {/* Border */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '2px solid #565656',
              borderRadius: '8px',
            }}
          />

          {/* Logo/Header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '60px',
            }}
          >
            <div
              style={{
                color: '#FF6B00',
                fontSize: '28px',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              DEPLOYED FORWARD
            </div>
            <div
              style={{
                color: '#EAEAEA',
                fontSize: '20px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Certificate of Completion
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '18px', color: 'rgba(234, 234, 234, 0.7)' }}>
              This certifies that
            </div>

            <div
              style={{
                fontSize: '56px',
                fontWeight: 800,
                color: '#EAEAEA',
                letterSpacing: '0.05em',
              }}
            >
              {certificate.user.name}
            </div>

            <div style={{ fontSize: '18px', color: 'rgba(234, 234, 234, 0.7)' }}>
              has successfully completed
            </div>

            <div
              style={{
                fontSize: '40px',
                fontWeight: 700,
                color: '#FF6B00',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                maxWidth: '800px',
              }}
            >
              {certificate.course.title}
            </div>

            <div
              style={{
                fontSize: '16px',
                color: 'rgba(234, 234, 234, 0.5)',
                marginTop: '40px',
              }}
            >
              {new Date(certificate.issuedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 900,
      }
    );
  } catch (error) {
    console.error('Certificate generation error:', error);
    return NextResponse.json({ error: 'Failed to generate certificate' }, { status: 500 });
  }
}

