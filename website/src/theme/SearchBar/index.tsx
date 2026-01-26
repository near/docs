import React, { useState, useEffect, useCallback, useRef, Fragment } from 'react';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MeiliSearch } from 'meilisearch';
import { Dialog, Transition } from '@headlessui/react';
import { trackSearch, trackSearchResultClick, trackSearchNoResults } from '../../utils/searchAnalytics';
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
  { id: 'Smart Contracts', label: 'Contracts' },
  { id: 'Web3 Apps', label: 'Apps' },
  { id: 'Protocol', label: 'Protocol' },
  { id: 'Tutorials', label: 'Tutorials' },
  { id: 'AI', label: 'AI' },
  { id: 'Tools', label: 'Tools' },
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
    }, 150);

    return () => clearTimeout(timer);
  }, [query, selectedCategory, search]);

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

  return (
    <>
      <button
        className={styles.searchButton}
        onClick={() => setIsOpen(true)}
        aria-label="Search"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 19L14.65 14.65"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className={styles.searchPlaceholder}>Search</span>
        <span className={styles.searchShortcut}>
          <kbd>Ctrl</kbd>
          <kbd>K</kbd>
        </span>
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          onClose={() => setIsOpen(false)}
          className={styles.dialogOverlay}
        >
          <Transition.Child
            as={Fragment}
            enter={styles.backdropEnter}
            enterFrom={styles.backdropEnterFrom}
            enterTo={styles.backdropEnterTo}
            leave={styles.backdropLeave}
            leaveFrom={styles.backdropLeaveFrom}
            leaveTo={styles.backdropLeaveTo}
          >
            <div className={styles.backdrop} aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter={styles.modalEnter}
            enterFrom={styles.modalEnterFrom}
            enterTo={styles.modalEnterTo}
            leave={styles.modalLeave}
            leaveFrom={styles.modalLeaveFrom}
            leaveTo={styles.modalLeaveTo}
          >
            <Dialog.Panel className={styles.modal}>
              <div className={styles.searchHeader}>
                <svg
                  className={styles.searchIcon}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M19 19L14.65 14.65"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
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
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
