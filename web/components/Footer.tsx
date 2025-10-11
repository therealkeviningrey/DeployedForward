import Link from 'next/link';
import { Container } from './Container';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h4 className={styles.heading}>Resources</h4>
            <ul className={styles.links}>
              <li>
                <Link href="/news">News</Link>
              </li>
              <li>
                <Link href="/docs">Docs</Link>
              </li>
              <li>
                <Link href="/changelog">Changelog</Link>
              </li>
              <li>
                <Link href="/api/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.heading}>Company</h4>
            <ul className={styles.links}>
              <li>
                <Link href="/company">About</Link>
              </li>
              <li>
                <Link href="/company#careers">Careers</Link>
              </li>
              <li>
                <Link href="/company#security">Security</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.heading}>Legal</h4>
            <ul className={styles.links}>
              <li>
                <Link href="/legal/privacy">Privacy</Link>
              </li>
              <li>
                <Link href="/legal/terms">Terms</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.attribution}>A Kingsbury Labs venture</p>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Deployed Forward. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

