import {SearchBox} from './DocSearch/SearchBox';
import {ScreenState} from './DocSearch/ScreenState';
import {HitPreviewPanel} from './HitPreviewPanel';
import {Footer} from './DocSearch/Footer';
import React from 'react';
import clsx from 'clsx';
import {AutocompleteState, createAutocomplete} from '@algolia/autocomplete-core';
import {InternalDocSearchHit} from './DocSearch/types';
import {searchSo} from '../so-search';
import {debounce} from '@algolia/autocomplete-shared';
import {OnStateChangeProps} from '@algolia/autocomplete-js';
import {Hit} from './DocSearch/Hit';
import {SearchInput} from './SearchInput';
import {SoSearchResult} from './SoSearchResult';

type SoItem = {
  url: string,
  title: string,
  name: string,
}

export const SoSearchModal = ({
                                tabsComponent,
                                initialQuery = ''
                              }) => {
  const [activeItem, setActiveItem] = React.useState(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [currentQuery, setCurrentQuery] = React.useState<string>(null);
  const [searchResults, setSearchResults] = React.useState(null);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);

  const onReset = () => {
    console.log('reset');
  }
  const executeSearch = async query => {
    setCurrentQuery(`[nearprotocol] ${query}`);
    setIsSearching(true);
    setIsError(false);
    try {
      const soResults = await searchSo({query});
      setSearchResults(soResults);
      setIsSearching(false);
    } catch (e) {
      setIsError(true);
      setIsSearching(false);
    }
  }
  return (
    <div className={clsx('DocSearch', 'so-search',
      'DocSearch-Container')}>
      <div className="DocSearch-Modal">
        {tabsComponent}
        <header className="DocSearch-SearchBar">
          <SearchInput
            inputRef={inputRef}
            onReset={onReset}
            onEnter={executeSearch}
          />
        </header>
        {isError && <div className="search-error">An error occured</div>}
        <div className={clsx('DocSearch-Body', {
          'search-searching': isSearching
        })}>
          <div className="DocSearch-Dropdown">
            <SoSearchResult
              query={currentQuery}
              results={searchResults} />
          </div>
        </div>
        <footer className="DocSearch-Footer">
          <Footer/>
        </footer>
      </div>
    </div>
  );
}
