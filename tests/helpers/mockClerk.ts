import { vi } from 'vitest';

// Mock Clerk auth() function
export const mockAuth = (userId: string | null = 'test-user-123') => {
  return vi.fn().mockResolvedValue({
    userId,
    sessionId: userId ? 'test-session-123' : null,
    sessionClaims: userId ? { userId } : null,
  });
};

// Mock Clerk currentUser() function
export const mockCurrentUser = (userData?: any) => {
  return vi.fn().mockResolvedValue(
    userData || {
      id: 'test-user-123',
      emailAddresses: [{ emailAddress: 'test@example.com' }],
      firstName: 'Test',
      lastName: 'User',
    }
  );
};

// Mock unauthenticated state
export const mockUnauthenticated = () => {
  return vi.fn().mockResolvedValue({
    userId: null,
    sessionId: null,
    sessionClaims: null,
  });
};
