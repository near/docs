import React, {useState, useRef, useCallback, useMemo} from 'react';
import clsx from 'clsx';
import {DocSearchModal} from './DocSearch';
import {SoSearchModal} from './SoSearchModal';

export const DocSearchTabs = ({activeSearchSource, setActiveSearchSource}) => {
  return (<div className="doc-search-tabs">
    <div className={clsx('doc-search-tab', 'doc-search-tab-near', {
      active: activeSearchSource === 'docs'
    })}
         onClick={() => setActiveSearchSource('docs')}>
      NEAR Docs
    </div>
    <div className={clsx('doc-search-tab', 'doc-search-tab-near', {
      active: activeSearchSource === 'so'
    })}
         onClick={() => setActiveSearchSource('so')}>
      StackOverflow
    </div>
  </div>);
}

export const SoSearch = ({}) => {

}

export function CustomDocSearchModal(props) {
  const [activeSearchSource, setActiveSearchSource] = React.useState<'docs' | 'so'>('docs');
  const tabsComponent = <DocSearchTabs {...{
    setActiveSearchSource,
    activeSearchSource
  }}/>
  const modalComponent = activeSearchSource === 'docs' ? <DocSearchModal {...props}
                                                                         tabsComponent={tabsComponent}/>
    : <SoSearchModal tabsComponent={tabsComponent}/>
  return modalComponent;
}
