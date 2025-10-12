'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import styles from './AIMasteryDashboard.module.css';

interface Skill {
  id: string;
  name: string;
  description: string;
  progress: number;
  icon: string;
}

const skills: Skill[] = [
  {
    id: 'prompts',
    name: 'Prompt Engineering',
    description: 'Write prompts that actually work',
    progress: 85,
    icon: '🧠',
  },
  {
    id: 'tools',
    name: 'AI Tool Selection',
    description: 'ChatGPT vs Claude vs Cursor?',
    progress: 70,
    icon: '🎯',
  },
  {
    id: 'building',
    name: 'Rapid Building',
    description: 'Turn ideas into working products',
    progress: 60,
    icon: '🚀',
  },
  {
    id: 'deployment',
    name: 'Ship to Production',
    description: 'Deploy real solutions fast',
    progress: 45,
    icon: '⚡',
  },
];

export function AIMasteryDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [animationCycle, setAnimationCycle] = useState(0);

  // Loop animation every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationCycle((prev) => prev + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const averageProgress = Math.round(
    skills.reduce((acc, skill) => acc + skill.progress, 0) / skills.length
  );

  const currentLevel = averageProgress >= 80 ? 'Expert' : averageProgress >= 50 ? 'Operator' : 'Beginner';
  const nextLevel = averageProgress >= 80 ? 'Unit Leader' : averageProgress >= 50 ? 'Expert' : 'Operator';
  const missionsToUnlock = Math.ceil((100 - averageProgress) / 10);

  return (
    <div ref={ref} className={styles.dashboard}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.levelBadge}>
          <motion.span
            key={animationCycle}
            className={styles.levelIcon}
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {currentLevel === 'Expert' ? '🏆' : currentLevel === 'Operator' ? '⚡' : '🎓'}
          </motion.span>
          <div>
            <div className={styles.levelTitle}>{currentLevel}</div>
            <div className={styles.levelSubtitle}>AI Mastery Level</div>
          </div>
        </div>
        <div className={styles.progressIndicator}>
          <motion.div
            className={styles.progressCircle}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
          >
            <svg viewBox="0 0 100 100" className={styles.circleSvg}>
              <circle
                cx="50"
                cy="50"
                r="45"
                className={styles.circleBackground}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                className={styles.circleProgress}
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: averageProgress / 100 } : {}}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
            <div className={styles.progressText}>{averageProgress}%</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Skills List */}
      <div className={styles.skillsList}>
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            className={styles.skillItem}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ 
              duration: 0.5, 
              delay: 0.2 + index * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <div className={styles.skillHeader}>
              <span className={styles.skillIcon}>{skill.icon}</span>
              <div className={styles.skillInfo}>
                <div className={styles.skillName}>{skill.name}</div>
                <div className={styles.skillDescription}>{skill.description}</div>
              </div>
              <motion.div 
                className={styles.skillPercent}
                key={`${skill.id}-${animationCycle}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                {skill.progress}%
              </motion.div>
            </div>
            <div className={styles.progressBarContainer}>
              <motion.div
                className={styles.progressBar}
                key={`${skill.id}-bar-${animationCycle}`}
                initial={{ width: 0 }}
                animate={{ width: `${skill.progress}%` }}
                transition={{
                  duration: 1.5,
                  delay: 0.3 + index * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  className={styles.progressGlow}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.8 + index * 0.15,
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Unlock Message */}
      <motion.div
        className={styles.unlockMessage}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className={styles.unlockIcon}>🔓</div>
        <div className={styles.unlockText}>
          Complete <strong>{missionsToUnlock} more missions</strong> to unlock <strong>{nextLevel}</strong>
        </div>
      </motion.div>

      {/* Impact Stats */}
      <motion.div
        className={styles.impactStats}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <div className={styles.stat}>
          <motion.div
            className={styles.statValue}
            key={`stat1-${animationCycle}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            2x
          </motion.div>
          <div className={styles.statLabel}>Faster Delivery</div>
        </div>
        <div className={styles.stat}>
          <motion.div
            className={styles.statValue}
            key={`stat2-${animationCycle}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.7 }}
          >
            95%
          </motion.div>
          <div className={styles.statLabel}>Success Rate</div>
        </div>
        <div className={styles.stat}>
          <motion.div
            className={styles.statValue}
            key={`stat3-${animationCycle}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            -60%
          </motion.div>
          <div className={styles.statLabel}>Learning Time</div>
        </div>
      </motion.div>
    </div>
  );
}

