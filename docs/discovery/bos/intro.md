---
sidebar_position: 1
---

# Overview

Blockchain Operating System (aka BOS), is a blockchain-based protocol for creating and deploying decentralized front-ends. BOS aims to revolutionize the way we develop and interact with decentralized apps. We believe BOS will help achieve the goal of making Web 3.0 more accessible to everyone.

BOS is based on three pillars: **Gateways, Components, and Blockchains**. 

#### Gateways 
Gateways make locally-run, decentralized front-ends available to the masses. A gateway consists of a specially designed virtual machine that loads and runs frontends for protocols built on Ethereum, L2s, and other Layer 1s like NEAR. The code for these frontends is stored on the NEAR blockchain. 

Examples of gateways include [bos.gg](https://bos.gg), [alpha.near.org](https://alpha.near.org), [near.social](https://near.social), and [Cantopia](https://cantopia.pages.dev).

#### Components
Components are frontends for app-layer protocols (think Lido, Uniswap, Aave) that are stored entirely on-chain. The code for these apps can be viewed in a gateway, similar to viewing a smart contract in Etherscan. Developers can fork these apps and deploy their own versions, or even [compose Components together](https://cantopia.pages.dev/#/mob.near/widget/WidgetSource?src=mattlock.near/widget/canto-landing-page)

#### Blockchains
Components can call functions on any blockchain,with current support for all EVM chains/L2s and NEAR. The source code for the apps (frontends) is on NEAR, due to it's ability to very cheaply store HTML/CSS/JS (a few cents).

BOS aims to tackle several critical challenges around building front-ends for Web 3.0 apps, including **access, security, composability, and agility**. With BOS, users always have the abillity to locally run blockchain applications which helps assure robustness and censorship-resistance, while maintaining a user-friendly experience. The code for Components is always on-chain, making it auditable and viewable in explorers. This enhances security, and users can locally run the full stack with confidence. Furthermore, BOS fosters composability by enabling developers to reuse and remix Components. Building with BOS is extremely lightweight and easy, with the ability to deploy new front-ends for smart contracts on mainnet in less than 10 minutes. Additionally, BOS is chain-agnostic, making it a flexible solution for developers working with different blockchains.

It's important to note that BOS is still in its early stages. The official unveiling of BOS will take place at the ETH Denver conference, and it will be made available to the public before the end of the Q2 2023. 

### Next Steps

* Learn [how to build a component in &lt;10min](./Tutorials/hello-world.md)
* Learn [more about components](components.md)
* Check out the [BOS main page (Ethereum)](https://bos.gg)
* Join [Telegram group](https://t.me/+mpJSZwsVYz9hODNh) for discussions
