import React from 'react';
import clsx from 'clsx';
import {searchSo} from '../so-search';
import {SearchInput} from './SearchInput';
import {SoSearchResult} from './SoSearchResult';

export const SoSearchModal = ({
                                onQueryChange,
                                tabsComponent,
                                initialQuery = ''
                              }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [searchResults, setSearchResults] = React.useState(null);
  const [currentQuery, setCurrentQuery] = React.useState(null);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const onReset = () => {
    console.log('reset');
  }
  React.useEffect(() => {
    if (typeof initialQuery === 'string' && initialQuery.trim().length > 0) {
      inputRef.current!.value = initialQuery;
      executeSearch(initialQuery);
    } else {
      inputRef.current!.focus();
    }
  }, []);
  const executeSearch = async query => {
    setCurrentQuery(query);
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
            onChange={onQueryChange}
            placeholder="Search NEAR questions in StackOverflow"
            inputRef={inputRef}
            onReset={onReset}
            onEnter={executeSearch}
          />
        </header>
        <div className={clsx('DocSearch-Body', {
          'search-searching': isSearching,
          'search-error': isError,
        })}>
          <div className="DocSearch-Dropdown">
            <SoSearchResult
              query={currentQuery}
              results={searchResults}/>
          </div>
        </div>
      </div>
    </div>
  );
}
