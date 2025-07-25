---
id: meta-transactions
title: Meta Transactions
description: "Learn about NEP-366 meta transactions on NEAR, allowing users to execute transactions without owning gas tokens by using relayers to cover transaction fees."
---

[NEP-366](https://github.com/near/NEPs/pull/366) introduced the concept of meta transactions to Near Protocol. This feature allows users to execute transactions on NEAR without owning any gas or tokens. In order to enable this, users construct and sign transactions off-chain. A third party (the relayer) is used to cover the fees of submitting and executing the transaction.

---

## Overview

![Flow chart of meta
transactions](https://raw.githubusercontent.com/near/NEPs/003e589e6aba24fc70dd91c9cf7ef0007ca50735/neps/assets/nep-0366/NEP-DelegateAction.png)
_Credits for the diagram go to the NEP authors Alexander Fadeev and Egor
Uleyskiy._

The graphic shows an example use case for meta transactions. Alice owns an
amount of the fungible token `$FT`. She wants to transfer some to John. To do
that, she needs to call `ft_transfer("john", 10)` on an account named `FT`.

The problem is, Alice has no NEAR tokens. She only has a NEAR account that
someone else funded for her and she owns the private keys. She could create a
signed transaction that would make the `ft_transfer("john", 10)` call. But
validator nodes will not accept it, because she does not have the necessary Near
token balance to purchase the gas.

With meta transactions, Alice can create a `DelegateAction`, which is very
similar to a transaction. It also contains a list of actions to execute and a
single receiver for those actions. She signs the `DelegateAction` and forwards
it (off-chain) to a relayer. The relayer wraps it in a transaction, of which the
relayer is the signer and therefore pays the gas costs. If the inner actions
have an attached token balance, this is also paid for by the relayer.

On chain, the `SignedDelegateAction` inside the transaction is converted to an
action receipt with the same `SignedDelegateAction` on the relayer's shard. The
receipt is forwarded to the account from `Alice`, which will unpacked the
`SignedDelegateAction` and verify that it is signed by Alice with a valid Nonce,
etc. If all checks are successful, a new action receipt with the inner actions
as body is sent to `FT`. There, the `ft_transfer` call finally executes.

---

## Relayer

Meta transactions only work with an off-chain service known as `relayer`. Think of it as a server that accepts a `SignedDelegateAction`, does some checks on them and eventually forwards it inside a transaction to the network.

:::tip

Want to build a relayer? Check out the [Relayer Guide](meta-transactions.md)

:::

A relayer may choose to offer their service for free but that's not going to be
financially viable long-term. But they could easily have the user pay using
other means, outside of Near blockchain. And with some tricks, it can even be
paid using fungible tokens on Near.

In the example visualized above, the payment is done using $FT. Together with
the transfer to John, Alice also adds an action to pay 0.1 $FT to the relayer.
The relayer checks the content of the `SignedDelegateAction` and only processes
it if this payment is included as the first action. In this way, the relayer
will be paid in the same transaction as John.

:::warning Keep in mind
The payment to the relayer is still not guaranteed. It could be that
Alice does not have sufficient `$FT` and the transfer fails. To mitigate, the
relayer should check the `$FT` balance of Alice first.
:::

Unfortunately, this still does not guarantee that the balance will be high
enough once the meta transaction executes. The relayer could waste NEAR gas
without compensation if Alice somehow reduces her $FT balance in just the right
moment. Some level of trust between the relayer and its user is therefore
required.

<details>
<summary> Technical Details </summary>

Technically, the end user (client) creates a `SignedDelegateAction` that contains the data necessary to construct a `Transaction`, signs the `SignedDelegateAction` using their key, and send it to  the relayer service.

When the request is received, the relayer uses its own key to sign a `Transaction` using the fields in the `SignedDelegateAction` as input to create a `SignedTransaction`.

The `SignedTransaction` is then sent to the network via RPC call, and the result is sent back to the client. The `Transaction` is executed in such a way that the relayer pays the GAS fees, but all actions are executed as if the user had sent the transaction.
</details>

<details>
<summary> Why using a relayer? </summary>

## Why use a Relayer?

There are multiple reasons to use a relayer:
1. Your users are new to NEAR and don't have any gas to cover transactions
2. Your users have an account on NEAR, but only have a Fungible Token Balance. They can now use the FT to pay for gas
3. As an enterprise or a large startup you want to seamlessly onboard your existing users onto NEAR without needing them to worry about gas costs and seed phrases
4. As an enterprise or large startup you have a user base that can generate large spikes of user activity that would congest the network. In this case, the relayer acts as a queue for low urgency transactions
5. In exchange for covering the gas fee costs, relayer operators can limit where users spend their assets while allowing users to have custody and ownership of their assets
6. Capital Efficiency: Without relayer if your business has 1M users they would have to be allocated 0.25 NEAR to cover their gas costs totalling 250k NEAR. However, only ~10% of the users would actually use the full allowance and a large amount of the 250k NEAR is just sitting there unused. So using the relayer, you can allocate 50k NEAR as a global pool of capital for your users, which can refilled on an as needed basis. 

</details>

---

## Limitations

### Single receiver

A meta transaction, like a normal transaction, can only have one receiver. It's
possible to chain additional receipts afterwards. But crucially, there is no
atomicity guarantee and no roll-back mechanism.

<hr class="subsection" />

### Accounts must be initialized

Any transaction, including meta transactions, must use NONCEs to avoid replay
attacks. The NONCE must be chosen by Alice and compared to a NONCE stored on
chain. This NONCE is stored on the access key information that gets initialized
when creating an account.

---

## Constraints on the actions inside a meta transaction

A transaction is only allowed to contain one single delegate action. Nested
delegate actions are disallowed and so are delegate actions next to each other
in the same receipt.

---

## Gas costs for meta transactions

Meta transactions challenge the traditional ways of charging gas for actions.
Let's assume Alice uses a relayer to
execute actions with Bob as the receiver.

1. The relayer purchases the gas for all inner actions, plus the gas for the
   delegate action wrapping them.
2. The cost of sending the inner actions and the delegate action from the
   relayer to Alice's shard will be burned immediately. The condition `relayer
   == Alice` determines which action `SEND` cost is taken (`sir` or `not_sir`).
   Let's call this `SEND(1)`.
3. On Alice's shard, the delegate action is executed, thus the `EXEC` gas cost
   for it is burned. Alice sends the inner actions to Bob's shard. Therefore, we
   burn the `SEND` fee again. This time based on `Alice == Bob` to figure out
   `sir` or `not_sir`. Let's call this `SEND(2)`.
4. On Bob's shard, we execute all inner actions and burn their `EXEC` cost.

Each of these steps should make sense and not be too surprising. But the
consequence is that the implicit costs paid at the relayer's shard are
`SEND(1)` + `SEND(2)` + `EXEC` for all inner actions plus `SEND(1)` + `EXEC` for
the delegate action. This might be surprising but hopefully with this
explanation it makes sense now!

---

## Gas refunds in meta transactions

Gas refund receipts work exactly like for normal transaction. At every step, the
difference between the pessimistic gas price and the actual gas price at that
height is computed and refunded. At the end of the last step, additionally all
remaining gas is also refunded at the original purchasing price. The gas refunds
go to the signer of the original transaction, in this case the relayer. This is
only fair, since the relayer also paid for it.

---

## Balance refunds in meta transactions

Unlike gas refunds, the protocol sends balance refunds to the predecessor
(a.k.a. sender) of the receipt. This makes sense, as we deposit the attached
balance to the receiver, who has to explicitly reattach a new balance to new
receipts they might spawn.

In the world of meta transactions, this assumption is also challenged. If an
inner action requires an attached balance (for example a transfer action) then
this balance is taken from the relayer.

The relayer can see what the cost will be before submitting the meta transaction
and agrees to pay for it, so nothing wrong so far. But what if the transaction
fails execution on Bob's shard? At this point, the predecessor is `Alice` and
therefore she receives the token balance refunded, not the relayer. This is
something relayer implementations must be aware of since there is a financial
incentive for Alice to submit meta transactions that have high balances attached
but will fail on Bob's shard.

---

## Function Call Access Keys in Meta Transactions

[Function Call Access Keys](../protocol/access-keys.md#function-call-keys)
are limited to signing transactions for specific methods on a specific contract.


Additionally, they can have an allowance, which limits the amount of tokens that
can be spent on GAS fees. This limit however can be circumvented by using meta
transactions.

When a `DelegateAction` is processed in the network, the access key of the sender
is checked against the receiver and the methods called. If the access key is allowed to
make the call, the action is executed.

The allowance however is not checked, as all costs have been covered by the
relayer. Hence, the action will be executed even if the allowance is insufficient
to cover the costs.
