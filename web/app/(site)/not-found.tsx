import Link from 'next/link';
import { Container } from '@/components/Container';

export const metadata = {
  title: '404 - Page Not Found',
};

export default function NotFound() {
  return (
    <Container size="narrow">
      <div className="py-16 text-center">
        <h1 className="text-accent mb-4">404</h1>
        <h2 className="mb-6">Page not found</h2>
        <p className="text-secondary mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </Container>
  );
}

