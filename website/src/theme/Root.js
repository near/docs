import React, { useEffect } from 'react';
import Gleap from "gleap"; // See https://gleap.io/docs/javascript/ and https://app.gleap.io/projects/62697858a4f6850036ae2e6a/widget
import { withRouter } from 'react-router-dom';
import { useHistory } from '@docusaurus/router';
import useIsBrowser from '@docusaurus/useIsBrowser'; // https://docusaurus.io/docs/advanced/ssg#useisbrowser
import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function initializeGleap(url, newTab) {
    if (typeof window !== 'undefined') {
        const gleapSdkToken = 'K2v3kvAJ5XtPzNYSgk4Ulpe5ptgBkIMv';
        if (!newTab) {
            newTab = false;
        }
        if (gleapSdkToken && url && newTab) {
            Gleap.initialize(gleapSdkToken);
            // NEAR-247: Sanitize open-url messages from Gleap
            Gleap.setUrlHandler((url, newTab) => {
                try {
                    const parsed = new URL(url, window.location.href);
                    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
                        console.warn('Blocked invalid Gleap navigation to unsafe protocol:', parsed.protocol);
                        return;
                    }
                    if (newTab) {
                        window.open(parsed.href, '_blank')?.focus();
                    } else {
                        window.location.href = parsed.href;
                    }
                } catch (e) {
                    console.warn('Blocked invalid Gleap URL:', url, e);
                }
            });
        }
    }
}

function isNewTab() {
    // Check if this is a new tab in the session
    let newTab = false;
    if (typeof window !== 'undefined') {
      if (!sessionStorage.getItem('docs_tab_opened')) {
        sessionStorage.setItem('docs_tab_opened', 'true');
        return newTab = true;
      }
    }
    return newTab;
};

function Root({ children, location }) {
  const isBrowser = useIsBrowser();
  const history = useHistory();
  const { siteConfig: {customFields} } = useDocusaurusContext();

  useEffect(() => {
    // Pass message to dev.near.org (docs is embedded there)
    const sendMessage = url => parent.postMessage({ type: 'urlChange', url }, 'https://dev.near.org/');
    sendMessage(location.pathname);

    const unlisten = history.listen(loc => sendMessage(loc.pathname));
    return () => { unlisten() };
  }, [history]);

  useEffect(() => {
    const newTab = isNewTab();

    // Initialize Gleap
    initializeGleap(location.pathname, newTab);

    // Initialize PostHog
    posthog.init(customFields.REACT_APP_PUBLIC_POSTHOG_KEY, {
      api_host: customFields.REACT_APP_PUBLIC_POSTHOG_HOST,
    });

    // Track initial page view
    posthog.capture('$pageview');

    // Track page views on route changes
    history.listen((location) => {
      posthog.capture('$pageview', { path: location.pathname });
    });
  }, [isBrowser, history]);

  return (
    <PostHogProvider client={posthog}>
      {children}
    </PostHogProvider>
  );
}

const router = withRouter(Root);
export default router;
