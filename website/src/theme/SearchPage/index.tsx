import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@theme/Layout';
import { useLocation, useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { MeiliSearch } from 'meilisearch';
import { trackSearch, trackSearchResultClick, trackSearchNoResults, trackSearchPageView, trackSearchFilter } from '../../utils/searchAnalytics';
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
  { id: 'all', label: 'All Categories', count: 0 },
  { id: 'Smart Contracts', label: 'Smart Contracts', count: 0 },
  { id: 'Web3 Apps', label: 'Web3 Apps', count: 0 },
  { id: 'Protocol', label: 'Protocol', count: 0 },
  { id: 'Tutorials', label: 'Tutorials', count: 0 },
  { id: 'AI', label: 'AI', count: 0 },
  { id: 'Tools', label: 'Tools', count: 0 },
  { id: 'API', label: 'API', count: 0 },
  { id: 'Integrations', label: 'Integrations', count: 0 },
  { id: 'Data Infrastructure', label: 'Data Infrastructure', count: 0 },
  { id: 'Chain Abstraction', label: 'Chain Abstraction', count: 0 },
  { id: 'Primitives', label: 'Primitives', count: 0 },
];

const ITEMS_PER_PAGE = 20;

export default function SearchPage(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const history = useHistory();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);
  const [client, setClient] = useState<MeiliSearch | null>(null);

  // Initialize MeiliSearch client
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

  // Parse URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    const category = params.get('category') || 'all';
    const page = parseInt(params.get('page') || '1', 10);

    setQuery(q);
    setSelectedCategory(category);
    setCurrentPage(page);

    if (q) {
      trackSearchPageView(q, category);
    }
  }, [location.search]);

  // Search function
  const search = useCallback(async () => {
    if (!client || !query.trim()) {
      setResults([]);
      setTotalHits(0);
      return;
    }

    const config = siteConfig.customFields?.meilisearch as { indexName?: string } | undefined;
    const indexName = config?.indexName || 'near-docs';

    setLoading(true);
    try {
      const index = client.index(indexName);
      const filter = selectedCategory !== 'all' ? `category = "${selectedCategory}"` : undefined;

      const searchResult: SearchResult = await index.search(query, {
        limit: ITEMS_PER_PAGE,
        offset: (currentPage - 1) * ITEMS_PER_PAGE,
        attributesToHighlight: ['title', 'content'],
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>',
        filter,
      });

      setResults(searchResult.hits);
      setTotalHits(searchResult.estimatedTotalHits);
      setProcessingTime(searchResult.processingTimeMs);

      trackSearch(query, searchResult.hits.length, selectedCategory);

      if (searchResult.hits.length === 0) {
        trackSearchNoResults(query);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
      setTotalHits(0);
    } finally {
      setLoading(false);
    }
  }, [client, query, selectedCategory, currentPage, siteConfig]);

  // Perform search when parameters change
  useEffect(() => {
    search();
  }, [search]);

  // Update URL when parameters change
  const updateUrl = useCallback((newQuery: string, newCategory: string, newPage: number) => {
    const params = new URLSearchParams();
    if (newQuery) params.set('q', newQuery);
    if (newCategory !== 'all') params.set('category', newCategory);
    if (newPage > 1) params.set('page', newPage.toString());

    history.push(`/search?${params.toString()}`);
  }, [history]);

  // Handle search input
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl(query, selectedCategory, 1);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    trackSearchFilter('category', category);
    setSelectedCategory(category);
    updateUrl(query, category, 1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateUrl(query, selectedCategory, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle result click
  const handleResultClick = (hit: SearchHit, index: number) => {
    trackSearchResultClick(query, (currentPage - 1) * ITEMS_PER_PAGE + index, hit.path);
  };

  // Render highlighted content
  const renderHighlight = (text: string | undefined, fallback: string) => {
    if (!text) return fallback;
    return <span dangerouslySetInnerHTML={{ __html: text }} />;
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalHits / ITEMS_PER_PAGE);

  return (
    <Layout title="Search" description="Search NEAR Documentation">
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h3 className={styles.sidebarTitle}>Categories</h3>
          <ul className={styles.categoryList}>
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <button
                  className={`${styles.categoryButton} ${
                    selectedCategory === cat.id ? styles.categoryButtonActive : ''
                  }`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.main}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchInputWrapper}>
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
                type="text"
                className={styles.searchInput}
                placeholder="Search documentation..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className={styles.searchButton}>
                Search
              </button>
            </div>
          </form>

          {query && (
            <div className={styles.resultsHeader}>
              {loading ? (
                <span>Searching...</span>
              ) : (
                <span>
                  Found {totalHits} result{totalHits !== 1 ? 's' : ''} for "{query}"
                  {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                  <span className={styles.processingTime}> ({processingTime}ms)</span>
                </span>
              )}
            </div>
          )}

          {!loading && results.length === 0 && query && (
            <div className={styles.noResults}>
              <h2>No results found</h2>
              <p>We couldn't find any results for "{query}"</p>
              <div className={styles.suggestions}>
                <h3>Suggestions:</h3>
                <ul>
                  <li>Check your spelling</li>
                  <li>Try different keywords</li>
                  <li>Try more general terms</li>
                  <li>Clear category filters</li>
                </ul>
              </div>
              <div className={styles.popularSearches}>
                <h3>Popular searches:</h3>
                <div className={styles.popularTags}>
                  <a href="/search?q=smart+contract">Smart Contract</a>
                  <a href="/search?q=near+api">NEAR API</a>
                  <a href="/search?q=wallet">Wallet</a>
                  <a href="/search?q=transaction">Transaction</a>
                  <a href="/search?q=gas">Gas</a>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <span>Searching...</span>
            </div>
          )}

          <div className={styles.results}>
            {results.map((hit, index) => (
              <a
                key={hit.id}
                href={hit.path}
                className={styles.resultItem}
                onClick={() => handleResultClick(hit, index)}
              >
                <div className={styles.resultBreadcrumb}>
                  {hit.hierarchy_lvl0}
                  {hit.hierarchy_lvl1 && ` > ${hit.hierarchy_lvl1}`}
                  {hit.hierarchy_lvl2 && ` > ${hit.hierarchy_lvl2}`}
                </div>
                <h3 className={styles.resultTitle}>
                  {renderHighlight(hit._formatted?.title, hit.title)}
                </h3>
                <p className={styles.resultContent}>
                  {renderHighlight(
                    hit._formatted?.content?.substring(0, 250),
                    hit.content?.substring(0, 250)
                  )}
                  ...
                </p>
                <span className={styles.resultPath}>{hit.path}</span>
              </a>
            ))}
          </div>

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.paginationButton}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className={styles.paginationPages}>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      className={`${styles.pageButton} ${
                        currentPage === pageNum ? styles.pageButtonActive : ''
                      }`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                className={styles.paginationButton}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
