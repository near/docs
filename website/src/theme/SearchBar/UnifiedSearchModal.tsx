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

// const configureApi = useConfigure({
//   hitsPerPage: 4,
//   analytics: false,
//   distinct: true,
// });

const middleware = createInsightsMiddleware({
  insightsClient: InsightsClient | null,
  // Optional parameters
  insightsInitParams: object,
  onEvent: function,
})

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


function InstantSearchHits() {
  const {hits, sendEvent} = useHits();
  return hits.slice(-2).map((hit, i) => {
    console.log(hit);
    return <div key={i} className='search-hit'>
      <Link to={hit.url}>
        <Highlight hit={hit} attribute='content' />
      </Link>
    </div>
  })
  r
}

const onStateChange = ({uiState, setUiState}) => {
  setUiState(uiState);
}

export function UnifiedSearchModal(props) {

  return <div className={'usm-container'}>
    <div className={'unified-search-modal'}>
      <div className={'usm-content'}>
        <InstantSearch searchClient={searchClient} indexName="near-staging"
                       onStateChange={onStateChange}>
          <Configure hitsPerPage={10} />
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
          <Configure hitsPerPage={10} />
          <div className={'usm-header'}>
            <div className={'usm-searchbox'}>
              <SearchBox autoFocus={true} classNames={{
                root: 'usm-searchbox-root',
                form: 'usm-searchbox-form',
                input: 'usm-searchbox-input',
                submit: 'usm-searchbox-submit',
                reset: 'usm-searchbox-reset',
                loadingIndicator: 'usm-searchbox-loadingIndicator',
                submitIcon: 'usm-searchbox-submitIcon',
                resetIcon: 'usm-searchbox-resetIcon',
                loadingIcon: 'usm-searchbox-loadingIcon',
              }} placeholder='Search docs' />
            </div>
          </div>
          <div className={'usm-hits-tabs'}>
          </div>
          <div className={'usm-hits'}>
            <div className={'usm-hits-list'}>
              <InstantSearchHits />
            </div>
            <div className={'usm-hits-panel'}>
              <h1>HITS</h1>
            </div>
          </div>
          <div className={'usm-footer'}>
            {/*<h1>FOOTER</h1>*/}
          </div>
        </InstantSearch>
      </div>
    </div>
  </div>
}
