import React from 'react';
import clsx from 'clsx';

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

      </div>
    )
  }
  const {
    title, description, content, hierarchy
  } = hit;
  return (
    <div className="hit-preview-container">
      <p className={clsx(
        "hit-preview-title",
              hit.type === 'lvl1' ? "highlighted" : null
      )}>{title}</p>
      <p className="hit-preview-description">{description}</p>
      <HitPreviewHeaders hit={hit} key={hit.objectID} />
    </div>
  )
}
