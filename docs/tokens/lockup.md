---
id: lockup
title: Lockups Explained
sidebar_label: Lockups Explained
---

These docs include information about lockups in general, how they are implemented on NEAR, some challenges this causes, and how you can delegate your locked tokens.


## Lockup Basics {#lockup-basics}

A "lockup" is when tokens are prevented from being transferred.
The configuration of this lockup may vary significantly from case to case, but the same smart contract is used for each of them.
Accounts that are subject to a lockup have a different setup than accounts that are created without a lockup.
If you have a locked-up account, it may be supported slightly differently by various tools (from wallets to delegation interfaces) because of this difference in the architecture.  
If you want to be sure to see the correct balances, use [NEAR official wallet](https://wallet.near.org).

The most common configuration of lockup is to linearly release the tokens for transfer during the entire term of the lockup.
For example, a 24-month linear lockup would make a small amount of tokens eligible for transfer with each block that passes until the full amount is free to transfer at the end of 24 months.

Another factor in lockups is the "cliff", which means that no tokens are unlocked until that date (often 12 months after the lockup start).  
On that date, a large chunk of tokens is unlocked at once to make it as if the cliff never existed at all.  
Most early accounts are subject to a cliff.
For example, a 4-year linear lockup with a 1-year cliff will have the following characteristics:

1. Months 0-12: all tokens are locked
2. Month 12+1 block: the first 25% of the tokens are immediately unlocked
3. Months 13-48: the remaining 75% of tokens are unlocked smoothly over each block of the remaining 36 months.
4. Months 48+: all tokens are unlocked

*See how NEAR tokens have been distributed and what lockups generally apply in [this post](https://near.org/blog/near-token-supply-and-distribution/).*

*See the FAQ at the end for questions*


## The Lockup Contract at NEAR {#the-lockup-contract-at-near}

[Lockup](https://github.com/near/core-contracts/tree/master/lockup) is a special smart contract that ensures that the full, or the partial amount is not transferable until it is supposed to be.

The lockups are implemented as a separate smart contract from your main account.
Thus, if you have received tokens prior to [Phase II](https://near.org/blog/near-mainnet-phase-2-unrestricted-decentralized/), you will get two things:

1. A regular account (also called "Owner Account" in context of lockups), let's say `user.near` or `3e52c197feb13fa457dddd102f6af299a5b63465e324784b22aaa7544a7d55fb`;
2. A lockup contract, with a name like `4336aba00d32a1b91d313c81e8544ea1fdc67284.lockup.near`.

The owner account is created first, either by following the NEAR Drop process or by creating a new key pair using Trust, Ledger, or another wallet.

The lockup contract is then deployed with a predictable name.
It is defined as `hash(owner_account_id)[:20]` encoded in `hex` and deployed as subaccount under `lockup.near`.
It means that all lockup contracts are deployed to the accounts named with `.lockup.near` at the end.

If you have received additional tokens to the lockup account, they are considered unlocked and can be freely withdrawn.
For example, any rewards that are earned using this lockup account (e.g. from delegation) or any other funds sent to this lockup contract can be withdrawn by the owner at any time.

The actual lockup release process happens on per block basis. 
E.g. if the release length is 1 calendar year, it will actually be `31,536,000` seconds, and with ~1-second blocks, `~1/31,536,000` will be released per block.
When the lockup has been fully released, the Owner Account can add the full-access key and withdraw all the funds from it.

The contract consists of lockup and vesting processes that go simultaneously.
Both of these processes lock the tokens, but the mechanics slightly differ.

### Lockup {#lockup}

Lockup mechanics have 2 configurable parameters: 
1. `lockup_timestamp` - The moment when tokens start linearly unlocking;
2. `release_duration` - The length of the unlocking schedule during which tokens are linearly unlocked.
  By the end of this duration, all tokens are unlocked.

The lockup process could not be terminated.
Lockup does not have a cliff.

![lockup_1](/docs/assets/lockup/lockup_1.png)

[deprecated] Apart from the lockup timestamp, there is a lockup duration.
`lockup_duration` is the interval between [the Phase II launch](https://near.org/blog/near-mainnet-phase-2-unrestricted-decentralized/) (October 13th) and the moment when tokens start to unlock.

![lockup_2](/docs/assets/lockup/lockup_2.png)

### Vesting {#vesting}

Vesting also locks the tokens, and it allows configuring 2 more options:
1. Ability to terminate tokens vesting and refund non-vested tokens back.
2. Cliff vesting period.

Vesting process includes 3 timestamps: `start_date`, `cliff_date`, `end_date`.

![lockup_3](/docs/assets/lockup/lockup_3.png)

### Combinations {#combinations}

`v_start`, `v_cliff`, `v_end` are the aliases for vesting parameters; `l_start`, `l_end` are for lockup parameters.
They could be easily transformed into initializing parameters described above.

![lockup_4](/docs/assets/lockup/lockup_4.png)

The liquid tokens balance is always the minimum between unlocked and vested values.

### Termination of vesting {#termination-of-vesting}

Vesting could be terminated by the foundation, an account configured at the moment of initializing the contract.
It's important to understand how the termination works combining with the lockup schedule.

![lockup_5](/docs/assets/lockup/lockup_5.png)

At the moment of termination, we stop the vesting process, so the vested amount is going to remain constant after that; the lockup process keeps going and will unlock the tokens on its schedule.
We continue to unlock the tokens as we normally do that by getting the minimum between unlocked and vested amounts.


### An Example {#an-example}

You can see examples of account and lockup setups in the [NEAR Explorer](https://explorer.mainnet.near.org).  
For example, this randomly chosen account `gio3gio.near` was created in several steps:

First, the Owner Account `gio3gio.near` was created and configured using several transactions, which you can see in [the account history](https://explorer.mainnet.near.org/accounts/gio3gio.near).
It was created with 40 NEAR tokens to pay for the storage requirements of the account, and the two-factor authentication that is deployed to it.

Next, the account [9b84742f269952cea2877425b5e9d2e15cae8829.lockup.near](https://explorer.mainnet.near.org/accounts/9b84742f269952cea2877425b5e9d2e15cae8829.lockup.near) was created to store the actual balance of locked tokens on the account in [a batch transaction](https://explorer.mainnet.near.org/transactions/Eer14Fih17TRjpiF8PwWfVKNTB57vXnNJsDW93iqc2Ui) which also transferred these tokens to it (in this case, 594.11765 tokens).  
You can see the arguments for the `new` method in the explorer, which show a 12-month release duration with an initial cliff of October 4th:

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


## Delegating locked tokens {#delegating-locked-tokens}

One of the unique features of the NEAR lockups is the ability to delegate tokens while they are still locked.

There are few things to know:
1. You can only delegate to whitelisted pools, right now it's all the pools that end with `.poolv1.near`.
2. One lockup contract can only delegate to a single pool.
3. The account must keep a minimum balance of 3.5 $NEAR to cover storage for the lockup contract itself (transactions that will try to withdraw over that amount will just fail).
4. Delegation rewards can be withdrawn back to the lockup contract but are unlocked, so they can be withdrawn from it right away.
5. Delegating commands/tools which are not specifically configured to work with locked-up accounts won't work, as the "owner account" must call lockup contract.
   Currently, Dokia and NEAR Wallet are adding native support for lockup contract delegation.


## Calling Arbitrary Methods {#calling-arbitrary-methods}

Calling methods on the lockup contract is a bit more complicated than doing so on a normal contract because you will need to include the `accountId` option as well, which references the "owner" account for that lockup contract.  
This is because the lockup contract isn't designed to do anything on its own; its methods need to be called from the perspective of the account which owns it.

Methods must be called using one of two options:

1. `near view ...`: these are simpler and don't modify anything or cost anything
2. `near call ...`: these do require more arguments and require gas

Arguments are passed using a hash with string arguments inside single quotes, for example:

`near call some_lockup some_method '{"arg1": "value1", "arg2": "value2"}' --accountId=lockup_owner_account`

View the [lockup github README](https://github.com/near/core-contracts/tree/master/lockup) for the documentation and the examples.


### Example: Transferring staking reward tokens from the lockup {#example-transferring-staking-reward-tokens-from-the-lockup}

To illustrate a common case of calling lockup methods with arguments, this is an example of transferring NEAR tokens that were earned from staking out of a lockup contract and into another arbitrary account.
We assume the following have already occurred:

1. The tokens were unstaked from the pool (which takes a 4-epoch waiting period) using `unstake` or `unstake_all`;
2. The tokens were withdrawn from the pool to the lockup contract.

For more information (or examples) on either of these steps, click on the "Token Delegation" link in the docs navigation above.

Now that the staking rewards are in your account, it requires several steps to transfer them out because some values need to be manually updated in the contracts.

The following steps will show how functions are called in the lockup contract while helping to illustrate a common use case.
Of course, to simply transfer tokens that are already unlocked (not staking rewards), then skip to step 3.

#### Step 1: Transfer Unlock Ping {#step-1-transfer-unlock-ping}

Start by pinging the lockup contract to tell it that transfers are unlocked.
This *only needs to be done once total*. 

```
# replace some_lockup.lockup.near and lockup_owner.near with the appropriate accounts
near call some_lockup.lockup.near check_transfers_vote '{}' --accountId=lockup_owner.near --gas=75000000000000 --useLedgerKey="44'/397'/0'/0'/1'"
```

If you forget to do this, you might get an error like `panicked at 'Transfers are disabled', src/internal.rs:68:9`.

#### Step 2: Refresh the staking pool balance {#step-2-refresh-the-staking-pool-balance}

Next, refresh the staking pool balance, so the lockup understands that you aren't trying to withdraw tokens beyond the amount which should still be locked.

```
near call some_lockup.lockup.near refresh_staking_pool_balance '{}' --accountId=lockup_owner.near --gas=75000000000000 --useLedgerKey="44'/397'/0'/0'/1'"
```

If you forget to do this, you might get an error like `panicked at 'The available liquid balance " 123456789 is smaller than the requested transfer amount 100000000000000000000000000`.

#### Step 3: Transfer the tokens {#step-3-transfer-the-tokens}

Transfer 100 NEAR from `some_lockup.near` to `some_recipient.near`.
Remember that, to be transferable, the tokens must either be unlocked or staking rewards earned on top of the locked balance.

```
near call some_lockup.lockup.near transfer '{"receiver_id": "some_recipient.near", "amount": "100000000000000000000000000"}' --accountId=lockup_owner.near --gas=50000000000000 --useLedgerKey="44'/397'/0'/0'/1'"
```

If you forget to use the large amount of yoctoNEAR (e.g. you wrote "1.5" instead of "1500000000000000000000000"), you might get an error like `panicked at 'Failed to deserialize input from JSON.: Error("invalid digit found in string", line: 1, column: 17)'`


## Frequent questions? {#frequent-questions}

### I don't see my full balance in my wallet {#i-dont-see-my-full-balance-in-my-wallet}

Not all wallets support looking up the locked-up balance.

There are three ways to go:
 - Use the [NEAR official wallet](https://wallet.near.org);
 - [Import your account into NEAR Wallet](/docs/tokens/token-custody#importing-accounts-from-other-wallets); 
 - Use CLI to check your balance: `near view <LOCKUP_ACCOUNT_ID> get_balance ''` (note it outputs the value in yoctoNEAR - divide by 10e24 to get NEAR amount).

### How do I delegate locked up tokens? {#how-do-i-delegate-locked-up-tokens}

It's important to note, that a single lockup contract can only delegate to a single validator.

Go to Dokia's staking UI: https://staking.dokia.cloud/staking/near/validators

1. Select the validator you want to delegate;
2. Choose either to do it via Web Interface or CLI;
3. With NEAR Wallet or Ledger you can use Web Interface;
4. To use CLI, make sure you have [near-cli](https://github.com/near/near-cli) installed and either use Ledger, have seed phrase, or have secret key locally.

### If I have a lockup, what do I need to do to transfer my tokens once they are available from the Wallet? {#if-i-have-a-lockup-what-do-i-need-to-do-to-transfer-my-tokens-once-they-are-available-from-the-wallet}

If you use NEAR Wallet, you can just spend them as normal.
You will just have to confirm a couple of extra transactions ("check vote" and "transfer").  
Other wallets may implement this differently.

>Got a question?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol">
  <h8>Ask it on StackOverflow!</h8></a>
