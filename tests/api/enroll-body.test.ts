import { describe, it, expect } from 'vitest';
import { readRequestData } from '../../lib/http';

describe('Request Data Parsing', () => {
  it('parses JSON body', async () => {
    const request = new Request('http://localhost/api/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: 'course_123' }),
    });

    const result = await readRequestData(request);
    expect(result.isForm).toBe(false);
    expect(result.data.courseId).toBe('course_123');
  });

  it('parses form body', async () => {
    const params = new URLSearchParams({ courseId: 'course_456' });

    const request = new Request('http://localhost/api/enroll', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const result = await readRequestData(request);
    expect(result.isForm).toBe(true);
    expect(result.data.courseId).toBe('course_456');
  });
});
