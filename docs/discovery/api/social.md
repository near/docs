---
id: social
title: Social API
sidebar_label: Social
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

VM provides a convenient API to get data from the SocialDB contract. There are four methods:
- [`Social.get`](#socialget)
- [`Social.getr`](#socialgetr)
- [`Social.keys`](#socialkeys)
- [`Social.index`](#socialindex)

## Social.get

`Social.get` fetches the data from the SocialDB contract by calling `get` and returns the data.
While the data is fetching the returned value equals to `null`.

:::note
If the path pattern is a single key, it will try to unwrap the object until the first wildcard.
:::

The method takes up to 3 arguments:

 | param      |  required     | type               | description                                                           |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
 | `patterns`      |  **required** | string / string[]   | the path pattern(s)  |
 | `finality`      |  _optional_ | `"final"` / number   | the block height or finality  |
 | `options`   |  _optional_ | object   | the `options` object:<br/>- `subscribe` _(optional)_: if true, the data will be refreshed every 5 seconds.<br/>- `return_deleted` _(optional)_: whether to return deleted values (as `null`). Default is `false`.  |

The block height or finality can be used to get the data at a specific block height or finality.
If the block height or finality is not specified, the data will be fetched at the `optimistic` finality (the latest block height).

For block height and finality `final`, instead of calling the NEAR RPC directly, the VM uses the Social API Server to fetch the data.
Social API server indexes the data for SocialDB and allows to fetch the data at any block height with additional options.
It also allows returning more data than an RPC call because it's not restricted by the gas limit.
In general, the API server also serves data faster than the NEAR RPC, because it doesn't execute the contract code in a virtual machine.

`Social.get` options are similar to the SocialDB's `get` API.

### Examples

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

 | param      |  required     | type               | description                                                           |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
 | `patterns`      |  **required** | string / string[]   | the path pattern(s)  |
 | `finality`      |  _optional_ | `"final"` / number   | the block height or finality  |
 | `options`   |  _optional_ | object   | the `options` object:<br/>- `subscribe` _(optional)_: if true, the data will be refreshed every 5 seconds.<br/>- `return_deleted` _(optional)_: whether to return deleted values (as `null`). Default is `false`.  |


### Examples

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

It calls the SocialDB's `keys` API and returns the data. While the data is fetching the returned value equals to `null`.
The keys contract doesn't unwrap the object, so the returned data is the same as the SocialDB's `keys` API.

`Social.keys` takes up to 3 arguments:

 | param      |  required     | type               | description                                                           |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
 | `patterns`      |  **required** | string / string[]   | the path pattern(s)  |
 | `finality`      |  _optional_ | `"final"` / number   | the block height or finality  |
 | `options`   |  _optional_ | object   | the `options` object:<br/>- `subscribe` _(optional)_: if true, the data will be refreshed every 5 seconds.<br/>- `return_type` _(optional)_: either `"History"`, `"True"`, or `"BlockHeight"`. If not specified, it will return the `"True"`.<br/>- `return_deleted` _(optional)_: whether to return deleted values (as `null`). Default is `false`.<br/>- `values_only` _(optional)_: whether to return only values (don't include objects). Default is `false`.  |

:::tip
The Social API server supports custom options `return_type: "History"`. For each matching key, it will return an array containing all the block heights when the value was changed in ascending order.
It can be used for building a feed, where the values are overwritten. 
:::

### Examples

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

 | param      |  required     | type               | description                                                           |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
 | `action`      |  **required** | string   | is the `index_type` from the standard, e.g. in the path `index/like` the action is `like`.  |
 | `key`      |  **required** | string   | is the inner indexed value from the standard.  |
 | `options`   |  _optional_ | object   | the `options` object:<br/>- `subscribe` _(optional)_: if true, the data will be refreshed every 5 seconds.<br/>- `accountId` _(optional)_: If given, it should either be a string or an array of account IDs to filter values by them. Otherwise, not filters by account Id.<br/>- `order` _(optional)_: Either `asc` or `desc`. Defaults to `asc`.<br/>- `limit` _(optional)_: Defaults to `100`. The number of values to return. Index may return more than index values, if the last elements have the same block height.<br/>- `from` _(optional)_: Defaults to `0` or `Max` depending on order.  |


### Examples

<Tabs>
<TabItem value="request" label="Request" default>

```jsx
return Social.index("test", "test-key-2");
```

```jsx
return Social.index("test", "test-key-2", {
  accountId: "mob.near"
});
```

```jsx
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
