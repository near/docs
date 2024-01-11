---
id: indexing
title: Social Indexer
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {WidgetEditor} from "@site/src/components/social-widget"

NEAR allows applications to index actions so they can be easily found later by other components.

For example, it is very useful to index all "comment" actions, so we can easily retrieve all the comments for a post.

---

## Indexing an Retrieving an Action

In order to index an action we need to add the `index` key to the data being saved, and set a `key` and `value` inside.

- The `key` will identify the indexed action within all `action`
- The `value` is the value to be indexed.

```js
{
  index: {
    action: JSON.stringify({ key, value })
  }
}
```

Which can then be retrieved using using `Social.index`

```js
Social.index( action, key, { limit: 10 } )
```

:::tip
Adding a `{ limit: 10 }` option to the `index` is important, otherwise it does not return a result
:::

---

## Simple Example

In this example, we simply index a `readDocs` action, if you execute it in the [NEAR Sandbox](https://near.org/sandbox) your action will be added to the docs.

```js
Social.set({
  index: {
    readDocs: JSON.stringify({
      key: "index docs",
      value: context.accountId,
    }),
  },
});
```

If you execute the code correctly, your name will appear here:

<WidgetEditor id='1' height="60px">

```js
return Social.index("readDocs", "index docs", {
  limit: 10,
});
```

</WidgetEditor>

---

## Like Example

In this example, `account.near` is liking a social post, and we are indexing this action so we can find it later.

##### Indexing the Action

You can execute this code in the [NEAR Sandbox](https://near.org/sandbox) to add a like to [this social post](https://near.org/near/widget/PostPage?accountId=mob.near&blockHeight=101496508)

```js
const key = {
  type: "social",
  path: "mob.near/post/main",
  blockHeight: 101496508,
};

Social.set({
  index: {
    like: JSON.stringify({
      key: key,
      value: { type: "like" },
    }),
  },
});
```

##### Retrieving Indexing Action
If you managed to execute the previous code, now you should have added a like to the post:

<WidgetEditor id='2' height="190px">

```js
  const key = {
    type: "social",
    path: "mob.near/post/main",
    blockHeight: 101496508
  }

  return Social.index(
    "like",
    key,
    {
      limit: 10,
      order: "desc",
      subscribe: true,
    }
  );
```

</WidgetEditor>