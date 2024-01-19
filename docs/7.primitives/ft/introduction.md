---
id: introduction
title: Introduction
hide_table_of_contents: false
---


import {FeatureList, Column, Feature} from "@site/src/components/featurelist"
import ContactUs from '@site/src/components/ContactUs.mdx';

Fungible token is representation of an asset on a blockchain that is interchangeable.

Besides the native NEAR token, user can issue their own fungible tokens or use those that are already present in the ecosystem and created by other users or projects.

In contrast with the NEAR native token, fungible token (FT) are **not stored** in the user's wallet. In fact, each FT lives in **their own contract** which is in charge of doing **bookkeeping**. This is, the contract keeps track of how many tokens each user has, and handles transfers internally.

In order for a contract to be considered a FT-contract it has to follow the [**NEP-141 and NEP-148 standards**](https://nomicon.io/Standards/FungibleToken/). The **NEP-141** & **NEP-148** standards explain the **minimum interface** required to be implemented, as well as the expected functionality.

:::tip Reference Implementation
We provide a [FT reference implementation](https://github.com/near-examples/FT) ready to be deployed and use.
:::

---

## How to create FT token

Usually tokens are created by deploying own FT contract on blockchain. But there are other ways.

1. [Token Farm](https://tkn.farm/) is a tool that can be use to create a new fungible token. It is deployed as subaccount of the factory contract, for example, `new_token.tkn.near`. To create a new FT you need to fill in few fields - token name, symbol, supply, decimals, owner account id and choose an icon.

2. [Token Laboratory](https://app.jumpdefi.xyz/token-launcher) by Jump Defi. Provides the same functionality to create tokens as Token Farm.