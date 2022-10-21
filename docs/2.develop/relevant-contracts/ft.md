---
id: ft
title: Fungible Tokens
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Besides the native NEAR token, NEAR accounts have access to a multitude of fungible tokens (e.g. [these whitelisted tokens](https://guide.ref.finance/developers-1/cli-trading#query-whitelisted-tokens)). Moreover, it is even possible for users to create their own fungible tokens.

In contrast with the NEAR native token, fungible token (FT) are **not stored** in the user's wallet. In fact, each FT lives in **their own contract** which is in charge of doing **bookkeeping**. This is, the contract keeps track of how many tokens each user has, and handles transfers internally.

In order for a contract to be considered a FT-contract it has to follow the [**NEP-141 and NEP-148 standards**](https://nomicon.io/Standards/FungibleToken/). The **NEP-141** & **NEP-148** standards explain the **minimum interface** required to be implemented, as well as the expected functionality.

:::tip Reference Implementation
We provide a [FT reference implementation](https://github.com/near-examples/FT) ready to be deployed and use.
:::

<!-- ### Summary of Methods -->

---

## Creating a Fungible Token
Creating a new FT is as simple as deploying a new FT contract and initializing it. On initialization you will define the token's metadata such as its name (e.g. Ethereum), symbol (e.g. ETH) and total supply (e.g. 10M). You will also define an `owner`, which will own the tokens **total supply**.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  # 1. Deploy the contract in a testnet account
  near dev-deploy --wasmFile fungible_token.wasm

  # 2. Initialize the contract with metadata
  near call <ft-contract> new '{"owner_id": "<owner-account>", "total_supply": "1000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "Example Token Name", "symbol": "EXLT", "decimals": 8 }}' --accountId <ft-contract>

  ```

  </TabItem>
</Tabs>

:::info
On initialization you will define an **owner**, who will own **ALL** the tokens.
:::

<hr class="subsection"/>

## Querying Metadata
You can query the FT's metadata by calling the `ft_metadata`.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near view <ft-contract> ft_metadata
  ```

  </TabItem>
</Tabs>

<hr class="subsection"/>

## Registering a User
In order for a user to own and transfer tokens they need to first **register** in the contract. This is done by calling `storage_deposit` and attaching 0.00125Ⓝ. This method also allows to pay for other users to register them.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <ft-contract> storage_deposit '{"account_id": "<account-to-register>"}' --accountId <your-account> --amount 0.00125
  ```

  </TabItem>
</Tabs>


:::info
You can make sure a user is registered by asserting they have a `storage_balance_of` greater than 0.00125 Ⓝ.
:::

:::tip
After you call the `storage_deposit` the FT will appear in the NEAR WALLET. 
:::

<hr class="subsection"/>

## Getting Balance
To know how many coins a user has you will need to query the method `ft_balance_of`.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near view <ft-contract> ft_balance_of '{"account_id": "<users-account>"}'
  ```
  
  </TabItem>
</Tabs>

:::caution
  Keep in mind the `decimals` from the [metadata](#query-metadata). A balance of `150 FT` for a token with 2 `decimals` actually represents `1.50 FT`.
:::

<hr class="subsection"/>

## Transferring
To send FT to another account you will use the `ft_transfer` method, indicating the receiver and the amount of FT you want to send.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <ft-contract> ft_transfer '{"receiver_id": "<receiver-account>", "amount": "<amount>"}' --accountId <your-account> --depositYocto 1
  ```
  
  </TabItem>
</Tabs>

:::tip
Implement [events](https://nomicon.io/Standards/Tokens/FungibleToken/Event) to be able to [track FT transfers in real time](../../4.tools/events.md).
:::

:::warning
In order to send a fungible token to an account, both the sender and receiver must be [registered](#register-a-user) in the FT contract.
:::

<hr class="subsection"/>

## Attaching FTs to a Call
Natively, only NEAR tokens (Ⓝ) can be attached to a method calls. However, the FT standard enables to attach fungible tokens in a call by using the FT-contract as intermediary. This means that, instead of you attaching tokens directly to the call, you ask the FT-contract to do both a transfer and a method call in your name.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <ft-contract> ft_transfer_call '{"receiver_id": "<receiver-contract>", "amount": "<amount>", "msg": "<a-string-message>"}' --accountId <user_account_id> --depositYocto 1
  ```
  
  </TabItem>
</Tabs>

#### Example
Assume you want to attach some FT (🪙) to a call on the receiver contract. The workflow is as follows:
1. You call `ft_transfer_call` in the 🪙-contract passing: the receiver, a message, and the amount.
2. The FT contract transfers the amount to the receiver.
3. The FT contract calls **`receiver.ft_on_transfer(sender, msg, amount)`**.
4. The FT contract handles errors in the `ft_resolve_transfer` callback.
5. The FT contract returns you how much of the attached amount was actually used.

#### The ft_on_transfer method
From the workflow above it follows that the receiver we want to call needs to implement the `ft_on_transfer` method. When executed, such method will know:
- Which FT was transferred, since it is the [`predecessor`](../contracts/environment/environment.md#predecessor-and-signer) account.
- Who is sending the FT, since it is a parameter
- How many FT were transferred, since it is a parameter
- If there are any parameters encoded as a message

The `ft_on_transfer` **must return how many FT tokens it used**, so the FT contract knows how many to transfer you back.

<hr class="subsection"/>

## Events
You can track real time events (such as transfers) by implementing the [FT Event Standards](https://nomicon.io/Standards/Tokens/FungibleToken/Event).
`Events` are simple to use, because they are just login messages formatted in a standardize way. Since these logged messages are public, a service
can then be built to [track them in real time](../../4.tools/events.md).