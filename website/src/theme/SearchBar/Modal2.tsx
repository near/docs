import React from 'react';
import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch/lite';

import '@algolia/autocomplete-theme-classic';

const searchClient = algoliasearch(
  '0LUM67N2P2',
  '129d0f429e1bb0510f0261dda1e88ed4',
);

autocomplete({
  container: '#autocomplete',
  detachedMediaQuery: '',
  defaultActiveItemId: 0,
  getSources() {
    return [
      {
        sourceId: 'hits',
        getItems({ query }) {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: 'instant_search',
                query,
                params: {
                  hitsPerPage: 8,
                },
              },
            ],
          });
        },
        getItemUrl({ item }) {
          return item.url;
        },
        onActive({ item, setContext }) {
          console.log('onActive', item);
          setContext({ preview: item });
        },
        templates: {
          item({ item, components }) {
            return (
              <a className="aa-ItemLink" href={item.url}>
                <div className="aa-ItemContent">
                  <div className="aa-ItemIcon">
                    <img
                      src={item.image}
                      alt={item.name}
                      width="40"
                      height="40"
                    />
                  </div>
                  <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">
                      <components.Highlight hit={item} attribute="name" />
                    </div>
                  </div>
                </div>
              </a>
            );
          },
        },
      },
      {
        sourceId: 'suggestions',
        getItems({ query }) {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: 'instantsearch_query_suggestions',
                query,
                params: {
                  hitsPerPage: 4,
                },
              },
            ],
          });
        },
        onSelect({ item, setQuery, setIsOpen, refresh }) {
          console.log('onSelect', item);
          setQuery(`${item.query} `);
          setIsOpen(true);
          refresh();
        },
        templates: {
          header({ items, Fragment }) {
            if (items.length === 0) {
              return null;
            }

            return (
              <Fragment>
                <span className="aa-SourceHeaderTitle">
                  Can't find what you're looking for?
                </span>
                <div className="aa-SourceHeaderLine" />
              </Fragment>
            );
          },
          item({ item, components }) {
            return (
              <div className="aa-QuerySuggestion">
                <components.ReverseHighlight hit={item} attribute="query" />
              </div>
            );
          },
        },
      },
    ];
  },
  render({ children, state, Fragment, components }, root) {
    const { preview } = state.context;

    return <Fragment>
        <div className="aa-Grid">
          <div className="aa-Results aa-Column">{children}</div>
          <div className="aa-Preview aa-Column">
            <div className="aa-PreviewImage">
              <img src={preview.image} alt={preview.name} />
            </div>
            <div className="aa-PreviewTitle">
              <components.Highlight hit={preview} attribute="name" />
            </div>
            <div className="aa-PreviewPrice">${preview.price}</div>
            <div className="aa-PreviewDescription">
              <components.Highlight hit={preview} attribute="description" />
            </div>
          </div>
        </div>
      </Fragment>
  },
});
