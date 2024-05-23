---
id: notifications
title: Social Notifications
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {WidgetEditor} from "@site/src/components/widget-editor"

Applications such as [NEAR Social](https://near.social) and the [NEAR Dev Portal](https://dev.near.org/) allow components to send notifications to their users.

Notifications are great to inform users in real time that something has happened, and can be [easily incorporated into any web app](../../../3.tutorials/near-components/push-notifications.md).

---

## Sending Notifications 

Notifications are implemented as a particular case of [indexed actions](./social.md#socialindex).

This means that to send a notification we just need to `index` the `notify` action for the indexer, with a `key` and a `value`.

- The `key` tells **which account** to notify.
- The `value` includes the [notification type](#notification-types) and the item being notified of.

<WidgetEditor>

```js
const notifyMe = () => {
  Social.set({
    index: {
      notify: JSON.stringify({
        key: context.accountId,
        value: "docs notification"
      })
    }
  });
}

return <>
  {context.accountId?
  <button onClick={notifyMe}> Get Notification </button>
  :
  <p> Please login to be notified</p>
  }
</>
```

</WidgetEditor>


In this example, the account executing the code is notifying `mob.near` that they liked their social post created at the block height `102169725`.

---

## Notification Types

Since notifications are indexed actions, anyone can create their own kind of notification.

While there is no standard for notifications, we recommend using the following types:

<Tabs>
  <TabItem value="Custom" default>

```js
  Social.set({
    index: JSON.stringify({
      notify: {
        key: "mob.near",
        value: {
          type: "custom",
          message: "A message in the notification",
          widget: "The widget to open when clicking on the notification",
          params: { parameters: "to pass to the widget", ... },
        },
      }
    })
  });
```

**Note**: currently, only dev.near.org implements custom notifications

</TabItem>

<TabItem value="Like">

```js
  Social.set({
    index: JSON.stringify({
      notify: {
        key: "mob.near",
        value: {
          type: "like",
          item: {
            type: "social",
            path: "mob.near/post/main",
            blockHeight: 102169725
          }
        }
      }
    })
  })
```

**Reference**: [LikeButton](https://near.org/near/widget/ComponentDetailsPage?src=near/widget/LikeButton&tab=source)

</TabItem>

<TabItem value="Comment">

```js
  Social.set({
    index: JSON.stringify({
      notify: {
        key: "nearhacks.near",
        value: {
          type: "comment",
          item: {
            type: "social",
            path: "nearhacks.near/post/main",
            blockHeight: 102224773
          }
        }
      }
    })
  })
```

**Reference**: [CommentButton](https://near.org/near/widget/ComponentDetailsPage?src=near/widget/Comments.Compose&tab=source)

</TabItem>

<TabItem value="Follow">

```js
  Social.set({
    index: JSON.stringify({
      notify: {
        key: "mob.near",
        value: {
          type: "follow",
        }
      }
    })
  })
```

**Reference**: [FollowButton](https://near.org/near/widget/ComponentDetailsPage?src=near/widget/FollowButton&tab=source)

</TabItem>

</Tabs>

:::caution
There is no standard for notifications, but you can contribute to create one [in this public discussion](https://github.com/NearSocial/standards/pull/19/files).
:::

---

## Parsing Notifications

In order to get all notifications for an user, we make a call to the Social indexer.

<WidgetEditor id='1' height="190px">

```js
// login to see your notifications
const accountId = context.accountId || 'influencer.testnet'

const index = Social.index("notify", accountId, {limit: 2, order: "desc", subscribe: true});

return <>
  <h4> Notifications for {accountId} </h4>
  {index.map(e => <> {JSON.stringify(e, null, 2)} <br/></>) }
</>
```

</WidgetEditor>

:::caution
Please notice that anyone can create a notification for the user, and thus some form of filtering might be needed.
:::

:::tip
You can also check how the [Notifications Page](https://near.org/near/widget/ComponentDetailsPage?src=near/widget/NotificationsPage&tab=source) is implemented.
:::
