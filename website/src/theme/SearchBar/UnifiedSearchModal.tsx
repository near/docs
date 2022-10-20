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
import {createInsightsMiddleware} from 'instantsearch.js/es/middlewares';


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
  const {query, refine, clear, isSearchStalled} = useSearchBox(props);

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
  const {use} = useInstantSearch();

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
    <Highlight attribute="text" hit={hit} />
    <Link to={hit.url}>{children}</Link>
    {JSON.stringify(hit)}
  </div>;
}

function InstantSearchHit({hit}) {
  const {hits, sendEvent} = useHits();

  return (
    <article>
      {JSON.stringify(hit)}
      <h1>
        <Highlight attribute="name" hit={hit} />
      </h1>
    </article>
  );
}

function middleware({instantSearchInstance}) {
  return {
    onStateChange({uiState}) {
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
  const {use} = useInstantSearch();

  React.useLayoutEffect(() => {
    return use(middleware);
  });
}

export function UnifiedSearchModal(props) {
  return <div className={'usm-container'}>
    <div className={'unified-search-modal'}>
      <div className={'usm-content'}>
        {/*<DocSearchModal {...props} hitComponent={Hit} />*/}
        <InstantSearch searchClient={searchClient} indexName="near-staging.tmp">
          {/*<Breadcrumb*/}
          {/*  attributes={[*/}
          {/*    'lvl0',*/}
          {/*    'lvl1',*/}
          {/*    'lvl2',*/}
          {/*    'lvl3',*/}
          {/*    'lvl4',*/}
          {/*    'lvl5',*/}
          {/*  ]}*/}
          {/*/>*/}
          {/* onStateChange={/*onStateChange!*/}
          {/*<Configure hitsPerPage={40} />*/}
          {/*<Middleware />*/}
          {/*<CustomConfigure {...searchParameters} />*/}
          <div className={'usm-header'}>
            <div className={'usm-searchbox'}>
              <SearchBox  />
            </div>
          </div>
          {/*<CustomSearchBox />*/}
          <div className={'usm-hits-tabs'}>
          </div>
          <div className={'usm-hits'}>
            <div className={'usm-hits-list'}>
              <Hits hitComponent={Hit} />
              {/*<InstantSearchHit />*/}
            </div>
            <div className={'usm-hits-panel'}>
              <h1>HITS</h1>
            </div>
          </div>
          <div className={'usm-footer'}>
            <h1>FOOTER</h1>
          </div>
        </InstantSearch>
      </div>
    </div>
  </div>
}
