'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './AIMasteryDashboard.module.css';

interface TerminalLine {
  id: string;
  text: string;
  type: 'command' | 'response' | 'data' | 'success' | 'warning' | 'header';
  delay: number;
}

const terminalSequence: TerminalLine[] = [
  { id: '1', text: '> INITIALIZING LEARNING PROFILE', type: 'command', delay: 0 },
  { id: '2', text: '> SCANNING AI SKILL LEVEL...', type: 'command', delay: 0.8 },
  { id: '3', text: '', type: 'response', delay: 1.2 },
  { id: '4', text: 'STUDENT PROFILE: ACTIVE', type: 'header', delay: 1.5 },
  { id: '5', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'response', delay: 1.6 },
  { id: '6', text: '', type: 'response', delay: 1.7 },
  { id: '7', text: 'SKILLS MASTERED:', type: 'data', delay: 2.0 },
  { id: '8', text: '├─ EFFECTIVE PROMPTING       [████████░░] 85%', type: 'data', delay: 2.3 },
  { id: '9', text: '├─ CHATGPT & CLAUDE USAGE    [███████░░░] 70%', type: 'data', delay: 2.6 },
  { id: '10', text: '├─ BUILDING WITH CURSOR      [██████░░░░] 60%', type: 'data', delay: 2.9 },
  { id: '11', text: '└─ DEPLOYING PROJECTS        [█████░░░░░] 45%', type: 'data', delay: 3.2 },
  { id: '12', text: '', type: 'response', delay: 3.5 },
  { id: '13', text: 'OVERALL PROGRESS: 65% COMPLETE', type: 'success', delay: 3.8 },
  { id: '14', text: '', type: 'response', delay: 4.0 },
  { id: '15', text: 'YOUR OUTCOMES:', type: 'data', delay: 4.2 },
  { id: '16', text: '├─ PROJECTS SHIPPED          2 WORKING PRODUCTS', type: 'data', delay: 4.5 },
  { id: '17', text: '├─ LEARNING SPEED            60% FASTER THAN TUTORIALS', type: 'data', delay: 4.8 },
  { id: '18', text: '└─ CONFIDENCE LEVEL          HIGH - READY TO BUILD', type: 'data', delay: 5.1 },
  { id: '19', text: '', type: 'response', delay: 5.4 },
  { id: '20', text: 'NEXT: COMPLETE 3 MORE LESSONS TO UNLOCK ADVANCED TIER', type: 'warning', delay: 5.7 },
  { id: '21', text: '', type: 'response', delay: 6.0 },
  { id: '22', text: '> READY TO CONTINUE LEARNING_', type: 'command', delay: 6.3 },
];

export function AIMasteryDashboard() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    // Reset and start new cycle
    if (currentLineIndex === 0 && visibleLines.length === 0) {
      const timer = setTimeout(() => {
        startSequence();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [cycleCount]);

  const startSequence = () => {
    let lineIndex = 0;
    const addNextLine = () => {
      if (lineIndex < terminalSequence.length) {
        const line = terminalSequence[lineIndex];
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, line.id]);
          lineIndex++;
          if (lineIndex < terminalSequence.length) {
            addNextLine();
          } else {
            // Sequence complete, wait then restart
            setTimeout(() => {
              setVisibleLines([]);
              setCurrentLineIndex(0);
              setCycleCount((prev) => prev + 1);
            }, 3000);
          }
        }, line.delay * 1000);
      }
    };
    addNextLine();
  };

  return (
    <div className={styles.terminal}>
      <div className={styles.terminalHeader}>
        <div className={styles.terminalTitle}>
          <div className={styles.terminalDots}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
          <span className={styles.terminalTitleText}>DEPLOYED FORWARD SYSTEM v2.1</span>
        </div>
      </div>
      
      <div className={styles.terminalBody}>
        <div className={styles.terminalContent}>
          <AnimatePresence mode="sync">
            {terminalSequence.map((line) => {
              const isVisible = visibleLines.includes(line.id);
              if (!isVisible) return null;

              return (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className={`${styles.terminalLine} ${styles[line.type]}`}
                >
                  <TypingText text={line.text} speed={line.type === 'command' ? 30 : 15} />
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {/* Blinking cursor */}
          {visibleLines.length > 0 && (
            <motion.span
              className={styles.cursor}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              ▌
            </motion.span>
          )}
        </div>
      </div>
      
      <div className={styles.scanLine} />
    </div>
  );
}

// Typing animation component
function TypingText({ text, speed = 20 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <span>{displayText}</span>;
}

