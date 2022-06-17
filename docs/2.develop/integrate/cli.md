---
id: cli
title: Command Line Interface
---
Here we will only briefly mention how to use the [NEAR CLI](/concepts/tools/near-cli).
If you want to find the full documentation on NEAR CLI please follow this link.


#### View methods
We call view methods those that only **read** the state, do not perform any [action](contracts/actions.md), and do not access the [environment](contracts/environment/environment.md). Calling these methods is free, and do not require to specify which account is being used to make the call:

```bash
near view <accountId> <methodName>
```

#### Change methods
Change methods are those that are not view methods. For these methods we do need to specify the account being used to make the call.

```bash
near call <contractId> <methodName> <jsonArgs> --accountId <yourAccount> [--attachDeposit <amount>] [--gas <GAS>]
```