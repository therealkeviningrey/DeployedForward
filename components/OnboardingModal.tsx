"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { analytics } from '@/lib/analytics';

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
}

interface Props {
  open: boolean;
  onComplete: () => void;
  courses?: Course[];
  userName?: string;
}

type Step = 1 | 2 | 3 | 4;

export function OnboardingModal({ open, onComplete, courses = [], userName }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [learningGoal, setLearningGoal] = useState<'daily' | 'weekly' | 'flexible'>('daily');
  const [isCompleting, setIsCompleting] = useState(false);
  const router = useRouter();

  // Reset state when modal opens and track start
  useEffect(() => {
    if (open) {
      setStep(1);
      setSelectedCourse(null);
      setLearningGoal('daily');
      analytics.trackOnboardingStarted();
      analytics.trackOnboardingStepViewed(1, 'Welcome');
    }
  }, [open]);

  // Escape key handler
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && step === 1) {
        handleSkip();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, step]);

  const handleSkip = async () => {
    analytics.trackOnboardingSkipped(step);
    await completeOnboarding();
  };

  const handleNext = () => {
    if (step < 4) {
      const nextStep = (step + 1) as Step;
      setStep(nextStep);

      // Track step viewed
      const stepNames = ['', 'Welcome', 'Choose Mission', 'Learning Pace', 'Get Started'];
      analytics.trackOnboardingStepViewed(nextStep, stepNames[nextStep]);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const completeOnboarding = async () => {
    setIsCompleting(true);
    try {
      // Call API to mark onboarding as complete
      await fetch('/api/onboarding/complete', {
        method: 'POST',
      });

      // Track analytics event
      analytics.trackOnboardingCompleted(step, selectedCourse || undefined, learningGoal);

      onComplete();
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      // Still close the modal even if API fails
      onComplete();
    } finally {
      setIsCompleting(false);
    }
  };

  const handleGetStarted = async () => {
    await completeOnboarding();

    // Redirect to selected course if one was chosen
    if (selectedCourse) {
      router.push(`/courses/${selectedCourse}`);
    }
  };

  if (!open) return null;

  const displayName = userName || 'Operator';

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        style={{
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 12,
          maxWidth: 640,
          width: '100%',
          padding: 32,
          boxShadow: 'var(--shadow-lg)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Progress indicator */}
        <div style={{ marginBottom: 24, display: 'flex', gap: 8 }}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                flex: 1,
                height: 4,
                background: s <= step ? 'var(--accent)' : 'var(--border-subtle)',
                borderRadius: 2,
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div>
            <h2 style={{ marginBottom: 16, fontSize: '2rem' }}>
              Welcome to Deployed Forward, {displayName}! 👋
            </h2>
            <p className="text-secondary" style={{ marginBottom: 24, fontSize: '1.1rem', lineHeight: 1.6 }}>
              You're about to join operators who are building and deploying AI products—not just learning about them.
            </p>

            <div style={{ marginBottom: 24 }}>
              <h3 style={{ marginBottom: 12, fontSize: '1.2rem' }}>What to expect:</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ display: 'flex', alignItems: 'start', gap: 12 }}>
                  <span style={{ fontSize: '1.5rem' }}>🚀</span>
                  <div>
                    <strong>Build real projects</strong>
                    <p className="text-secondary" style={{ margin: 0 }}>Deploy production-ready apps in 72 hours, not 6 months</p>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'start', gap: 12 }}>
                  <span style={{ fontSize: '1.5rem' }}>🤖</span>
                  <div>
                    <strong>AI-assisted development</strong>
                    <p className="text-secondary" style={{ margin: 0 }}>Use Claude, ChatGPT, and Cursor as your coding partners</p>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'start', gap: 12 }}>
                  <span style={{ fontSize: '1.5rem' }}>🎯</span>
                  <div>
                    <strong>Hands-on missions</strong>
                    <p className="text-secondary" style={{ margin: 0 }}>24+ structured missions from landing pages to full SaaS apps</p>
                  </div>
                </li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
              <button
                className="btn btn-ghost"
                onClick={handleSkip}
                disabled={isCompleting}
              >
                Skip tour
              </button>
              <button
                className="btn btn-primary"
                onClick={handleNext}
              >
                Let's go →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Choose your first mission */}
        {step === 2 && (
          <div>
            <h2 style={{ marginBottom: 16, fontSize: '2rem' }}>
              Choose your first mission
            </h2>
            <p className="text-secondary" style={{ marginBottom: 24, fontSize: '1.1rem' }}>
              Start with a mission that matches your goals. You can switch anytime.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {courses.length > 0 ? (
                courses.slice(0, 3).map((course) => (
                  <label
                    key={course.id}
                    style={{
                      display: 'flex',
                      alignItems: 'start',
                      gap: 12,
                      padding: 16,
                      border: selectedCourse === course.slug ? '2px solid var(--accent)' : '1px solid var(--border-subtle)',
                      borderRadius: 8,
                      cursor: 'pointer',
                      transition: 'border-color 0.2s',
                      background: selectedCourse === course.slug ? 'rgba(255, 107, 0, 0.05)' : 'transparent',
                    }}
                  >
                    <input
                      type="radio"
                      name="course"
                      value={course.slug}
                      checked={selectedCourse === course.slug}
                      onChange={(e) => {
                        const courseSlug = e.target.value;
                        setSelectedCourse(courseSlug);
                        analytics.trackOnboardingCourseSelected(courseSlug);
                      }}
                      style={{ marginTop: 4 }}
                    />
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: 'block', marginBottom: 4 }}>{course.title}</strong>
                      <p className="text-secondary" style={{ margin: 0, fontSize: '0.9rem' }}>
                        {course.description}
                      </p>
                      <span
                        style={{
                          display: 'inline-block',
                          marginTop: 8,
                          fontSize: '0.8rem',
                          padding: '2px 8px',
                          background: 'var(--border-subtle)',
                          borderRadius: 4,
                        }}
                      >
                        {course.level}
                      </span>
                    </div>
                  </label>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: 32 }}>
                  <p className="text-secondary">Courses will appear here once they're published.</p>
                  <p className="text-secondary" style={{ fontSize: '0.9rem', marginTop: 8 }}>
                    For now, explore the platform and check back soon!
                  </p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
              <button
                className="btn btn-ghost"
                onClick={handleBack}
              >
                ← Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleNext}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Set learning schedule */}
        {step === 3 && (
          <div>
            <h2 style={{ marginBottom: 16, fontSize: '2rem' }}>
              Set your learning pace
            </h2>
            <p className="text-secondary" style={{ marginBottom: 24, fontSize: '1.1rem' }}>
              How often do you want to learn? We'll help you stay on track.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {[
                { value: 'daily', label: 'Daily learner', desc: '15-30 minutes every day', emoji: '🔥' },
                { value: 'weekly', label: 'Weekly sprints', desc: '1-2 hours on weekends', emoji: '📅' },
                { value: 'flexible', label: 'Flexible schedule', desc: 'Learn at my own pace', emoji: '⚡' },
              ].map((option) => (
                <label
                  key={option.value}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: 16,
                    border: learningGoal === option.value ? '2px solid var(--accent)' : '1px solid var(--border-subtle)',
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                    background: learningGoal === option.value ? 'rgba(255, 107, 0, 0.05)' : 'transparent',
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{option.emoji}</span>
                  <input
                    type="radio"
                    name="goal"
                    value={option.value}
                    checked={learningGoal === option.value}
                    onChange={(e) => {
                      const goal = e.target.value as 'daily' | 'weekly' | 'flexible';
                      setLearningGoal(goal);
                      analytics.trackOnboardingGoalSelected(goal);
                    }}
                    style={{ marginRight: 8 }}
                  />
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: 'block', marginBottom: 4 }}>{option.label}</strong>
                    <p className="text-secondary" style={{ margin: 0, fontSize: '0.9rem' }}>
                      {option.desc}
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between' }}>
              <button
                className="btn btn-ghost"
                onClick={handleBack}
              >
                ← Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleNext}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Get started */}
        {step === 4 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎯</div>
            <h2 style={{ marginBottom: 16, fontSize: '2rem' }}>
              You're all set!
            </h2>
            <p className="text-secondary" style={{ marginBottom: 32, fontSize: '1.1rem', lineHeight: 1.6 }}>
              {selectedCourse
                ? "You're about to start your first mission. Remember: the best way to learn is by building."
                : "Explore the platform and pick a mission that excites you. Every project is a step toward mastery."}
            </p>

            <div style={{ marginBottom: 32, padding: 20, background: 'rgba(255, 107, 0, 0.1)', borderRadius: 8, border: '1px solid var(--accent)' }}>
              <p style={{ margin: 0, fontWeight: 500 }}>
                💡 Pro tip: Complete the first 3 lessons to build momentum. Small wins lead to big breakthroughs.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-ghost"
                onClick={handleBack}
              >
                ← Back
              </button>
              <button
                className="btn btn-primary"
                onClick={handleGetStarted}
                disabled={isCompleting}
                style={{ minWidth: 180 }}
              >
                {isCompleting ? 'Loading...' : selectedCourse ? 'Start mission →' : 'Explore courses →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
