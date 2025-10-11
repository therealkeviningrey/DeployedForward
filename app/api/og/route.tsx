import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') || 'Deployed Forward';
  const subtitle = searchParams.get('subtitle') || 'Train where the future is operational';
  const type = searchParams.get('type') || 'default';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0D0D0D',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Header with logo area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              color: '#FF6B00',
              fontSize: '24px',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            DEPLOYED FORWARD
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '900px',
          }}
        >
          <h1
            style={{
              fontSize: type === 'mission' ? '56px' : '72px',
              fontWeight: 800,
              color: '#EAEAEA',
              lineHeight: 1.1,
              margin: 0,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: '32px',
                color: 'rgba(234, 234, 234, 0.7)',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Footer with badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {type === 'mission' && (
            <div
              style={{
                padding: '8px 16px',
                border: '1px solid #565656',
                borderRadius: '999px',
                color: '#EAEAEA',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              MISSION
            </div>
          )}
          {type === 'news' && (
            <div
              style={{
                padding: '8px 16px',
                border: '1px solid #FF6B00',
                borderRadius: '999px',
                color: '#FF6B00',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              NEWS
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

