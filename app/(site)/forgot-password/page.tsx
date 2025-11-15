import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { ForgotPasswordForm } from './ForgotPasswordClient';

export const metadata = {
  title: 'Forgot Password',
  description: 'Request a password reset for your Better Auth account.',
};

export default function ForgotPasswordPage() {
  return (
    <Container size="narrow">
      <section className="py-12">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold">Forgot your password?</h1>
          <p className="text-secondary">
            Enter the email associated with your account and we&apos;ll email you a secure reset link.
          </p>
        </div>

        <Card className="mx-auto max-w-md p-8">
          <ForgotPasswordForm />
        </Card>
      </section>
    </Container>
  );
}

