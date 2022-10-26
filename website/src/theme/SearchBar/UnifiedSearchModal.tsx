import React, {useLayoutEffect, useState} from 'react';
import Link from '@docusaurus/Link';
// import {DocSearchModal} from './DocSearch';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Snippet,
  RefinementList,
  Pagination,
  Configure, useSearchBox, useConfigure, useConnector, useInstantSearch, useHits, Breadcrumb, HierarchicalMenu,
} from 'react-instantsearch-hooks-web';
import type {InstantSearchProps} from 'react-instantsearch-hooks-web';
import connectAutocomplete from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete';
import {stats} from 'instantsearch.js/es/widgets';
import {createInsightsMiddleware} from 'instantsearch.js/es/middlewares';
import connectStats from 'instantsearch.js/es/connectors/stats/connectStats';
import {Footer} from './DocSearch/Footer';


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
export function useStats(props) {
  return useConnector(connectStats, props);
}

export function Stats(props) {
  const {
    hitsPerPage,
    nbHits,
    areHitsSorted,
    nbSortedHits,
    nbPages,
    page,
    processingTimeMS,
    query,
  } = useStats(props);

  if (nbHits === 0) {
    return null;
  }
  return <>
    <div className='usm-stats'>
      {nbHits} results
    </div>
  </>;
}

function InstantSearchHits({setCurrentHit}) {
  const {hits, sendEvent} = useHits();
  console.log(hits);
  return hits.map((hit, i) => {
    return <div key={i} className='search-hit' onMouseOver={e => setCurrentHit(hit)}>
      <Link to={hit.url}>
        <Snippet hit={hit} attribute='content' classNames={{
          root: 'usm-snippet-root',
          highlighted: 'usm-snippet-highlighted',
          nonHighlighted: 'usm-snippet-nonHighlighted',
          separator: 'usm-snippet-separator',
        }} />
      </Link>
    </div>
  });
}

const HitPreview = ({hit}) => {
  if (hit === null) {
    return (<div>
      no hit selected
    </div>);
  }
  return <div>
    <h1>{hit.title}</h1>
    <p>{hit.description}</p>
    <Highlight hit={hit} attribute='content' />

  </div>
}

const onStateChange = ({uiState, setUiState}) => {
  setUiState(uiState);
}

export function UnifiedSearchModal(props) {
  const [currentHit, setCurrentHit] = useState(null);
  return <div className={'usm-container'}>
    <div className={'unified-search-modal'}>
      <div className={'usm-content'}>
        <InstantSearch searchClient={searchClient} indexName="near-staging"
                       onStateChange={onStateChange}>
          <Configure hitsPerPage={50} filters="lang:en" />

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

          <div className={'usm-hits-stats'}>
            <Stats />
          </div>
          <div className={'usm-hits-tabs'}>
          </div>
          <div className={'usm-hits'}>
            <div className={'usm-hits-list'}>
              <InstantSearchHits setCurrentHit={setCurrentHit} />
            </div>
            <div className={'usm-hits-panel'}>
              <HitPreview hit={currentHit} />
            </div>
          </div>
          <div className={'usm-footer DocSearch-Footer'}>
            <Footer />
          </div>
        </InstantSearch>

      </div>
    </div>
  </div>
}
