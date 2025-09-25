---
id: ft
title: Fungible Tokens (FT)
hide_table_of_contents: false
description: "Learn about NEAR fungible tokens (FT) following NEP-141 and NEP-148 standards - create, transfer, and integrate FT contracts with comprehensive examples and tools."
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BOSGetMetadata from "@site/src/components/docs/primitives/ft/bos/get-metadata.md"
import BOSCheckBalance from "@site/src/components/docs/primitives/ft/bos/check-balance.md"
import BOSSendToken from "@site/src/components/docs/primitives/ft/bos/send.md"
import BOSRegister from "@site/src/components/docs/primitives/ft/bos/register.md"
import BOSAttachTokenToCall from "@site/src/components/docs/primitives/ft/bos/attach-to-call.md"
import BOSCreateToken from "@site/src/components/docs/primitives/ft/bos/create.md"

import WebAppGetMetadata from "@site/src/components/docs/primitives/ft/web-app/get-metadata.md"
import WebAppCheckBalance from "@site/src/components/docs/primitives/ft/web-app/check-balance.md"
import WebAppSendToken from "@site/src/components/docs/primitives/ft/web-app/send.md"
import WebAppRegister from "@site/src/components/docs/primitives/ft/web-app/register.md"
import WebAppAttachTokenToCall from "@site/src/components/docs/primitives/ft/web-app/attach-to-call.md"
import WebAppCreateToken from "@site/src/components/docs/primitives/ft/web-app/create.md"

import CLIGetMetadata from "@site/src/components/docs/primitives/ft/near-cli/get-metadata.md"
import CLICheckBalance from "@site/src/components/docs/primitives/ft/near-cli/check-balance.md"
import CLISendToken from "@site/src/components/docs/primitives/ft/near-cli/send.md"
import CLIRegister from "@site/src/components/docs/primitives/ft/near-cli/register.md"
import CLIAttachTokenToCall from "@site/src/components/docs/primitives/ft/near-cli/attach-to-call.md"
import CLICreateToken from "@site/src/components/docs/primitives/ft/near-cli/create.md"
import CLICreateTokenManually from "@site/src/components/docs/primitives/ft/near-cli/create-manually.md"

import SmartContractSendToken from "@site/src/components/docs/primitives/ft/smart-contract/send.md"
import SmartContractAttachTokenToCall from "@site/src/components/docs/primitives/ft/smart-contract/attach-to-call.md"

import { LantstoolLabel } from "@site/src/components/lantstool/LantstoolLabel/LantstoolLabel";
import { TryOutOnLantstool } from "@site/src/components/lantstool/TryOutOnLantstool";

import CreateTokenForm from "@site/src/components/tools/FungibleToken/CreateTokenForm";


