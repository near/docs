---
id: social
title: Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

At the core of NEAR social interactions there is the [SocialDB smart contract](https://github.com/NearSocial/social-db) (currently deployed at [social.near](https://nearblocks.io/address/social.near)).

NEAR provides a convenient API to get data from the SocialDB contract, composed by four methods:

- [`Social.get`](#socialget)
- [`Social.getr`](#socialgetr)
- [`Social.index`](#socialindex)
- [`Social.keys`](#socialkeys)
- [`Social.set`](#socialset)

---

## Social.get

`Social.get` fetches the data from the SocialDB contract by calling `get` and returns the data. While the data is fetching the returned value equals to `null`.

:::note
If the path pattern is a single key, it will try to unwrap the object until the first wildcard.
:::

The method takes up to 3 arguments:

 | param      | required     | type               | description                  |
 | ---------- | ------------ | ------------------ | ---------------------------- |
 | `patterns` | **required** | string / string[]  | the path pattern(s)          |
 | `finality` | _optional_   | `"final"` / number | the block height or finality |
 | `options`  | _optional_   | object             | the `options` object.        |

:::info options object

- `subscribe` _(optional)_: if true, the data will be refreshed every 5 seconds.
- `return_deleted` _(optional)_: whether to return deleted values (as `null`). Default is `false`.

:::

The block height or finality can be used to get the data at a specific block height or finality. If the block height or finality is not specified, the data will be fetched at the `optimistic` finality (the latest block height).

For block height and finality `final`, instead of calling the NEAR RPC directly, the VM uses the Social API Server to fetch the data. Social API server indexes the data for SocialDB and allows to fetch the data at any block height with additional options. It also allows returning more data than an RPC call because it's not restricted by the gas limit. In general, the API server also serves data faster than the NEAR RPC, because it doesn't execute the contract code in a virtual machine.

`Social.get` options are similar to the SocialDB's `get` API.

#### Examples

For example, if the path pattern is `mob.near/widget/*`, the `Social.get` will unwrap the object and return the following:

<Tabs>
<TabItem value="request" label="Request" default>


```js
const data = Social.get("mob.near/widget/*");
```

</TabItem>
<TabItem value="response" label="Response">

```json
{
  "HelloWorld": "return <div>Hello, World!</div>;",
  "HelloUsername": "return <div>Hello, {props.username}!</div>;"
}
```

</TabItem>
</Tabs>

If the path pattern is `mob.near/widget/HelloWorld`, the `Social.get` will unwrap the object and return the actual value:

<Tabs>
<TabItem value="request" label="Request" default>


```js
const data = Social.get("mob.near/widget/HelloWorld");
```

</TabItem>
<TabItem value="response" label="Response">

```json
"return <div>Hello, World!</div>;"
```

</TabItem>
</Tabs>

It's helpful that you don't have to manually unwrap object.

---

## Social.getr

`Social.getr` is just a wrapper helper for `Social.get`, it appends `**` to each of the path pattern.

 | param      | required     | type               | description                  |
 | ---------- | ------------ | ------------------ | ---------------------------- |
 | `patterns` | **required** | string / string[]  | the path pattern(s)          |
 | `finality` | _optional_   | `"final"` / number | the block height or finality |
 | `options`  | _optional_   | object             | the `options` object.        |

:::info options object

- `subscribe` _(optional)_: if true, the data will be refreshed every 5 seconds.
- `return_deleted` _(optional)_: whether to return deleted values (as `null`). Default is `false`.

:::

#### Examples

For example, if the path pattern is `mob.near/profile`, `Social.getr` will call `Social.get` with the path pattern `mob.near/profile/**`.

<Tabs>
<TabItem value="request" label="Request" default>


```js
const data = Social.getr("mob.near/profile");
```

</TabItem>
<TabItem value="response" label="Response">

```json
"return <div>Hello, World!</div>;"
```

</TabItem>
</Tabs>

---

## Social.keys

It calls the SocialDB's `keys` API and returns the data. While the data is fetching the returned value equals to `null`. The keys contract doesn't unwrap the object, so the returned data is the same as the SocialDB's `keys` API.

`Social.keys` takes up to 3 arguments:

 | param      | required     | type               | description                  |
 | ---------- | ------------ | ------------------ | ---------------------------- |
 | `patterns` | **required** | string / string[]  | the path pattern(s)          |
 | `finality` | _optional_   | `"final"` / number | the block height or finality |
 | `options`  | _optional_   | object             | the `options` object.        |

:::info options object

- `subscribe` _(optional)_: if true, the data will be refreshed every 5 seconds.
- `return_type` _(optional)_: either `"History"`, `"True"`, or `"BlockHeight"`. If not specified, it will return the `"True"`.
- `return_deleted` _(optional)_: whether to return deleted values (as `null`). Default is `false`.
- `values_only` _(optional)_: whether to return only values (don't include objects). Default is `false`.

:::

:::tip
The Social API server supports custom options `return_type: "History"`. For each matching key, it will return an array containing all the block heights when the value was changed in ascending order. It can be used for building a feed, where the values are overwritten.
:::

#### Examples

<Tabs>
<TabItem value="request" label="Request" default>

```js
const data = Social.keys(`${accountId}/post/meme`, "final", {
  return_type: "History",
});
```

</TabItem>
<TabItem value="response" label="Response">

```json
"return <div>Hello, World!</div>;"
```

</TabItem>
</Tabs>

---

## Social.index

Returns the array of matched indexed values. Ordered by `blockHeight`.

`Social.index` arguments:

 | param     | required     | type   | description                                                                                |
 | --------- | ------------ | ------ | ------------------------------------------------------------------------------------------ |
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

#### Examples

<Tabs>
<TabItem value="request" label="Request" default>

```js
return Social.index("test", "test-key-2");
```

```js
return Social.index("test", "test-key-2", {
  accountId: "mob.near"
});
```

```js
return Social.index("test", "test-key-2", {
  accountId: ["mob.near", "root.near"]
});
```

</TabItem>
<TabItem value="response" label="Response">

```json
[
    {
        "accountId": "mob.near",
        "blockHeight": 78672789,
        "value": "test-value-1"
    },
    {
        "accountId": "mob.near",
        "blockHeight": 78672797,
        "value": "test-value-1"
    },
    {
        "accountId": "mob.near",
        "blockHeight": 78672974,
        "value": "test-value-3"
    }
]
```

</TabItem>
</Tabs>

---

## Social.set

Takes a `data` object and commits it to SocialDB. It works similarly to the `CommitButton` by spawning the modal window prompt to save data, but it doesn't have to be triggered through the commit button component. It allows you to write more flexible code that relies on async promises and use other events and components. Overall it enables more flexibility when committing to SocialDB. For example, you can commit when Enter key pressed.

`Social.set` arguments:

 | param     | required     | type   | description                                                                                        |
 | --------- | ------------ | ------ | -------------------------------------------------------------------------------------------------- |
 | `data`    | **required** | object | the data object to be committed. Similar to `CommitButton`, it shouldn't start with an account ID. |
 | `options` | _optional_   | object | optional object.                                                                                   |

:::info options object

- `force` _(optional)_: whether to overwrite the data.
- `onCommit` _(optional)_: function to trigger on successful commit. Will pass the data that was written (including `accountID`).
- `onCancel` _(optional)_: function to trigger if the user cancels the commit.

:::

<details>

<summary > Ability to skip confirmation </summary>

When a modal window to confirm a commit is shown, it has a toggle to select whether you want to confirm the action every time, or don't show the confirm window for similar data.

By default for new data the toggle is set to on, which means the user will not be prompted to confirm the data for the next time. It remembers the decision locally and will be default to this decision next time (in case the user decides to not skip). If the user approves the commit with the toggle on, then the next commit with similar data will skip the confirmation window. The permission is given per widget source.

:::note
Similar data means the same top level keys on the data. Except for the 4 top level keys: `graph`, `post`, `index` and `settings`. For these keys, the second level key will be used. More keys can be added later, once new standards added.
:::

For example the follow button widget uses the following keys:
```json
{
    "graph": {
      "follow": ...
    },
    "index": {
      "graph": ...
      "notify": ...
    }
  }
```

If it attempts to modify something else, the confirmation modal will be shown again.

![saving data](https://user-images.githubusercontent.com/470453/205456503-7c0db525-7f61-4ead-8591-2b6d86065fa4.png)

</details>


#### Examples

Example on using `CommitButton` and `Social.set` with a regular button. Note, both use `force`

<Tabs>
<TabItem value="request" label="Request" default>

```js
State.init({ commitLoading: false });

const data = { experimental: { test: "test" } };

const Loading = (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

return (
  <div>
    <CommitButton force data={data}>
      CommitButton
    </CommitButton>
    <button
      disabled={state.commitLoading}
      onClick={() > {
        State.update({ commitLoading: true });
        Social.set(data, {
          force: true,
          onCommit: () => {
            State.update({ commitLoading: false });
          },
          onCancel: () => {
            State.update({ commitLoading: false });
          },
        });
      }}
    >
      {state.commitLoading && Loading}Social.set
    </button>
  </div>
);
```

</TabItem>
</Tabs>
