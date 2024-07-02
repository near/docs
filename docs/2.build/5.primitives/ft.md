---
id: ft
title: Fungible Tokens (FT)
hide_table_of_contents: false
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import BOSGetMetadata from "./ft/bos/get-metadata.md"
import BOSCheckBalance from "./ft/bos/check-balance.md"
import BOSSendToken from "./ft/bos/send.md"
import BOSRegister from "./ft/bos/register.md"
import BOSAttachTokenToCall from "./ft/bos/attach-to-call.md"
import BOSCreateToken from "./ft/bos/create.md"

import WebAppGetMetadata from "./ft/web-app/get-metadata.md"
import WebAppCheckBalance from "./ft/web-app/check-balance.md"
import WebAppSendToken from "./ft/web-app/send.md"
import WebAppRegister from "./ft/web-app/register.md"
import WebAppAttachTokenToCall from "./ft/web-app/attach-to-call.md"
import WebAppCreateToken from "./ft/web-app/create.md"

import CLIGetMetadata from "./ft/near-cli/get-metadata.md"
import CLICheckBalance from "./ft/near-cli/check-balance.md"
import CLISendToken from "./ft/near-cli/send.md"
import CLIRegister from "./ft/near-cli/register.md"
import CLIAttachTokenToCall from "./ft/near-cli/attach-to-call.md"
import CLICreateToken from "./ft/near-cli/create.md"

import SmartContractSendToken from "./ft/smart-contract/send.md"
import SmartContractAttachTokenToCall from "./ft/smart-contract/attach-to-call.md"

Besides the native NEAR token, NEAR accounts have access to a [multitude of tokens](https://guide.ref.finance/developers-1/cli-trading#query-whitelisted-tokens) to use thoughtout the ecosystem. Moreover, it is even possible for users to create their own fungible tokens.

In contrast with the NEAR native token, fungible token (FT) are **not stored** in the user's account. In fact, each FT lives in **their own contract** which is in charge of doing **bookkeeping**. This is, the contract keeps track of how many tokens each user has, and handles transfers internally.

![FT](/docs/primitives/ft.png)

In order for a contract to be considered a FT-contract it has to follow the [**NEP-141 and NEP-148 standards**](https://nomicon.io/Standards/FungibleToken/). The **NEP-141** & **NEP-148** standards explain the **minimum interface** required to be implemented, as well as the expected functionality.

---

## Token Factory
You can create an FT using the community tool [Token Farm](https://tkn.farm/). Token farm is a token factory, you can interact with it through its graphical interface, or by making calls to its contract.

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSCreateToken />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppCreateToken />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLICreateToken />
  </TabItem>
</Tabs>

The FT you create will live in the account `<your_token_symbol>.tkn.near` (e.g. `test.tkn.near`).

---

## Deploying Your Own Contract

You can also create a fungible token by deploying and initializing a [canonical FT contract](https://github.com/near-examples/FT).

On initialization you will define the token's metadata such as its name (e.g. Ethereum), symbol (e.g. ETH) and total supply (e.g. 10M). You will also define an `owner`, which will own the tokens **total supply**.

To initialize a FT contract you will need to deploy it and then call the `new` method defining the token's metadata.

```bash
near deploy <account-id> --wasmFile fungible_token.wasm

near call <account-id> new '{"owner_id": "<owner-account>", "total_supply": "1000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "Example Token Name", "symbol": "EXLT", "decimals": 8 }}' --accountId <account-id>
```

:::tip
Check the [Contract Wizard](https://dev.near.org/contractwizard.near/widget/ContractWizardUI) to create a personalized FT contract!.
:::

---

## Querying Metadata
You can query the FT's metadata by calling the `ft_metadata`.

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSGetMetadata />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppGetMetadata />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIGetMetadata />
  </TabItem>
</Tabs>

---

## Checking Balance
To know how many coins a user has you will need to query the method `ft_balance_of`.

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSCheckBalance />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppCheckBalance />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLICheckBalance />
  </TabItem>
</Tabs>

---

## Registering a User
In order for an user to own and transfer tokens they need to first **register** in the contract. This is done by calling `storage_deposit` and attaching 0.00125Ⓝ.

By calling this `storage_deposit` the user can register themselves or **register other users**.

<Tabs groupId="code-tabs">
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSRegister />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppRegister />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIRegister />
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
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSSendToken />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppSendToken />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLISendToken />
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
  <TabItem value="⚛️ Component" label="⚛️ Component" default>
    <BOSAttachTokenToCall />
  </TabItem>
  <TabItem value="🌐 WebApp" label="🌐 WebApp">
    <WebAppAttachTokenToCall />
  </TabItem>
  <TabItem value="🖥️ CLI" label="🖥️ CLI">
    <CLIAttachTokenToCall />
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
4. [Fungible Tokens 101](../../3.tutorials/fts/0-intro.md) - a set of tutorials that cover how to create a FT contract using Rust.
