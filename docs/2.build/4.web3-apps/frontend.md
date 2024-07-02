---
id: frontend
title: Frontends for Web3 dApps
sidebar_label: Frontends
---

When building decentralized web applications (dApps), developers have two primary options for connecting a front-end user interface (UI) to a smart contract backend. Each option offers distinct advantages and disadvantages, tailored to different project requirements and goals.

- [Standard Web2 Frontend](#standard-web-2-frontend)
- [Decentralized Frontend](#decentralized-frontend-solutions)

## Standard Web 2 Frontend

While your user interface layer will remain centralized, the backend layer—including business logic and stored data—will be decentralized through smart contracts. This approach offers optimal convenience for most applications as it eliminates technical constraints and does not impact performance. However, if your requirement is for full decentralization across the entire stack, this configuration may not be suitable.

**Pros:**

- Develop a standard web application without any technical restrictions.
- Compatible with any framework and library combination.
- Supports server-side rendering with platforms like Next.js or SvelteKit.
- Delivers the best overall performance.

**Cons:**

- Requires hosting through a traditional Web 2 provider (e.g., Vercel, AWS).
- The user interface layer will not be decentralized.

**How to Build:**

When building a frontend that can connect with the NEAR blockchain using standard web2 tooling will require you to import two dependencies:

- [NEAR API JS](../../4.tools/near-api-js/quick-reference.md) - A JavaScript API tool that allows frontend clients the ability to view and retrieve data directly from the blockchain.
- [Wallet Selector](../../4.tools/wallet-selector.md) - Wallet integration tool allowing developers to choose which wallets are supported and allows users to choose which wallet they would like to connect with.

:::tip

[Checkout this article](integrate-contracts.md) to learn how to integrate smart contracts to your frontend, using [Wallet Selector](../../4.tools/wallet-selector.md) and [NEAR API JS](../../4.tools/near-api-js/quick-reference.md).

:::

## Decentralized Frontend Solutions

If you need full decentralization of your entire stack, this option is ideal. However, consider the possible technical constraints, such as the absence of server-side rendering or meta frameworks like Next.js.

Although the ecosystem for developing decentralized frontends is still maturing, here are some notable projects for you to evaluate and consider:

|Name| <div align="center">Description</div>   |
|--------|------|
| [**IPFS**](https://docs.ipfs.tech/how-to/websites-on-ipfs/single-page-website/)| A peer-to-peer hypermedia protocol designed to preserve and grow humanity's knowledge by making the web upgradeable, resilient, and more open. |
| [**Fleek**](https://docs.fleek.co/tutorials/hosting/)| Hosts websites on IPFS with a user-friendly interface and continuous deployment from popular repositories. |
| [**Arweave**](https://www.arweave.org/build) | Arweave lets you build quickly and simply with permanent storage. You can store anything from files to fully decentralized web applications. |
| [**Web4**](https://web4.near.page/) | Web4 is a new way to distribute decentralized apps on NEAR Protocol. Deploy single WASM smart contract to deploy an entire web application.|
| [**NEAR Social** ***(aka B.O.S. Components)***](https://near.social) | An experimental platform that allows users to build and deploy multi-chain decentralized UI experiences. |

**Pros:**

- Decentralized frontends are less susceptible to single points of failure, making them more resistant to attacks and server downtimes
- By decentralizing the hosting of your frontend, you minimize the risk of content being censored or blocked by centralized authorities.
- Users might trust a decentralized application more, knowing that it operates on a transparent and immutable blockchain.
- Data displayed on the frontend is more likely to be accurate and tamper-proof since it's typically fetched directly from the blockchain.

**Cons:**

- Implementing a decentralized frontend can be more complex than traditional web development, requiring knowledge of specific technologies like IPFS, Arweave, or blockchain interactions.
- Decentralized networks can face issues such as latency or lower speeds compared to traditional centralized servers, potentially affecting user experience.
- The ecosystem for developing decentralized frontends is still maturing, which means there might be fewer tools and libraries available compared to traditional web development.
- While decentralized storage costs have been decreasing, they can still be higher than traditional hosting, especially if the dApp generates a lot of data transactions.
