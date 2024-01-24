import { nanoid } from 'nanoid';
import { createHash } from 'crypto';
import { get, split, truncate } from 'lodash';
import { RudderAnalytics } from '@rudderstack/analytics-js';

export function initRudderAnalytics() {
  const rudderAnalytics = new RudderAnalytics();
  window.rudderanalytics = rudderAnalytics;
  rudderAnalytics.load("2bP8Ev07SiL1ABLXhcru4JZQ5Uh", "https://near.dataplane.rudderstack.com", {});
  rudderAnalytics.setAnonymousId(getAnonymousId());
  return rudderAnalytics;
}

export function recordPageView(rudderAnalytics, pageName) {
  console.log("Trying to record", pageName);
  try {
    rudderAnalytics.page('category', pageName, {
      hashId: localStorage.getItem('hashId'),
      url: filterURL(window.location.href),
      ref: filterURL(document.referrer),
    });
    console.log("Recorded", pageName);
  } catch (e) {
    console.log("Failed to record", pageName);
    console.error(e);
  }
}

// let rudderAnalytics = null;
// let hashId = '';
// let pendingEvents = [];

// export function setAccountIdHash(accountId) {
//   const hash = createHash('sha512');
//   hash.update(accountId);
//   hashId = hash.digest('hex');
//   localStorage.setItem('hashId', hashId);
// }

export function getAnonymousId() {
  const storageId = localStorage.getItem('anonymousUserId');

  if (storageId) {
    console.log("Existing storageId", storageId);
    return storageId;
  }

  console.log("Creating new storageId");
  const anonymousUserId = nanoid();
  const anonymousUserIdCreatedAt = new Date().toUTCString();
  localStorage.setItem('anonymousUserId', anonymousUserId);
  localStorage.setItem('anonymousUserIdCreatedAt', anonymousUserIdCreatedAt);

  return anonymousUserId;
}

function isStringAllowed(str) {
  const denyList = ['account_id', 'public_key', 'all_keys', 'publicKey', 'apiKey', 'accountId', 'email'];
  return !str || !denyList.some((param) => str.indexOf(param) !== -1);
}

function filterURL(url) {
  const [urlTrim, params] = split(url, '?');
  return isStringAllowed(params) ? url : urlTrim;
}


// const record = (eventType, e) => {
//   const key = get(e.target, 'placeholder', get(e.target, 'innerText', get(e.target, 'href')));
//   recordEventWithProps(eventType, {
//     element: truncate(key, { length: 255 }),
//     url: e.target ? filterURL(e.target.baseURI) : '',
//     xPath: getXPath(e.target),
//     componentSrc: getComponentName(e.target),
//   });
// };

// export const recordClick = (e) => record('click', e);
// export const recordMouseEnter = (e) => record('mouseover', e);
// export const recordTouchStart = (e) => record('touchstart', e);

// export function recordWalletConnect(accountId) {
//   if (!localStorage.getItem('hashId')) {
//     setAccountIdHash(accountId);
//     recordEvent('wallet-connected');
//   }
// }

// export function reset() {
//   if (!rudderAnalytics) return;
//   try {
//     recordEvent('wallet-logout');
//     localStorage.removeItem('hashId');
//     localStorage.removeItem('anonymousUserId');
//     localStorage.removeItem('anonymousUserIdCreatedAt');
//     rudderAnalytics.reset();
//   } catch (e) {
//     console.error(e);
//   }
// }

// export function recordEventWithProps(eventLabel, properties) {
//   if (!rudderAnalytics) return;
//   try {
//     rudderAnalytics.track(eventLabel, {
//       ...properties,
//       hashId: localStorage.getItem('hashId'),
//       anonymousUserIdCreatedAt,
//     });
//   } catch (e) {
//     console.error(e);
//   }
// }

// export function recordEvent(eventLabel) {
//   if (!rudderAnalytics) return;
//   try {
//     rudderAnalytics.track(eventLabel, {
//       hashId: localStorage.getItem('hashId'),
//       url: window.location.href,
//       anonymousUserIdCreatedAt,
//     });
//   } catch (e) {
//     console.error(e);
//   }
// }

// function getComponentName(element) {
//   if (!element) return '';
//   if (element.hasAttribute('data-component')) return element.getAttribute('data-component') || '';
//   return '';
// }

// function getXPath(element) {
//   if (!element) return '';
//   if (element.id !== '') return 'id("' + element.id + '")';
//   if (element === document.body) return element.tagName;

//   let ix = 0;
//   const siblings = element.parentNode?.children;
//   if (!siblings) return '';

//   for (let i = 0; i < siblings.length; i++) {
//     const sibling = siblings[i];
//     if (sibling === element) return getXPath(element.parentElement) + '/' + element.tagName + '[' + (ix + 1) + ']';
//     if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
//   }

//   return '';
// }