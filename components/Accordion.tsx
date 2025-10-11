'use client';

import { useState } from 'react';
import styles from './Accordion.module.css';

interface AccordionItemProps {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemProps[];
  className?: string;
}

export function Accordion({ items, className = '' }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className={`${styles.accordion} ${className}`}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <button
            className={styles.trigger}
            onClick={() => toggleItem(item.id)}
            aria-expanded={openItems.includes(item.id)}
            aria-controls={`content-${item.id}`}
            id={`trigger-${item.id}`}
          >
            <span>{item.title}</span>
            <svg
              className={`${styles.icon} ${openItems.includes(item.id) ? styles.open : ''}`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {openItems.includes(item.id) && (
            <div
              id={`content-${item.id}`}
              role="region"
              aria-labelledby={`trigger-${item.id}`}
              className={styles.content}
            >
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

