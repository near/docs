---
sidebar_position: 4
---

# Deploying Contracts

You might want your smart contract to deploy subsequent smart contract code for a few reasons:

- The contract acts as a Factory, a pattern where a parent contract creates many child contracts ([Mintbase](https://www.mintbase.io/) does this to create a new NFT store for [anyone who wants one](https://docs.mintbase.io/creating/store/deploy-fee); [Rainbow Bridge](https://near.org/bridge/) does this to deploy separate Fungible Token contracts for [each bridged token](https://github.com/aurora-is-near/rainbow-token-connector/blob/ce7640da144f000e0a93b6d9373bbc2514e37f3b/bridge-token-factory/src/lib.rs#L311-L341))
- The contract [updates its own code](../../../2.develop/upgrade.md#programmatic-update) (calls `deploy` on itself).
- You could implement a "contract per user" system that creates app-specific subaccounts for users (`your-app.user1.near`, `your-app.user2.near`, etc) and deploys the same contract to each. This is currently prohibitively expensive due to NEAR's [storage fees](https://docs.near.org/concepts/storage/storage-staking), but that may be optimized in the future. If it is, this sort of "sharded app design" may become the more scalable, user-centric approach to contract standards and app mechanics. An early experiment with this paradigm was called [Meta NEAR](https://github.com/metanear).

If your goal is to deploy to a subaccount of your main contract like Mintbase or the Rainbow Bridge, you will also need to create the account. So, combining concepts from the last few pages, here's what you need:

```js
import { includeBytes, NearPromise, near } from "near-sdk-js";

const CODE = includeBytes("./res/contract.wasm");

NearPromise.new("subaccount.example.near")
  .createAccount()
  .addFullAccessKey(near.signerAccountPk())
  .transfer(BigInt(3_000_000_000_000_000_000_000_000)) // 3e24yN, 3N
  .deployContract(CODE);
```

Here's what a full contract might look like, showing a naïve way to pass `code` as an argument rather than hard-coding it with `includeBytes`:

```js
import { NearPromise, near, validateAccountId } from "near-sdk-js";

const INITIAL_BALANCE = BigInt(3_000_000_000_000_000_000_000_000); // 3e24yN, 3N

@NearBindgen({})
export class Contract {
  @call({ privateFunction: true })
  createAccount({ prefix, code }) {
    const subAccountId = `${prefix}.${near.currentAccountId()}`;
    validateAccountId(subAccountId);
    NearPromise.new(subAccountId)
        .createAccount()
        .addFullAccessKey(near.signerAccountPk())
        .transfer(INITIAL_BALANCE)
        .deployContract(code);
  }
}
```

Why is this a naïve approach? It could run into issues because of the 4MB transaction size limit – the function above would deserialize and heap-allocate a whole contract. For many situations, the `includeBytes` approach is preferable. If you really need to attach compiled Wasm as an argument, you might be able to copy the approach [used by Sputnik DAO v2](https://github.com/near-daos/sputnik-dao-contract/blob/a8fc9a8c1cbde37610e56e1efda8e5971e79b845/sputnikdao2/src/types.rs#L74-L142).
