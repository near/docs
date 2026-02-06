import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';
import { MeiliSearch } from 'meilisearch';
import { trackSearch, trackSearchResultClick, trackSearchNoResults } from '../../utils/searchAnalytics';
import { SearchIcon } from '../Icon/Search';
import MarkdownRenderer from '../../components/AIChat/MarkdownRenderer';
import styles from './styles.module.css';

interface SearchHit {
  id: string;
  title: string;
  content: string;
  path: string;
  section: string;
  category: string;
  hierarchy_lvl0: string;
  hierarchy_lvl1: string;
  hierarchy_lvl2: string;
  _formatted?: {
    title?: string;
    content?: string;
  };
}

interface SearchResult {
  hits: SearchHit[];
  query: string;
  processingTimeMs: number;
  estimatedTotalHits: number;
}

interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  sources?: { title: string; path: string }[];
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'Protocol', label: 'Protocol' },
  { id: 'Multi-Chain', label: 'Multi-Chain' },
  { id: 'AI & Agents', label: 'AI' },
  { id: 'Smart Contracts', label: 'Contracts' },
  { id: 'Web3 Apps', label: 'Web3 Apps' },
  { id: 'Primitives', label: 'Tokens & Primitives' },
  { id: 'Data Infrastructure', label: 'Data Infrastructure' },
  { id: 'Tools', label: 'Tools' },
  { id: 'API', label: 'API' },
];

const CHAT_API_URL = 'http://localhost:3001/api/chat';

