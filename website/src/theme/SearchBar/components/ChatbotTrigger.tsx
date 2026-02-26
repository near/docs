import React, { useEffect, useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLocation } from '@docusaurus/router';
import { useWindowSize } from '@docusaurus/theme-common';
import styles from '../styles.module.css';

export default function ChatbotTrigger() {
  const [value, setValue] = useState('');
  const [isStuck, setIsStuck] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const windowSize = useWindowSize();
  const { pathname } = useLocation();

  useEffect(() => {
    if (windowSize === 'mobile') {
      setIsStuck(false);
      return;
    }

    const updateStuckState = () => {
      const element = containerRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const stickyBottom = Number.parseFloat(getComputedStyle(element).bottom) || 0;
      const viewportBottom = window.innerHeight;
      const targetBottom = viewportBottom - stickyBottom;

      setIsStuck(Math.abs(rect.bottom - targetBottom) < 1.5);
    };

    updateStuckState();
    window.addEventListener('scroll', updateStuckState, { passive: true });
    window.addEventListener('resize', updateStuckState);

    return () => {
      window.removeEventListener('scroll', updateStuckState);
      window.removeEventListener('resize', updateStuckState);
    };
  }, [windowSize]);

  const getPageMdUrl = () => {
    const clean = pathname.replace(/\/$/, '');
    return `${clean}.md`;
  };

  const submit = () => {
    const text = value.trim();
    if (!text) return;
    setValue('');
    const message = `${text}\n\n[Page: ${getPageMdUrl()}]`;
    console.log(message);
    
    window.dispatchEvent(new CustomEvent('open-chatbot', { detail: { message } }));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  if (windowSize === 'mobile') {
    return null;
  }

  return <>
    <hr />
    <div
      ref={containerRef}
      className={`${styles.chatbotTrigger} ${isStuck ? styles.chatbotTriggerStuck : ''}`}
    >
      <textarea
        ref={textareaRef}
        className={styles.chatbotTriggerTextarea}
        placeholder="Talk with this document..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
        aria-label="Talk with this document"
      />
      <div className={styles.chatbotTriggerActions}>
        <button
          type="button"
          className={`${styles.chatbotTriggerIconBtn} ${styles.chatbotTriggerIconBtnGreen}`}
          onClick={submit}
          disabled={!value.trim()}
          aria-label="Send message"
          title="Send message"
        >
          <ArrowUp size={15} />
        </button>
      </div>
    </div>
  </>;
}
