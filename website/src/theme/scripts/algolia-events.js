import alogliaInsights from 'search-insights';

let wasSetup = false;
export const setupAlgoliaEvents = (docusaurusContext, history) => {
  if (wasSetup) {
    return;
  }
  wasSetup = true;
  const debug = (...things) => {
    if (localStorage && localStorage.DEBUG_EVENTS) {
      console.log('DEBUG_EVENTS', ...things);
    }
  }
  const timers = [[null, 30 * 1000, '30'], [null, 60 * 1000, '60'], [null, 90 * 1000, '90'], [null, 120 * 1000, '120']];

  const sendEvent = (eventType, eventName) => {
    const props = {
      eventName: eventName,
      objectIDs: [`0-https://${window.location.hostname}${location.pathname}`],
      userToken,
      index: 'near',
    };
    alogliaInsights(eventType, props);
    debug('SEND ALGOLIA EVENT', props);
  }
  const setupEventTimers = () => {
    debug('SETUP TIMERS');
    timers.forEach(([timer]) => clearTimeout(timer));
    timers.forEach((_, i) => {
      clearTimeout(timers[i][0]);
      timers[i][0] = setTimeout(() => {
        debug('TIMER FIRED', timers[i]);
        sendEvent('convertedObjectIDs', `page-attention-${timers[i][2]}`);
      }, timers[i][1]);
    })
  }
  const sendPageview = () => sendEvent('viewedObjectIDs', 'pageview');
  const algoliaConfig = docusaurusContext.siteConfig.themeConfig.algolia;
  let userToken;
  alogliaInsights('init', {
    appId: algoliaConfig.appId,
    apiKey: algoliaConfig.apiKey,
    useCookie: true,
  });
  alogliaInsights('getUserToken', null, (err, algoliaUserToken) => {
    if (err) {
      debug('getUserToken error', err);
      return;
    }
    userToken = algoliaUserToken;
    debug('userToken', userToken);
    sendPageview();
    setupEventTimers();
  });
  history.listen((location, action) => {
    debug('HISTORY EVENT', location, action);
    if (userToken) {
      sendPageview();
      setupEventTimers();
    }
  });
}