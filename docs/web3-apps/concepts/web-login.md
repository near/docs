---
title: Web Login Methods
id: web-login
description: "Learn all the login options available for your website or web app"
---

NEAR offers multiple options to allow users to login using NEAR accounts. Below are the most popular methods to
integrate web login into your web app or website, each tailored to different use cases and user experiences.

Once the user is logged in, they will be able to use their accounts to interact with the NEAR blockchain, making
call to smart contracts, transfer tokens, and more.

---

## NEAR Connector

Considered a successor to the [original wallet selector](https://github.com/near/wallet-selector), the [NEAR Connector](https://github.com/AZbang/hot-connector) is a zero-dependency lightweight library that allows users to connect to your dApp using their preferred wallet.

![Preview](https://github.com/user-attachments/assets/c4422057-38bb-4cd9-8bd0-568e29f46280)

:::tip

You can learn how to integrate the `near connector` into your app in the [NEAR Connector tutorial](../tutorials/web-login/near-connector.md).

:::

---

## Social Login

[Privy](https://www.privy.io/) is a third-party service that allows users to login using their email or social accounts (Google, Facebook, Twitter, etc). Upon login, a NEAR wallet is created for the user, which they can fund and use to interact with your dApp.

:::tip

Check our [Privy Integration Example](https://github.com/near-examples/hello-privy/) to learn how to integrate Privy into your web app

:::

![Preview](https://framerusercontent.com/images/ugUCPrqIGlKFdxBwSbRoWriZtE.png?scale-down-to=2048&width=4018&height=2262)

:::info Web3Auth
For an alternative social login method you can check [Web3Auth](https://web3auth.io/). We have a functional [Web3Auth Integration Example](https://github.com/near-examples/hello-web3auth/) to show how to integrate Web3Auth into your web app.
:::
