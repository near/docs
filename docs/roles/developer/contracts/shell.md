---
id: shell
title: NEAR Shell
sidebar_label: NEAR Shell
---

One of the fastest ways to verify that a contract is deployed to the network is to invoke one of its methods using NEAR Shell. If you already have [NEAR Shell installed](/docs/development/near-clitool), you can invoke contract methods as follows:

To invoke a `change` method:

```sh
near call <contractName> <methodName> [args]     # schedule smart contract call which can modify state
```

To invoke a `view` method:

```sh
near view <contractName> <methodName> [args]     # make smart contract call which can view state
```

<blockquote class="info">
<strong>did you know?</strong><br><br>

`view` methods don't change the state of the blockchain, as opposed to `change` methods which do, and therefore require a cryptographic signature, cost a little more to compute and take a little longer to process since they're execution is recorded permanently on the blockchain (which requires consensus)

</blockquote>
