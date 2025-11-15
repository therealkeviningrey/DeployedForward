'use client';

import { useState, useEffect } from 'react';
import { X, Mouse, Command, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './OperatorIntro.module.css';

const STORAGE_KEY = 'operatoros_intro_seen';

export function OperatorIntro() {
  const [showIntro, setShowIntro] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Check if user has seen the intro before
    const hasSeenIntro = localStorage.getItem(STORAGE_KEY);
    if (!hasSeenIntro) {
      // Show intro after a short delay
      const timer = setTimeout(() => {
        setShowIntro(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShowIntro(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const handleSkip = () => {
    handleClose();
  };

  const steps = [
    {
      title: 'Welcome to OperatorOS',
      description: 'A tactical command center for AI operators. Navigate your training environment like mission control.',
      icon: <Mouse size={48} />,
    },
    {
      title: 'Launch Applications',
      description: 'Click the launcher on the left to open mission windows. Each window contains tactical intel and training resources.',
      icon: <ArrowRight size={48} />,
    },
    {
      title: 'Command Palette',
      description: 'Press Cmd+K (Mac) or Ctrl+K (Windows) to open the command palette. Quick access to any mission.',
      icon: <Command size={48} />,
    },
  ];

  const currentStep = steps[step];

  return (
    <AnimatePresence>
      {showIntro && (
        <>
          {/* Overlay */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal */}
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="intro-title"
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleSkip}
              aria-label="Close introduction"
            >
              <X size={20} />
            </button>

            <div className={styles.content}>
              <div className={styles.iconWrapper}>
                {currentStep.icon}
              </div>

              <h2 id="intro-title" className={styles.title}>
                {currentStep.title}
              </h2>

              <p className={styles.description}>
                {currentStep.description}
              </p>

              {/* Progress Indicators */}
              <div className={styles.progress}>
                {steps.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.progressDot} ${index === step ? styles.progressDotActive : ''} ${index < step ? styles.progressDotComplete : ''}`}
                    onClick={() => setStep(index)}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>

              <div className={styles.actions}>
                {step > 0 && (
                  <button
                    type="button"
                    className={styles.buttonSecondary}
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  className={styles.buttonPrimary}
                  onClick={handleNext}
                >
                  {step < steps.length - 1 ? 'Next' : 'Start Mission'}
                </button>
              </div>

              <button
                type="button"
                className={styles.skipButton}
                onClick={handleSkip}
              >
                Skip tour
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
