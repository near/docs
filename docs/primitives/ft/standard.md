---
id: standard
title: The Standard
description: "Learn how Fungible Tokens (FT) are defined on NEAR"
---

Besides the native NEAR token, users have access to a multitude of tokens created by institutions and other users known as fungible tokens.

In contrast with the native token, fungible token (FT) are **not stored** in the user's account, but rather in a smart contract. Such contract is in charge of doing **bookkeeping**, i.e. to track how many tokens each user has, and to handle transfers internally.

![FT](/assets/docs/primitives/ft.png)

In order for a contract to be considered a FT contract it has to follow the [**NEP-141**](https://github.com/near/NEPs/tree/master/neps/nep-0141.md) and [**NEP-148 standards**](https://github.com/near/NEPs/tree/master/neps/nep-0148.md)which define the **minimum interface** required to be implemented, as well as the expected functionality.

---

## NEP-141 (Fungible Token Interface)

[NEP-141](https://github.com/near/NEPs/tree/master/neps/nep-0141.md) is the blueprint for all fungible tokens (e.g. stablecoins, governance tokens, etc.) on NEAR.

It defines a **common set of rules** and **functions** that the contract MUST implement to be considered a fungible token contract.

:::tip

Notice that the NEP-141 defines the **interface** and **expected behavior** of a fungible token contract, but it does not dictate how the internal logic should be implemented

Different FT contracts can have different internal implementations while still adhering to the NEP-141 standard

:::

<hr class="subsection" />

### Interface

#### `ft_total_supply` (*read-only*)

Returns the total supply of the token

```ts
ft_total_supply(): string
```

<br />

#### `ft_balance_of` (*read-only*)

Returns the balance of a given account

```ts
ft_balance_of(account_id: string): string
```

<br />

#### `ft_transfer`

Transfers `amount` of tokens from the account calling the function to a `receiver_id`, optionally the function can include a `memo` field to provide additional information to the contract

> *Requirement: The caller must attach [exactly 1 yoctoNEAR](../../smart-contracts/security/one_yocto.md) to the call*

```ts
ft_transfer(receiver_id: string, amount: string, memo: string?): void
```

<br />

#### `ft_transfer_call`

The function transfers `amount` of tokens to the `receiver_id` **and calls the method `ft_on_transfer(sender_id, amount, msg)`** on `receiver_id`.

Optionally the function can include a `memo` for the FT contract, and a `msg` field to which will be sent to the receiver contract.

> 📖 This function is useful to transfer tokens to a contract and trigger some action on the receiver side in a single transaction, thus acting as **attaching fungible tokens to a function call**.

> *Requirement: The caller must attach [exactly 1 yoctoNEAR](../../smart-contracts/security/one_yocto.md) to the call*

```ts
ft_transfer_call(receiver_id: string, amount: string, memo: string?, msg: string): void
```

<details>

    <summary> ft_on_transfer </summary>

    Smart contracts expecting to **receive** Fungible Tokens **must** implement this method.

    The method **must** return the amount of tokens that were **NOT used** by the receiver, so that the **sender can be refunded**.

    ```ts
    ft_on_transfer(sender_id: string, amount: string, msg: string): string
    ```

    ⚠️ Note that this method does not need to be implemented by the FT contract itself, but rather by any contract that expects to receive fungible tokens

</details>

<br />

#### `ft_resolve_transfer`

This method is used as a [callback](../../smart-contracts/anatomy/crosscontract.md#callback-function) to resolve the `ft_transfer_call` transaction, handling refunds if necessary.

```js
ft_resolve_transfer(sender_id: string, receiver_id: string, amount: string): string
```

---

## NEP-145 (Storage Management)

On NEAR, accounts need to pay for the storage they use on the network. As more users hold tokens on a fungible token contract, more information needs to be stored, and thus the contract needs to reserve more storage.

[NEP-145](https://github.com/near/NEPs/blob/master/neps/nep-0145.md) is a standard that defines a common interface for registering users, allowing FT contracts to **charge users for the storage they use**.

:::tip

While not mandatory, it is highly recommended for FT contracts to implement the NEP-145 standard to avoid running out of storage

:::

<hr class="subsection" />

### Interface

#### `storage_balance_bounds` (*read-only*)
Returns the minimum and maximum storage balance required for an account to be registered with the contract

```ts
storage_balance_bounds(): { min: string, max?: string} | null
```

#### `storage_balance_of` (*read-only*)
Returns the storage balance of a given account, or `null` if the account is not registered

```ts
storage_balance_of(account_id: string): { total: string, available: string } | null
```

#### `storage_unregister`
Removes all information from an account from the contract, returning the storage deposit to the user. The function can only be called by the user themselves.

```ts
storage_unregister(force?: boolean): boolean
```

#### `storage_deposit`
Registers an account with the contract, reserving enough storage to keep track of the user's balance. The function can be called by the user themselves **or by a third party** on behalf of the user.

```ts
storage_deposit(account_id?: string, registration_only?: boolean): { total: string, available: string }
```

#### `storage_withdraw`
Unregisters an account from the contract, returning the storage deposit to the user. The function can only be called by the user themselves.

```ts
storage_withdraw(amount: string): { total: string, available: string }
```



---

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

A balance of `123456` units of such token should be displayed in a user interface as `12.3456 MAT`.