---
id: vscode
title: VS Code Extension
---

# NEAR BOS IDE

A VS Code extension to help you develop [components](../components/home.md) for [NEAR BOS](https://near.org) using Visual Studio Code.

## Features

- Retrieve any widget from BOS
- Change the code and preview the changes locally
- Publish directly to the NEAR Blockchain
- See the widget logs in the vscode Debug Console

![Extension Overview](/docs/vscode/extension.jpeg)

## How to Use

After installing the extension, a new section named **`Near BOS`** will be added to the explorer.

1. Start Your Workspace

   ![Installed](/docs/vscode/installed.png)

2. Choose a working directory using the `Choose your working folder` button.

3. Retrieve Widgets, Preview, and Develop

   Use the `Login & Fetch Widgets` to login into your NEAR account and fetch your components, or use the `Fetch Account Widgets` to get components from any account in NEAR BOS.

   Use the explorer to open any file, and click the `Preview` button to preview your changes.

   ![Preview](/docs/vscode/features.png)

:::info
The preview is not automatically reloaded, you will need to press the `preview` button again.
:::

4. Use the `Publish` button to store the widget in BOS.

:::tip
The `console.log` can be found within the `OUTPUT` tab, in the `Widget` Channel.
:::
