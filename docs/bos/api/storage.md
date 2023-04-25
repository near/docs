---
id: storage
title: Storage API
sidebar_label: Storage
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Storage

`Storage` object to store data for components that is persistent across refreshes. Simulates `localStorage` access. It has 4 methods:

- [`Storage.get`](#storageget)
- [`Storage.set`](#storageset)
- [`Storage.privateGet`](#storageprivateget)
- [`Storage.privateSet`](#storageprivateset)

## Storage.get

`Storage.get(key, widgetSrc?)` - returns the public value for a given key under the given widgetSrc or the current component if `widgetSrc` is omitted. Can only read public values.

 | param      |  required     | type               | description                                                           |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
 | `key`      |  **required** | object   | a user-defined key  |
 | `widgetSrc`  |  _optional_ | object   | a user-defined component  |

### Examples

<Tabs>
<TabItem value="request" label="Request" default>

```jsx
const notificationFeedSrc = "mob.near/widget/NotificationFeed";

const lastBlockHeight = Storage.get("lastBlockHeight", notificationFeedSrc);
```

</TabItem>
<TabItem value="response" label="Response">

```json
// the value for the "lastBlockHeight" key under the
// 'mob.near/widget/NotificationFeed' widget is retrieved
```

</TabItem>
</Tabs>


:::tip
See a full example in the [NotificationButton source code](https://near.social/#/mob.near/widget/WidgetSource?src=mob.near/widget/NotificationButton).
:::

---

## Storage.set

`Storage.set(key, value)` - sets the public value for a given key under the current widget. The value will be public, so other widgets can read it.

 | param      |  required     | type               | description                                                           |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
 | `key`      |  **required** | object   | a user-defined key  |
 | `value`    |  **required** | object   | a user-defined value  |


### Examples

<Tabs>
<TabItem value="request" label="Request" default>

```jsx
const accountId = context.accountId;

const notifications = Social.index("notify", accountId, {
  order: "desc",
  limit: 100,
  subscribe: true,
});

Storage.set("lastBlockHeight", notifications[0].blockHeight);
```

</TabItem>
<TabItem value="response" label="Response">

```json
// the "lastBlockHeight" key is set to the value from notifications[0].blockHeight
```

</TabItem>
</Tabs>

:::tip
See a full example in the [NotificationFeed source code](https://near.social/#/mob.near/widget/WidgetSource?src=mob.near/widget/NotificationFeed).
:::

---

## Storage.privateGet

`Storage.privateGet(key)` - returns the private value for a given key under the current component.

 | param      |  required     | type               | description                                                           |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
 | `key`      |  **required** | object   | a user-defined key under the current component  |

### Examples

<Tabs>
<TabItem value="request" label="Request" default>

```jsx
const mySecretData = Storage.privateGet("secretKey");
```

</TabItem>
<TabItem value="response" label="Response">

```json
// the current value of 'secretKey' is retrieved from private storage
```

</TabItem>
</Tabs>

---

## Storage.privateSet

`Storage.privateSet(key, value)` - sets the private value for a given key under the current component. The value is private, only the current component can read it.

:::note
Private and public values can share the same key and don't conflict.
:::

 | param      |  required     | type               | description                                                           |
 |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
 | `key`      |  **required** | object   | a user-defined key under the current component |
 | `value`    |  **required** | object   | a user-defined value  |

### Examples

<Tabs>
<TabItem value="request" label="Request" default>

```jsx
Storage.privateSet("secretKey", "my-secret-value");
```

</TabItem>
<TabItem value="response" label="Response">

```json
// "my-secret-value" is privately stored under 'secretKey'
```

</TabItem>
</Tabs>
