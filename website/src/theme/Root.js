import React, { useEffect } from 'react';
import Gleap from 'gleap'; // See https://gleap.io/docs/javascript/ and https://app.gleap.io/projects/62697858a4f6850036ae2e6a/widget
import { withRouter } from 'react-router-dom';
import { useHistory, useLocation } from '@docusaurus/router';
import useIsBrowser from '@docusaurus/useIsBrowser'; // https://docusaurus.io/docs/advanced/ssg#useisbrowser
import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// wallet selector
import '@near-wallet-selector/modal-ui/styles.css';
import { setupBitteWallet } from '@near-wallet-selector/bitte-wallet';
// import { setupEthereumWallets } from '@near-wallet-selector/ethereum-wallets';
// import { wagmiConfig, web3Modal } from '@/eth-wallets/adapter';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
import { setupHotWallet } from '@near-wallet-selector/hot-wallet';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupNightly } from '@near-wallet-selector/nightly';
import { WalletSelectorProvider } from '@near-wallet-selector/react-hook';
import { setupSender } from '@near-wallet-selector/sender';

const networkId = 'testnet';

const walletSelectorConfig = {
  network: networkId,
  modules: [
    // setupEthereumWallets({ wagmiConfig, web3Modal, alwaysOnboardDuringSignIn: true }),
    setupMeteorWallet(),
    setupBitteWallet(),
    setupHotWallet(),
    setupHereWallet(),
    setupSender(),
    setupNightly(),
    setupLedger(),
  ],
};


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



  return (
    <PostHogProvider client={posthog}>
      <WalletSelectorProvider config={walletSelectorConfig}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </WalletSelectorProvider>
    </PostHogProvider>
  );
}

const router = withRouter(Root);
export default router;
