---
id: frontend
title: Frontends for Web3 dApps
sidebar_label: Frontends
---


There are 3 major options to choose from when you're building a frontend for your Web3 dApp, each with their own set of pros and cons.
This overview presents and summarizes these options so you can select the right solution for your UI.

- [Standard Web App](#standard-web-app)
- [Decentralized Hosting](#decentralized-hosting)
- [BOS (SocialVM)](#bos-socialvm)

## Standard Web App

Even though your UI layer won't be decentralized, your backend layer (business logic, stored data, etc) will be decentralized via smart contracts. This will be the most convenient option for most applications due to having zero technical limitations or performance impact. However, it might be a deal breaker if you require your entire stack to be decentralized.

#### Pros

- Build a standard web app like you normally would without any technical limitations.
- Works with any framework and combination of libraries.
- Supports SSR if using something like Next JS or Svelte Kit.
- Will have best performance overall.

#### Cons

- Your web app will need to be hosted by a Web 2 hosting provider (e.g.: Vercel, AWS, etc).
- This means your UI layer won't be decentralized.

:::tip

Check [this article](integrate-contracts.md) to learn how to integrate smart contracts to your frontend.

:::

## Decentralized Hosting

If you require your entire stack to be decentralized, this will be the best choice. However, the potential technical limitations (no SSR or meta frameworks like Next JS) are worth considering.

To learn more, you can check other decentralized hosting options like [Fleek](https://fleek.co/).

<!-- content left out

#### Pros

- Your web app will be hosted on the blockchain allowing your entire stack to be decentralized.

#### Cons

- Your options for frameworks will be limited to whatever is supported by the decentralized hosting solution.
- SSR and meta frameworks like Next JS most likely won't be supported.

-->

## BOS (SocialVM)

The BOS VM was an interesting experiment that ultimately had too many security issues and technical limitations to be considered a valid option for building robust web apps moving forward. An example Social VM website is [near.social](https://near.social).

:::info What about BOS?

We no longer recommend building on BOS due to its limited capabilities and discontinued security maintenance. Developers with active projects on BOS are encouraged to migrate to another deployment strategy.

:::

#### Pros

- An interesting experiment to host decentralized UI components on the blockchain.
- All components within the community can be imported and forked.

#### Cons

- Extremely limited due to proprietary React syntax and security concerns.
- Unable to use libraries from NPM.
- Unsupported moving forward due to security issues.


:::tip

Check [this article](integrate-components.md) to learn how to integrate BOS components to your frontend.

:::
