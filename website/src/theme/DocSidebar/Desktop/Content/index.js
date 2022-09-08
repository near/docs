import React, { useState } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useAnnouncementBar, useDocsVersion, useScrollPosition, } from '@docusaurus/theme-common/internal';
import { useHistory } from '@docusaurus/router';
import DocSidebarItems from '@theme/DocSidebarItems';
import useGlobalData from '@docusaurus/useGlobalData';


import styles from './styles.module.css';

function useShowAnnouncementBar() {
  const { isActive } = useAnnouncementBar();
  const [showAnnouncementBar, setShowAnnouncementBar] = useState(isActive);
  useScrollPosition(
    ({ scrollY }) => {
      if (isActive) {
        setShowAnnouncementBar(scrollY === 0);
      }
    },
    [isActive],
  );
  return isActive && showAnnouncementBar;
}

const Option = (props) => {
  return <components.Option {...props} />;
};

export default function DocSidebarDesktopContent({ path, sidebar, className }) {
  const history = useHistory();
  const globalData = useGlobalData();
  const currentVersion = useDocsVersion();
  const versions = globalData['docusaurus-plugin-content-docs'][currentVersion.pluginId].versions;
  const latestVersion = versions.find(v => v.isLast);
  const currentPath = versions.find(v => v.name === currentVersion.version).path

  const versionsDropdown = <select value={currentPath} style={{
    width: 'calc(100%)',
    margin: '20px 0',
    height: '2.5em',
    lineHeight: '2.5em',
    borderRadius: '4px',
    padding: '0.25em 10px',

  }} className={'versions'} onChange={e => {
    history.push(e.target.value);
  }}>
    {
      versions.filter(v => v.name !== '__dummy').map(v => {
        return <option value={v.path} className={v.name === currentVersion.version ? 'current-version' : undefined} key={v.name}>
          {v.name}{v.name === latestVersion.name ? ' (current)' : ''}
        </option>
      })
    }
  </select>
  const showAnnouncementBar = useShowAnnouncementBar();
  return (
    <nav
      className={clsx(
        'menu thin-scrollbar',
        styles.menu,
        showAnnouncementBar && styles.menuWithAnnouncementBar,
        className,
      )}>
      {versions.length > 1 && versionsDropdown}
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, 'menu__list')}>
        <DocSidebarItems items={sidebar} activePath={path} level={1} />
      </ul>
    </nav>
  );
}
