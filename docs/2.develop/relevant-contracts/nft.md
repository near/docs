---
id: nft
title: Non Fungible Tokens
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In contrast with [fungible tokens](ft.md), non-fungible tokens (NFT) are unitary and therefore unique. This makes NFTs ideal to represent ownership of assets such as a piece of digital content, or a ticket for an event.

As with fungible tokens, NFTs are **not stored** in the user's wallet, instead, each NFT lives in a **NFT contract**. The NFT contract works as a bookkeeper, this is: it is in charge of handling the creation, storage and transfers of NFTs.

In order for a contract to be considered a NFT-contract it has to follow the [**NEP-171 and NEP-177 standards**](https://nomicon.io/Standards/Tokens/NonFungibleToken). The **NEP-171** & **NEP-177** standards explain the **minimum interface** required to be implemented, as well as the expected functionality.

:::tip Reference Implementation
We provide a [reference implementation](https://github.com/near-examples/NFT) ready to be deployed and use.
:::

:::info NFT & Marketplaces
Be mindful of not confusing an NFT with an NFT-marketplace. NFT simply store information (metadata), while NFT-marketplaces are contracts where NFT can be listed and exchanged for a price.
:::

---


## Minting an NFT
In order to create a new NFT (a.k.a. mint it) you need first to deploy an [NFT contract](https://github.com/near-examples/NFT) and initialize it with an `owner`. Currently, the `owner` simply sets an internal variable (`Contract.owner_id`), meaning it is **NOT the default owner** of all minted NFTs.

Once deployed and initialized, you can call the `nft_mint` method. You will need to pass as parameters a unique id, an owner, the token's metadata, and (optionally) royalties. The metadata will include information such as the title, a description, and an URL to associated media.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  # 1. Deploy the contract in a testnet account
  near dev-deploy --wasmFile non_fungible_token.wasm

  # 2. Initialize NFT contract

  # 3. Mint an NFT
  near call <nft-contract> nft_mint '{"token_id": "<token-unique-id>", "receiver_id": "<nft-owner-account>", "token_metadata": {"title": "<title>", "description": "<description>", "media": "<url>" }, "royalties": {"<account>" : <percentage>, "<account>" : <percentage>}}' --accountId <your-account>

  ```

  </TabItem>
</Tabs>

:::info
See the [metadata standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata) for the full list of `TokenMetadata` parameters.
:::

:::tip
Implement [events](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event) to be able to [track NFT mints in real time](../../4.tools/events.md).
:::

### Minting Collections
Many times people want to create multiple 100 copies of an NFT (this is called a collection). In such cases, what you actually need to do is to mint 100 different NFTs with the same metadata (but different `token-id`).

### Royalties
You might have noticed that one of the parameters is a structure called royalties. Royalties enable you to create a list of users that should get paid when the token is sell in a marketplace. For example, if `anna` has `5%` of royalties, each time the NFT is sell, `anna` should get a 5% of the selling price.

<hr class="subsection"/>

## Querying Metadata
You can query the NFT's metadata by calling the `nft_metadata`.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near view <nft-contract> nft_metadata
  ```

  </TabItem>
</Tabs>

<hr class="subsection"/>

## Approving Users
You can authorize other users to transfer an NFT you own. This is useful, for example, to enable listing your NFT in a marketplace. In such scenario, you **trust** that the marketplace will only transfer the NFT upon receiving a certain amount of money in exchange.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <nft-contract> nft_approve '{
   "token_id": "<token-unique-id>",
   "account_id": "<authorized-account>",
   "msg": "<json-structure>"
  }' --accountId <your-account> --depositYocto 1

  ```

  </TabItem>
</Tabs>

:::info
If the `msg` parameter is included, then a cross-contract call will be made to `<authorized_account>.nft_on_approve(msg)`. Which in turn will make a callback to `nft_resolve_transfer` in your NFT contract.
:::


<hr class="subsection"/>

## Transferring an NFT
Transferring an NFT can happen in two scenarios: (1) you ask to transfer an NFT, and (2) an authorized account asks to transfer the NFT. In both cases, it is necessary to invoke the `nft_transfer` method, indicating the token id, the receiver, and an (optionally) an [approval_id](https://nomicon.io/Standards/Tokens/NonFungibleToken/ApprovalManagement).

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <nft-contract> nft_transfer '{"receiver_id": "<receiver-account>", "token_id": "<token-unique-id>"}' --accountId <your-account> --depositYocto 1
  ```
  
  </TabItem>
</Tabs>

:::tip
Implement [events](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event) to be able to [track NFT transfers in real time](../../4.tools/events.md).
:::

<hr class="subsection"/>

## Attaching NFTs to a Call
Natively, only NEAR tokens (Ⓝ) can be attached to a method calls. However, the NFT standard enables to attach a non-fungible tokens in a call by using the NFT-contract as intermediary. This means that, instead of you attaching tokens directly to the call, you ask the NFT-contract to do both a transfer and a method call in your name.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="cli" label="NEAR CLI">

  ```bash
  near call <nft-contract> nft_transfer_call '{"receiver_id": "<receiver-contract>", "token_id": "<token_id>", "msg": "<a-string-message>"}' --accountId <your-account> --depositYocto 1
  ```
  
  </TabItem>
</Tabs>

:::info
Optionally, a [`memo` parameter](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core#nft-interface) can be passed to provide more information to your contract.
:::

### How Does it Work?
Assume you want to attach an NFT (🎫) to a call on the receiver contract. The workflow is as follows:
1. You call `nft_transfer_call` in the NFT-contract passing: the receiver, a message, and the token-id of 🎫.
2. The NFT contract transfers the NFT 🎫 to the receiver.
3. The NFT contract calls **`receiver.nft_on_transfer(sender, token-owner, token-id, msg)`**.
4. The NFT contract handles errors in the `nft_resolve_transfer` callback.
5. The NFT contract returns `true` if it succeeded.

#### The nft_on_transfer method
From the workflow above it follows that the receiver we want to call needs to implement the `nft_on_transfer` method. When executed, such method will know:
- Who is sending the NFT, since it is a parameter
- Who is the current owner, since it is a parameter
- Which NFT was transferred, since it is a parameter.
- If there are any parameters encoded as a message

The `nft_on_transfer` **must return true** if the NFT has to be **returned to the sender**.

<hr class="subsection"/>

## Events
You can track real time events (such as transfers) by implementing the [NFT Event Standards](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event).
`Events` are simple to use, because they are just login messages formatted in a standardize way. Since these logged messages are public, a service
can then be built to [track them in real time](../../4.tools/events.md).