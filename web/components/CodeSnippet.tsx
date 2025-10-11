'use client';

import { useState } from 'react';
import styles from './CodeSnippet.module.css';

interface CodeSnippetProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeSnippet({ code, language = 'bash', className = '' }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <pre className={styles.pre}>
        <code className={styles.code}>{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className={styles.copyButton}
        aria-label="Copy code"
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M13.5 4L6 11.5L2.5 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect
              x="5.5"
              y="5.5"
              width="9"
              height="9"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M3.5 10.5H2.5C1.94772 10.5 1.5 10.0523 1.5 9.5V2.5C1.5 1.94772 1.94772 1.5 2.5 1.5H9.5C10.0523 1.5 10.5 1.94772 10.5 2.5V3.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

