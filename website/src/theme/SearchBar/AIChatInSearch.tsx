import React, { useState, useRef, useEffect } from 'react';
import { useChat, type UIMessage } from '@ai-sdk/react';
import { useColorMode } from '@docusaurus/theme-common';
import MarkdownRenderer from '../../components/AIChat/MarkdownRenderer';
import styles from './styles.module.css';

interface Source {
  title: string;
  path: string;
}

type ChatUIMessage = UIMessage<{ sources?: Source[] }>;

interface HistoryMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ParsedStreamChunk {
  textDelta?: string;
  fullText?: string;
  sources?: Source[];
  done?: boolean;
}

interface AIChatInSearchProps {
  initialQuery: string;
  onSaveConversation?: (data: SavedConversation) => void;
  savedConversation?: SavedConversation | null;
}

export interface SavedConversation {
  messages: ChatUIMessage[];
}

const API_URL = 'https://docs-mcp-f18b.onrender.com/api/chat';

const SUGGESTIONS = [
  'How do I create a NEAR account?',
  'What is a smart contract on NEAR?',
  'How do cross-contract calls work?',
  'How to build a dApp on NEAR?',
];

function extractMessageText(message: ChatUIMessage): string {
  return message.parts
    .filter((part): part is { type: 'text'; text: string } => part.type === 'text')
    .map((part) => part.text)
    .join('');
}

function toChatMessage({
  id,
  role,
  text,
  sources,
}: {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  sources?: Source[];
}): ChatUIMessage {
  return {
    id,
    role,
    parts: [{ type: 'text', text }],
    metadata: sources ? { sources } : undefined,
  };
}

