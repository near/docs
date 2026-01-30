import posthog from 'posthog-js';

/**
 * Track when a search is performed
 */
export function trackSearch(query: string, hitsCount: number, category: string = 'all'): void {
  if (typeof window === 'undefined') return;

  posthog.capture('search_performed', {
    query,
    hits_count: hitsCount,
    category,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track when a search result is clicked
 */
export function trackSearchResultClick(query: string, position: number, path: string): void {
  if (typeof window === 'undefined') return;

  posthog.capture('search_result_clicked', {
    query,
    position,
    path,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track when a search returns no results
 */
export function trackSearchNoResults(query: string): void {
  if (typeof window === 'undefined') return;

  posthog.capture('search_no_results', {
    query,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track when user uses a search filter
 */
export function trackSearchFilter(filterType: string, filterValue: string): void {
  if (typeof window === 'undefined') return;

  posthog.capture('search_filter_used', {
    filter_type: filterType,
    filter_value: filterValue,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Track search page visits
 */
export function trackSearchPageView(query: string, category: string = 'all'): void {
  if (typeof window === 'undefined') return;

  posthog.capture('search_page_viewed', {
    query,
    category,
    timestamp: new Date().toISOString(),
  });
}
