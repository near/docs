---
id: push-notifications
title: Push Notifications
---
import {CodeBlock} from '@theme/CodeBlock'
import {CodeTabs, Language, Github} from "@site/components/codetabs"

Push messages enable your gateway to send notifications in desktop and mobile devices even when the users are not active.

To implement push notifications you basically need:

1. Create a Service Worker
2. Ask the user for permission to send push notifications
2. Send the `client identifier` information to our notification server
3. Add logic to display the notifications

:::tip Example
Check our working example at https://github.com/near-examples/BOS-notifications
:::

---

## Create the Service Worker
Push notifications work by having a [service worker](https://codelabs.developers.google.com/codelabs/push-notifications#2) on the client side that listens for messages from the NEAR notifications server.

<CodeTabs>
    <Github fname="main.js" language="js" value="Create"
            url="https://github.com/near-examples/BOS-notifications/blob/main/app/scripts/main.js"
            start="16" end="22" />
</CodeTabs>

Browsers readily provide native support for service workers, so you can easily check if a service worker exists, and create one if not.

---

## Subscribe to our Notifications

In order to have the `service worker` display notifications, you need to subscribe it to a notifications server.

A notification server is identified by its `public key`, constraining that only the server holding the `private` counterpart can push notifications to the user.

<CodeTabs>
    <Github fname="main.js" language="js" value="Subscribe"
            url="https://github.com/near-examples/BOS-notifications/blob/main/app/scripts/main.js"
            start="44" end="50" />
</CodeTabs>

:::tip Permission
When you subscribe to the service, the user will be asked for permission to be sent notifications.
:::

---

## Create a Stream in our Server

After you subscribe the user to a notifications server, share it with us so we can start sending you notifications!

For this, make a `post` request to our server, adding which account you want to be notified for, and a URL identifying your gateway.

<CodeTabs>
    <Github fname="main.js" language="js" value="Stream"
            url="https://github.com/near-examples/BOS-notifications/blob/main/app/scripts/main.js"
            start="52" end="64" />
</CodeTabs>

:::tip
The `gateway` parameter is there just to help us keep track of who receives notifications.
:::


---

## Handle Notifications

When the user receives a notification, the `service worker` will be triggered, and you can add logic to display the notification.

<CodeTabs>
    <Github fname="sw.js" language="js" value="Notifications"
            url="https://github.com/near-examples/BOS-notifications/blob/main/app/scripts/sw.js"
            start="20" end="37" />
</CodeTabs>

Feel free to personalize the notification as you wish, and to add logic on what to do once the notification is clicked. In our example, we just open the Post page.

<CodeTabs>
    <Github fname="sw.js" language="js" value="Notifications"
            url="https://github.com/near-examples/BOS-notifications/blob/main/app/scripts/sw.js"
            start="39" end="51" />
</CodeTabs>