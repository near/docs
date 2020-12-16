---
id: lockup
title: Lockups Explained
sidebar_label: Lockups Explained
---

These docs include information about lockups in general, how they are implemented on NEAR, some of the challenges this causes and how you can delegate your locked tokens.


## Lockup Basics

A "lockup" is when tokens are prevented from being transferred. The configuration of this lockup may vary significantly from case to case but the same smart contract is used for each of them. Accounts which are subject to a lockup have a different setup than accounts which are created without a lockup. If you have a locked-up account (which all accounts will have during the network launch phase), it may be supported slightly differently by various tools (from wallets to delegation interfaces) because of this difference in the architecture.  For example, one wallet has had difficulty displaying correct balances for the accounts because of this.

The most common configuration of lockup on NEAR, particularly for early holders, is to linearly release the tokens for transfer during the entire term of the lockup. For example, a 24 month linear lockup would make a small amount of tokens eligible for transfer with each block that passes until the full amount is free to transfer at the end of 24 months.

Another factor in lockups is the "cliff", which means that no tokens are unlocked until that date (often 12 months after the lockup start).  On that date, a large chunk of tokens is unlocked at once to make it as if the cliff never existed at all.  Most early accounts are subject to a cliff. For example, a 4 year linear lockup with a 1 year cliff will have the following characteristics:

1. Months 0-12: all tokens are locked
2. Month 12+1 block: the first 25% of the tokens are immediately unlocked
3. Months 13-48: the remaining 75% of tokens are unlocked smoothly over each block of the remaining 36 months.
4. Months 48+: all tokens are unlocked

The "start date" of lockups is the date that transfers are enabled on the network ("Phase II") for any contracts distributed prior to Phase II.  For any lockup contracts implemented after this date, it will be simply the date the lockup contract was implemented. Tokens become unlocked on a block-by-block basis but are actually released by the lockup contract every epoch (roughly 12 hours).

The way the lockups are implemented is useful to understand because it affects how some third parties (like wallets) may integrate with or display your NEAR tokens.

