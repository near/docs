import React from 'react';
import clsx from 'clsx';
import {DocSearchModal} from './DocSearch';
import {SoSearchModal} from './SoSearchModal';
import {SoLogo} from './SoIcons';

export const DocSearchTabs = ({activeSearchSource, setActiveSearchSource}) => {
  return (<div className="doc-search-tabs">
    <div className={clsx('doc-search-tab', 'doc-search-tab-near', {
      active: activeSearchSource === 'docs'
    })}
         onClick={() => setActiveSearchSource('docs')}>
      NEAR Docs
    </div>
    <div className={clsx('doc-search-tab', 'doc-search-tab-so', {
      active: activeSearchSource === 'so'
    })}
         onClick={() => setActiveSearchSource('so')}>
      <SoLogo/>
    </div>
  </div>);
}

export function CustomDocSearchModal(props) {
  const [activeSearchSource, setActiveSearchSource] = React.useState<'docs' | 'so'>('docs');
  const [activeQuery, setActiveQuery] = React.useState(null);
  const tabsComponent = <DocSearchTabs {...{
    setActiveSearchSource,
    activeSearchSource
  }}/>
  const modalComponent = activeSearchSource === 'docs'
    ? <DocSearchModal {...props} tabsComponent={tabsComponent} onQueryChange={setActiveQuery} initialQuery={activeQuery} />
    : <SoSearchModal {...props} tabsComponent={tabsComponent} onQueryChange={setActiveQuery}  initialQuery={activeQuery} />
  return modalComponent;
}
