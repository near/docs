// https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root
import '@near-wallet-selector/modal-ui/styles.css';

import React from 'react';
import Gleap from "gleap"; // See https://gleap.io/docs/javascript/ and https://app.gleap.io/projects/62697858a4f6850036ae2e6a/widget
import { withRouter } from 'react-router-dom';
import useIsBrowser from '@docusaurus/useIsBrowser'; // https://docusaurus.io/docs/advanced/ssg#useisbrowser
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import { useInitWallet } from '@theme/scripts/wallet-selector';

function Root({ children, location, history }) {
    useInitWallet({ createAccessKeyFor: 'v1.social08.testnet', networkId: 'testnet' });
    const isBrowser = useIsBrowser();
    const docusaurusContext = useDocusaurusContext();
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