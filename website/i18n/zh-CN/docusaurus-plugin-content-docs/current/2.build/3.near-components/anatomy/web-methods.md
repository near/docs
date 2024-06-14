---
id: web-methods
title: Web Browser Methods
---

import {WidgetEditor} from "@site/src/components/widget-editor"

NEAR Components have access to classic web methods that enable them to:

- [Fetch](#fetch) data from external sources.
- [Cache](#cache) values to avoid redundant computations.
- Use [LocalStorage](#localstorage) to store data in the web browser.
- Access to the [Clipboard](#clipboard).

---

## Fetch

`fetch` allows to fetch data from the URL. It acts like a hook. It's a wrapper around the `fetch` function from the browser behind the caching layer.

The possible returned values are:

- If the data is not cached, it returns `null` and fetches the data in the background.
- If the data is cached, it returns the cached value and then revalidates it.

<WidgetEditor height="80">

```js
const res = fetch("https://rpc.mainnet.near.org/status");

return res.body;
```

</WidgetEditor>

<hr className="subsection" />

#### Async Version

`asyncFetch` is the `async` version of [`fetch`](#fetch), meaning that it returns a promise instead of a value.

<WidgetEditor height="80">

```js
const [uptime, setUptime] = useState(null);

function reportUptime() {
  const promise = asyncFetch("https://rpc.mainnet.near.org/status")
  
  promise.then(
    res => { setUptime(res.body.uptime_sec) }
  );
}

return <>
  <p> {uptime? `Uptime: ${uptime}s` : `Fetch a value` } </p>
  <button onClick={reportUptime}>Fetch uptime</button>
</>
```

</WidgetEditor>

:::tip
In contrast with `fetch`, `asyncFetch` does **not** cache the resulting value, so it should only be used within a function to avoid frequent requests on every render.
:::

---

## Cache

The `useCache` hook takes a promise through a generator function, fetches the data and caches it. It can be used to easily use and cache data from async data sources.

The cache is global for the VM, but each cached element is identified by a unique `dataKey` within each component.

The possible values returned are:

- `null` if the cache is cold and data is fetching
- the `cached value` while the data is being fetched
- A new `value` if new data is fetched.

<WidgetEditor>

```js
const status = useCache(
  () =>
    asyncFetch("https://rpc.mainnet.near.org/status").then((res) => res.body),
  "mainnetRpcStatus",
  { subscribe: true }
);

return status;
```

</WidgetEditor>

<details markdown="1">
<summary> Parameters </summary>

| param              | required     | type   | description                                                                                             |
| ------------------ | ------------ | ------ | ------------------------------------------------------------------------------------------------------- |
| `promiseGenerator` | **required** | object | a function that returns a promise, which generates data.                                |
| `dataKey`          | **required** | object | the unique name (within the current component) to identify the data. |
| `options`          | _optional_   | object | optional argument.                                                                      |

:::info options object

- `subscribe` _(optional)_: if `true`, the data refreshes periodically by invalidating cache.

:::

:::note

- `promiseGenerator`: you don't return the promise directly, because it should only be fired once.
  :::

</details>

:::tip
:::tip
:::tip
The [fetch](#fetch) method is built on top of the `useCache` hook.
:::

:::note
The data is being cached and compared as JSON serialized objects.
:::

---

## LocalStorage

NEAR Components have access to a simulated `localStorage` through the `Storage` object:

- [`Storage.get`](#storageget)
- [`Storage.set`](#storageset)
- [`Storage.privateGet`](#storageprivateget)
- [`Storage.privateSet`](#storageprivateset)

<WidgetEditor>

```jsx
const [time, setTime] = useState(stored || Date.now()) 

const storeValue = () => {
  const date = Date.now();
  Storage.set('time_now', date)
}

return <>
  <p> Time Now: {Date.now()} </p>
  <p> Time Stored: {Storage.get('time_now')} </p>
  <button onClick={storeValue}>Store Date.now()</button>
</>
```

</WidgetEditor>

<details markdown="1">
<summary> Parameters </summary>

#### Storage.get

`Storage.get(key, widgetSrc?)` - returns the public value for a given key under the given widgetSrc or the current component if `widgetSrc` is omitted. Can only read public values.

| param       | required     | type   | description              |
| ----------- | ------------ | ------ | ------------------------ |
| `key`       | **required** | object | a user-defined key       |
| `widgetSrc` | _optional_   | object | a user-defined component |

---

#### Storage.set

`Storage.set(key, value)` - sets the public value for a given key under the current widget. The value will be public, so other widgets can read it.

| param   | required     | type   | description          |
| ------- | ------------ | ------ | -------------------- |
| `key`   | **required** | object | a user-defined key   |
| `value` | **required** | object | a user-defined value |

---

#### Storage.privateGet

`Storage.privateGet(key)` - returns the private value for a given key under the current component.

| param | required     | type   | description                                    |
| ----- | ------------ | ------ | ---------------------------------------------- |
| `key` | **required** | object | a user-defined key under the current component |

---

#### Storage.privateSet

`Storage.privateSet(key, value)` - sets the private value for a given key under the current component. The value is private, only the current component can read it.

:::note
Private and public values can share the same key and don't conflict.
:::

| param   | required     | type   | description                                    |
| ------- | ------------ | ------ | ---------------------------------------------- |
| `key`   | **required** | object | a user-defined key under the current component |
| `value` | **required** | object | a user-defined value                           |

</details>

---

## Clipboard

NEAR Components can **write** data to the system's clipboard through the `clipboard.writeText` method.

Writing to the clipboard is **only** allowed in **trusted actions**, for example, when the user clicks a button.

<WidgetEditor>

```js
const copyToClipboard = (test) => { clipboard.writeText("Hello World!") }

return <>
    <button onClick={copyToClipboard}> Copy </button>
    <textarea className="form-control mt-2" placeholder="Test pasting here" />
</>
```

</WidgetEditor>
