"use client";

import { useState, useEffect } from 'react';
import { OnboardingModal } from './OnboardingModal';

interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
}

interface Props {
  shouldShowOnboarding: boolean;
  userName?: string;
  courses: Course[];
}

/**
 * Client component that manages onboarding modal state
 * Shown to new users who haven't completed onboarding yet
 */
export function DashboardOnboarding({ shouldShowOnboarding, userName, courses }: Props) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Show modal after a brief delay to let the page render first
    if (shouldShowOnboarding) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [shouldShowOnboarding]);

  const handleComplete = () => {
    setShowModal(false);

    // Track completion event
    if (typeof window !== 'undefined' && (window as any).trackEvent) {
      (window as any).trackEvent('onboarding_modal_closed');
    }
  };

  return (
    <OnboardingModal
      open={showModal}
      onComplete={handleComplete}
      courses={courses}
      userName={userName}
    />
  );
}
