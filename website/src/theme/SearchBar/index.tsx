import React, { useState, useEffect, useCallback } from 'react';
import { SearchIcon } from '../Icon/Search';
import SearchPanel from './SearchPanel';
import ChatPanel from './ChatPanel';
import styles from './styles.module.css';

export default function SearchBar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'search' | 'chat'>('search');
  const [chatInitialQuery, setChatInitialQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const close = () => setIsOpen(false);

  const switchToChat = (query: string) => {
    setChatInitialQuery(query);
    setMode('chat');
  };

  const clearInitialQuery = useCallback(() => {
    setChatInitialQuery('');
  }, []);

  return (
    <>
      <button
        className={styles.searchButton}
        onClick={() => setIsOpen(true)}
        aria-label="Search"
      >
        <SearchIcon />
        <span className={styles.searchPlaceholder}>Search</span>
        <span className={styles.searchShortcut}>
          <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </span>
      </button>

      {isOpen && (
        <div className={styles.dialogOverlay} role="dialog" aria-modal="true">
          <div
            className={styles.backdrop}
            aria-hidden="true"
            onClick={close}
          />
          <div className={styles.modal}>
            <div className={styles.modeToggle}>
              <button
                className={`${styles.modeButton} ${mode === 'search' ? styles.modeButtonActive : ''}`}
                onClick={() => setMode('search')}
              >
                <SearchIcon width={16} height={16} />
                Search
              </button>
              <button
                className={`${styles.modeButton} ${mode === 'chat' ? styles.modeButtonActive : ''}`}
                onClick={() => setMode('chat')}
              >
                <span className={styles.aiIcon}>AI</span>
                Ask AI
              </button>
            </div>

            <div style={{ display: mode === 'search' ? 'contents' : 'none' }}>
              <SearchPanel onClose={close} onAskAI={switchToChat} />
            </div>
            <div style={{ display: mode === 'chat' ? 'contents' : 'none' }}>
              <ChatPanel
                onClose={close}
                initialQuery={chatInitialQuery}
                onInitialQueryConsumed={clearInitialQuery}
                isActive={mode === 'chat'}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
