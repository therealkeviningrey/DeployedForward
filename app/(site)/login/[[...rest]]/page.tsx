import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { Card } from '@/components/Card';
import { SignIn } from '@clerk/nextjs';

export const metadata = {
  title: 'Login',
  description: 'Sign in to Deployed Forward to access missions and track your progress.',
};

export default function LoginPage() {
  return (
    <Container size="narrow">
      <Hero title="Login" subtitle="Sign in to access missions, track progress, and manage your account." />

      <section className="py-12 flex justify-center">
        <Card className="w-full max-w-md">
          <SignIn
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'bg-transparent border-0 shadow-none',
              },
            }}
          />
        </Card>
      </section>
    </Container>
  );
}

