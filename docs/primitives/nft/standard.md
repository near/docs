---
id: standard
title: The Standard
hide_table_of_contents: false
description: "The NEP-141 standard defines Fungible Tokens (FT) on NEAR"
---

import {FeatureList, Column, Feature} from "@site/src/components/featurelist"

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import { LantstoolLabel } from "@site/src/components/lantstool/LantstoolLabel/LantstoolLabel";
import { TryOutOnLantstool } from "@site/src/components/lantstool/TryOutOnLantstool";

import CreateTokenForm from "@site/src/components/tools/FungibleToken/CreateTokenForm";

In contrast with fungible tokens, non-fungible tokens (NFT) are unitary and therefore unique. This makes NFTs ideal to represent ownership of assets such as a piece of digital content, or a ticket for an event.

As with fungible tokens, NFTs are **not stored** in the user's wallet, instead, each NFT lives in a **NFT contract**. The NFT contract works as a bookkeeper, being in charge of creating, storing and transferring NFTs.

:::info NFT & Marketplaces

Be mindful of not confusing an NFT with an NFT-marketplace. NFT simply store information (metadata), while NFT-marketplaces are contracts where NFT can be listed and exchanged for a price.

:::

---

## NEP-171 (NFT Interface)

[NEP-171](https://github.com/near/NEPs/tree/master/neps/nep-0171.md) is the blueprint for all non-fungible tokens on NEAR. It defines a **common set of rules** and **functions** that the contract MUST implement to be considered a non-fungible token contract.

:::tip

Notice that the NEP-171 defines the **interface** and **expected behavior** of a non-fungible token contract, but it does not dictate how the internal logic should be implemented

Different NFT contracts can have different internal implementations while still adhering to the NEP-171 standard

:::

<hr class="subsection" />

### Interface

#### `nft_token` (*read-only*)

Returns the token information for a given `token_id`

```ts
nft_token(token_id: string): { token_id: string, owner_id: string } | null
```

#### `nft_transfer`
Transfers the `token_id` from the caller to the `receiver_id`, optionally the function can include a `memo` field to provide additional information to the contract

The caller must be the **either** the current owner of the token or an **account** that has been **approved to transfer** the token on behalf of the owner, such as a marketplace contract. The approval mechanism is defined in the [NEP-178 standard](https://github.com/near/NEPs/blob/master/neps/nep-0178.md).

> *Requirement: The caller must attach [exactly 1 yoctoNEAR](../../smart-contracts/security/one_yocto.md) to the call*

```ts
nft_transfer(receiver_id: string, token_id: string, approval_id?: number, memo: string?): void
```

#### `nft_transfer_call`

The function transfers the `token_id` to the `receiver_id` **and calls the method `nft_on_transfer(sender_id, previous_owner_id, token_id, msg)`** on `receiver_id`.

Optionally the function can include a `memo` for the NFT contract, and a `msg` field to which will be sent to the receiver contract.

> 📖 This function is useful to transfer NFTs to a contract and trigger some action on the receiver side in a single transaction, thus acting as **attaching NFTs to a function call**

```ts
nft_transfer_call(receiver_id: string, token_id: string, approval_id?: number, memo?: string, msg: string): Promise {}
```

<details>

    <summary> nft_on_transfer </summary>

    Smart contracts expecting to **receive** Non-Fungible Tokens **must** implement this method.

    The method **must** return a boolean value indicating whether the token should be returned to the sender (`true`) or not (`false`).

    ```ts
    nft_on_transfer(sender_id: string, previous_owner_id: string, token_id: string, msg: string): boolean
    ```

    ⚠️ Note that this method does not need to be implemented by the NFT contract itself, but rather by any contract that expects to receive non-fungible tokens

</details>

#### `nft_resolve_transfer`

This method is used as a [callback](../../smart-contracts/anatomy/crosscontract.md#callback-function) to resolve the `nft_transfer_call` transaction, handling refunds if necessary.

It must return `true` if the token was successfully transferred to `receiver_id`, or `false` if the token was returned to `owner_id`.

```js
nft_resolve_transfer(owner_id: string, receiver_id: string, token_id: string, approved_account_ids?: Record<string, number>): boolean
```

---

## NEP-177 (NFT Metadata)

[NEP-177](https://github.com/near/NEPs/blob/master/neps/nep-0177.md) is an extension to the NEP-171 standard that defines the **metadata** for both non-fungible tokens and non-fungible token contracts.

Metadata provides **key information** , such as the contract's **name** or the NFT's **title**. Particularly, the following fields MUST be included in the smart contract and token's metadata:

```ts
type NFTContractMetadata = {
  spec: string, // required, essentially a version like "nft-1.0.0"
  name: string, // required, ex. "Mochi Rising — Digital Edition" or "Metaverse 3"
  symbol: string, // required, ex. "MOCHI"
  icon: string|null, // Data URL
  base_uri: string|null, // Centralized gateway known to have reliable access to decentralized storage assets referenced by `reference` or `media` URLs
  reference: string|null, // URL to a JSON file with more info
  reference_hash: string|null, // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}

type TokenMetadata = {
  title: string|null, // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
  description: string|null, // free-form description
  media: string|null, // URL to associated media, preferably to decentralized, content-addressed storage
  media_hash: string|null, // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
  copies: number|null, // number of copies of this set of metadata in existence when token was minted.
  issued_at: number|null, // When token was issued or minted, Unix epoch in milliseconds
  expires_at: number|null, // When token expires, Unix epoch in milliseconds
  starts_at: number|null, // When token starts being valid, Unix epoch in milliseconds
  updated_at: number|null, // When token was last updated, Unix epoch in milliseconds
  extra: string|null, // anything extra the NFT wants to store on-chain. Can be stringified JSON.
  reference: string|null, // URL to an off-chain JSON file with more info.
  reference_hash: string|null // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
}
```

---

## NEP-178 (NFT Approval Management)

[NEP-178](https://github.com/near/NEPs/blob/master/neps/nep-0178.md) is an extension to the NEP-171 standard that defines the **approval management** for non-fungible tokens.

The approval mechanism allows the owner of an NFT to authorize another account (for example, a marketplace contract) to transfer the token on their behalf.

<hr class="subsection" />

### Interface

#### `nft_is_approved` (*read-only*)

Returns whether an `approved_account_id` is actually approved to transfer the `token_id` on behalf of the token owner. If `approval_id` is provided, it will also check that the approval ID matches.

```ts
nft_is_approved(token_id: string, approved_account_id: string, approval_id?: number): boolean
```

#### `nft_approve`

Grants approval to `account_id` to transfer the `token_id` on behalf of the token owner. Optionally, the function can include a `msg` field to provide additional information to the contract.

> *Requirement: The caller must attach a deposit of at least `1 yoctoNEAR` plus the storage cost for adding the new approval*

```ts
nft_approve(token_id: string, account_id: string, msg?: string): void
```

#### `nft_revoke`
Revokes approval for `account_id` to transfer the `token_id` on behalf of the token owner.

> *Requirement: The caller must attach [exactly 1 yoctoNEAR](../../smart-contracts/security/one_yocto.md) to the call*

```ts
nft_revoke(token_id: string, account_id: string): void
```

#### `nft_revoke_all`

Revokes all approvals for the `token_id`.

> *Requirement: The caller must attach [exactly 1 yoctoNEAR](../../smart-contracts/security/one_yocto.md) to the call*

```ts
nft_revoke_all(token_id: string): void
```




<!--

## NEP-148 (Token Metadata)

[NEP-148](https://github.com/near/NEPs/tree/master/neps/nep-0141.md) is an extension to the NEP-141 standard that defines the fungible tokens **metadata**.

Metadata provides **key information** about the token, such as its **name, symbol, and decimal precision**, particularly, the following fields MUST be included in the token's metadata:

- `spec`: a string. Should be `ft-1.0.0` to indicate that a Fungible Token contract adheres to the current versions of this Metadata and the [Fungible Token Core][FT Core] specs
- `name`: the human-readable name of the token
- `symbol`: the abbreviation, like wETH or AMPL
- `decimals`: used in frontends to show the proper significant digits of a token

The metadata is useful for wallets and other user interfaces to display the token correctly, for example if a token is defined as:

```json
{
  "spec": "ft-1.0.0",
  "name": "My Awesome Token",
  "symbol": "MAT",
  "decimals": 4
}
```

A balance of `123456` units of such token should be displayed in a user interface as `12.3456 MAT`. -->