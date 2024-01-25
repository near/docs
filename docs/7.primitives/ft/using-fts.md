---
id: using-fts
title: Using FTs
hide_table_of_contents: false
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"
import ContactUs from '@site/src/components/ContactUs.mdx';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BOSGetMetadata from "./interacting/bos/get-metadata.md"
import BOSCheckBalance from "./interacting/bos/check-balance.md"
import BOSSendToken from "./interacting/bos/send.md"
import BOSAttachTokenToCall from "./interacting/bos/attach-to-call.md"
import BOSCreateToken from "./interacting/bos/create.md"

import WebAppGetMetadata from "./interacting/web-app/get-metadata.md"
import WebAppCheckBalance from "./interacting/web-app/check-balance.md"
import WebAppSendToken from "./interacting/web-app/send.md"
import WebAppAttachTokenToCall from "./interacting/web-app/attach-to-call.md"
import WebAppCreateToken from "./interacting/web-app/create.md"

import CLIGetMetadata from "./interacting/near-cli/get-metadata.md"
import CLICheckBalance from "./interacting/near-cli/check-balance.md"
import CLISendToken from "./interacting/near-cli/send.md"
import CLIAttachTokenToCall from "./interacting/near-cli/attach-to-call.md"
import CLICreateToken from "./interacting/near-cli/create.md"

import SmartContractSendToken from "./interacting/smart-contract/send.md"
import SmartContractAttachTokenToCall from "./interacting/smart-contract/attach-to-call.md"
import SmartContractHandleDeposit from "./interacting/smart-contract/handle-deposit.md"

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

---

## Get token metadata

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSGetMetadata />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppGetMetadata />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLIGetMetadata />
  </TabItem>
</Tabs>

---

## Check token balance

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSCheckBalance />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppCheckBalance />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLICheckBalance />
  </TabItem>
</Tabs>

---

## Send token

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSSendToken />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppSendToken />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLISendToken />
  </TabItem>
  <TabItem value="Smart Contract" label="Smart Contract" default>
    <SmartContractSendToken />
  </TabItem>
</Tabs>

---

## Attaching FTs to a Call

Natively, only NEAR tokens (Ⓝ) can be attached to a method calls. However, the FT standard enables to attach fungible tokens in a call by using the FT-contract as intermediary. This means that, instead of you attaching tokens directly to the call, you ask the FT-contract to do both a transfer and a method call in your name.

Let's assume that you need to deposit FTs on Ref Finance.

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSAttachTokenToCall />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppAttachTokenToCall />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLIAttachTokenToCall />
  </TabItem>
  <TabItem value="Smart Contract" label="Smart Contract" default>
    <SmartContractAttachTokenToCall />
  </TabItem>
</Tabs>

How it works:

1. You call ft_transfer_call in the FT contract passing: the receiver, a message, and the amount.
2. The FT contract transfers the amount to the receiver.
3. The FT contract calls receiver.ft_on_transfer(sender, msg, amount)
4. The FT contract handles errors in the ft_resolve_transfer callback.
5. The FT contract returns you how much of the attached amount was actually used.

---

## Creating FT

For creating our own FT we will use [Token Farm](https://tkn.farm/). You can use it from GUI in your browser, but we will look at how to use its smart contracts to create a token.

First of all, you need to calculate how much creating a token will cost you.

<Tabs groupId="code-tabs">
  <TabItem value="NEAR Component" label="NEAR Component" default>
    <BOSCreateToken />
  </TabItem>
  <TabItem value="Web App" label="Web App">
    <WebAppCreateToken />
  </TabItem>
  <TabItem value="Near CLI" label="Near CLI">
    <CLICreateToken />
  </TabItem>
</Tabs>

Contract of your token will have an address which looks like `<your_token_symbol>.tkn.near` (in the case above `test.tkn.near`).

After creating a token you can [send it](#send-tokens) to anyone.

---

## Handle a deposit

<Tabs groupId="code-tabs">
  <TabItem value="Smart Contract" label="Smart Contract" default>
    <SmartContractHandleDeposit />
  </TabItem>
</Tabs>

---

## Additional Resources

1. [NEP-141 and NEP-148 standards](https://nomicon.io/Standards/Tokens/FungibleToken/)
2. [FT Event Standards](https://nomicon.io/Standards/Tokens/FungibleToken/Event)
3. [FT reference implementation](https://github.com/near-examples/FT)
4. [Fungible Tokens 101](../../3.tutorials/fts/0-intro.md) - a set of tutorials that cover how to create a FT contract using Rust.