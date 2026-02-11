import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import posthog from 'posthog-js';
import { useColorMode } from '@docusaurus/theme-common';
import MarkdownRenderer from '../../components/AIChat/MarkdownRenderer';
import Feedback from '../../components/AIChat/feedback';
import styles from './styles.module.css';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

interface AIChatInSearchProps {
  initialQuery: string;
  onSaveConversation?: (data: SavedConversation) => void;
  savedConversation?: SavedConversation | null;
}

export interface SavedConversation {
  messages: Message[];
  threadId: string | null;
}

const API_URL = 'https://tmp-docs-ai-service.onrender.com/api/chat';

const SUGGESTIONS = [
  'How do I create a NEAR account?',
  'What is a smart contract on NEAR?',
  'How do cross-contract calls work?',
  'How to build a dApp on NEAR?',
];

export default function AIChatInSearch({
  initialQuery,
  onSaveConversation,
  savedConversation,
}: AIChatInSearchProps) {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  const [messages, setMessages] = useState<Message[]>(
    savedConversation?.messages || [],
  );
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(
    savedConversation?.threadId || null,
  );
  const [seconds, setSeconds] = useState(1);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasSentInitial = useRef(false);

  // Save conversation whenever messages or threadId change
  useEffect(() => {
    if (messages.length > 0 && onSaveConversation) {
      onSaveConversation({ messages, threadId });
    }
  }, [messages, threadId, onSaveConversation]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isLoading) {
      timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      setSeconds(1);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (
      initialQuery.trim() &&
      !hasSentInitial.current &&
      !savedConversation?.messages?.length
    ) {
      hasSentInitial.current = true;
      sendMessage(initialQuery.trim());
    }
  }, [initialQuery]);

  const sendMessage = async (text: string) => {
    const userMsg: Message = { id: Date.now(), text, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        API_URL,
        { messages: text, threadId },
        { headers: { 'Content-Type': 'application/json' } },
      );

      const aiMsg: Message = {
        id: Date.now() + 1,
        text: response.data.message,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMsg]);
      setThreadId(response.data.threadId);
    } catch {
      const errMsg: Message = {
        id: Date.now() + 1,
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue.trim());
    }
  };

  const handleFeedback = (choice: string) => {
    posthog.capture('ai_chat_feedback', {
      helpful: choice,
      user_question: messages[messages.length - 2]?.text,
      ai_answer: messages[messages.length - 1]?.text,
    });
  };

  const showSuggestions = messages.length === 0 && !isLoading;

  return (
    <div className={styles.aiChatContainer}>
      <div className={styles.aiChatMessages}>
        {showSuggestions && (
          <div className={styles.aiChatSuggestions}>
            <p className={styles.aiChatSuggestionsTitle}>
              ✨ Ask anything about NEAR
            </p>
            <div className={styles.aiChatSuggestionsList}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className={styles.aiChatSuggestionChip}
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={msg.id}
            className={
              msg.sender === 'user'
                ? styles.aiChatUserMsg
                : styles.aiChatAiMsg
            }
          >
            {msg.sender === 'ai' ? (
              <>
                <MarkdownRenderer part={msg.text} isDarkTheme={isDarkTheme} />
                {idx === messages.length - 1 && !isLoading && (
                  <div className={styles.aiChatFeedback}>
                    <Feedback handler={handleFeedback} />
                  </div>
                )}
              </>
            ) : (
              <span>{msg.text}</span>
            )}
          </div>
        ))}

        {isLoading && (
          <div className={styles.aiChatAiMsg}>
            <div className={styles.aiChatThinking}>
              Thinking... ({seconds}s)
            </div>
          </div>
        )}
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
        >
          Send
        </button>
      </form>
    </div>
  );
}
