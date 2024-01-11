---
id: fetch
title: 가져오기
---

`fetch`는 URL에서 데이터를 가져올 수 있는 글로벌 함수입니다. 이는 훅처럼 작동합니다. 이는 캐싱 레이어 뒤에 있는 브라우저의 `fetch` 함수에 대한 래퍼입니다. 외부 API에서 데이터를 가져오는 데 유용합니다. 브라우저의 `fetch` 함수와 유사한 API를 가지고 있지만, Promise 대신 값을 반환합니다. 데이터가 캐시되지 않으면 `null`을 반환하고 백그라운드에서 데이터를 가져옵니다. 데이터가 캐시되면 캐시된 값을 반환한 다음 다시 검증합니다.

```js
const res = fetch("https://rpc.mainnet.near.org/status");

return res.body;
```

## asyncFetch

Promise를 반환하는 버전에 액세스하려면 `asyncFetch`를 사용할 수 있습니다. 값을 캐시하지 않으므로 모든 렌더에서 빈번한 요청을 방지하기 위해 함수 내에서만 사용해야 합니다.

```js
function reportUptime() {
  asyncFetch("https://rpc.mainnet.near.org/status").then((res) => {
    const uptime = res.body.uptime_sec;
    Near.call("uptime.near", "reportUptime", { uptime });
  });
}

return <button onClick={reportUptime}>Report Uptime</button>;
```

### 상세 구현 사항

```javascript reference
https://github.com/NearSocial/VM/blob/f4d2cc8d0a27aee743d20dedb5f2a2f940530b18/src/lib/data/cache.js#L225-L264
```

### 사용 예시

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
