"use client";

import { useState } from 'react';
import { analytics } from '@/lib/analytics';
import { SuccessModal } from './SuccessModal';

interface Props {
  lessonId: string;
  completed: boolean;
  nextHref?: string;
  courseSlug: string;
  lessonSlug: string;
}

export function LessonActions({ lessonId, completed, nextHref, courseSlug, lessonSlug }: Props) {
  const [isCompleted, setIsCompleted] = useState(!!completed);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const markComplete = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, completed: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed');
      setIsCompleted(true);
      setOpen(true);
      analytics.track('lesson_completed', { course_slug: courseSlug, lesson_slug: lessonSlug });
    } catch (e) {
      setError('Failed to update progress');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <button onClick={markComplete} className="btn btn-ghost" disabled={loading || isCompleted}>
          {isCompleted ? '✓ Completed' : loading ? 'Saving…' : 'Mark as Complete'}
        </button>
        {nextHref && (
          <a href={nextHref} className="btn btn-primary">Next Lesson →</a>
        )}
      </div>
      {error && <p className="text-accent text-sm mt-2">{error}</p>}
      <SuccessModal open={open} onClose={() => setOpen(false)} nextHref={nextHref} />
    </>
  );
}
