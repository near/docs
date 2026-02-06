import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MeiliSearch } from 'meilisearch';
import { trackSearch, trackSearchResultClick, trackSearchNoResults } from '../../utils/searchAnalytics';
import { SearchIcon } from '../Icon/Search';
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

interface SearchPanelProps {
  onClose: () => void;
  onAskAI: (query: string) => void;
}

export default function SearchPanel({ onClose, onAskAI }: SearchPanelProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const history = useHistory();

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
      setClient(new MeiliSearch({ host: config.host, apiKey: config.apiKey || '' }));
    }
  }, [siteConfig]);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

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
        hybrid: { semanticRatio: 0.6, embedder: 'default' },
      });

      setResults(searchResult.hits);
      setSelectedIndex(-1);
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
    const timer = setTimeout(() => search(query, selectedCategory), 300);
    return () => clearTimeout(timer);
  }, [query, selectedCategory, search]);

  useEffect(() => {
    if (resultsRef.current && results.length > 0) {
      const el = resultsRef.current.children[selectedIndex] as HTMLElement;
      el?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, results.length]);

  const navigateToResult = (hit: SearchHit, index: number) => {
    trackSearchResultClick(query, index, hit.path);
    onClose();
    setQuery('');
    history.push(hit.path);
  };

  const hasAiOption = query.trim().length > 0;
  const minIndex = hasAiOption ? -1 : 0;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, minIndex));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex === -1 && hasAiOption) {
        onAskAI(query);
      } else if (results[selectedIndex]) {
        navigateToResult(results[selectedIndex], selectedIndex);
      }
    }
  };

  const renderHighlight = (text: string | undefined, fallback: string) => {
    if (!text) return fallback;
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  return (
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
        <button className={styles.closeButton} onClick={onClose}>
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
        {hasAiOption && (
          <button
            className={`${styles.askAiRow} ${
              selectedIndex === -1 ? styles.askAiRowSelected : ''
            }`}
            onClick={() => onAskAI(query)}
            onMouseEnter={() => setSelectedIndex(-1)}
          >
            <span className={styles.askAiRowIcon}>AI</span>
            <span className={styles.askAiRowText}>
              Ask AI about "{query}"
            </span>
            <span className={styles.askAiRowHint}>
              <kbd>Enter</kbd>
            </span>
          </button>
        )}

        {results.length === 0 && query && !loading && (
          <div className={styles.noResults}>
            <p>No results found for "{query}"</p>
            <p className={styles.noResultsHint}>
              Try different keywords or ask AI for help
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

      {(hasAiOption || results.length > 0) && (
        <div className={styles.footer}>
          <div className={styles.footerHint}>
            <kbd>Enter</kbd> to select
            <kbd>↑</kbd><kbd>↓</kbd> to navigate
            <kbd>Esc</kbd> to close
          </div>
        </div>
      )}
    </>
  );
}
