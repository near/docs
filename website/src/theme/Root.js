import React, { useEffect } from 'react';
import Gleap from 'gleap'; // See https://gleap.io/docs/javascript/ and https://app.gleap.io/projects/62697858a4f6850036ae2e6a/widget
import { withRouter } from 'react-router-dom';
import { useHistory, useLocation } from '@docusaurus/router';
import useIsBrowser from '@docusaurus/useIsBrowser'; // https://docusaurus.io/docs/advanced/ssg#useisbrowser
import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function initializeGleap() {
  if (typeof window !== "undefined") {
    const gleapSdkToken = "K2v3kvAJ5XtPzNYSgk4Ulpe5ptgBkIMv";
    // do not check newTab here. Submit code prior to calling this to determine if this is a new tab in the session.
    Gleap.initialize(gleapSdkToken);
    // NEAR-247: Sanitize open-url messages from Gleap
    Gleap.setUrlHandler((url, newTab) => {
      try {
        const parsed = new URL(url, window.location.href);
        if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
          console.warn(
            "Blocked invalid Gleap navigation to unsafe protocol:",
            parsed.protocol
          );
          return;
        }
        if (newTab) {
          window.open(parsed.href, "_blank")?.focus();
        } else {
          window.location.href = parsed.href;
        }
      } catch (e) {
        console.warn("Blocked invalid Gleap URL:", url, e);
      }
    });
  }
}

function Root({ children, location }) {
  const isBrowser = useIsBrowser();
  const history = useHistory();
  const currentLocation = useLocation();
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  useEffect(() => {
    // Pass message to dev.near.org (docs is embedded there)
    const sendMessage = (url) =>
      parent.postMessage({ type: 'urlChange', url }, 'https://dev.near.org/');
    sendMessage(location.pathname);

    const unlisten = history.listen((loc) => sendMessage(loc.pathname));
    return () => {
      unlisten();
    };
  }, [history]);

  useEffect(() => {
    // Initialize Gleap
    if (isBrowser) {
      initializeGleap();
    }

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

  useEffect(() => {
    if (!isBrowser) return;

    // Add click handlers to sidebar carets to also navigate to the linked page
    const handleSidebarCaretClick = () => {
      setTimeout(() => {
        // Find all collapsible sidebar items with links
        const collapsibleItems = document.querySelectorAll('.menu__list-item-collapsible');
        
        collapsibleItems.forEach(item => {
          const caret = item.querySelector('.menu__caret');
          const link = item.querySelector('.menu__link[href]');
          
          if (caret && link && !caret.hasAttribute('data-enhanced')) {
            caret.setAttribute('data-enhanced', 'true');
            
            caret.addEventListener('click', (e) => {
              // Allow default expand/collapse behavior
              // Also navigate to the linked page after a short delay
              setTimeout(() => {
                const href = link.getAttribute('href');
                                 if (href && href !== currentLocation.pathname) {
                   history.push(href);
                 }
               }, 150); // Small delay to let the expand animation start
             });
           }
         });
       }, 100);
     };

     // Initial setup
     handleSidebarCaretClick();

     // Re-run when navigation changes (in case sidebar re-renders)
     const unlisten = history.listen(() => {
       handleSidebarCaretClick();
     });

     return () => {
       unlisten();
     };
   }, [isBrowser, history, currentLocation]);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

const router = withRouter(Root);
export default router;
