import React from 'react';
import clsx from 'clsx';
import {useScript} from './utils';
import styles from './GoogleSearch.module.css';

export default function GoogleSearch() {
  useScript(`https://cse.google.com/cse.js?cx=b5812a4558798489f`);
  return (

    <div id='google-search-wrap' className={clsx(
      styles.googleSearch,
    )}>
      <div className='gcse-search'></div>
    </div>
  );
}