import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import {useHistory} from '@docusaurus/router';

export default function SearchBar() {
  const history = useHistory();
  const onKeyDown = e => {
    if (e.key === 'Enter') {
      const pathname = `/search`
      const query = e.target.value;
      history.push({
        pathname,
        search: `q=${query}`,
      });
    }
  }
  return (
    <div className={clsx(styles.searchBox, 'search-bar-box')}>
      <svg width='20' height='20' className={styles.searchIcon} viewBox='0 0 20 20'>
        <path d='M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z' stroke='currentColor' fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'></path>
      </svg>
      <input
        onKeyDown={onKeyDown}
        placeholder='Search'
        className={styles.searchInput} />
    </div>
  );
}