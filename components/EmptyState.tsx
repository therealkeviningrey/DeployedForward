import Link from 'next/link';
import { LucideIcon, Package, BookOpen, Search, AlertCircle } from 'lucide-react';
import styles from './EmptyState.module.css';

interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  illustration?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  illustration,
}: EmptyStateProps) {
  const renderAction = (action: EmptyStateAction, isPrimary: boolean) => {
    const className = isPrimary ? styles.primaryButton : styles.secondaryButton;

    if (action.href) {
      return (
        <Link href={action.href} className={className}>
          {action.label}
        </Link>
      );
    }

    return (
      <button type="button" onClick={action.onClick} className={className}>
        {action.label}
      </button>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Illustration or Icon */}
        {illustration ? (
          <div className={styles.illustration}>{illustration}</div>
        ) : Icon ? (
          <div className={styles.iconWrapper}>
            <Icon className={styles.icon} size={48} />
          </div>
        ) : null}

        {/* Text Content */}
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className={styles.actions}>
            {primaryAction && renderAction(primaryAction, true)}
            {secondaryAction && renderAction(secondaryAction, false)}
          </div>
        )}
      </div>
    </div>
  );
}

// Preset empty states for common scenarios
export function NoCourses() {
  return (
    <EmptyState
      icon={BookOpen}
      title="No courses yet"
      description="You haven't enrolled in any courses. Browse our catalog to start your AI journey."
      primaryAction={{
        label: 'Browse Courses',
        href: '/courses',
      }}
      secondaryAction={{
        label: 'View Free Tutorials',
        href: '/tutorials',
      }}
    />
  );
}

export function NoSearchResults({ query }: { query: string }) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try different keywords or browse all courses.`}
      primaryAction={{
        label: 'Clear Search',
        onClick: () => window.history.back(),
      }}
      secondaryAction={{
        label: 'Browse All Courses',
        href: '/courses',
      }}
    />
  );
}

export function NoContent({ type = 'content' }: { type?: string }) {
  return (
    <EmptyState
      icon={Package}
      title={`No ${type} available`}
      description={`There's no ${type} here yet. Check back soon for updates.`}
    />
  );
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We encountered an error loading this content. Please try again.',
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <EmptyState
      icon={AlertCircle}
      title={title}
      description={description}
      primaryAction={
        onRetry
          ? {
              label: 'Try Again',
              onClick: onRetry,
            }
          : undefined
      }
      secondaryAction={{
        label: 'Go Home',
        href: '/',
      }}
    />
  );
}
