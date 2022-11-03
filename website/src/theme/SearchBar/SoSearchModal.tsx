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

type SoItem = {
  url: string,
  title: string,
  name: string,
}

export const SoSearchModal = ({
                                tabsComponent,
                                initialQueryFromProp = ''
                              }) => {
  const [activeItem, setActiveItem] = React.useState(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [searchResults, setSearchResults] = React.useState(null);
  const dropdownRef = React.useRef<HTMLDivElement | null>(null);
  const [autocompleteState, setAutocompleteState] = React.useState<AutocompleteState<InternalDocSearchHit>>({
    query: '',
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    activeItemId: null,
    status: 'idle',
  });
  const initialQuery = React.useRef(
    initialQueryFromProp
  ).current;
  const autocomplete = React.useMemo(
    () => createAutocomplete({
      detachedMediaQuery: '',
      id: 'so-search',
      defaultActiveItemId: 0,
      placeholder: 'Search NEAR on StackOverflow',
      initialState: {
        query: initialQuery,
      },
      onStateChange(props: OnStateChangeProps<SoItem>) {
        console.log(props);
        setAutocompleteState(props.state);
      },
      onSubmit({state}) {
        console.log('SUBMIT!');
      },
      debug: true,
      onReset({state}) {
        console.log('RESET!');
      },
      getSources() {
        return [{
          sourceId: 'so-source',
          async getItems<SoItem>({query, state}) {
            return [
              {url: '1', name: '111'},
              {url: '2', name: '2222'},
              {url: '155', name: '3333'},
            ]
          },
          templates: {
            item({item}) {
              return `Result: ${item.name}`;
            },
          },
        }]
      }
    }), [
      initialQuery,
    ]);

  const {
    getEnvironmentProps,
    getRootProps,
    getFormProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getListProps,
    setActiveItemId,
    setQuery,
    setCollections,
    setIsOpen,
    setStatus,
    setContext,
    refresh,
    update,
  } = autocomplete;
  const onReset = () => {
    console.log('reset');
  }
  const executeSearch = async query => {
    const soResults = await searchSo({query});
    console.log(soResults);
  }
  return (
    <div className={clsx('DocSearch',
      'DocSearch-Container')}>
      <div className="DocSearch-Modal">
        {tabsComponent}
        <header className="DocSearch-SearchBar">
          <input className="DocSearch-Input" ref={inputRef}/>
          <SearchInput
            inputRef={inputRef}
            onReset={onReset}
            onEnter={executeSearch}
          />
          {/*<SearchBox*/}
          {/*  {...autocomplete}*/}
          {/*  state={autocompleteState}*/}
          {/*  inputRef={inputRef}*/}
          {/*  autoFocus={true}*/}
          {/*/>*/}

        </header>

        <div className="DocSearch-Body">
          <div className="DocSearch-Dropdown">
            {searchResults && searchResults.length > 0 &&
              searchResults.map((item, index) => {
                return (
                  <div key={`so-result-${index}`} className="so-result">
                    <li>{JSON.stringify(item)}</li>
                    )}
                  </div>
                );
              })
            }
            {searchResults && searchResults.length === 0 &&
              <div><h1>No results</h1></div>
            }
            {!searchResults &&
              <div><h1>Search something</h1></div>
            }
          </div>
          <div className="DocSearch-Preview">

          </div>
        </div>
        <footer className="DocSearch-Footer">
          <Footer/>
        </footer>
      </div>
    </div>
  );
}
