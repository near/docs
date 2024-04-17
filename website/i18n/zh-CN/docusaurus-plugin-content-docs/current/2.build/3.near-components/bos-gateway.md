---
id: bos-gateway
title: Using components on WebApps
---

In order to use the components you create in a WebApp you need to use what is known as the `NEAR VM`. This virtual machine helps you to easily fetch components from the blockchain and transform them into executable code.

There are two possible scenarios:

- You want to start a WebApp [**from scratch**](#starting-a-webapp-from-scratch).
- You want to integrate components into an [**existing WebApp**](#integrating-components-into-your-webapp)

---

## Starting a WebApp from scratch

If you want to start a WebApp from scratch, the simplest option is to use `create-near-app`. To use it, you only need to have [node.js](https://nodejs.org/en/) installed on your computer.

Simply run the following command and follow the instructions:

```bash
npx create-near-app@latest
```

:::tip Tutorial
To learn more about the template created by `create-near-app` see our [Quickstart a WebApp](../4.web3-apps/quickstart.md) tutorial.
:::

---

## Integrating Components into your WebApp

In order to integrate components into your WebApp you will leverage two libraries:

- **Wallet Selector**: Allows user to login using their preferred NEAR wallet.
- **NEAR VM**: Simplifies fetching NEAR components from the blockchain and rendering them.

The best way to learn how to integrate components into your WebApp is by following our tutorial:

:::tip Tutorial
To learn step-by-step how to integrate them, please visit our [integrating components into a WebApp](../4.web3-apps/integrate-components.md) tutorial.
:::
