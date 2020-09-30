---
id: delegation
title: Token Delegation
sidebar_label: Token Delegation
---
## Overview

If you don't want to run a validator node by yourself, NEAR Protocol supports the delegation of your stake using smart contracts. 
These contracts can be used via RPC, command-line interface (CLI) or graphic user interface (GUI) by leveraging the same `view` and `call` methods.

If you haven't already, evaluate your token custody option from [this documentation page](../tokens/token-custody)

## GUI-based delegation
Disclaimer: the list below is community-maintained, and is not an endorsement by NEAR to use any of them. Do your own research before staking your funds with them!

| Provider  | URL (to copy and paste)  | Added on |
| --------- | ------------------------ | -------- |
| NEAR Wallet | https://wallet.near.org | work in progress |
| DokiaCapital | https://staking.dokia.cloud |11 Sept 2020 |
| add here | your link | first come, first serve |

## CLI-based delegation
Disclaimer: the documentation below refers to the Github repository [Core Contracts](https://github.com/near/core-contracts/). Always check the source of the smart contract before delegating your funds to it!

NEAR Core Contracts support two types of delegation:

1. Lockup Contract 
2. Staking Pool

Before starting, make sure you are running the latest version of [near-cli](https://github.com/near/near-cli), and you are familiar with [gas fees](../concepts/gas).

### 1. Lockup Contract

The [Lockup Contract](https://github.com/near/core-contracts/tree/master/lockup) is common among NEAR contributors and, essentially, anyone who didn't acquire tokens through an exchange. This contract acts as an escrow that locks and holds an owner's tokens for a lockup period (such as vesting). You can learn more about lockups and their implementation in the [this documentation page](../tokens/lockup).

The owner may want to stake these tokens (including locked ones) to help secure the network and also earn staking rewards that are distributed to the validator. The lockup contract doesn't allow to directly stake from its account, so the owner delegates the tokens using the contract built-in functions.

<blockquote class="warning">
    <strong>heads up</strong><br><br>
    The commands below are tested with <a href="https://github.com/near/core-contracts/tree/877e2db699a02b81fc46f5034642a2ebd06d9f19">build 877e2db</a> of the Core Contracts.
</blockquote>

Before proceeding with the tutorial below, check that you have control of your lockup contract, by issuing the command
```
near view <LOCKUP_ID> get_owner_account_id ''
```
You should expect a result like:
```
$ near view meerkat.stakewars.testnet get_owner_account_id ''
View call: meerkat.stakewars.testnet.get_owner_account_id()
'meerkat.testnet'

```
Where the `<LOCKUP_ID>` is `meerkat.stakewars.testnet`; and the result is `meerkat.testnet`. In the following examples, `<OWNER_ID>` is always the output of this command.


You can stake with Lockup contracts in three steps:
1. Set up the staking pool
2. Deposit and stake the tokens
3. Measure the rewards

#### 1. Set the staking pool
Lockup contracts can stake **to one staking pool at a time**, so this parameter can be changed only while no funds are staked.

You can select the staking pool by calling the method `select_staking_pool` from the lockup contract:
```
near call <LOCKUP_ID> select_staking_pool '{"staking_pool_account_id": "<POOL_ID>"}' --accountId <OWNER_ID>
```
You should expect a result like:
```
$ near call meerkat.stakewars.testnet select_staking_pool '{"staking_pool_account_id": "zpool.pool.f863973.m0"}' --accountId meerkat.testnet

Scheduling a call: meerkat.stakewars.testnet.select_staking_pool({"staking_pool_account_id": "zpool.pool.f863973.m0"})
Receipts: HEATt32tHqWdjkZoSxLhd43CYVBCUp1cFHexgWBEeKJg, EUP7tncJfKDPpKYdunx2qySZ6JmV3injBigyFBiuD96J, 99hdXWmaTQE7gR5vucxMWFNMw7ZLtzJ6WNMSVJHPGJxh
	Log [meerkat.stakewars.testnet]: Selecting staking pool @zpool.pool.f863973.m0. Going to check whitelist first.
Transaction Id 4Z2t1SeN2rdbJcPvfVGScpwyuGGKobZjT3eqvDu28sBk
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/4Z2t1SeN2rdbJcPvfVGScpwyuGGKobZjT3eqvDu28sBk
true

```
Where the `<LOCKUP_ID>` is `meerkat.stakewars.testnet`; `<POOL_ID>` is `zpool.pool.f863973.m0`; and `<OWNER_ID>` is `meerkat.testnet`.
The `true` statement means that your call was successful, and the lockup contract accepted the `<POOL_ID>` parameter.

#### 2. Deposit and stake the tokens
Lockup contracts can stake their balance, regardless of their vesting schedule. You can proceed in two steps:
1. check the lockup balance
2. stake the balance

1. To know how many tokens you can stake, use the view method `get_balance`:
```
near view <LOCKUP_ID> get_balance ''
```
You should expect a result like:
```
$ near view meerkat.stakewars.testnet get_balance ''
View call: meerkat.stakewars.testnet.get_balance()
'100000499656128234500000000'
```
Where the `<LOCKUP_ID>` is `meerkat.stakewars.testnet` and the resulting balance (in Yocto) is `100000499656128234500000000` or 100 $near.

<blockquote class="warning">
    <strong>heads up</strong><br><br>
    You have to leave 35 $near in the lockup contract for the storage fees. If you have 100 tokens, you can stake up to 65 tokens.
</blockquote>


2. To stake the balance, use the call method `deposit_and_stake`:
```
near call <LOCKUP_ID> deposit_and_stake '{"amount": "<AMOUNT>"}' --accountId <OWNER_ID>
```
You should expext a result like:
```
$ near call meerkat.stakewars.testnet deposit_and_stake '{"amount": "65000000000000000000000000"}' --accountId meerkat.testnet --gas 200000000000000
Scheduling a call: meerkat.stakewars.testnet.deposit_and_stake({"amount": "65000000000000000000000000"})
Receipts: BFJxgYMbPLpKy4jae3b5ZJfLuAmpcYCBG2oJniDgh1PA, 9sZSqdLvPXPzpRg9VLwaWjJaBUnXm42ntVCEK1UwmYTp, CMLdB4So6ZYPif8qq2s7zFvKw599HMBVcBfQg85AKNQm
	Log [meerkat.stakewars.testnet]: Depositing and staking 65000000000000000000000000 to the staking pool @zpool.pool.f863973.m0
Receipts: 3VpzWTG9Y2nbZmuJhmsub9bRLnwHCFtnW5NQqcMBWawF, 4BrEKDPmz3mAhnq5tTFYRQp8y9uRxGFwYffJFkPMdQ5P, HJPqqJDTajFfeEA8vFXTLDpxh4PYZCMJ2YLKpWVtwSMF
	Log [meerkat.stakewars.testnet]: Epoch 105: Contract received total rewards of 20383576173536987339742291104 tokens. New total staked balance is 104251712242552700026473040909. Total number of shares 77295581098329153455984430997
	Log [meerkat.stakewars.testnet]: Total rewards fee is 1511304065231935217653387665 stake shares.
	Log [meerkat.stakewars.testnet]: @meerkat.stakewars.testnet deposited 65000000000000000000000000. New unstaked balance is 65000000000000000000000000
	Log [meerkat.stakewars.testnet]: @meerkat.stakewars.testnet staking 64999999999999999999999999. Received 48193095953206307331949682 new staking shares. Total 1 unstaked balance and 48193095953206307331949682 staking shares
	Log [meerkat.stakewars.testnet]: Contract total staked balance is 104316712242552700026473040909. Total number of shares 77343774194282359763316380679
Receipt: FsJLXXEa8Jp8UNyiyG3XQhyHHSWzZ2bCjgWr8kPVjGmG
	Log [meerkat.stakewars.testnet]: The deposit and stake of 65000000000000000000000000 to @zpool.pool.f863973.m0 succeeded
Transaction Id AW9pFb5RjkCjsyu8ng56XVvckvd3drPBPtnqVo6bJhqh
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/AW9pFb5RjkCjsyu8ng56XVvckvd3drPBPtnqVo6bJhqh
true
```
Where `<LOCKUP_ID>` is `meerkat.stakewars.testnet`; `<AMOUNT>` is `65000000000000000000000000` (the total available, minus 35 $near for the minimum balance); and `<OWNER_ID>` is `meerkat.testnet`.
The `true` statement at the end means the transaction was successful.

<blockquote class="warning">
    <strong>heads up</strong><br><br>
    The example above set the pre-paid gas to 200000000000000 Yocto, as near-cli default allocation was too low.
</blockquote>


#### 3. Measure the rewards
NEAR Protocol automatically re-stakes your rewards. You need to manually check the balance of the staking pool to know their total amount.

Use the use the call method `refresh_staking_pool_balance` to check your new balance:
```
near call <LOCK_ID> refresh_staking_pool_balance '' --accountId <OWNER_ID>
```
You should expect a result like:
```
$ near call meerkat.stakewars.testnet refresh_staking_pool_balance '' --accountId meerkat.testnet | grep "current total balance"
	Log [meerkat.stakewars.testnet]: The current total balance on the staking pool is 65000000000000000000000000
```
Where `<LOCK_ID>` is `meerkat.stakewars.testnet`, and `<OWNER_ID>` is `meerkat.testnet`. In the example above, the result is passed to `| grep "current total balance"` to display only the relevant output.

Please refer to the [Lockup Contract readme](https://github.com/near/core-contracts/tree/master/lockup) if you need to know how to withdraw the staking rewards to your main wallet.



### 2. Staking Pool
Any other funds can be directly delegated to a [staking pool](https://github.com/near/core-contracts/tree/master/staking-pool) by using the call method `deposit_and_stake`:
```
near call <POOL_ID> deposit_and_stake '' --accountId <OWNER_ID> --amount 100
```
You should expect a result like:
```
$ near call valeraverim.pool.f863973.m0 deposit_and_stake '' --accountId meerkat.testnet --amount 100
Scheduling a call: valeraverim.pool.f863973.m0.deposit_and_stake() with attached 100 NEAR
Receipts: FEfNuuCSttu7m4dKQPUSgpSFJSB86i6T2sYJWSv7PHPJ, GPYhZsyUuJgvr7gefxac4566DVQcyGs4wSFeydkmRX7D, 8hfcJuwsstnFQ1cgU5iUigvfrq1JcbaKURvKf5shaB4g
	Log [valeraverim.pool.f863973.m0]: Epoch 106: Contract received total rewards of 545371217890000000000 tokens. New total staked balance is 75030000959768421358700000000. Total number of shares 75029067713856889417103116457
	Log [valeraverim.pool.f863973.m0]: Total rewards fee is 54536443439735902364 stake shares.
	Log [valeraverim.pool.f863973.m0]: @meerkat.testnet deposited 100000000000000000000000000. New unstaked balance is 100000000000000000000000000
	Log [valeraverim.pool.f863973.m0]: @meerkat.testnet staking 99999999999999999999999999. Received 99998756169666008195607157 new staking shares. Total 1 unstaked balance and 99998756169666008195607157 staking shares
	Log [valeraverim.pool.f863973.m0]: Contract total staked balance is 75130000959768421358700000000. Total number of shares 75129066470026555425298723614
Transaction Id FDtzMmusJgFbryeVrdQyNvp6XU2xr11tecgqnnSsvyxv
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/FDtzMmusJgFbryeVrdQyNvp6XU2xr11tecgqnnSsvyxv
''

```
Where `<POOL_ID>` is `valeraverim.pool.f863973.m0`; and the `<OWNER_ID>` is `meerkat.testnet`.


If you want to check your staking rewards, use the view method `get_account`:
```
near view <POOL_ID> get_account '{"account_id": "<OWNER_ID>"}'
```
You should expect a result like:
```
$ near view valeraverim.pool.f863973.m0 get_account '{"account_id": "meerkat.testnet"}'
View call: valeraverim.pool.f863973.m0.get_account({"account_id": "meerkat.testnet"})
{
  account_id: 'meerkat.testnet',
  unstaked_balance: '1',
  staked_balance: '100663740438210643632989745',
  can_withdraw: true
}
```
Where `<POOL_ID>` is `valeraverim.pool.f863973.m0` and `<OWNER_ID>` is `meerkat.testnet`. The staked balance is `100663740438210643632989745`, or `100.66` tokens.

Use the call method `ping` to re-calculate your rewards up to the previous epoch:
```
near call <POOL_ID> ping '{}' --accountId <OWNER_ID>
```
You should expect a result like:
```
$ near call valeraverim.pool.f863973.m0 ping '{}' --accountId meerkat.testnet
Scheduling a call: valeraverim.pool.f863973.m0.ping({})
Transaction Id 4mTrz1hDBMTWZx251tX4M5CAo5j7LaxLiPtQrDvQgcZ9
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/4mTrz1hDBMTWZx251tX4M5CAo5j7LaxLiPtQrDvQgcZ9
''

```
Where `<POOL_ID>` is `valeraverim.pool.f863973.m0`; and the `<OWNER_ID>` is `meerkat.testnet`. The `''` result means that your call was successful, and the `get_account` view method will provide updated results.

## Additional links
- [NEAR Core Contracts on Github](https://github.com/near/core-contracts)
- [Stake Wars on Github](https://github.com/nearprotocol/stakewars)


