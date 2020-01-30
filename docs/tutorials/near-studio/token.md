---
id: token
title: Issue your own token (ERC20)
sidebar_label: Issue a Token
---

We have pre-built a template for this tutorial in [NEAR Studio](http://near.dev) which you can open by visiting studio and selecting the "Token Smart Contract" template. You can try running the application right away to see the code interacting with the blockchain.

In this tutorial we'll build this application from scratch.

![NEAR Studio Token sample](/docs/assets/near-studio-launch-screen-token-smart-contract.png)


<blockquote class="warning">
<strong>heads up</strong><br><br>

The intention of this tutorial is to get you up to speed as quickly as possible on the platform but please be aware that AssemblyScript is for non financial use cases.

</blockquote>

## ERC-20 standard

The ERC-20 standard is one of Ethereum's most popular standards. It defines how custom tokens should be built. This is the same standard which was used to issue most of the ICOs in 2017 and 2018.

Specifically, any new token must follow next interface:

* `totalSupply(): uint256` - View function that returns the total token supply.
* `balanceOf(owner: address): uint256` - View function that returns the account balance of another account with address `owner`.
* `transfer(to: address, value: uint256)` - Send `value` amount of tokens to address `to`.
* `transferFrom(from: address, to: address, value: uint256)` - Send `value` amount of tokens from address `from` to address `to`.
* `approve(spender: address, value: uint256)` - Allow `spender` to withdraw from your account, multiple times, up to the `value` amount. If this function is called again it overwrites the current allowance with `value`
* `allowance(owner: address, spender: address): uint256` - View function, returns the amount which `spender` is still allowed to withdraw from `owner`.

Note, NEAR currently doesn't have native `uint256`/`uint128` so for this tutorial we going to use u64. The support is coming in a few weeks.

You can read the official [ERC-20 Token Standard here](https://eips.ethereum.org/EIPS/eip-20).

## Building basic token

If you haven't done so already ...

> In a new browser tab or window
> - Open [NEAR Studio](https://near.dev)
>
> In the *Create New Project* screen that appears
> - Select **Token Smart Contract**
> - Click **Create**

Let's start by defining number of tokens (non-divisible units) our token will have. This is a decision point for the developer, and here we will assume we going to have `1,000,000`.

This way we can implement `totalSupply` function:

> In the file `assembly/main.ts`
> - You will find the following lines of code  \
> *(note: there may be other code and comments in the file as well)*

```typescript
let balances = new PersistentMap<string, u64>("b:");
let approves = new PersistentMap<string, u64>("a:");

let TOTAL_SUPPLY: u64 = 1000000;

export function totalSupply(): string {
  return TOTAL_SUPPLY.toString();
}
```
The `PersistentMap` is needed to keep track of the current and previously recorded balances and approvals.

We also need some way to initialize our contract to award all these tokens to initial owner. This also goes into how to change storage in the smart contract.

> Also in the same file `assembly/main.ts`
> - You will find the following lines of code  \
> *(note: there may be other code and comments in the file as well)*

```ts
export function init(initialOwner: string): void {
  logging.log("initialOwner: " + initialOwner);
  assert(storage.get<string>("init") == null, "Already initialized token supply");
  balances.set(initialOwner, TOTAL_SUPPLY);
  storage.set<string>("init", "done");
}
```

In example above we have a `storage` object that is accessible by this contract to store data. It's just a key-value storage.  You can see the full implementation of the `Storage` class in the [`near-runtime-ts` source here](https://github.com/nearprotocol/near-runtime-ts/blob/master/assembly/storage.ts).

Now that it's initialized, we can check the balance of users.

> Also in the same file `assembly/main.ts`
> - You will find the following lines of code  \
> *(note: there may be other code and comments in the file as well)*

```ts
export function balanceOf(tokenOwner: string): u64 {
  logging.log("balanceOf: " + tokenOwner);
  if (!balances.contains(tokenOwner)) {
    return 0;
  }
  let result = balances.getSome(tokenOwner);
  return result;
}
```

Let's build harder part, transferring money from current user to somebody else.

> Also in the same file `assembly/main.ts`
> - You will find the following lines of code  \
> *(note: there may be other code and comments in the file as well)*

```ts
export function transfer(to: string, tokens: u64): boolean {
  logging.log("transfer from: " + context.sender + " to: " + to + " tokens: " + tokens.toString());
  let fromAmount = balanceOf(context.sender);
  assert(fromAmount >= tokens, "not enough tokens on account");
  balances.set(context.sender, fromAmount - tokens);
  balances.set(to, balanceOf(to) + tokens);
  return true;
}
```

Note, this is not a view function and it can fail, so we need to return `boolean` to indicate if it was successful. We first check the balance of `context.sender`, which is the user that executed given transaction. If there is not enough money on the balance, we return `false`. Otherwise, subtract `value` from the balance of sender and increment balance of `to`.

You can see the full implementation of the `Context` class in the[ `near-runtime-ts` source here](https://github.com/nearprotocol/near-runtime-ts/blob/master/assembly/contract.ts).

You'll notice that we've also implemented `transferFrom`, `approve` and `allowance` in the sample.

Once you deploy the contract you can run the following commands in the browser console.

To initialize the balance
```ts
contract.init({initialOwner: walletAccount.getAccountId()}
```

To check your balance
```ts
contract.balanceOf({tokenOwner: walletAccount.getAccountId()})
```

To transfer funds, e.g. to Bob
```ts
contract.transfer({to: 'bob.near', tokens: '1000'})
```
