---
id: overview
title: NEAR Intents
sidebar_label: NEAR Intents
description: "Learn how NEAR Intents work"
---

NEAR Intents is a multichain transaction protocol where users specify what they want and let third parties compete to provide the best solution. This works for everything from token swaps to pizza delivery, creating a universal marketplace across crypto and traditional services.

![NEAR Intents Overview](/docs/assets/intents/intents-overview.png)

## How It Works

1. **Intent Creation**: A user or AI agent expresses a desired outcome _(ex: Swap Token A for Token B)_ and broadcasts the intent to network of Market Makers (also called Solvers).

2. **Market Makers Compete**: A off-chain decentralized network of Market Makers (aka solvers) compete to fulfill the request in the most optimal way. When the network finds the best solution, it presents it as a quote to the originating user/agent for approval.

4. **Intent Execution**: If the quote from the Market Maker is accepted, the intent is executed by calling a "Verifier" smart contract on NEAR Protocol. This contract securely verifies and settles the final transaction.


## NEAR Intents 101

<iframe width="800" height="450" src="https://www.youtube.com/embed/mOGD2gzZJqE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## Resources

Here are some resources to get started using NEAR Intents:

- [Official NEAR Intents Documentation](https://docs.near-intents.org)
- [Dev Support Channel](https://t.me/near_intents): Developer support channel on Telegram
- [NEAR Intents 1Click API Example](https://github.com/near-examples/near-intents-examples): Easy integration example that uses 1Click API
- [near-intents.org (Live Site)](https://near-intents.org): Live demo application showcasing token swaps
- [near-intents.org (Repository)](https://github.com/defuse-protocol/defuse-frontend): Frontend source code for `near-intents.org`
- [Unpacking NEAR Intents: A Deep Dive](https://www.near.org/blog/unpacking-near-intents-a-deep-dive): Blogpost diving deeper into the concept of NEAR Intents.

:::info
Currently there is no `testnet` deployment.
:::
