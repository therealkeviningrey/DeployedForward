import Image from 'next/image';
import Link from 'next/link';
import styles from './Logo.module.css';

interface LogoProps {
  variant?: 'light' | 'dark';
  width?: number;
  height?: number;
}

export function Logo({ variant = 'dark', width = 180, height = 40 }: LogoProps) {
  // Use dark-bg logo by default (light text), switch to white-bg logo if needed
  const logoSrc = variant === 'dark' 
    ? '/assets/df_lockup_for_dark_bg_transparent.svg'
    : '/assets/df_lockup_for_white_bg_transparent.svg';

  return (
    <Link href="/" className={styles.logo}>
      <Image
        src={logoSrc}
        alt="Deployed Forward"
        width={width}
        height={height}
        priority
      />
    </Link>
  );
}

