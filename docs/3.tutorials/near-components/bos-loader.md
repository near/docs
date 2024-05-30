---
id: bos-loader
title: BOS Loader
---

# BOS Loader

In this article you'll learn how to develop, test, and deploy BOS components using CLI tools. You can use this workflow to tap into the colaboration, pull-request, and other GitHub benefits while still deploying components to the BOS. 

[BOS Component Loader](https://github.com/near/bos-loader) serves a local directory of component files as a JSON payload properly formatted to be plugged into a BOS `redirectMap`. When paired with a viewer configured to call out to this loader, it enables local component development.

## Development flow

1. _(Optional)_ Download and install [`bos` CLI](https://bos.cli.rs).

   :::info
   You need `bos` CLI if you have component code on the BOS already that you want to use or if you want to manage component deploys locally instead of the GitHub actions CI/CD.
   :::

2. To get component code saved on the BOS, use `bos` to download the source code. Otherwise, create a `src` folder.

3. Create a component within that src folder like `src/<component name>.jsx`.

   :::tip
   It's common practice to use `.` delimited component names for namespacing. You can handle this with folders for better files organization.
   
   For example, `AppName.Component` → `AppName/Component.jsx`.
   :::

5. Download and install [BOS Component Loader](https://github.com/near/bos-loader/releases) (`bos-loader`).

6. Run `bos-loader <youraccount.near> --path src` (or run from `src` folder)

7. Open https://dev.near.org/flags, and set the loader URL to `http://127.0.0.1:3030`.

8. Open `https://dev.near.org/<youraccount.near>/widget/<component name>` (case sensitive)

   :::info
   If you're testing on `testnet`, use your testnet account and open https://test.near.org instead.
   
   Run `bos-loader <youraccount.testnet> --path src` locally, set loader URL in https://test.near.org/flags and open `https://test.near.org/<youraccount.testnet>/widget/<component name>` to view your component locally.
   :::

   :::tip
   You can work on multiple components at once by embedding them in a wrapper component.
   :::

9. Make changes to the component's code.

   :::info
   You must refresh the browser's web page to see the changes.
   :::

10. When you're done, use the <kbd>X</kbd> on the banner to stop loading locally.

## Component deployment

At this point, your new component is ready to be deployed. To deploy, you can use either of the following two paths: 

 - Use `bos` CLI to deploy from command line:

   ```
   bos deploy
   ```

 - Set up a [GitHub actions](https://github.com/FroVolod/bos-cli-rs/blob/master/README.md#reusable-workflow) deployment workflow. Check [this document](https://github.com/FroVolod/bos-cli-rs/blob/master/README.md#github-actions) for instructions.

You should now be able to see your component in discovery. Happy Hacking! 
