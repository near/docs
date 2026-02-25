import React, { useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLocation } from '@docusaurus/router';
import styles from '../styles.module.css';

export default function ChatbotTrigger() {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { pathname } = useLocation();

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

  return (
    <div className={styles.chatbotTrigger}>
      <textarea
        ref={textareaRef}
        className={styles.chatbotTriggerTextarea}
        placeholder="Ask a question..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
        aria-label="Ask the AI assistant"
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
  );
}
