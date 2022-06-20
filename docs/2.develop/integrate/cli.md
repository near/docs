---
id: cli
title: Command Line Interface
---
Here we will only briefly mention how to use the [NEAR CLI](/concepts/tools/near-cli).
If you want to find the full documentation on NEAR CLI please follow this link.


#### View methods
View methods are those that perform **read-only** operations. Calling these methods is free, and do not require to specify which account is being used to make the call:

```bash
near view <accountId> <methodName>
```

#### Change methods
Change methods are those that perform both read and write operations. For these methods we do need to specify the account being used to make the call, since that account will expend GAS in the call.

```bash
near call <contractId> <methodName> <jsonArgs> --accountId <yourAccount> [--attachDeposit <amount>] [--gas <GAS>]
```