---
title: Web Login Methods
id: web-login
description: "Learn all the login options available for your website or web app"
---

NEAR offers multiple options to allow users to login using NEAR accounts. Below are the most popular methods to
integrate web login into your web app or website, each tailored to different use cases and user experiences.

Once the user is logged in, they will be able to use their accounts to interact with the NEAR blockchain, making
call to smart contracts, transfer tokens, and more.

<details>

<summary> Summary of Available Methods </summary>

| Method                                    | Wallet Login | Social Login | Key Owners | Description                                      |
|-------------------------------------------|--------------|--------------|------------|--------------------------------------------------|
| [Wallet Selector](#wallet-selector)       | ✅            | ❌            | User       | Popup modal to select from existing NEAR wallets |
| [NEAR Connector](#near-connector)           | ✅            | ❌            | User       | Popup modal to select from existing NEAR wallets |
| [Privy Social Login](#privy-social-login) | ❌            | ✅            |            | Developer                                        |
| [Web3Auth](#web3auth)                     | ❌            | ✅            | User       | Login using email or social accounts             |

</details>

---

## Wallet Selector

The [wallet selector](https://github.com/near/wallet-selector) is a javascript library that allows you to easily add a `modal popup` to your web, so users can login using one of the existing [NEAR wallets](https://wallet.near.org).

It includes support for the most popular wallets, and `react hooks` to easily integrate it into your app.

![Preview](/assets/docs/tools/wallet-selector-preview.png)


:::tip

You can learn how to integrate the wallet selector into your app in our [Wallet Selector Tutorial](../tutorials/web-login/wallet-selector.md) guide.

:::

---

## NEAR Connector

Considered a successor to the wallet selector, the [NEAR Connector](https://github.com/AZbang/hot-connector) is a zero-dependency lightweight library that allows users to connect to your dApp using their preferred wallet.

![Preview](https://github.com/user-attachments/assets/c4422057-38bb-4cd9-8bd0-568e29f46280)

:::tip

Check our [NEAR Connector Integration Example](https://github.com/near-examples/hello-near-connector) to learn how to integrate the NEAR Connector into your web app

:::

---

## Privy Social Login

[Privy](https://www.privy.io/) is a third-party service that allows users to login using their email or social accounts (Google, Facebook, Twitter, etc). Upon login, a NEAR wallet is created for the user, which they can fund and use to interact with your dApp.

![Preview](https://framerusercontent.com/images/ugUCPrqIGlKFdxBwSbRoWriZtE.png?scale-down-to=2048&width=4018&height=2262)

:::tip

Check our [Privy Integration Example](https://github.com/near-examples/hello-privy/) to learn how to integrate Privy into your web app

:::

---

## Web3Auth

[Web3Auth](https://web3auth.io/) is a third-party service that allows users to login using their email or social accounts (Google, Facebook, Twitter, etc). Upon login, a NEAR wallet is created for the user, which they can fund and use to interact with your dApp.

![Preview](/assets/docs/web3-apps/web3auth.jpeg)

:::tip

Check our [Web3Auth Integration Example](https://github.com/near-examples/hello-web3auth/) to learn how to integrate Privy into your web app

:::

:::warning Ethereum Wallets
The ethereum wallet login offered by Web3Auth will not allow you to interact with NEAR contracts
:::