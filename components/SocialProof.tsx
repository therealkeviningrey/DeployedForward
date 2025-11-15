'use client';

import { useState, useEffect } from 'react';
import { Users, TrendingUp, Award, CheckCircle } from 'lucide-react';
import styles from './SocialProof.module.css';

interface SocialProofProps {
  variant?: 'inline' | 'banner' | 'stats';
}

export function SocialProof({ variant = 'inline' }: SocialProofProps) {
  const [activeOperators, setActiveOperators] = useState(0);
  const [enrollmentsToday, setEnrollmentsToday] = useState(0);

  useEffect(() => {
    // Animate numbers on mount
    const animateNumber = (target: number, setter: (n: number) => void, duration: number = 1000) => {
      const start = 0;
      const increment = target / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setter(target);
          clearInterval(timer);
        } else {
          setter(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    };

    const cleanup1 = animateNumber(237, setActiveOperators);
    const cleanup2 = animateNumber(12, setEnrollmentsToday);

    return () => {
      cleanup1();
      cleanup2();
    };
  }, []);

  if (variant === 'inline') {
    return (
      <div className={styles.inline}>
        <Users size={16} className={styles.icon} />
        <span className={styles.text}>
          <strong>{activeOperators}+</strong> operators actively training
        </span>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <TrendingUp size={20} className={styles.bannerIcon} />
          <span className={styles.bannerText}>
            <strong>{enrollmentsToday} operators</strong> joined today
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'stats') {
    return (
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <Users className={styles.statIcon} size={24} />
          <div className={styles.statValue}>{activeOperators}+</div>
          <div className={styles.statLabel}>Active Operators</div>
        </div>
        <div className={styles.statItem}>
          <Award className={styles.statIcon} size={24} />
          <div className={styles.statValue}>4.9/5</div>
          <div className={styles.statLabel}>Average Rating</div>
        </div>
        <div className={styles.statItem}>
          <CheckCircle className={styles.statIcon} size={24} />
          <div className={styles.statValue}>1,200+</div>
          <div className={styles.statLabel}>Projects Deployed</div>
        </div>
      </div>
    );
  }

  return null;
}

// Live activity indicator
export function LiveActivity() {
  const [recentActivity, setRecentActivity] = useState<string | null>(null);

  useEffect(() => {
    const activities = [
      'Sarah from San Francisco just enrolled',
      'Marcus completed "AI Landing Page Builder"',
      'Alex from London started their first mission',
      'Jordan deployed their first AI project',
      'Casey earned the "Week Streak" badge',
    ];

    const showActivity = () => {
      const random = activities[Math.floor(Math.random() * activities.length)];
      setRecentActivity(random);

      setTimeout(() => {
        setRecentActivity(null);
      }, 5000);
    };

    // Show first activity after 3 seconds
    const initialTimer = setTimeout(showActivity, 3000);

    // Show random activities every 20-40 seconds
    const activityTimer = setInterval(() => {
      const delay = 20000 + Math.random() * 20000;
      setTimeout(showActivity, delay);
    }, 40000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(activityTimer);
    };
  }, []);

  if (!recentActivity) return null;

  return (
    <div className={styles.liveActivity}>
      <div className={styles.activityDot} />
      <span className={styles.activityText}>{recentActivity}</span>
    </div>
  );
}

// Founding operator scarcity
export function FoundingSeatCounter() {
  const seatsRemaining = 73;
  const totalSeats = 100;
  const percentage = (seatsRemaining / totalSeats) * 100;

  return (
    <div className={styles.seatCounter}>
      <div className={styles.seatHeader}>
        <span className={styles.seatLabel}>Founding Operator Seats</span>
        <span className={styles.seatValue}>{seatsRemaining} / {totalSeats}</span>
      </div>
      <div className={styles.seatBar}>
        <div
          className={styles.seatProgress}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className={styles.seatCaption}>
        Lock $19/mo pricing forever. Only {seatsRemaining} seats remaining.
      </p>
    </div>
  );
}
