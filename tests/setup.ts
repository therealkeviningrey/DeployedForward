import '@testing-library/jest-dom';
import { beforeAll, afterEach, afterAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local or .env
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock or set environment variables for tests
beforeAll(() => {
  // NODE_ENV is read-only in Next.js, so we don't set it
  process.env.NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  // Mock Clerk if not set
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_mock';
  process.env.CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY || 'sk_test_mock';

  // Mock Stripe if not set (use test keys)
  process.env.STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_mock';
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_mock';

  // Use TEST_DATABASE_URL if available, otherwise use existing POSTGRES_PRISMA_URL
  if (process.env.TEST_DATABASE_URL) {
    process.env.POSTGRES_PRISMA_URL = process.env.TEST_DATABASE_URL;
  }

  // If no database URL is set at all, use a default test database
  if (!process.env.POSTGRES_PRISMA_URL) {
    console.warn('⚠️  No database URL found. Integration tests will be skipped.');
    console.warn('   Set TEST_DATABASE_URL or POSTGRES_PRISMA_URL in your environment.');
  }
});

// Global test timeout
beforeAll(() => {
  // Set longer timeout for integration tests
}, 30000);

afterAll(() => {
  // Cleanup any global resources
});
