import { Flame } from 'lucide-react';
import styles from './StreakIndicator.module.css';

interface StreakIndicatorProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakIndicator({ currentStreak, longestStreak }: StreakIndicatorProps) {
  const isActive = currentStreak > 0;

  return (
    <div className={styles.container}>
      <div className={`${styles.streakCard} ${isActive ? styles.active : ''}`}>
        <div className={styles.iconWrapper}>
          <Flame className={styles.icon} size={32} />
        </div>
        <div className={styles.content}>
          <div className={styles.label}>Current Streak</div>
          <div className={styles.value}>
            {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
          </div>
          {longestStreak > currentStreak && (
            <div className={styles.meta}>
              Record: {longestStreak} {longestStreak === 1 ? 'day' : 'days'}
            </div>
          )}
        </div>
      </div>
      {currentStreak > 0 && (
        <div className={styles.encouragement}>
          {currentStreak === 1 && "Great start! Keep it going tomorrow."}
          {currentStreak >= 2 && currentStreak < 7 && `${currentStreak} days strong! 🚀`}
          {currentStreak >= 7 && currentStreak < 30 && `You're on fire! ${currentStreak} days!`}
          {currentStreak >= 30 && `Incredible! ${currentStreak} day streak!`}
        </div>
      )}
    </div>
  );
}
