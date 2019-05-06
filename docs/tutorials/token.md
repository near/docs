---
name: A new token contract (ERC-20)
route: /tutorials/erc20
menu: Tutorials
---

# How to issue your own token \(ERC-20\)

We have pre-built a template for this tutorial in the [NEAR Studio IDE](https://studio.nearprotocol.com/) which you can open by visiting studio and selecting the "Token Smart Contract in AssemblyScript" template.

In this tutorial we'll build that contract from scratch.

To get started, go to and start a new project \(fiddle\) by selecting Token Smart Contract in AssemblyScript. You can try running this application right away to see the code interacting with the blockchain!

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

## Building basic token

Let's start by defining number of tokens \(non-dividable units\) our token will have. This is a decision point for the developer, and here we will assume we going to have `100,000,000`.

This way we can implement `totalSupply` function:

```typescript
let TOTAL_SUPPLY: u64 = 1000000;

export function totalSupply(): u64 {
  return TOTAL_SUPPLY;
}
```

We also need some way to initialize our contract to award all these tokens to initial owner. This also goes into how to change storage in the smart contract:

```typescript
function balanceKey(address: string): string {
    return "balance:" + address;
}

export funciton init(): void {
    let initialOwner = "my_super_user.near"
    if (storage.getItem("init") == null)  {
        storage.setU64(balanceKey(initialOwner), TOTAL_SUPPLY)
        storage.setItem("init", "done");
    }
}
```

In example above we have `storage` object that is accessible by this contract to store data. It's just a key / value storage.

For storing balances, we prefix owner's address with `balance:` to allow to store different types of information for the owner. The logic here is to check if init was called before and if not to initialize.

Now that it's initialized, we can check the balance of users:

```typescript
export function balanceOf(owner: string): u64 {
    return storage.getU64(balanceKey(owner));
}
```

Let's build harder part, transferring money from current user to somebody else:

```typescript
export function transfer(to: string, value: u64): boolean {
    let balance = balanceOf(contractContext.sender);
    if (value > balance) {
        return false;
    }
    storage.setU64(balanceKey(contractContext.sender), balance - value);
    storage.setU64(to, storage.getU64(to) + value);
    return true;
}
```

Note, this is not a view function and it can fail, so we need to return `boolean` to indicate if it was successful. We first check the balance of `contractContext.sender`, which is the user that executed given transaction. If there is not enough money on the balance, we return `false`. Otherwise, subtract `value` from the balance of sender and increment balance of `to`.

## Approve / TransferFrom

The second part to allow other parties to transfer funds on your behalf is coming.

