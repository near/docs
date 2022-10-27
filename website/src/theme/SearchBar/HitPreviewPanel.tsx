import {Highlight} from 'react-instantsearch-hooks-web';
import React from 'react';
import clsx from 'clsx';
import {Snippet} from './DocSearch/Snippet';

export const HitPreviewHeaders = ({hit}) => {
  if (!hit || !hit.headers) {
    return null;
  } else {
    const {headers, headersLevels} = hit;
    const levels = headersLevels.map(l => parseInt(l.replace(/h/g, '')));
    return(
      <div className="hit-preview-headers">
        <p>On this page</p>
        <ul>
          {headers.map((h, l) => <li className={
            clsx(
              `hit-preview-headers-${levels[l]}`,
              hit.type.indexOf('lvl') === 0
              // && parseInt(hit.type.replace('lvl', '')) === l + 1
              && hit.hierarchy[hit.type] === h
                ? 'highlighted' : null
            )}>{h}</li>)}
        </ul>
      </div>
    )
  }
}
export const HitPreviewPanel = ({hit}) => {
  if (!hit) {
    return (
      <div className="hit-preview-empty">
        Preview
      </div>
    )
  }
  const {
    title, description, content, hierarchy
  } = hit;
  console.log(hit);
  return (
    <div className="hit-preview-container">
      <p className={clsx(
        "hit-preview-title",
              hit.type === 'lvl1' ? "highlighted" : null
      )}>{title}</p>
      <p className="hit-preview-description">{description}</p>
      { content && content.trim() !== '' && (
        <div className={"hit-preview-content"}>
          <div className="hit-preview-dots">...</div>
          <Highlight hit={hit} attribute={'content'} />
          <div className="hit-preview-dots">...</div>
        </div>
      )}

      <HitPreviewHeaders hit={hit} />
    </div>
  )
}
