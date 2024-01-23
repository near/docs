---
id: using-fts
title: Using FTs
hide_table_of_contents: false
---

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