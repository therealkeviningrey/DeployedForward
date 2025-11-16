import { ExperimentClient } from '@/components/ExperimentClient';
import { PageViewTracker } from '@/components/PageViewTracker';
import { ExitIntent } from '@/components/ExitIntent';
import { LiveActivity } from '@/components/SocialProof';
import { OperatorChrome } from '@/components/OperatorChrome';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ExperimentClient />
      <OperatorChrome>
        <a href="#operator-content" className="skip-link">
          Skip to content
        </a>
        <PageViewTracker />
        {children}
        <ExitIntent />
        <LiveActivity />
      </OperatorChrome>
    </>
  );
}

