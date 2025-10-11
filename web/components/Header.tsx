import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Logo } from './Logo';
import { Container } from './Container';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.nav}>
          <Logo />
          
          <ul className={styles.navLinks}>
            <li>
              <Link href="/product">Product</Link>
            </li>
            <li>
              <Link href="/programs">Programs</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/news">News</Link>
            </li>
            <li>
              <Link href="/company">Company</Link>
            </li>
            <li>
              <Link href="/docs">Docs</Link>
            </li>
          </ul>

          <div className={styles.actions}>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn btn-ghost btn-sm">Log in</button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className={styles.dashboardLink}>
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <Link href="/courses" className="btn btn-primary btn-sm">
              Start Mission
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
}

