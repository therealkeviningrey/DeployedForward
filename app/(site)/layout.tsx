import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageViewTracker } from '@/components/PageViewTracker';
import { ExperimentClient } from '@/components/ExperimentClient';
import { PromoBanner } from '@/components/PromoBanner';
import { ExitIntent } from '@/components/ExitIntent';
import { LiveActivity } from '@/components/SocialProof';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ExperimentClient />
      <a href="#main-content" className="skip-link">Skip to content</a>
      {/* Promotional Banner - Update with actual promo details when active */}
      {/* <PromoBanner
        message="Save $50 on all courses"
        ctaText="Get Access"
        ctaHref="/pricing"
        dismissible={true}
      /> */}
      <Header />
      <PageViewTracker />
      <main id="main-content">{children}</main>
      <Footer />
      <ExitIntent />
      <LiveActivity />
    </>
  );
}

