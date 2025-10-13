---
id: standard
title: The Standard
description: "Learn how Linkdrops are defined on NEAR"
---

Linkdrops allow users to distribute assets and onboard people to Web3 apps through a simple web link.

![Linkdrop](/assets/docs/primitives/linkdrop.png)

They work by storing assets and linking [AccessKeys](../../protocol/access-keys.md) to them. The `AccessKeys` are then distributed to users in the form of web links. These links take users to a website that automatically uses the keys to call the `claim` method in the `linkdrop` contract.

In order for a contract to be considered a Linkdrop-contract it has to follow the [**NEP-452 standard**](https://github.com/near/NEPs/blob/master/neps/nep-0452.md). The **NEP-452** explains the **minimum interface** required to be implemented, as well as the expected functionality.

---

## NEP-452 (Linkdrop Standard)

[NEP-452](https://github.com/near/NEPs/blob/master/neps/nep-0452.md) is the blueprint for all linkdrop contracts on NEAR. It defines a **common set of rules** and **functions** that the contract MUST implement to be considered a linkdrop contract.

:::tip

Notice that the NEP-452 defines the **interface** and **expected behavior** of a linkdrop contract, but it does not dictate how the internal logic should be implemented

Different linkdrop contracts can have different internal implementations while still adhering to the NEP-452 standard

:::

<hr class="subsection" />

### Interface

#### `get_key_balance` (*read-only*)

Allows to query the amount of NEAR tokens assigned to a specific linkdrop key

```ts
get_key_balance(key: string): string;
```

<br />

#### `get_key_information` (*read-only*)

Returns information about a specific linkdrop key, including the amount of NEAR tokens assigned to it, the receiver ID, and whether the key has been claimed

```ts
interface NFTData {
  contract_id: string;
  token_id: string;
}

interface FTData {
  contract_id: string;
  amount: string;
}

get_key_information(key: string): { required_gas: string, yoctonear: string, nft_list: NFTData[], ft_list: FTData[] };
```

<br />

#### `claim`

Allows a user to claim the assets associated with a specific key. The function transfers the NEAR tokens, NFTs, and FTs assigned to the provided `account_id`, which MUST exist prior to calling this method.

> ⚠️ Users need to call this method signing the transaction with the **linkdrop key they received**. 

```ts
claim(account_id: string): boolean;
```

<br />

#### `create_account_and_claim`

Allows a user to **create a new account** and **claim the assets** associated with a specific key. The function creates the new account with the provided `new_account_id` and transfers the NEAR tokens, NFTs, and FTs assigned to it.

> ⚠️ Users need to call this method signing the transaction with the **linkdrop key they received**. 

```ts
create_account_and_claim(new_account_id: string, new_public_key: string): Promise<boolean>;
```