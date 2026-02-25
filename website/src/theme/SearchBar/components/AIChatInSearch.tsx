import React, { useState, useRef, useEffect } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { ExternalLink, ArrowUp, RotateCcw } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import {
  useStreamingChat,
  extractMessageText,
  type SavedConversation,
} from './useStreamingChat';
import styles from '../styles.module.css';

export type { SavedConversation };

interface AIChatInSearchProps {
  onSaveConversation?: (data: SavedConversation) => void;
  onClearConversation?: () => void;
  savedConversation?: SavedConversation | null;
  initialMessage?: string | null;
}

function getDisplayText(text: string): string {
  return text.replace(/\n\n\[Page:[^\]]*\]$/, '').trim();
}

const SUGGESTIONS = [
  'How do I create a NEAR account?',
  'What is a smart contract on NEAR?',
  'How do cross-contract calls work?',
  'How to build a dApp on NEAR?',
];


export default function AIChatInSearch({
  onSaveConversation,
  onClearConversation,
  savedConversation,
  initialMessage,
}: AIChatInSearchProps) {
  const { colorMode } = useColorMode();

  const { messages, isLoading, sendMessage, clearMessages } = useStreamingChat({
    savedConversation,
    onSaveConversation,
  });

  const [inputValue, setInputValue] = useState('');
  const [seconds, setSeconds] = useState(1);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialMessageSentRef = useRef(false);

  useEffect(() => {
    if (initialMessage && !initialMessageSentRef.current) {
      initialMessageSentRef.current = true;
      sendMessage(initialMessage);
    }
  }, [initialMessage, sendMessage]);

  const prevIsLoadingRef = useRef(false);
  useEffect(() => {
    if (prevIsLoadingRef.current && !isLoading) inputRef.current?.focus();
    prevIsLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setSeconds(1);
      return;
    }
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    const text = inputValue.trim();
    setInputValue('');
    sendMessage(text);
  };

  const handleClear = () => {
    clearMessages();
    onClearConversation?.();
  };

  const visible = messages.filter((m) => m.role === 'user' || m.role === 'assistant');
  const turns = visible.flatMap((msg, i) => {
    if (msg.role !== 'user') return [];
    const reply = visible[i + 1]?.role === 'assistant' ? visible[i + 1] : undefined;
    return [{
      id: msg.id,
      userText: extractMessageText(msg),
      assistantText: reply ? extractMessageText(reply) : undefined,
      sources: reply?.metadata?.sources,
    }];
  });
  const showSuggestions = turns.length === 0 && !isLoading;

  return (
    <div className={styles.aiChatContainer}>
      <div className={styles.aiChatMessages}>
        {showSuggestions && (
          <div className={styles.aiChatSuggestions}>
            <p className={styles.aiChatSuggestionsTitle}>Ask anything about NEAR</p>
            <div className={styles.aiChatSuggestionsList}>
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  className={styles.aiChatSuggestionChip}
                  onClick={() => sendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {turns.map((turn, index) => (
          <React.Fragment key={turn.id}>
            {index > 0 && <hr className={styles.aiChatDelimiter} />}

            <div className={styles.aiChatRow}>
              <p className={styles.aiChatUserQuery}>{getDisplayText(turn.userText)}</p>
            </div>

            <hr className={styles.aiChatDelimiter} />

            <div className={styles.aiChatRow}>
              <div className={styles.aiChatRowContent}>
                {turn.assistantText?.trim() ? (
                  <div className={styles.aiChatAnswer}>
                    <MarkdownRenderer part={turn.assistantText} isDarkTheme={colorMode === 'dark'} />
                  </div>
                ) : (
                  <div className={styles.aiChatThinking}>Thinking... ({seconds}s)</div>
                )}

                {turn.sources && turn.sources.length > 0 && (
                  <div className={styles.aiChatSources}>
                    <span className={styles.aiChatSourcesLabel}>Sources</span>
                    <div className={styles.aiChatSourcesList}>
                      {turn.sources.map((source) => (
                        <a
                          key={source.path}
                          href={source.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.aiChatSourceLink}
                        >
                          <ExternalLink size={10} />
                          {source.title}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <form className={styles.aiChatInputArea} onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className={styles.aiChatInput}
          placeholder="Ask a follow-up question..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className={styles.aiChatSendBtn}
          disabled={isLoading || !inputValue.trim()}
          aria-label="Send"
        >
          <ArrowUp size={16} />
        </button>
        {turns.length > 0 && (
          <button
            type="button"
            className={styles.aiChatClearBtn}
            onClick={handleClear}
            aria-label="New chat"
            title="New chat"
            disabled={isLoading}
          >
            <RotateCcw size={14} />
          </button>
        )}
      </form>
    </div>
  );
}
