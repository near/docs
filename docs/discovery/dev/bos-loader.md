---
id: bos-loader
title: BOS Loader
---

# BOS Loader

In this article you'll learn how to develop, test, and deploy BOS components in a simple way by using only CLI tools.

[BOS Component Loader](https://github.com/near/bos-loader) serves a local directory of component files as a JSON payload properly formatted to be plugged into a BOS `redirectMap`. When paired with a viewer configured to call out to this loader, it enables local component development.

## Development flow

1. _(Optional)_ Download and install [bos-cli](https://github.com/FroVolod/bos-cli-rs/releases) from script.

   :::info
   You don’t need to install `bos-cli` if you don't want to start working with existing component code, and also if you only plan to do deploys via GitHub actions.
   :::

2. If you have components saved on chain already, use `bos-cli` to download them. Otherwise, create a `src` folder.

3. Create a component as `src/<component name>.jsx`

   :::tip
   It's common practice to use `.` delimited component names for namespacing. You can handle this with folders for better files organization.
   
   For example, `AppName.Component` → `AppName/Component.jsx`.
   :::

5. Download and install [BOS Component Loader](https://github.com/near/bos-loader/releases) (`bos-loader`).

6. Run `bos-loader <youraccount.near> --path src` (or run from `src` folder)

7. Open https://alpha.near.org/flags , and set the loader URL to `http://127.0.0.1:3030`

8. Open `https://alpha.near.org/<youraccount.near>/widget/<component name>` (case sensitive)

   :::tip
   You can work on multiple components at once by embedding them in a wrapper component.
   :::

9. Make changes to the component's code.

   :::info
   You must refresh the browser's web page to see the changes.
   :::

10. When you're done, use the <kbd>X</kbd> on the banner to stop loading locally.

## Component deployment

At this point, your new component is ready to be deployed. There are two suggested paths:

 - Use `bos-cli` to deploy from command line:

   ```
   bos-cli deploy
   ```

 - Set up a [GitHub actions](https://github.com/FroVolod/bos-cli-rs/blob/master/README.md#reusable-workflow) deployment workflow. Check [this document](https://github.com/FroVolod/bos-cli-rs/blob/master/README.md#github-actions) for instructions.
