---
id: lockup
title: Lockups Explained
sidebar_label: Lockups Explained
---
# Lockups Explained

Lockup is a special smart contract that ensures that full amount or partial amount is not transferable.

If you have received tokens prior to Phase 2, you usually would get two things:
 - a regular account (also called "owner account" in context of lockups), let's say `user.near` or `3e52c197feb13fa457dddd102f6af299a5b63465e324784b22aaa7544a7d55fb`
 - a lockup contract, with name `4336aba00d32a1b91d313c81e8544ea1fdc67284.lockup.near`

Owner account is created first, either by following NEAR drop or by creating new key pair using Trust, Ledger or other wallet.

This owner account would usually have small balance 1-40 N to cover tx fees and the account storage itself (for those who are using 2FA in NEAR Wallet a larger amount is allocated, as it requires a multisig contract deployed on the account).

Lockup contract is then deployed with predictable name. It is defined as `hash(owner_account_id)[:20]` encoded in `hex` and deployed as sub account under `lockup.near`. Which means that all lockup contracts end with `.lockup.near`.

Lockup contract has few core properties:
 - Total balance - amount of tokens at deployment when lockup started.
 - Lockup start date - this is an absolute date when lockup can start unlocking. For example, for Coinlist participants this is `Oct 4, 2020 00:00 GMT`.
 - Release length - after Phase 2 and lockup start date have passed, how long linear release will be lasting. For example, 1 year release length means that every day 1/365 unlocks.
 
All tokens above initial balance, are considered unlocked and can be freely withdrawn. For example any rewards that are earn using this lockup contracts or any other funds sent to this lockup contract - can be withdrawn by the owner at any time.

When lockup has been fully released (lockup start date + release length has passed), owner account can call to terminate the lockup and withdraw all the funds from it to the owner account.

## Delegating locked tokens

One of the unique features of the NEAR lockups is ability to delegate still locked tokens.

There are few things to know:
 - Can only delegate to whitelisted pools, right now it's all the pools that end with `.poolv1.near`.
 - One lockup contract can only delegate to a single pool.
 - Must keep minimum balance of 35 $NEAR on the account to cover storage for lockup contract itself (transactions that will try withdraw over that amount will just fail).
 - Rewards can be withdrawn to lockup contract, but are unlocked, so can be withdrawn from it right away.
 - Default delegating commands / tools won't work, as "owner account" must call lockup contract. Currently Dokia and NEAR Wallet are adding native support for lockup contract delegation.

## Frequent questions?

### I don't see my full balance in my wallet

Not all wallets support looking up locked up balance.

There are three ways to go:
 - Check your balance using https://near.github.io/account-lookup/.
 - [Import your account into NEAR Wallet](../token-custody#importing-accounts-from-other-wallets).
 - Use CLI to check your balance: `near view <LOCKUP_ACCOUNT_ID> get_balance ''` (note it outputs the value in yoctoNEAR - divide by 10e24 to get NEAR amount).

### How do I delegate locked up tokens?

It's important to note, that a single lockup contract can only delegate to a single validator.

Go to Dokia's staking UI: https://staking.dokia.cloud/staking/near/validators

1. Select validator you want to delegate.
2. Choose either to do it via Web Interface or CLI
3. With NEAR Wallet or Ledger you can use Web Interface
4. To use CLI, make sure you have [near-cli](https://github.com/near/near-cli) installed and either use Ledger, have seed phrase or have secret key locally.