function safeParseJson(value: string): unknown | null {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function parsePayloadChunk(payload: string): ParsedStreamChunk {
  const trimmed = payload.trim();
  if (!trimmed) {
    return {};
  }

  if (trimmed === '[DONE]') {
    return { done: true };
  }

  const parsed = safeParseJson(trimmed);
  if (!parsed || typeof parsed !== 'object') {
    return { textDelta: payload };
  }

  const data = parsed as Record<string, unknown>;
  const type = typeof data.type === 'string' ? data.type : undefined;

  if (type === 'done') {
    return { done: true };
  }

  if (type === 'text') {
    return {
      textDelta: typeof data.text === 'string' ? data.text : '',
      done: false,
    };
  }

  if (type === 'sources') {
    const typedSources = Array.isArray(data.sources)
      ? (data.sources.filter(
          (source): source is Source =>
            typeof source === 'object' &&
            source !== null &&
            typeof (source as Source).title === 'string' &&
            typeof (source as Source).path === 'string',
        ) as Source[])
      : undefined;

    return {
      sources: typedSources,
      done: false,
    };
  }

  const sources = Array.isArray(data.sources)
    ? (data.sources.filter(
        (source): source is Source =>
          typeof source === 'object' &&
          source !== null &&
          typeof (source as Source).title === 'string' &&
          typeof (source as Source).path === 'string',
      ) as Source[])
    : undefined;

  const fullText =
    typeof data.message === 'string'
      ? data.message
      : typeof data.content === 'string'
        ? data.content
        : undefined;

  const textDelta =
    typeof data.delta === 'string'
      ? data.delta
      : typeof data.token === 'string'
        ? data.token
        : typeof data.chunk === 'string'
          ? data.chunk
          : undefined;

  return {
    fullText,
    textDelta,
    sources,
    done: data.done === true || data.finished === true,
  };
}

export default function AIChatInSearch({
  initialQuery,
  onSaveConversation,
  savedConversation,
}: AIChatInSearchProps) {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  const { messages, setMessages, status } = useChat<ChatUIMessage>({
    messages: savedConversation?.messages || [],
  });

  const [inputValue, setInputValue] = useState('');
  const [seconds, setSeconds] = useState(1);

  const isLoading = status === 'submitted' || status === 'streaming';

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasSentInitial = useRef(false);

  async function sendMessageToApi(text: string) {
    const userMsgId = String(Date.now());
    const aiMsgId = String(Date.now() + 1);
    const userMessage = toChatMessage({ id: userMsgId, role: 'user', text });

    setMessages((prev) => [...prev, userMessage, toChatMessage({ id: aiMsgId, role: 'assistant', text: '' })]);
    setInputValue('');

    try {
      const history: HistoryMessage[] = [...messages, userMessage]
        .filter((msg) => msg.role === 'assistant' || msg.role === 'user')
        .map((msg) => ({
          role: msg.role === 'assistant' ? ('assistant' as const) : ('user' as const),
          content: extractMessageText(msg),
        }));

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json, text/event-stream, text/plain',
        },
        body: JSON.stringify({ message: text, history }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      const updateAiMessage = (nextText: string, nextSources?: Source[]) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMsgId
              ? {
                  ...msg,
                  parts: [{ type: 'text', text: nextText }],
                  metadata: nextSources ? { ...msg.metadata, sources: nextSources } : msg.metadata,
                }
              : msg,
          ),
        );
      };

      if (!response.body) {
        if (contentType.includes('application/json')) {
          const data = await response.json();
          const messageText =
            typeof data?.message === 'string' ? data.message : 'No response received.';
          const sources = Array.isArray(data?.sources) ? data.sources : undefined;
          updateAiMessage(messageText, sources);
        } else {
          const textResponse = await response.text();
          updateAiMessage(textResponse || 'No response received.');
        }
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      let streamedSources: Source[] | undefined;
      let buffer = '';
      const isSse = contentType.includes('text/event-stream');

      const applyParsedChunk = (chunk: ParsedStreamChunk) => {
        if (chunk.fullText !== undefined) {
          accumulatedText = chunk.fullText;
        } else if (chunk.textDelta !== undefined) {
          accumulatedText += chunk.textDelta;
        }

        if (chunk.sources && chunk.sources.length > 0) {
          streamedSources = chunk.sources;
        }

        if (chunk.fullText !== undefined || chunk.textDelta !== undefined || chunk.sources) {
          updateAiMessage(accumulatedText, streamedSources);
        }
      };

      const processSseBuffer = () => {
        let eventBoundary = buffer.indexOf('\n\n');

        while (eventBoundary !== -1) {
          const rawEvent = buffer.slice(0, eventBoundary);
          buffer = buffer.slice(eventBoundary + 2);

          const dataPayload = rawEvent
            .split('\n')
            .filter((line) => line.startsWith('data:'))
            .map((line) => line.slice(5).trimStart())
            .join('\n');

          if (dataPayload) {
            const parsedChunk = parsePayloadChunk(dataPayload);
            if (parsedChunk.done) {
              return true;
            }
            applyParsedChunk(parsedChunk);
          }

          eventBoundary = buffer.indexOf('\n\n');
        }

        return false;
      };

      const processNdjsonBuffer = () => {
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) {
            continue;
          }

          const parsedChunk = parsePayloadChunk(trimmedLine);
          if (parsedChunk.done) {
            return true;
          }
          applyParsedChunk(parsedChunk);
        }

        return false;
      };

      let finished = false;
      while (!finished) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }

        const chunkText = decoder.decode(value, { stream: true });
        buffer += chunkText;

        if (isSse) {
          finished = processSseBuffer();
        } else if (contentType.includes('application/json') || contentType.includes('ndjson')) {
          finished = processNdjsonBuffer();
        } else {
          accumulatedText += chunkText;
          updateAiMessage(accumulatedText, streamedSources);
        }
      }

      const trailingText = decoder.decode();
      if (trailingText) {
        if (isSse || contentType.includes('application/json') || contentType.includes('ndjson')) {
          buffer += trailingText;
        } else {
          accumulatedText += trailingText;
          updateAiMessage(accumulatedText, streamedSources);
        }
      }

      if (buffer.trim()) {
        const parsedChunk = parsePayloadChunk(buffer.trim());
        applyParsedChunk(parsedChunk);
      }

      if (!accumulatedText.trim()) {
        updateAiMessage('No response received.', streamedSources);
      }
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMsgId
            ? {
                ...msg,
                parts: [{ type: 'text', text: 'Sorry, something went wrong. Please try again.' }],
                metadata: undefined,
              }
            : msg,
        ),
      );
    } finally {
      inputRef.current?.focus();
    }
  }

  useEffect(() => {
    if (messages.length > 0 && onSaveConversation) {
      onSaveConversation({ messages });
    }
  }, [messages, onSaveConversation]);

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
    if (initialQuery.trim() && !hasSentInitial.current && !savedConversation?.messages?.length) {
      hasSentInitial.current = true;
      sendMessageToApi(initialQuery.trim());
    }
  }, [initialQuery, savedConversation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessageToApi(inputValue.trim());
    }
  };

  const visibleMessages = messages.filter((msg) => msg.role === 'assistant' || msg.role === 'user');

  const turns: Array<{
    id: string;
    userText: string;
    assistantText?: string;
    sources?: Source[];
  }> = [];

  for (let index = 0; index < visibleMessages.length; index += 1) {
    const current = visibleMessages[index];
    if (current.role !== 'user') {
      continue;
    }

    const next = visibleMessages[index + 1];
    const hasAssistant = next && next.role === 'assistant';

    turns.push({
      id: current.id,
      userText: extractMessageText(current),
      assistantText: hasAssistant ? extractMessageText(next as ChatUIMessage) : undefined,
      sources: hasAssistant ? (next as ChatUIMessage).metadata?.sources : undefined,
    });

    if (hasAssistant) {
      index += 1;
    }
  }

  const showSuggestions = turns.length === 0 && !isLoading;

  return (
    <div className={styles.aiChatContainer}>
      <div className={styles.aiChatMessages}>
        {showSuggestions && (
          <div className={styles.aiChatSuggestions}>
            <p className={styles.aiChatSuggestionsTitle}>✨ Ask anything about NEAR</p>
            <div className={styles.aiChatSuggestionsList}>
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  className={styles.aiChatSuggestionChip}
                  onClick={() => sendMessageToApi(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {turns.map((turn) => {
          const hasAssistantText = !!turn.assistantText?.trim();

          return (
            <div key={turn.id} className={styles.aiChatTurn}>
              <p className={styles.aiChatUserQuery}>{turn.userText}</p>

              {hasAssistantText ? (
                <div className={styles.aiChatAnswer}>
                  <MarkdownRenderer part={turn.assistantText || ''} isDarkTheme={isDarkTheme} />
                </div>
              ) : (
                <div className={styles.aiChatThinking}>Thinking... ({seconds}s)</div>
              )}

              {turn.sources && turn.sources.length > 0 && (
                <div className={styles.aiChatSources}>
                  <span className={styles.aiChatSourcesLabel}>SOURCES:</span>
                  {turn.sources.map((source) => (
                    <a
                      key={source.path}
                      href={source.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.aiChatSourceLink}
                    >
                      {source.title}
                    </a>
                  ))}
                </div>
              )}

              <hr className={styles.aiChatDelimiter} />
            </div>
          );
        })}
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
