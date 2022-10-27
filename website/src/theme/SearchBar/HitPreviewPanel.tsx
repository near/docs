import {Highlight} from 'react-instantsearch-hooks-web';
import React from 'react';

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
          {headers.map((h, l) => <li className={`hit-preview-headers-${levels[l]}`}>{h}</li>)}
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
    title, description, content, headers, headersLevels, hierarchy
  } = hit;
  return (
    <div className="hit-preview-container">
      <p className="hit-preview-title">{title}</p>
      <p className="hit-preview-description">{description}</p>
      { content && content.trim() !== '' && (
        <p className={"hit-preview-content"}>
          ...<br />
          <Highlight hit={hit} attribute={'content'} />
          <br />...
        </p>
      )}

      <HitPreviewHeaders hit={hit} />
    </div>
  )
}
