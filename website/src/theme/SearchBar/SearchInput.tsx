import {LoadingIcon, ResetIcon, SearchIcon} from './DocSearch/icons';
import React, {useState} from 'react';

const MAX_QUERY_SIZE = 50;

export const SearchInput = ({
                            onReset,
                            inputRef,
                            query = '',
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
          ref={inputRef}
          autoFocus={autoFocus}
          maxLength={MAX_QUERY_SIZE}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onEnter(inputValue)}
        />

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
