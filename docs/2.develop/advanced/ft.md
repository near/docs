---
id: ft
title: 🪙 Fungible Tokens
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- NEAR has a Fungible Token standard, here we explain how to integrate them into your contract

## NEP XXX

## Minting

## Balance

## Transferring

## Transfer and Call -->

The NEAR blockchain uses natively the NEAR token as means of transferring value. However, anyone can create and use a multitude of other fungible (interchangeable) tokens (e.g. these [whitelisted tokens on Ref Finance](https://docs.ref.finance/smart-contracts/ref-exchange#get-global-token-whitelist)).

In contrast with the NEAR native token, fungible tokens (FT) are **not stored** in the user's wallet. In fact, FT live in **their own contract** which does **bookkeeping**. This is, the contract keeps track of how many tokens each user has, and handles transfers internally.

In order for a contract to be considered a FT-contract it has to follow the [**NEP-141 Standard**](https://nomicon.io/Standards/FungibleToken/). The **NEP-141** Standard explains the **minimum interface** required to be implemented, as well as its expected functionality.

:::tip Reference Implementation
We provide a [reference implementation](https://github.com/near-examples/FT) ready to be deployed and use.
:::

<!-- ### Summary of Methods -->

---

## Using Fungible Tokens
Let's take a dive into the most common use cases for Fungible Tokens, and how to do them in NEAR.

<hr class="subsection"/>

### Create a Fungible Token
Creating a new FT is as simple as deploying a new [FT contract](#the-fungible-token-standard-nep-141) and initializing it. On initialization you will define the token's metadata such as its name (i.e. Ethereum), symbol (i.e. ETH) and total supply. You will also define an `owner`, which will own the tokens **total supply**.

<Tabs className="language-tabs">
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

### Query Metadata
You can query the FT's metadata by calling the `ft_metadata`.

<Tabs className="language-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near view <ft-contract> ft_metadata
  ```

  </TabItem>
</Tabs>

<hr class="subsection"/>

### Register a User
In order for a user to own and transfer tokens they need to first **register** in the contract. This is done by calling `storage_deposit` and attaching 0.00125Ⓝ. This method also allows to pay for other users to register them.

<Tabs className="language-tabs">
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

### Get User's Balance
To know how many coins a user has you will need to query the method `ft_balance_of`.

<Tabs className="language-tabs">
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

### Simple transfer {#simple-transfer}
To send FT to another account you will use the `ft_transfer` method, indicating the receiver and the amount of FT you want to send.

<Tabs className="language-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <ft-contract> ft_transfer '{"receiver_id": "<receiver-account>", "amount": "<amount>"}' --accountId <your-account> --depositYocto 1
  ```
  
  </TabItem>
</Tabs>


:::warning
In order to send a fungible token to an account, both the sender and receiver must be [registered](#register-a-user) in the FT contract.
:::

<hr class="subsection"/>

### Attach FT to a Call
In NEAR you can only attach NEAR tokens (Ⓝ) to method calls. However, something similar can be achieved with Fungible Tokens. The main difference is that, instead of attaching tokens directly to the call, we ask the FT-contract to do the call for us while attaching FTs.

<Tabs className="language-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <ft-contract> ft_transfer_call '{"receiver_id": "<receiver-contract>", "amount": "<amount>", "msg": "<a-string-message>"}' --accountId <user_account_id> --depositYocto 1
  ```
  
  </TabItem>
</Tabs>

#### How Does it Work?
Assume you want to attach 🪙-amount FT to a call in the 🤖-receiver contract. The workflow is as follows:
1. You call FT passing the 🤖-receiver, a 💬-message and the 🪙-amount.
2. FT transfers 🪙-amount to the 🤖-receiver.
3. FT calls **`ft_on_transfer(sender, 💬 msg, 🪙 amount)`** in the 🤖-receiver.
4. FT handles errors in the `ft_resolve_transfer` callback.
5. FT returns you how much of the attached 🪙-amount was actually used.

#### The ft_on_transfer method
From the workflow above it follows that the receiver we want to call needs to implement the `ft_on_transfer` method. When executed, such method will know:
- Which FT was transfered, since it is the [`predecessor` account](../contracts/environment/environment.md#predecessor-and-signer).
- Who is sending the FT, since it is a parameter
- How many FT where transfered, since it is a parameter
- If there are any parameters encoded as a message

After executing, the `ft_on_transfer` **must return how many FT tokens it used** during the call. In this way, the FT contract knows how many to transfer back to the user.