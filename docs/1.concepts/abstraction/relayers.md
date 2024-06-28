---
id: relayers
title: Relayers
---

A relayer is a simple web service that receives signed transactions from NEAR users, and relays them to the network while attaching tokens to sponsor their GAS expenses. This can be useful to create applications in which the users are not required to purchase NEAR in order to be able to transact. In this document we present a high-level overview on how relayers work. Please check the [build a relayer](../../2.build/1.chain-abstraction/meta-transactions.md) page if you want to learn how to build your own relayer.

---

## How it works

![relayer-overview](/docs/assets/welcome-pages/relayer-overview.png)

Relayers are a natural consequence of [Meta Transactions](meta-tx.md) ([NEP-366](https://github.com/near/NEPs/blob/master/neps/nep-0366.md)), a special type of transaction that can be best understood as an intent.

The user expresses: _"I want to do a specific action on chain"_ and signs this intent **off-chain**, but does not send it to the network. Instead, they send the intent to a `Relayer`, which wraps the message into an actual transaction, attaches the necessary funds, and sends it to the network.

<details>
<summary> Technical Details </summary>

Technically, the end user (client) creates a `SignedDelegateAction` that contains the data necessary to construct a `Transaction`, signs the `SignedDelegateAction` using their key, and send it to  the relayer service.

When the request is received, the relayer uses its own key to sign a `Transaction` using the fields in the `SignedDelegateAction` as input to create a `SignedTransaction`.

The `SignedTransaction` is then sent to the network via RPC call, and the result is sent back to the client. The `Transaction` is executed in such a way that the relayer pays the GAS fees, but all actions are executed as if the user had sent the transaction.
</details>

---

## Why use a Relayer?

There are multiple reasons to use a relayer:
1. Your users are new to NEAR and don't have any gas to cover transactions
2. Your users have an account on NEAR, but only have a Fungible Token Balance. They can now use the FT to pay for gas
3. As an enterprise or a large startup you want to seamlessly onboard your existing users onto NEAR without needing them to worry about gas costs and seed phrases
4. As an enterprise or large startup you have a user base that can generate large spikes of user activity that would congest the network. In this case, the relayer acts as a queue for low urgency transactions
5. In exchange for covering the gas fee costs, relayer operators can limit where users spend their assets while allowing users to have custody and ownership of their assets
6. Capital Efficiency: Without relayer if your business has 1M users they would have to be allocated 0.25 NEAR to cover their gas costs totalling 250k NEAR. However, only ~10% of the users would actually use the full allowance and a large amount of the 250k NEAR is just sitting there unused. So using the relayer, you can allocate 50k NEAR as a global pool of capital for your users, which can refilled on an as needed basis. 