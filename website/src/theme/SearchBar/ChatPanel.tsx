import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory } from '@docusaurus/router';
import { useColorMode } from '@docusaurus/theme-common';
import MarkdownRenderer from '../../components/AIChat/MarkdownRenderer';
import styles from './styles.module.css';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  sources?: { title: string; path: string }[];
}

const CHAT_API_URL = 'http://localhost:3001/api/chat';

const SUGGESTIONS = [
  'How do I create a smart contract?',
  'What is NEAR Protocol?',
  'How to deploy to testnet?',
];

interface ChatPanelProps {
  onClose: () => void;
  initialQuery?: string;
  onInitialQueryConsumed?: () => void;
  isActive?: boolean;
}

export default function ChatPanel({
  onClose,
  initialQuery = '',
  onInitialQueryConsumed,
  isActive = true,
}: ChatPanelProps): JSX.Element {
  const history = useHistory();
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const shouldAutoSend = useRef(false);

  const sendMessage = useCallback(async (text?: string) => {
    const messageText = text ?? input;
    if (!messageText.trim() || loading) return;

    const userMessage: ChatMessage = { id: Date.now(), text: messageText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: messageText, threadId }),
      });

      const data = await response.json();
      setThreadId(data.threadId);

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: data.message || 'Sorry, I could not process your request.',
        sender: 'ai',
        sources: data.sources || [],
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: 'Sorry, there was an error processing your request. Please try again.',
        sender: 'ai',
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, threadId]);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isActive]);

  // Auto-send when initialQuery arrives from "Ask AI about X"
  useEffect(() => {
    if (initialQuery) {
      shouldAutoSend.current = true;
      setInput(initialQuery);
      onInitialQueryConsumed?.();
    }
  }, [initialQuery, onInitialQueryConsumed]);

  // Trigger send once input is set from initialQuery
  useEffect(() => {
    if (shouldAutoSend.current && input && !loading) {
      shouldAutoSend.current = false;
      sendMessage(input);
    }
  }, [input, loading, sendMessage]);

  useEffect(() => {
    messagesRef.current?.scrollTo(0, messagesRef.current.scrollHeight);
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setThreadId(null);
  };

  return (
    <>
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderTitle}>
          <span className={styles.aiIconLarge}>AI</span>
          <span>Ask about NEAR Protocol</span>
        </div>
        <div className={styles.chatHeaderActions}>
          {messages.length > 0 && (
            <button className={styles.clearChatButton} onClick={clearChat}>
              Clear
            </button>
          )}
          <button className={styles.closeButton} onClick={onClose}>
            <kbd>Esc</kbd>
          </button>
        </div>
      </div>

      <div className={styles.chatMessages} ref={messagesRef}>
        {messages.length === 0 && (
          <div className={styles.chatWelcome}>
            <p className={styles.chatWelcomeTitle}>How can I help you?</p>
            <p className={styles.chatWelcomeHint}>
              Ask me anything about NEAR Protocol, smart contracts, or building dApps.
            </p>
            <div className={styles.chatSuggestions}>
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  className={styles.chatSuggestion}
                  onClick={() => {
                    setInput(suggestion);
                    inputRef.current?.focus();
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${styles.chatMessage} ${
              msg.sender === 'user' ? styles.chatMessageUser : styles.chatMessageAi
            }`}
          >
            <div className={styles.chatMessageContent}>
              {msg.sender === 'user' ? (
                msg.text
              ) : (
                <MarkdownRenderer part={msg.text} isDarkTheme={isDarkTheme} />
              )}
            </div>
            {msg.sender === 'ai' && msg.sources && msg.sources.length > 0 && (
              <div className={styles.chatSources}>
                <span className={styles.chatSourcesLabel}>Sources:</span>
                {msg.sources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.path}
                    className={styles.chatSourceLink}
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      history.push(source.path);
                    }}
                  >
                    {source.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className={`${styles.chatMessage} ${styles.chatMessageAi}`}>
            <div className={styles.chatMessageContent}>
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.chatInputContainer}>
        <input
          ref={inputRef}
          type="text"
          className={styles.chatInput}
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          className={styles.chatSendButton}
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
        >
          Send
        </button>
      </div>
    </>
  );
}
