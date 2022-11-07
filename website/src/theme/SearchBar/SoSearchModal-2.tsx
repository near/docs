import React, {useState, useRef, useCallback, useMemo} from 'react';
import {AutocompleteState, createAutocomplete} from '@algolia/autocomplete-core';
import { debounce } from "@algolia/autocomplete-shared";
import {AutocompleteApi} from '@algolia/autocomplete-core/dist/esm/types';

type SoItem = {
  url: string,
}

export function SoSearchModal() {
  // (1) Create a React state.
  const [autocompleteState, setAutocompleteState] = React.useState<AutocompleteState<SoItem>>({});
  const debouncedSetInstantSearchUiState = debounce(
    setAutocompleteState,
    2000
  );
  const autocomplete = React.useRef<AutocompleteApi<SoItem>>(
    createAutocomplete<SoItem>({
      id: 'so',
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          debouncedSetInstantSearchUiState({
            query: state.query
          });
        }
      },
      getSources() {
        return [{
          sourceId: 'so-source',
          async getItems<SoItem>({query, state}) {
            return [
              {url: '1'},
              {url: '2'},
              {url: '155'},
            ]
          }
        }]
      }
      // getSources() {
      //   return [
      //     {
      //       getInputValue: ({ suggestion }) => suggestion.query,
      //       getSuggestions({ query }) {
      //
      //       },
      //     },
      //   ];
      // },
    })
  ).current;

  return (
    <div {...autocomplete.getRootProps({})}>
      <input {...autocomplete.getInputProps({})} />
      <div {...autocomplete.getDropdownProps({})}>
        {autocompleteState.isOpen &&
          autocompleteState.suggestions.map((suggestion, index) => {
            const { source, items } = suggestion;

            return (
              <section
                key={`result-${index}`}
                className="algolia-autocomplete-suggestions"
              >
                {items.length > 0 && (
                  <ul {...autocomplete.getMenuProps()}>
                    {items.map((item, index) => {
                      return (
                        <li
                          key={`item-${index}`}
                          className="algolia-autocomplete-suggestions-item"
                          {...autocomplete.getItemProps({
                            item,
                            source,
                          })}
                        >
                          {item.query}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>
            );
          })}
      </div>
    </div>
  );
}
