import styles from './Skeleton.module.css';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
}: SkeletonProps) {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={style}
      aria-busy="true"
      aria-live="polite"
    />
  );
}

// Preset skeleton components for common use cases
export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className={styles.textBlock}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '70%' : '100%'}
        />
      ))}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className={styles.card}>
      <Skeleton variant="rectangular" height={200} className="mb-4" />
      <Skeleton variant="text" width="80%" className="mb-2" />
      <Skeleton variant="text" width="60%" className="mb-4" />
      <div className="flex gap-2">
        <Skeleton variant="rounded" width={80} height={32} />
        <Skeleton variant="rounded" width={80} height={32} />
      </div>
    </div>
  );
}

export function SkeletonCourseCard() {
  return (
    <div className={styles.courseCard}>
      <div className="flex justify-between items-start mb-3">
        <Skeleton variant="text" width="70%" height={24} />
        <Skeleton variant="rounded" width={80} height={24} />
      </div>
      <Skeleton variant="text" width="100%" className="mb-2" />
      <Skeleton variant="text" width="90%" className="mb-4" />
      <Skeleton variant="rectangular" height={8} className="mb-2" />
      <Skeleton variant="rounded" width={120} height={36} />
    </div>
  );
}

export function SkeletonDashboard() {
  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <Skeleton variant="text" width={200} height={40} className="mb-8" />

      {/* Streak & Next Lesson */}
      <div className="grid grid-2 gap-6 mb-12">
        <div className={styles.streakSkeleton}>
          <Skeleton variant="circular" width={64} height={64} />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="40%" className="mb-2" />
            <Skeleton variant="text" width="60%" height={32} />
          </div>
        </div>
        <div className={styles.nextLessonSkeleton}>
          <Skeleton variant="rectangular" height={180} />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-3 gap-4 mb-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.kpiSkeleton}>
            <Skeleton variant="text" width="60%" height={48} className="mb-2" />
            <Skeleton variant="text" width="40%" />
          </div>
        ))}
      </div>

      {/* Course Cards */}
      <Skeleton variant="text" width={150} height={32} className="mb-6" />
      <div className="grid gap-4">
        {[1, 2].map((i) => (
          <SkeletonCourseCard key={i} />
        ))}
      </div>
    </div>
  );
}
