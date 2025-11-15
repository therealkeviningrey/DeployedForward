'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EmailCapture } from './EmailCapture';
import styles from './ExitIntent.module.css';

const STORAGE_KEY = 'exit_intent_shown';
const COOLDOWN_KEY = 'exit_intent_cooldown';
const COOLDOWN_DAYS = 7; // Don't show again for 7 days

export function ExitIntent() {
  const [showModal, setShowModal] = useState(false);
  const [hasShown, setHasShown] = useState(true);

  useEffect(() => {
    // Check if we've shown this recently
    const lastShown = localStorage.getItem(COOLDOWN_KEY);
    if (lastShown) {
      const lastShownDate = new Date(lastShown);
      const daysSince = (Date.now() - lastShownDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince < COOLDOWN_DAYS) {
        return; // Don't show if within cooldown period
      }
    }

    // Check if already shown in this session
    const shown = sessionStorage.getItem(STORAGE_KEY);
    if (shown) {
      return;
    }

    setHasShown(false);

    // Detect exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of page
      if (e.clientY <= 0 && !showModal) {
        setShowModal(true);
        sessionStorage.setItem(STORAGE_KEY, 'true');
        localStorage.setItem(COOLDOWN_KEY, new Date().toISOString());
      }
    };

    // Add listener after a delay (don't show immediately)
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleEmailCapture = () => {
    // Email was captured, close modal
    setTimeout(() => {
      setShowModal(false);
    }, 1500);
  };

  if (hasShown) return null;

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Overlay */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="exit-intent-title"
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className={styles.content}>
              <div className={styles.iconWrapper}>
                <Sparkles size={48} />
              </div>

              <h2 id="exit-intent-title" className={styles.title}>
                Wait! Don't miss out
              </h2>

              <p className={styles.description}>
                Get a <strong>free lesson</strong> delivered to your inbox. See our teaching style and hands-on approach before committing.
              </p>

              <div className={styles.benefits}>
                <div className={styles.benefit}>✓ No credit card required</div>
                <div className={styles.benefit}>✓ Instant access to lesson</div>
                <div className={styles.benefit}>✓ Unsubscribe anytime</div>
              </div>

              <EmailCapture
                placeholder="Enter your email"
                variant="free-tutorial"
                location="Exit Intent Modal"
              />

              <button
                type="button"
                className={styles.skipButton}
                onClick={handleClose}
              >
                No thanks, I'll explore on my own
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