export default function SearchBar(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const history = useHistory();
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  // Mode: 'search' or 'chat'
  const [mode, setMode] = useState<'search' | 'chat'>('search');

  // Search state
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [client, setClient] = useState<MeiliSearch | null>(null);

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config = siteConfig.customFields?.meilisearch as {
      host?: string;
      apiKey?: string;
      indexName?: string;
    } | undefined;

    if (config?.host) {
      const meiliClient = new MeiliSearch({
        host: config.host,
        apiKey: config.apiKey || '',
      });
      setClient(meiliClient);
    }
  }, [siteConfig]);

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

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (mode === 'search' && inputRef.current) {
          inputRef.current.focus();
        } else if (mode === 'chat' && chatInputRef.current) {
          chatInputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen, mode]);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const search = useCallback(async (searchQuery: string, category: string) => {
    if (!client || !searchQuery.trim()) {
      setResults([]);
      return;
    }

    const config = siteConfig.customFields?.meilisearch as { indexName?: string } | undefined;
    const indexName = config?.indexName || 'near-docs';

    setLoading(true);
    try {
      const index = client.index(indexName);
      const filter = category !== 'all' ? `category = "${category}"` : undefined;

      const searchResult: SearchResult = await index.search(searchQuery, {
        limit: 10,
        attributesToHighlight: ['title', 'content'],
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>',
        filter,
        hybrid: {
          semanticRatio: 0.6, 
          embedder: 'default'
        },
      });

      setResults(searchResult.hits);
      setSelectedIndex(0);

      trackSearch(searchQuery, searchResult.hits.length, category);

      if (searchResult.hits.length === 0) {
        trackSearchNoResults(searchQuery);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [client, siteConfig]);

  useEffect(() => {
    if (mode === 'search') {
      const timer = setTimeout(() => {
        search(query, selectedCategory);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [query, selectedCategory, search, mode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      navigateToResult(results[selectedIndex], selectedIndex);
    }
  };

  const navigateToResult = (hit: SearchHit, index: number) => {
    trackSearchResultClick(query, index, hit.path);
    setIsOpen(false);
    setQuery('');
    history.push(hit.path);
  };

  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      selectedElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, results.length]);

  const renderHighlight = (text: string | undefined, fallback: string) => {
    if (!text) return fallback;
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  // Chat functions
  const sendChatMessage = async () => {
    if (!chatInput.trim() || chatLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: chatInput,
      sender: 'user',
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: chatInput,
          threadId: threadId,
        }),
      });

      const data = await response.json();
      setThreadId(data.threadId);

      const aiMessage: ChatMessage = {
        id: Date.now() + 1,
        text: data.message || 'Sorry, I could not process your request.',
        sender: 'ai',
        sources: data.sources || [],
      };

      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        id: Date.now() + 1,
        text: 'Sorry, there was an error processing your request. Please try again.',
        sender: 'ai',
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleChatKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  const clearChat = () => {
    setChatMessages([]);
    setThreadId(null);
  };

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
            onClick={() => setIsOpen(false)}
          />
          <div className={styles.modal}>
            {/* Mode Toggle */}
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

            {mode === 'search' ? (
              <>
                <div className={styles.searchHeader}>
                  <SearchIcon className={styles.searchIcon} />
                  <input
                    ref={inputRef}
                    type="text"
                    className={styles.searchInput}
                    placeholder="Search documentation..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  {loading && <div className={styles.spinner} />}
                  <button
                    className={styles.closeButton}
                    onClick={() => setIsOpen(false)}
                  >
                    <kbd>Esc</kbd>
                  </button>
                </div>

                <div className={styles.categoryFilters}>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      className={`${styles.categoryChip} ${
                        selectedCategory === cat.id ? styles.categoryChipActive : ''
                      }`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className={styles.results} ref={resultsRef}>
                  {results.length === 0 && query && !loading && (
                    <div className={styles.noResults}>
                      <p>No results found for "{query}"</p>
                      <p className={styles.noResultsHint}>
                        Try different keywords or ask AI for help
                      </p>
                      <button
                        className={styles.askAiButton}
                        onClick={() => {
                          setMode('chat');
                          setChatInput(query);
                        }}
                      >
                        Ask AI about "{query}"
                      </button>
                    </div>
                  )}

                  {results.map((hit, index) => (
                    <button
                      key={hit.id}
                      className={`${styles.resultItem} ${
                        index === selectedIndex ? styles.resultItemSelected : ''
                      }`}
                      onClick={() => navigateToResult(hit, index)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className={styles.resultBreadcrumb}>
                        {hit.hierarchy_lvl0}
                        {hit.hierarchy_lvl1 && ` > ${hit.hierarchy_lvl1}`}
                      </div>
                      <div className={styles.resultTitle}>
                        {renderHighlight(hit._formatted?.title, hit.title)}
                      </div>
                      <div className={styles.resultContent}>
                        {renderHighlight(
                          hit._formatted?.content?.substring(0, 150),
                          hit.content?.substring(0, 150)
                        )}
                        ...
                      </div>
                    </button>
                  ))}
                </div>

                {results.length > 0 && (
                  <div className={styles.footer}>
                    <div className={styles.footerHint}>
                      <kbd>Enter</kbd> to select
                      <kbd>↑</kbd><kbd>↓</kbd> to navigate
                      <kbd>Esc</kbd> to close
                    </div>
                    <a
                      href={`/search?q=${encodeURIComponent(query)}`}
                      className={styles.viewAll}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        history.push(`/search?q=${encodeURIComponent(query)}${selectedCategory !== 'all' ? `&category=${encodeURIComponent(selectedCategory)}` : ''}`);
                      }}
                    >
                      View all results
                    </a>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Chat Mode */}
                <div className={styles.chatHeader}>
                  <div className={styles.chatHeaderTitle}>
                    <span className={styles.aiIconLarge}>AI</span>
                    <span>Ask about NEAR Protocol</span>
                  </div>
                  <div className={styles.chatHeaderActions}>
                    {chatMessages.length > 0 && (
                      <button className={styles.clearChatButton} onClick={clearChat}>
                        Clear
                      </button>
                    )}
                    <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                      <kbd>Esc</kbd>
                    </button>
                  </div>
                </div>

                <div className={styles.chatMessages} ref={chatMessagesRef}>
                  {chatMessages.length === 0 && (
                    <div className={styles.chatWelcome}>
                      <p className={styles.chatWelcomeTitle}>How can I help you?</p>
                      <p className={styles.chatWelcomeHint}>
                        Ask me anything about NEAR Protocol, smart contracts, or building dApps.
                      </p>
                      <div className={styles.chatSuggestions}>
                        {[
                          'How do I create a smart contract?',
                          'What is NEAR Protocol?',
                          'How to deploy to testnet?',
                        ].map((suggestion) => (
                          <button
                            key={suggestion}
                            className={styles.chatSuggestion}
                            onClick={() => {
                              setChatInput(suggestion);
                              chatInputRef.current?.focus();
                            }}
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {chatMessages.map((msg) => (
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
                                setIsOpen(false);
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

                  {chatLoading && (
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
                    ref={chatInputRef}
                    type="text"
                    className={styles.chatInput}
                    placeholder="Ask a question..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleChatKeyDown}
                    disabled={chatLoading}
                  />
                  <button
                    className={styles.chatSendButton}
                    onClick={sendChatMessage}
                    disabled={!chatInput.trim() || chatLoading}
                  >
                    Send
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
