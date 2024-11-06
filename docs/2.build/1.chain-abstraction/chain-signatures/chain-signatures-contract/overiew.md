---
id: overview
title: Chain signature in a NEAR contract
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

A key part of the chain signatures technology is the ability for a smart contract to be able to call the MPC contract to sign transactions on other chains. This enables you to implement smart contract logic on top of other chains and inherit NEAR's account model, finality and gas price. This becomes an especially powerful tool when this is used for non smart contract chains like Bitcoin as now they essentially have a smart contract layer on top of them.

A library that helps us implement this is [omni-transaction-rs](https://github.com/near/omni-transaction-rs); it allows us build transactions inside of a smart contract to then be signed by the MPC contract. Building a transaction inside of the contract instead of the client allows for only certain transactions to be signed by the contract. 

---

# Passing relevant information to the contract

Transactions need some information that can only be fetched off chain such as the nonce and other information that is easiest to fetch off chain like the addresses. This information can be passed to the contract as arguments. Each chain creates transactions differently so the information that needs to be passed to the contract will be different for each chain.

---

# Constructing a transaction

The library implements a transaction builder for each chain. 

<Tabs groupId="code-tabs">
    <TabItem value="Ξ Ethereum">
        <Github language="rust" url="" start="" end="" />
    </TabItem>
    <TabItem value="₿ Bitcoin">
        <Github language="rust" url="" start="" end="" />
    </TabItem>
    <TabItem value="Ⓝ NEAR">
        <Github language="rust" url="" start="" end="" />
    </TabItem>
</Tabs>


---

# Building the payload 

Once the transaction is built you next need to construct the payload that will be sent to the MPC contract.

<Tabs groupId="code-tabs">
    <TabItem value="Ξ Ethereum">
        <Github language="rust" url="" start="" end="" />
    </TabItem>
    <TabItem value="₿ Bitcoin">
        <Github language="rust" url="" start="" end="" />
    </TabItem>
    <TabItem value="Ⓝ NEAR">
        <Github language="rust" url="" start="" end="" />
    </TabItem>
</Tabs>

---


# Calling the MPC contract 

Now we have the payload we can request it to be signed by the MPC contract using the `sign` method.

<Tabs groupId="code-tabs">
    <TabItem value="Ξ Ethereum">
        <Github language="rust" url="" start="" end="" />
    </TabItem>
    <TabItem value="₿ Bitcoin">
        <Github language="rust" url="" start="" end="" />
    </TabItem>
    <TabItem value="Ⓝ NEAR">
        <Github language="rust" url="" start="" end="" />
    </TabItem>

</Tabs>


---

# Reconstructing the signature

Note that this step is optional. You can decide to reconstruct the signature and add it to the transaction in the contract or the client, but an advantage of doing it in the contract is that you can return a fully signed transaction from the contract which can be straight away braodcasted to the network instead of having to store the transaction in the frontend. This also makes it much easier for indexers/relayers to get transactions and broadcast them.


## Passing the transaction to the callback

We will reconstruct the signature in the callback. We need to pass the transaction to the callback. First the transaction needs to be serialized as a json string many of the types used in the transaction are not serializable by default.

<Github language="rust" url=""start="" end="" />

We will pass the json string to the callback.

<Github language="rust" url=""start="" end="" />

Then the callback will recieve the result from the mpc contract and the transaction and check that the result is ok.

<Github language="rust" url=""start="" end="" />

Now the tranasction is converted back into is respective transaction structure the individual parts of the singature are reconstructed into a single signature and the singature is added to the transaction and returned from the contract. 

<Tabs groupId="code-tabs">
    <TabItem value="Ξ Ethereum">
        <Github language="rust" url="" start="" end="" />
    </TabItem>
    <TabItem value="₿ Bitcoin">
        <Github language="rust" url="" start="" end="" />
    </TabItem>
    <TabItem value="Ⓝ NEAR">
        <Github language="rust" url="" start="" end="" />
    </TabItem>

</Tabs>


---

# Relaying the signed transaction



---

# Cookbook
:::info Cookbook

Further examples of building different transactions can be found in the [cookbook](https://github.com/Omni-rs/examples/tree/main).

:::