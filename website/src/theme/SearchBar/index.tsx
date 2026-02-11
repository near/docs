import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MeiliSearch } from 'meilisearch';
import { trackSearch, trackSearchResultClick, trackSearchNoResults } from '../../utils/searchAnalytics';
import { SearchIcon } from '../Icon/Search';
import AIChatInSearch, { type SavedConversation } from './AIChatInSearch';
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

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'protocol', label: 'Protocol' },
  { id: 'chain-abstraction', label: 'Multi-Chain' },
  { id: 'ai', label: 'AI & Agents' },
  { id: 'smart-contracts', label: 'Smart Contracts' },
  { id: 'web3-apps', label: 'Web3 Apps' },
  { id: 'primitives', label: 'Primitives' },
  { id: 'data-infrastructure', label: 'Data Infrastructure' },
  { id: 'tools', label: 'Tools' },
  { id: 'api', label: 'API' },
  { id: 'integrations', label: 'Integration Examples' },
  { id: 'aurora', label: 'Aurora' },
];

export default function SearchBar(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [client, setClient] = useState<MeiliSearch | null>(null);
  const [mode, setMode] = useState<'search' | 'askDocs'>('search');
  const [askDocsQuery, setAskDocsQuery] = useState('');
  const [savedConversation, setSavedConversation] = useState<SavedConversation | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

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

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setMode('search');
    setAskDocsQuery('');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeModal]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

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
          semanticRatio: 0.5, 
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
    const timer = setTimeout(() => {
      search(query, selectedCategory);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, selectedCategory, search]);

  const switchToAskDocs = () => {
    setAskDocsQuery(query.trim());
    setMode('askDocs');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (mode === 'askDocs') return;
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
    closeModal();
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
            onClick={closeModal}
          />
          <div className={styles.modal}>
            <div className={styles.searchHeader}>
              <SearchIcon className={styles.searchIcon} />
              <input
                ref={inputRef}
                type="text"
                className={styles.searchInput}
                placeholder={mode === 'search' ? 'Search documentation...' : 'Ask the docs...'}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {loading && mode === 'search' && <div className={styles.spinner} />}
              <div className={styles.modeToggle}>
                <button
                  className={`${styles.modeToggleBtn} ${mode === 'search' ? styles.modeToggleBtnActive : ''}`}
                  onClick={() => setMode('search')}
                >
                  Search
                </button>
                <button
                  className={`${styles.modeToggleBtn} ${mode === 'askDocs' ? styles.modeToggleBtnActive : ''}`}
                  onClick={() => switchToAskDocs()}
                >
                  ✨ Ask Docs
                </button>
              </div>
              <button
                className={styles.closeButton}
                onClick={closeModal}
              >
                <kbd>Esc</kbd>
              </button>
            </div>

            {mode === 'search' && (
              <>
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

                {query.trim() && (
                  <div
                    className={styles.askDocsPrompt}
                    onClick={() => switchToAskDocs()}
                  >
                    <span className={styles.askDocsPromptIcon}>✨</span>
                    <span className={styles.askDocsPromptText}>
                      Ask about "{query.trim()}"
                    </span>
                    <span className={styles.askDocsPromptHint}>AI-powered</span>
                  </div>
                )}

                <div className={styles.results} ref={resultsRef}>
                  {results.length === 0 && query && !loading && (
                    <div className={styles.noResults}>
                      <p>No results found for "{query}"</p>
                      <p className={styles.noResultsHint}>
                        Try different keywords or browse the documentation
                      </p>
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
                  </div>
                )}
              </>
            )}

            {mode === 'askDocs' && (
              <AIChatInSearch
                initialQuery={askDocsQuery}
                savedConversation={savedConversation}
                onSaveConversation={setSavedConversation}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
