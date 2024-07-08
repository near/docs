// https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root
import '@near-wallet-selector/modal-ui/styles.css';

import React, { useEffect } from 'react';
import Gleap from "gleap"; // See https://gleap.io/docs/javascript/ and https://app.gleap.io/projects/62697858a4f6850036ae2e6a/widget
import { withRouter } from 'react-router-dom';
import { useHistory } from '@docusaurus/router';
import useIsBrowser from '@docusaurus/useIsBrowser'; // https://docusaurus.io/docs/advanced/ssg#useisbrowser


function Root({ children, location }) {
  const isBrowser = useIsBrowser();

  const history = useHistory();

  useEffect(() => {
    // pass message to dev.near.org (docs is embed there)
    const sendMessage = url => parent.postMessage({ type: 'urlChange', url }, 'https://dev.near.org/');
    sendMessage(location.pathname);

    const unlisten = history.listen(loc => sendMessage(loc.pathname));
    return () => { unlisten() };
  }, [history]);

  if (isBrowser) {
    const { initRudderAnalytics, recordPageView } = require('./scripts/rudderstack');

    Gleap.initialize('K2v3kvAJ5XtPzNYSgk4Ulpe5ptgBkIMv');

    const rudderAnalytics = initRudderAnalytics();
    recordPageView(rudderAnalytics, location.pathname);
  }

  return <>{children}</>;
}

const router = withRouter(Root);


export default router;