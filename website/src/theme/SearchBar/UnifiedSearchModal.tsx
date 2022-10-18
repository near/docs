import React, {useLayoutEffect} from 'react';
import Link from '@docusaurus/Link';
// import {DocSearchModal} from './DocSearch';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  RefinementList,
  Pagination,
  Configure, useSearchBox, useConfigure, useConnector, useInstantSearch, useHits, Breadcrumb,
} from 'react-instantsearch-hooks-web';
import type {InstantSearchProps} from 'react-instantsearch-hooks-web';
import connectAutocomplete from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete';
import { createInsightsMiddleware } from 'instantsearch.js/es/middlewares';


import('@docsearch/react/style');
import('./styles.css');

const searchClient = algoliasearch('0LUM67N2P2', '129d0f429e1bb0510f0261dda1e88ed4');

// const onStateChange: InstantSearchProps['onStateChange'] = ({
//                                                               uiState,
//                                                               setUiState,
//                                                             }) => {
//   // Custom logic
//   setUiState(uiState);
// };

function CustomSearchBox(props) {
  const { query, refine, clear, isSearchStalled } = useSearchBox(props);

  return <>{/* Your JSX */}</>;
}

// const configureApi = useConfigure({
//   hitsPerPage: 4,
//   analytics: false,
//   distinct: true,
// });

function CustomConfigure(props) {
  useConfigure(props);

  return null;
}

export function useAutocomplete(props) {
  return useConnector(connectAutocomplete, props);
}

function InsightsMiddleware() {
  const { use } = useInstantSearch();

  useLayoutEffect(() => {
    const middleware = createInsightsMiddleware({
      insightsClient: null, //window.aa,
      // onEvent: (event, aa) => {
      //   const { insightsMethod, payload, widgetType, eventType } = event;
      //
      //   // Send the event to Algolia
      //   if (insightsMethod) {
      //     aa(insightsMethod, payload);
      //   }
      //
      //   // Send the event to a third-party tracker
      //   if (widgetType === 'ais.hits' && eventType === 'click') {
      //     thirdPartyTracker.send('Product Clicked', payload);
      //   }
      // }
    });

    return use(middleware);
  }, [use]);

  return null;
}

function Hit({hit, children}) {
  console.log(hit);
  return <div className='search-hit'>
    <Link to={hit.url}>{children}</Link>
    <div className='search-hit-preview'>
      {JSON.stringify(hit)}
    </div>
  </div>;
}

function InstantSearchHit({hit}) {
  const { hits, sendEvent } = useHits();

  return (
    <article>
      <img src={hit.image} alt={hit.name} />
      <p>{hit.categories[0]}</p>
      <h1>
        <Highlight attribute="name" hit={hit} />
      </h1>
      <p>${hit.price}</p>
    </article>
  );
}

function middleware({ instantSearchInstance }) {
  return {
    onStateChange({ uiState }) {
      // Do something with `uiState` every time the state changes.
    },
    subscribe() {
      // Do something when the InstantSearch instance starts.
    },
    unsubscribe() {
      // Do something when the InstantSearch instance is disposed.
    }
  }
}

function Middleware() {
  const { use } = useInstantSearch();

  React.useLayoutEffect(() => {
    return use(middleware);
  });
}

export function UnifiedSearchModal(props) {
  return <div className={'unified-search-modal'}>
    <div>
      {/*<DocSearchModal {...props} hitComponent={Hit} />*/}
      <InstantSearch searchClient={searchClient} indexName="near">
        <Breadcrumb
          attributes={[
            'categories.lvl0',
            'categories.lvl1',
            'categories.lvl2',
            'categories.lvl3'
          ]}
        />
        {/* onStateChange={/*onStateChange!*/}
        {/*<Configure hitsPerPage={40} />*/}
        {/*<Middleware />*/}
        {/*<CustomConfigure {...searchParameters} />*/}
        <SearchBox />
        {/*<CustomSearchBox />*/}
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  </div>
}
