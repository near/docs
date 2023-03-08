---
id: fetch
title: Fetch API
sidebar_label: Fetch
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## fetch

`fetch` is a global function that allows to fetch data from the URL. It acts like a hook. It's a wrapper around the `fetch` function from the browser behind the caching layer. It's useful for fetching data from the external APIs. It has the similar API as the browser's `fetch` function, but instead of a promise it returns a value. If the data is not cached, it returns `null` and fetches the data in the background. If the data is cached, it returns the cached value and then revalidates it.

```js
const res = fetch("https://rpc.mainnet.near.org/status");

return res.body;
```

## asyncFetch

To access the version that returns a promise, you can use `asyncFetch`. It doesn't cache the value, so it should only be used within a function to avoid frequent requests on every render.

```js
function reportUptime() {
  asyncFetch("https://rpc.mainnet.near.org/status").then((res) => {
    const uptime = res.body.uptime_sec;
    Near.call("uptime.near", "reportUptime", { uptime });
  });
}

return <button onClick={reportUptime}>Report Uptime</button>;
```

### Implementation Details

```javascript reference
https://github.com/NearSocial/VM/blob/f4d2cc8d0a27aee743d20dedb5f2a2f940530b18/src/lib/data/cache.js#L225-L264
```

### Example Usage

```js
const computeResults = (term) => {
  console.log("computeResults:", term);
  fetchAlgoliaData(term).then((res) => {
    const data = getCategoryResults(res.body);
    State.update({
      term,
      post: postWidgets(data["post"], "post"),
      comment: postWidgets(data["comment, post"], "comment"),
      profile: profileWidgets(data["profile"]),
    });
  });
};

const fetchAlgoliaData = (queryURI) => {
  let search_params = `query=${queryURI}`;
  return asyncFetch(API_URL, {
    body: `{ "params": "${search_params}" }`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Algolia-Api-Key": `${SEARCH_API_KEY}`,
      "X-Algolia-Application-Id": `${APPLICATION_ID}`,
    },
    method: "POST",
  });
};
```
