import React, { useEffect } from 'react';
import clsx from 'clsx';
import Head from '@docusaurus/Head';
import {useLocation, useHistory} from '@docusaurus/router';
import Layout from '@theme/Layout';
import NotFoundBanner from '../components/NotFoundBanner';
import GoogleSearch from '../components/GoogleSearch';

export default function NotFound() {
  const {pathname, search} = useLocation();
  const history = useHistory();
  const query = pathname.replace(/[\/-]/g, ' ').trim();
  if (search.indexOf('q=') === -1) {
    useEffect(() => {
      history.replace({
        pathname,
        search: `${search}${search.length > 0 ? '&' : ''}q=${query}`,
      });
    }, []);
  }

  // return <Redirect to={`/404search?q=${query}`} />
  return (
    <Layout title='Search not found content'>
    <Head>
      <meta name='robots' content='noindex, nofollow' />
    </Head>
    <div className={clsx('container', 'margin-vert--lg')}>
      <NotFoundBanner pathname={pathname} />
      <GoogleSearch />
    </div>
  </Layout>);
}