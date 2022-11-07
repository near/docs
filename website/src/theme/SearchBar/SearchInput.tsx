import {LoadingIcon, ResetIcon, SearchIcon} from './DocSearch/icons';
import React, {useState} from 'react';
import {EnterIcon} from './SoIcons';

const MAX_QUERY_SIZE = 50;

export const SearchInput = ({
  placeholder,
                            onReset,
                            inputRef,
                            query = '',
  onChange,
  onEnter,
  autoFocus = false,
                          }) => {
  const [inputValue, setInputValue] = useState('');
  return (
    <>
      <form
        className="DocSearch-Form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
        onReset={onReset}
      >
        <label className="DocSearch-MagnifierLabel">
          <SearchIcon />
        </label>

        <div className="DocSearch-LoadingIndicator">
          <LoadingIcon />
        </div>

        <input
          className="DocSearch-Input"
          placeholder={placeholder}
          ref={inputRef}
          autoFocus={autoFocus}
          maxLength={MAX_QUERY_SIZE}
          onChange={e => {
            setInputValue(e.target.value);
            onChange(e.target.value);
          }}
          onKeyDown={e => e.key === 'Enter' && onEnter(inputValue)}
        />
        <span className='so-search-enter'>
          Press Enter <EnterIcon />
        </span>
        <button
          type="reset"
          className="DocSearch-Reset"
          hidden={!query}
        >
          <ResetIcon />
        </button>
      </form>
    </>
  );
}
