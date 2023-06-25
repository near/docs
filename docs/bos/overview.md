---
id: overview
title: Overview
---

The Blockchain Operating System (BOS) simplifies building, deploying and accessing decentralized frontends. Embrace the power of community and Web 3.

![bos](/docs/bos-landing.png)


---

## Why Using BOS?

BOS is both a development environment and a social network where users can deploy and discover new applications. It simplifies building Web 3 applications providing easy onboarding, high security and a seamless interaction with all chains.

#### Access 
With BOS, users always have the ability to locally run blockchain applications which helps assure robustness and censorship-resistance, while maintaining a user-friendly experience.

#### Security
The code for Components is always on-chain, making it auditable and viewable in explorers. This enhances security, and users can locally run the full stack with confidence. 

#### Composability
BOS fosters composability by enabling developers to reuse and remix Components. Building with BOS is extremely lightweight and easy, with the ability to deploy new front-ends for smart contracts on mainnet in less than 10 minutes.

#### Chain Agnostic
Additionally, BOS is chain-agnostic, making it a flexible solution for developers working with different blockchains.

---

## The Pillars of BOS

BOS is based on three pillars: 
- [Components](#components): Composable frontends that solve specific problems.
- [Blockchains](#blockchains): To store the component's code, as well as their assets and data.
- [Gateways](#gateways): A simple way to render components anywhere.

<hr class="subsection" />

### Components

[Components](home.md) are small web 3 applications (think [Lido](tutorial/hello-lido.md), Uniswap, Aave) that are stored **entirely on-chain**.

Developers can fork these apps and [compose them](./home.md#composing-components) to create full web applications.

<hr class="subsection" />

### Blockchains

Components can call functions on any blockchain, with current support for all EVM chains (e.g. Polygon, zkSync) and NEAR.

The source code for the apps is on NEAR, due to it's ability to very cheaply store HTML/CSS/JS (a few cents).

<hr class="subsection" />

### Gateways

Gateways make locally-run, decentralized front-ends available to the masses. A gateway consists of a specially designed virtual machine that loads and runs frontends for protocols built on Ethereum, L2s, and other Layer 1s like NEAR. The code for these frontends is stored on the NEAR blockchain. 

Examples of gateways include [near.org](https://near.org), [bos.gg](https://bos.gg), [near.social](https://near.social), [Cantopia](https://cantopia.pages.dev) and [nearpad.dev](https://nearpad.dev).