*See how NEAR tokens have been distributed and what lockups generally apply in [this post](https://near.org/blog/near-token-supply-and-distribution/).  If you want an easy way to check account balances or lockup details, you can lookup your account using [this tool](https://near.github.io/account-lookup).*

*See the FAQ at the end for questions*



## The Lockup Contract

`Lockup` is a special smart contract that ensures that the full amount or even a partial amount is not transferable until it is supposed to be.

The lockups are implemented as a separate smart contract from your main account. Thus, if you have received tokens prior to Phase 2, you will get two things:

1. A regular account (also called "Owner Account" in context of lockups), let's say `user.near` or `3e52c197feb13fa457dddd102f6af299a5b63465e324784b22aaa7544a7d55fb`
2. a lockup contract, with name `4336aba00d32a1b91d313c81e8544ea1fdc67284.lockup.near`

Owner account is created first, either by following the NEAR Drop process or by creating new key pair using Trust, Ledger or another wallet.

This owner account would usually have small balance 1-40 N to cover tx fees and the account storage itself (for those who are using 2FA in NEAR Wallet a larger amount is allocated, as it requires a multisig contract deployed on the account).

Lockup contract is then deployed with predictable name. It is defined as `hash(owner_account_id)[:20]` encoded in `hex` and deployed as subaccount under `lockup.near`. Which means that all lockup contracts end with `.lockup.near`.

Lockup contract has few core properties:

1. Total balance - amount of tokens at deployment when lockup started.
2. Lockup start date - this is an absolute date when lockup can start unlocking. For example, for Coinlist participants this is `Oct 4, 2020 00:00 GMT`.
3. Release length - after Phase 2 and lockup start date have passed, how long linear release will be lasting. For example, 1 year release length means that every day 1/365 unlocks.
 
If you have added or earned additional tokens above the initial balance, they are considered unlocked and can be freely withdrawn. For example any rewards that are earned using this lockup contract (eg from delegation) or any other funds sent to this lockup contract can be withdrawn by the owner at any time.

The actual lockup release process happens on per block basis. E.g. if release length is 1 calendar year, it will actually be `31,536,000` seconds, and with ~1 second blocks, `~1/31,536,000` will be released per block.

When the lockup has been fully released (lockup start date + release length has passed), the Owner Account can call to terminate the lockup and withdraw all the funds from it to the owner account.


### An Example

You can see examples of account and lockup setups in the [NEAR Explorer](https://explorer.mainnet.near.org).  For example, this randomly chosen account gio3gio.near was created in several steps:

First, the Owner Account `gio3gio.near` was created and configured using several transactions, which you can see in [the account history](https://explorer.mainnet.near.org/accounts/gio3gio.near). It was created with 40 NEAR tokens to pay for the storage requirements of the account and any 2FA that is deployed to it.

Next, the account [9b84742f269952cea2877425b5e9d2e15cae8829.lockup.near](https://explorer.mainnet.near.org/accounts/9b84742f269952cea2877425b5e9d2e15cae8829.lockup.near) was created to store the actual balance of locked tokens on the account in [a batch transaction](https://explorer.mainnet.near.org/transactions/Eer14Fih17TRjpiF8PwWfVKNTB57vXnNJsDW93iqc2Ui) which also transferred these tokens to it (in this case, 594.11765 tokens).  You can see the arguments for the `new` method in the explorer, which show a 12-month release duration with an initial cliff of October 4th:

```
{
  "owner_account_id": "gio3gio.near",        // the Owner account who is allowed to call methods on this one
  "lockup_duration": "0",                    // not necessary if the lockup_timestamp is used
  "lockup_timestamp": "1601769600000000000", // Unix timestamp for October 4th, 2020 at midnight UTC
  "transfers_information": {
    "TransfersDisabled": {
      "transfer_poll_account_id": "transfer-vote.near"
    }
  },
  "vesting_schedule": null,
  "release_duration": "31536000000000000",  // 365 days
  "staking_pool_whitelist_account_id": "lockup-whitelist.near",
  "foundation_account_id": null
}
```

For the actual lockup contract code and README, [see it on Github](https://github.com/near/core-contracts/tree/master/lockup).


## Delegating locked tokens

One of the unique features of the NEAR lockups is ability to delegate tokens while they are still locked.

There are few things to know:
1. You can only delegate to whitelisted pools, right now it's all the pools that end with `.poolv1.near`.
2. One lockup contract can only delegate to a single pool.
3. The account must keep minimum balance of 35 $NEAR to cover storage for lockup contract itself (transactions that will try withdraw over that amount will just fail).
4. Delegation rewards can be withdrawn back to the lockup contract but are unlocked, so they can be withdrawn from it right away.
5. Delegating commands / tools which are not specifically configured to work with locked-up accounts won't work, as the "owner account" must call lockup contract. Currently Dokia and NEAR Wallet are adding native support for lockup contract delegation.


## Frequent questions?

### I don't see my full balance in my wallet

Not all wallets support looking up the locked-up balance.

There are three ways to go:
 - Check your balance using https://near.github.io/account-lookup/.
 - [Import your account into NEAR Wallet](token-custody#importing-accounts-from-other-wallets).
 - Use CLI to check your balance: `near view <LOCKUP_ACCOUNT_ID> get_balance ''` (note it outputs the value in yoctoNEAR - divide by 10e24 to get NEAR amount).

### How do I delegate locked up tokens?

It's important to note, that a single lockup contract can only delegate to a single validator.

Go to Dokia's staking UI: https://staking.dokia.cloud/staking/near/validators

1. Select validator you want to delegate.
2. Choose either to do it via Web Interface or CLI
3. With NEAR Wallet or Ledger you can use Web Interface
4. To use CLI, make sure you have [near-cli](https://github.com/near/near-cli) installed and either use Ledger, have seed phrase or have secret key locally.

### If I have a lockup, what do I need to do to transfer my tokens once they are available? 

If you use NEAR Wallet, you can just spend them as normal. You will just have to confirm a couple of extra transactions ("check vote" and "transfer").  Other wallets may implement this differently.

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
