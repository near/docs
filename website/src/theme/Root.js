// https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root

import React from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser'; // https://docusaurus.io/docs/advanced/ssg#useisbrowser
import Gleap from "gleap"; // See https://gleap.io/docs/javascript/ and https://app.gleap.io/projects/62697858a4f6850036ae2e6a/widget
import alogliaInsights from 'search-insights';
import { withRouter } from 'react-router-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const GLEAP_API_KEY = 'K2v3kvAJ5XtPzNYSgk4Ulpe5ptgBkIMv';

const PAGEVIEW_CONVERSION_TIME = 2 * 60 * 1000; // if user stayed this long on page, then it's a conversion

// Default implementation, that you can customize
function Root({ children, history }) {
    const isBrowser = useIsBrowser();
    const docusaurusContext = useDocusaurusContext();
    if (isBrowser) {
        Gleap.initialize(GLEAP_API_KEY);

        const algoliaConfig = docusaurusContext.siteConfig.themeConfig.algolia;
        let userToken;
        alogliaInsights('init', {
            appId: algoliaConfig.appId,
            apiKey: algoliaConfig.apiKey,
            useCookie: true,
        });
        alogliaInsights('getUserToken', null, (err, algoliaUserToken) => {
            if (err) {
                console.error(err);
                return;
            }
            userToken = algoliaUserToken;
        });
        let pageviewTimer;
        history.listen((location, action) => {
            if (userToken) {
                clearTimeout(pageviewTimer);
                alogliaInsights('viewedObjectIDs', {
                    eventName: 'pageview',
                    objectIDs: [`0-https://${window.location.hostname}${location.pathname}`],
                    userToken,
                    index: 'near',
                });
                pageviewTimer = setTimeout(() => {
                    alogliaInsights('convertedObjectIDs', {
                        eventName: 'page-attention',
                        objectIDs: [`0-https://${window.location.hostname}${location.pathname}`],
                        userToken,
                        index: 'near',
                    });
                  }, PAGEVIEW_CONVERSION_TIME);
            }
        });
    }
    return <>{children}</>;
}

export default withRouter(Root);