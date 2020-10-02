---
id: delegation
title: Token Delegation
sidebar_label: Token Delegation
---
## Overview

If you don't want to run a validator node by yourself, NEAR Protocol supports the delegation of your stake using smart contracts. 
These contracts can be used via RPC, command-line interface (CLI) or graphic user interface (GUI) by leveraging the same `view` and `call` methods.
You can find a real-time list of validators on [NEAR Explorer](https://explorer.near.org/nodes/validators).

If you haven't already, evaluate your token custody option from [this documentation page](../tokens/token-custody).

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

### 1. Lockup Contracts Commands

The [Lockup Contract](https://github.com/near/core-contracts/tree/master/lockup) is common among NEAR contributors and, essentially, anyone who didn't acquire tokens through an exchange. This contract acts as an escrow that locks and holds an owner's tokens for a lockup period (such as vesting).
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
    You have to leave 35 $near in the lockup contract for the storage fees. If you have 100 tokens, you can stake up to 65 tokens. If you have 1000 tokens, you can stake up to 965 tokens.
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
    <strong>Heads up</strong><br><br>
    The example above set the pre-paid gas to 200000000000000 Yocto, as near-cli default allocation was too low.
</blockquote>


#### 3. Measure the rewards
Since NEAR automatically re-stakes every staking pool rewards, you have to update your staked balance to know the amount of tokens you earned with your validator.

Use the use the call method `refresh_staking_pool_balance` to check your new balance:
```
near call <LOCKUP_ID> refresh_staking_pool_balance '' --accountId <OWNER_ID>
```
You should expect a result like:
```
$ near call meerkat.stakewars.testnet refresh_staking_pool_balance '' --accountId meerkat.testnet | grep "current total balance"
	Log [meerkat.stakewars.testnet]: The current total balance on the staking pool is 65000000000000000000000000
```
Where `<LOCKUP_ID>` is `meerkat.stakewars.testnet`, and `<OWNER_ID>` is `meerkat.testnet`. In the example above, the result is passed to `| grep "current total balance"` to display only the relevant output.

Please refer to the [Lockup Contract readme](https://github.com/near/core-contracts/tree/master/lockup) if you need to know how to withdraw the staking rewards to your main wallet.


### 2. Staking Pool Commands
Any funds that are not stored inside lockup contracts can be directly delegated to a [staking pool](https://github.com/near/core-contracts/tree/master/staking-pool) by using the call method `deposit_and_stake`:
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


## Unstake and withdraw your tokens
NEAR Protocol automatically re-stakes all the rewards back to the staking pools, so your staked balance increases over time, accruing rewards.

If you want to withdraw funds, you have to issue two separate commands:
1. Manually unstake tokens from the staking pool, and wait three epochs
3. Manually withdraw tokens back to your main account

Both these command require the amount in _yoctoNEAR_, which is the smallest unit of account for NEAR tokens. You can use the table below for the conversion:

| NEAR |  YoctoNEAR  | YoctoNEAR |
| ---- | ----------- | ----------------|
| `1` | `1*10^24` | `1000000000000000000000000` |
| `10` | `1*10^25` | `10000000000000000000000000` |
| `100` | `1*10^26` | `100000000000000000000000000` |
| `1,000` | `1*10^27` | `1000000000000000000000000000` |
| `10,000` | `1*10^28` | `10000000000000000000000000000` |

As an example, if you want to unstake `10` NEAR tokens from the staking pool, you have to call the method `unstake` with `10000000000000000000000000` (`1*10^24`, 10 power 24, or 10 with 24 zeros) as an argument.


### 1. Manually Unstake tokens

Before unstaking any tokens, use the the view method `get_account` introduced above to know what is the available balance:
```
near view <POOL_ID> get_account '{"account_id": "<LOCKUP_ID>"}'
```
You should expect a result like:
```
$ near view zpool.pool.f863973.m0 get_account '{"account_id": "meerkat.stakewars.testnet"}'
View call: zpool.pool.f863973.m0.get_account({"account_id": "meerkat.stakewars.testnet"})
{
  account_id: 'meerkat.stakewars.testnet',
  unstaked_balance: '5',
  staked_balance: '86236099167204810592552675',
  can_withdraw: false
}
```
Where `<POOL_ID>` is `zpool.pool.f863973.m0`, and the `<LOCKUP_ID>` is `meerkat.stakewars.testnet`. The result of this method shows:
* An unstaked balance of `5` _yocto_
* A staked balance of `86236099167204810592552675` _yocto_, or `86.23` NEAR tokens
* `can_withdraw` is `false` (see below)

<blockquote class="info">
    <strong>Check your rewards</strong><br><br>
    From the examples above, the initial stake of 65 NEAR tokens increased to 86.23 tokens, with 21.23 tokens as a reward!
</blockquote>

You can unstake an amount of funds that is equal or lower than your `staked_balance`, by calling the metod `unstake`:
```
near call <LOCKUP_ID> unstake '{"amount": "<YOCTO>"}' --accountId <OWNER_ID>
```
You should expect a result like:
```
$ near call meerkat.stakewars.testnet unstake '{"amount": "42000000000000000000000000"}' --accountId meerkat.testnet --useLedgerKey="44'/397'/0'/0'/1'" --gas 300000000000000
Make sure to connect your Ledger and open NEAR app
Scheduling a call: meerkat.stakewars.testnet.unstake({"amount": "42000000000000000000000000"})
Waiting for confirmation on Ledger...
Using public key: ed25519:5JgsX9jWUTS5ttHeTjuDFgCmB5YX77f7GHxuQfaGVsyj
Waiting for confirmation on Ledger...
Ledger app version: 1.1.3
Receipts: D5fCCWa5b5N8X9VtxsbRvGhSSCQc56Jb312DEbG4YY8Z, 72rgHrMb1zkUU2RiEz2EMCAuMWFgRJTf8eovwAUkuo31, A2dvSgxpDXfNZUrDVdpewk1orVTVxCMiicjk7qyNq3dW
	Log [meerkat.stakewars.testnet]: Unstaking 42000000000000000000000000 from the staking pool @zpool.pool.f863973.m0
Receipts: 9MbLXn28nQyL6BopMEUggBD9NA1QfVio9VB3LTNJ6P5b, 5g7F6HehoGZ2DHS7w54xHAjAeHCsHaAsKpVed76MFYru, BKbtF77i1WEqpuFLtEjWerM2LVZW1md9ecQ5UcBpMNXj
	Log [meerkat.stakewars.testnet]: Epoch 162: Contract received total rewards of 9488161121527521670023204339 tokens. New total staked balance is 142388816229749953331375665038. Total number of shares 79574075700231185032355056920
	Log [meerkat.stakewars.testnet]: Total rewards fee is 530246455678218748147822292 stake shares.
	Log [meerkat.stakewars.testnet]: @meerkat.stakewars.testnet unstaking 42000000000000000000000001. Spent 23471725293488513736732361 staking shares. Total 42000000000000000000000002 unstaked balance and 24721370659717793595217321 staking shares
	Log [meerkat.stakewars.testnet]: Contract total staked balance is 142346816229749953331375665038. Total number of shares 79550603974937696518618324559
Receipt: 3DXSx8aMvhwtJUB6mhTueNbDiqz5wYu3xzzYkZrgjw1u
	Log [meerkat.stakewars.testnet]: Unstaking of 42000000000000000000000000 at @zpool.pool.f863973.m0 succeeded
Transaction Id 2rRpdN8AAoySfWsgE7BRtRfz7VFnyFzRhssfaL87rXGf
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/2rRpdN8AAoySfWsgE7BRtRfz7VFnyFzRhssfaL87rXGf
true
```
Where `<LOCKUP_ID>` is `meerkat.stakewars.testnet`, the `<YOCTO>` is `42000000000000000000000000`, and the `<OWNER_ID>` is `meerkat.testnet`.

**Wait three epochs, or \~36 hours before using the withdraw command**

For security reasons, NEAR Protocol keeps your unstaked funds locked for three more epochs (\~36 hours). Use again the view method `get_account` to verify if `can_withdraw` is `true`:
```
near view <POOL_ID> get_account '{"account_id": "<LOCKUP_ID>"}'
```
The result should be as follows:
```
$ near view zpool.pool.f863973.m0 get_account '{"account_id": "meerkat.stakewars.testnet"}'
View call: zpool.pool.f863973.m0.get_account({"account_id": "meerkat.stakewars.testnet"})
{
  account_id: 'meerkat.stakewars.testnet',
  unstaked_balance: '42000000000000000000000006',
  staked_balance: '44244760537191121230392104',
  can_withdraw: true
}
```
Where `<POOL_ID>` is `zpool.pool.f863973.m0`, the `<LOCKUP_ID>` is `meerkat.stakewars.testnet` and the variable `can_withdraw` is `true`. This means that your `42000000000000000000000000` _Yocto_ (42 NEAR tokens) are now available for withdraw.

### 2. Manually Withdraw tokens
Funds can be withdrawn after three epochs (\~36 hours) from the `unstake` command. 

Use the call method `withdraw_all_from_staking_pool`:
```
near call <LOCKUP_ID> withdraw_all_from_staking_pool '' --accountId <OWNER_ID>
```
You should expect a result like this one:
```
$ near call meerkat.stakewars.testnet withdraw_all_from_staking_pool '' --accountId meerkat.testnet --useLedgerKey="44'/397'/0'/0'/1'" --gas 300000000000000
Make sure to connect your Ledger and open NEAR app
Scheduling a call: meerkat.stakewars.testnet.withdraw_all_from_staking_pool()
Waiting for confirmation on Ledger...
Using public key: ed25519:5JgsX9jWUTS5ttHeTjuDFgCmB5YX77f7GHxuQfaGVsyj
Waiting for confirmation on Ledger...
Ledger app version: 1.1.3
Receipts: 6dt3HNDrb7jM4F7cRtwgRSfRMWwFmE8BHeZSDghrpQtw, 7pNKTevct7Z4birAPec81LmnSpJSeJXbFq3cBdjFvsnM, A7yJXdaGcFyiBNQimFtHF479Jm6xiXHvfodTbtFf7Rww
	Log [meerkat.stakewars.testnet]: Going to query the unstaked balance at the staking pool @zpool.pool.f863973.m0
Receipts: 2ytgB57D6CJe3vkxdVTiVAytygpTteR4sDmpUNxo5Ltk, CZChcT1uDDxqojnZQq6r7zzx6FE3Z6E5fZ3F23Y1dnyM, GjrWhJgbCAAHUNyvw4QX5YKFpeUVNJ9GpuEdmUXFozeG
	Log [meerkat.stakewars.testnet]: Withdrawing 42000000000000000000000006 from the staking pool @zpool.pool.f863973.m0
Receipts: 9nHoqnQygqKYyyR5KDofkYy5KiJxbu2eymoGUUc2tSR3, 5RvBSb4BuHxRhc5U6nLgsCjAvJ88hJ2jwkr1ramk37mE, 5PDN1EYXnCJrTSU7zzJtmAuj9vvGSVurh94nvfHDHXpa, GTTGm4sXcSWD2gnohMJzD7TQcQxuSe7AFABZKqxPLgau
	Log [meerkat.stakewars.testnet]: Epoch 168: Contract received total rewards of 514182787298700000000 tokens. New total staked balance is 142377784876419564057032272059. Total number of shares 79552334320822393318832070510
	Log [meerkat.stakewars.testnet]: Total rewards fee is 28729510739826825657 stake shares.
	Log [meerkat.stakewars.testnet]: @meerkat.stakewars.testnet withdrawing 42000000000000000000000006. New unstaked balance is 0
Receipt: rS5KjvzkbaxEH7aG8VXyd9EEEfY7PygdLzSZ3W9qf3w
	Log [meerkat.stakewars.testnet]: The withdrawal of 42000000000000000000000006 from @zpool.pool.f863973.m0 succeeded
Transaction Id EjNpoU7BNfEQujckL8JiAP8kYDH1SMLw4wC32tL3uyaH
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/EjNpoU7BNfEQujckL8JiAP8kYDH1SMLw4wC32tL3uyaH
true
```
Where `<LOCKUP_ID>` is `meerkat.stakewars.testnet`, the `<OWNER_ID>` is `meerkat.testnet` and the `true` statement confirms the successful withdrawal.

By using again the view metod ` `

```
near view <POOL_ID> get_account '{"account_id": "<LOCKUP_ID>"}'
```
The result should be as follows:
```
$ near view zpool.pool.f863973.m0 get_account '{"account_id": "meerkat.stakewars.testnet"}'
View call: zpool.pool.f863973.m0.get_account({"account_id": "meerkat.stakewars.testnet"})
{
  account_id: 'meerkat.stakewars.testnet',
  unstaked_balance: '0',
  staked_balance: '44244760947075774431066852',
  can_withdraw: true
}
```
At this point the `unstaked_balance` is `0`, and the funds are back in the lockup contract balance.


<blockquote class="warning">
    <strong>Heads up</strong><br><br>
    Lockup contracts allow you to transfer only the unlocked portion of your funds. In the example above, out of the 42 NEAR unstaked, only 21.23 can be transferred to another wallet or exchange. 
</blockquote>



## Additional links
- [NEAR Core Contracts on Github](https://github.com/near/core-contracts)
- [NEAR block explorer](https://explorer.near.org)
- [near-cli on Github](https://github.com/near/near-cli)


