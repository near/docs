import React from 'react';
import clsx from 'clsx';
import { HtmlClassNameProvider, } from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import styles from './styles.module.css';
import GoogleSearch from '../../components/GoogleSearch';

export default function SearchPage() {
  return (
    <HtmlClassNameProvider className="search-page-wrapper">
      <Layout title="Search NEAR Docs">
        <div className={clsx('container', 'margin-vert--lg', styles.pageContainer)}>
          <h1>Search the documentation</h1>
          <GoogleSearch />
        </div>
      </Layout>
      );
    </HtmlClassNameProvider>
  );
}
