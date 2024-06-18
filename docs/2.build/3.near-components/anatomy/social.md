---
id: social
title: Social Interactions
---

import {WidgetEditor} from "@site/src/components/widget-editor"

:::warning What is the state of BOS (NEAR Components)?

We no longer recommend building on BOS due to its limited capabilities and discontinued security maintenance. Developers with active projects on BOS are encouraged to migrate to another deployment strategy.

See the [Web3 frontends](/build/web3-apps/frontend#bos-socialvm) section for more information.

:::

NEAR components can natively communicate with the [SocialDB smart contract](https://github.com/NearSocial/social-db) (currently deployed at [social.near](https://nearblocks.io/address/social.near)).

The `SocialDB` is a contract that stores `key-value` pairs, and is used mostly to store social-related data, such as `posts`, `likes`, or `profiles`.

:::tip
Besides user data, the `SocialDB` contract stores **all existing NEAR components**.
:::

---

## Social.get

`Social.get` queries a key from the SocialDB contract and returns the data. The key being queried can contain wildcards.

For example:

  - `alice.near/profile/**`  will match the entire profile data of account alice.near.
  - `alice.near/profile/*` will match all the fields of the profile, but not the nested objects.
  - `alice.near/profile/name` will match only the name field of the profile.
  - `*/widget/*` will match all the widgets of all the accounts.

<br />

<WidgetEditor>

```js
// Ask for the `profile` key of the influencer.testnet account
const profile = Social.get("influencer.testnet/profile/*");

// Ask a component from the influencer.testnet account
const widget = Social.get("influencer.testnet/widget/Greeter");

if(profile === null || widget === null) return "Loading ..."

return (
  <div>
    <p>Profile: {JSON.stringify(profile)}</p>
    <p>Widgets: {JSON.stringify(widget)} </p>
  </div>
);
```

</WidgetEditor>


<details markdown="1">
<summary> Parameters </summary>

| param      | required     | type               | description                  |
|------------|--------------|--------------------|------------------------------|
| `patterns` | **required** | string / string[]  | the path pattern(s)          |
| `finality` | _optional_   | `"final"` / number | the block height or finality |
| `options`  | _optional_   | object             | the `options` object.        |

:::info options object

- `subscribe` _(optional)_: if true, the data will be refreshed every 5 seconds.
- `return_deleted` _(optional)_: whether to return deleted values (as `null`). Default is `false`.

:::

The block height or finality can be used to get the data at a specific block height or finality.
If the block height or finality is not specified, the data will be fetched at the `optimistic` finality (the latest block height).

For block height and finality `final`, instead of calling the NEAR RPC directly, the VM uses the Social API Server to fetch the data.

Social API server indexes the data for SocialDB and allows to fetch the data at any block height with additional options.

It also allows returning more data than an RPC call because it's not restricted by the gas limit.
In general, the API server also serves data faster than the NEAR RPC, because it doesn't execute the contract code in a virtual machine.

</details>

:::tip
While the data is fetching, `Social.get` returns `null`.
:::


---

## Social.getr
`Social.getr` is just a wrapper helper for `Social.get`, it appends `**` to each of the path pattern.

<WidgetEditor>

```js
const profile = Social.getr("influencer.testnet/profile");

return (
  <div>
    <p>Profile: {JSON.stringify(profile)}</p>
  </div>
);
```

</WidgetEditor>

<details markdown="1">
<summary> Parameters </summary>

| param      | required     | type               | description                  |
|------------|--------------|--------------------|------------------------------|
| `patterns` | **required** | string / string[]  | the path pattern(s)          |
| `finality` | _optional_   | `"final"` / number | the block height or finality |
| `options`  | _optional_   | object             | the `options` object.        |

:::info options object

- `subscribe` _(optional)_: if true, the data will be refreshed every 5 seconds.
- `return_deleted` _(optional)_: whether to return deleted values (as `null`). Default is `false`.

:::

</details>

---

## Social.keys

The `keys` method allows to get the list of keys that match a pattern. It's useful for querying the data without reading values.

It also has an additional `options` field that can be used to specify the return type and whether to return deleted keys.

<WidgetEditor height="80">

```js
const data = Social.keys(`influencer.testnet/profile/*`, "final");

return JSON.stringify(data)
```

</WidgetEditor>

<details markdown="1">
<summary> Parameters </summary>

`Social.keys` takes up to 3 arguments:

| param      | required     | type               | description                  |
|------------|--------------|--------------------|------------------------------|
| `patterns` | **required** | string / string[]  | the path pattern(s)          |
| `finality` | _optional_   | `"final"` / number | the block height or finality |
| `options`  | _optional_   | object             | the `options` object.        |

:::info options object

- `subscribe` _(optional)_: if true, the data will be refreshed every 5 seconds.
- `return_type` _(optional)_: either `"History"`, `"True"`, or `"BlockHeight"`. If not specified, it will return the `"True"`.
- `return_deleted` _(optional)_: whether to return deleted values (as `null`). Default is `false`.
- `values_only` _(optional)_: whether to return only values (don't include objects). Default is `false`.

:::

</details>

:::tip
The Social API server supports custom options `return_type: "History"`. For each matching key, it will return an array containing all the block heights when the value was changed in ascending order.
It can be used for building a feed, where the values are overwritten. 
:::

---

## Social.set

Takes a `data` object and commits it to SocialDB. The data object can contain multiple keys, and each key can contain multiple values.

Importantly, a user can only commit to **their own** space in `SocialDB` (e.g. `alice.near` can only write in `alice.near/**`), except if [**given explicit permission**](https://github.com/NearSocial/social-db#permissions) by the owner of another space. 

Each time a user wants to commit data, they will be prompted to confirm the action. On confirming, the user can choose to not be asked again in the future.

<WidgetEditor>

```js
const onClick = () => {
  Social.set({
    post: {
      main: JSON.stringify({
        type: "md",
        text: "I've read the docs!"
      })
    }
  })
}

if(!context.accountId) return "Please login...";

return <>
  <p> Save a message showing some love to the NEAR Docs </p>
  <button onClick={onClick}> Save the Message </button>
</>
```

</WidgetEditor>

<details markdown="1">
<summary> Parameters </summary>

`Social.set` arguments:

 | param     | required     | type   | description                                                                                        |
 |-----------|--------------|--------|----------------------------------------------------------------------------------------------------|
 | `data`    | **required** | object | the data object to be committed. Similar to `CommitButton`, it shouldn't start with an account ID. |
 | `options` | _optional_   | object | optional object.                                                                                   |

:::info options object

- `force` _(optional)_: whether to overwrite the data.
- `onCommit` _(optional)_: function to trigger on successful commit. Will pass the
data that was written (including `accountID`).
- `onCancel` _(optional)_: function to trigger if the user cancels the commit.

:::

</details>

:::tip
By default `Social.set` will omit saving data that is already saved (e.g. if the user already liked a post, it won't save the like again). To force saving the data, pass the `force` option.
:::

---

## Social.index
NEAR Social readily provides an indexer - a service that listen to actions in SocialDB, and caches them so they can be retrieved without needing to interact with the contract.

The indexer is very useful, for example, to rapidly store and retrieve information on all comments for a post. Without the indexer, we would need to check all entries in the contract to see who answered, surely running out of GAS before completion.

<hr className="subsection" />

### Indexing an Action
To index an action we need to add the `index` key to the data being saved, within the `index` key we will save the `action` being indexed, alongside a `key` and a `value` that identifies this specific instance.

<WidgetEditor>

```js
// General form of an indexed action
// {
//   index: {
//     actionName: JSON.stringify({ key, value })
//   }
// }

const onClick = () => {
  Social.set({
    index: {
      readDocs: JSON.stringify({key: "docs", value: "like"})
    } ,
  })
}

return <>
  {context.accountId ?
  <>
    <p> Index an action showing some love to the NEAR Docs </p>
    <button onClick={onClick}> Index Action </button>
  </> :
  <p> Login to index an action </p>}
</>
```

</WidgetEditor>

In the example above we index a `docs` action. In this case the `action` is `docs`, and the `key` that identifies it is `"read"`.

<details markdown="1">

<summary> Standards </summary>

#### Indexing a Post
To index a post, the standard is to save the action `post`, with `{key: "main", value: {type: "md"}`.

```js
{
  index: {
    post: JSON.stringify({
      key: "main",
      value: {type: "md"}
    })
  }
}
```

#### Indexing a Like
To index a like, the standard is to save the action `like`, with `{key: object-representing-the-post, value: {type: "like" }}`

```js
{
  index: {
    like: JSON.stringify({
      key: {type: 'social', path: 'influencer.testnet/post/main', blockHeight: 152959480 },
      value: {type: "like"}})
  }
}
```

</details>

<hr className="subsection" />

### Retrieving Indexed Actions

To retrieve indexed actions we use the `Social.index` method. It takes the `action` and the `key` as arguments, and returns an array of all the indexed values alongside the `blockHeight` in which they were indexed, and which user made the action.


<WidgetEditor>

```js
const readDocs = Social.index("readDocs", "docs")

return <>
  <p> Number of indexed "readDocs" actions with key "docs": {readDocs.length} </p>

  <b>Indexed actions</b>
  {JSON.stringify(readDocs)}
</>
```

</WidgetEditor>


<details markdown="1">
<summary> Parameters </summary>

`Social.index` arguments:

 | param     | required     | type   | description                                                                                |
 |-----------|--------------|--------|--------------------------------------------------------------------------------------------|
 | `action`  | **required** | string | is the `index_type` from the standard, e.g. in the path `index/like` the action is `like`. |
 | `key`     | **required** | string | is the inner indexed value from the standard.                                              |
 | `options` | _optional_   | object | the `options` object.                                                                      |

:::info options object

- `subscribe` _(optional)_: if true, the data will be refreshed every 5 seconds.
- `accountId` _(optional)_: If given, it should either be a string or an array of account IDs to filter values by them. Otherwise, not filters by account Id.
- `order` _(optional)_: Either `asc` or `desc`. Defaults to `asc`.
- `limit` _(optional)_: Defaults to `100`. The number of values to return. Index may return more than index values, if the last elements have the same block height.
- `from` _(optional)_: Defaults to `0` or `Max` depending on order.

:::

</details>