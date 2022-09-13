import React from 'react';
import clsx from 'clsx';
import styles from './NotFoundBanner.module.css';

export default function NotFoundBanner({pathname}) {
  return (
    <div className={styles.searchBanner404}>
      <div>
        <div className={styles.searchBanner404Title}>
          <h1>404</h1>
          <h2>Not Found</h2>
        </div>
        <p>
          <code>{pathname}</code><br />
          We could not find what you were looking for<br />
          Try search
        </p>
      </div>
    </div>
  )
}