Besides the native NEAR token, NEAR accounts have access to a [multitude of tokens](https://guide.rhea.finance/developers-1/cli-trading#query-whitelisted-tokens) to use throughout the ecosystem. Moreover, it is even possible for users to create their own fungible tokens.

In contrast with the NEAR native token, fungible token (FT) are **not stored** in the user's account. In fact, each FT lives in **their own contract** which is in charge of doing **bookkeeping**. This is, the contract keeps track of how many tokens each user has, and handles transfers internally.

![FT](/docs/primitives/ft.png)

In order for a contract to be considered a FT-contract it has to follow the [**NEP-141 and NEP-148 standards**](https://nomicon.io/Standards/FungibleToken/). The **NEP-141** & **NEP-148** standards explain the **minimum interface** required to be implemented, as well as the expected functionality.

---

## Creating a New Token

The simplest way to create a new Fungible Token is by using a factory contract, to which you only need to provide the token metadata, and they will automatically deploy and initialize a [canonical FT contract](https://github.com/near-examples/FT).

<details>

<summary> 1. Using the Token Factory Tool </summary>

We have created a simple UI to interact with the existing `tkn.primitives.testnet` factory contract

<CreateTokenForm />

</details>

<details>

<summary> 2. Interacting with a pre-deployed Token Factory smart contract </summary>

Here is how to directly interact with the factory contract through your application: 

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppCreateToken />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLICreateToken />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/ft/create-ft-via-factory.json" />
  </TabItem>
</Tabs>

The FT you create will live in the account `<your_token_symbol>.tkn.primitives.near` (e.g. `test.tkn.primitives.near`).

</details>

---

## Deploying Your Own Contract

You can also create a fungible token by deploying and initializing a [canonical FT contract](https://github.com/near-examples/FT).

On initialization, you will define the token's metadata such as its name (e.g. Ethereum), symbol (e.g. ETH) and total supply (e.g. 10M). You will also define an `owner`, which will own the tokens **total supply**.

To initialize a FT contract you will need to deploy it and then call the `new` method defining the token's metadata.

<Tabs groupId="code-tabs">
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLICreateTokenManually />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/ft/create-ft-manually.json" />
  </TabItem>
</Tabs>


<hr class="subsection" />

### Global Contracts

You can deploy a new Fungible Token using our global FT contract - a pre-deployed [standard FT contract](https://github.com/near-examples/FT) that you can reuse. [Global contracts](../smart-contracts/global-contracts.md) are deployed once and can be reused by any account without incurring high storage costs.

<Tabs groupId="code-tabs">
  <TabItem value="account" label="By Account">

    ```bash
    near contract deploy <account-id> use-global-account-id ft.globals.primitives.testnet \
      with-init-call \
      new_default_meta \
      json-args '{"owner_id": "<account-id>", "total_supply": "100000000000000000000000000000"}' \
      prepaid-gas '100.0 Tgas' \
      attached-deposit '0 NEAR' \
      network-config testnet \
      sign-with-keychain send
    ```

  </TabItem>
  <TabItem value="hash" label="By Hash">

    ```bash
    near contract deploy <account-id> use-global-hash 3vaopJ7aRoivvzZLngPQRBEd8VJr2zPLTxQfnRCoFgNX \
      with-init-call \
      new_default_meta \
      json-args '{"owner_id": "<account-id>", "total_supply": "100000000000000000000000000000"}' \
      prepaid-gas '100.0 Tgas' \
      attached-deposit '0 NEAR' \
      network-config testnet \
      sign-with-keychain send
    ```
  </TabItem>
</Tabs>

:::note
Deploying by **hash** creates an immutable contract that never changes. Deploying by **account ID** creates an updatable contract that changes when the referenced account's contract is updated. Choose based on whether you want your FT contract to be updatable or permanent.
:::

---

## Querying Metadata
You can query the FT's metadata by calling the `ft_metadata`.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppGetMetadata />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIGetMetadata />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/ft/query-ft-metadata.json" />
  </TabItem>
</Tabs>

---

## Checking Balance
To know how many coins a user has you will need to query the method `ft_balance_of`.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppCheckBalance />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLICheckBalance />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/ft/check-ft-balance.json" />
  </TabItem>
</Tabs>

---

## Registering a User
In order for an user to own and transfer tokens they need to first **register** in the contract. This is done by calling `storage_deposit` and attaching 0.00125Ⓝ.

By calling this `storage_deposit` the user can register themselves or **register other users**.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppRegister />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIRegister />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/ft/register-user.json" />
  </TabItem>
</Tabs>

:::info
You can make sure a user is registered by calling `storage_balance_of`.
:::

:::tip
After a user calls the `storage_deposit` the FT will appear in their Wallets.
:::

---

## Transferring Tokens
To send FT to another account you will use the `ft_transfer` method, indicating the receiver and the amount of FT you want to send.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppSendToken />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLISendToken />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/ft/transfer-tokens.json" />
  </TabItem>
  <TabItem value="📄 Contract"  label="📄 Contract"  default>
    <SmartContractSendToken />
  </TabItem>
</Tabs>

---

## Attaching FTs to a Call
Natively, only NEAR tokens (Ⓝ) can be attached to a function calls. However, the FT standard enables to attach fungible tokens in a call by using the FT-contract as intermediary. This means that, instead of you attaching tokens directly to the call, you ask the FT-contract to do both a transfer and a function call in your name.

Let's assume that you need to deposit FTs on Ref Finance.

<Tabs groupId="code-tabs">
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppAttachTokenToCall />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIAttachTokenToCall />
  </TabItem>
  <TabItem value="Lantstool" label={<LantstoolLabel />}>
    <TryOutOnLantstool path="docs/2.build/5.primitives/ft/attach-ft-to-call.json" />
  </TabItem>
  <TabItem value="📄 Contract"  label="📄 Contract"  default>
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

## Handling Deposits (Contract Only)

If you want your contract to handle deposit in FTs you have to implement the `ft_on_transfer` method. When executed, such method will know:

- Which FT was transferred, since it is the predecessor account.
- Who is sending the FT, since it is a parameter
- How many FT were transferred, since it is a parameter
- If there are any parameters encoded as a message

The `ft_on_transfer` must return how many FT tokens have to **be refunded**, so the FT contract gives them back to the sender.

```rust
// Implement the contract structure
#[near(contract_state)]
impl Contract {}

#[near]
impl FungibleTokenReceiver for Contract {
  // Callback on receiving tokens by this contract.
  // `msg` format is either "" for deposit or `TokenReceiverMessage`.
  fn ft_on_transfer(
    &mut self,
    sender_id: AccountId,
    amount: U128,
    msg: String,
  ) -> PromiseOrValue<U128> {
    let token_in = env::predecessor_account_id();

    assert!(token_in == self.ft_contract, "{}", "The token is not supported");
    assert!(amount >= self.price, "{}", "The attached amount is not enough");

    env::log_str(format!("Sender id: {:?}", sender_id).as_str());

    if msg.is_empty() {
      // Your internal logic here
      PromiseOrValue::Value(U128(0))
    } else {
      let message =
        serde_json::from_str::<TokenReceiverMessage>(&msg).expect("WRONG_MSG_FORMAT");
      match message {
        TokenReceiverMessage::Action {
          buyer_id,
        } => {
          let buyer_id = buyer_id.map(|x| x.to_string());
          env::log_str(format!("Target buyer id: {:?}", buyer_id).as_str());
          // Your internal business logic
          PromiseOrValue::Value(U128(0))
        }
      }
    }
  }
}
```

---

## Additional Resources

1. [NEP-141 and NEP-148 standards](https://nomicon.io/Standards/Tokens/FungibleToken/)
2. [FT Event Standards](https://nomicon.io/Standards/Tokens/FungibleToken/Event)
3. [FT reference implementation](https://github.com/near-examples/FT)
4. [Fungible Tokens 101](../tutorials/fts/0-intro.md) - a set of tutorials that cover how to create a FT contract using Rust.
