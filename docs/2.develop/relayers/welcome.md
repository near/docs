---
id: build-relayer
title: Building a Meta Transaction Relayer
sidebar_label: Building a Relayer
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

Relayers serve to delegate gas fees to a web service, allowing users to transact on NEAR without the need to acquire the token themselves while still retaining the security of signing their own transactions. This guide will lead you through the components necessary to construct a relayer capable of handling meta transactions.

:::tip

If you're already acquainted with the technology, you can fast track to a [working open source example](https://github.com/SurgeCode/near-relay-example) 

:::

For other languages you can check out [Python](https://github.com/here-wallet/near-relay), [Rust](https://github.com/near/pagoda-relayer-rs) 



## How it works


![relayer-overview-technical](/docs/assets/welcome-pages/relayer-overview-technical.png)

A basic relayer consists of a web server housing a funded NEAR account. This account receives an encoded signed transaction, which can subsequently be decoded into a `SignedDelegate` format and transmitted on-chain.

The client can then generate a `SignedDelegateAction` (signed message that isn't yet sent), encode it, and transmit it to this server, where it will be relayed onto the blockchain.

## Relayer (server)


<Tabs groupId="code-tabs">
  <TabItem value="near-api-js">

    Here's a simple express endpoint deserializes the body, instantiates the relayer account and then sends the transaction.

  <Github language='typescript' url='https://github.com/SurgeCode/near-relay-example/blob/main/server.ts' start='16' end='27'/>

    You can easily get the account object used to send the transactions from its private key using this snippet

  <Github language='typescript' url='https://github.com/SurgeCode/near-relay-example/blob/main/util.ts' start='5' end='17'/>  


:::info

 The code in the example only works from the following versions onwards

```
"near-api-js": "3.0.4"
"@near-js/transactions": "1.1.2",
"@near-js/accounts": "1.0.4"
```

::: 


  </TabItem>
  <TabItem value="@near-relay/server">
  @near-relay simplifies meta transactions making it easier to get started for a beginner

  To start, call the relay method inside an endpoint to automatically deserialize the transaction and send it with the account defined in the environment variables.

   <Github language='typescript' url='https://github.com/SurgeCode/near-relay/blob/main/server/server.ts' start='8' end='12'/>


  If you're interested in relaying account creation as well, it's quite straightforward. Simply create another endpoint and directly call the createAccount method with the accountId and publicKey. These parameters are automatically included in the body when using the corresponding client library.
  <Github language='typescript' url='https://github.com/SurgeCode/near-relay/blob/main/server/server.ts' start='14' end='18'/>
  
  </TabItem>
  </Tabs>



## Client

<Tabs groupId="code-tabs">
  <TabItem value="near-api-js">
  In this method we are creating an arbitrary smart contract call, instantiating an account and using it to sign but not send the transaction. We can then serialize it and send it to the relayer where it will be delegated via the previously created endpoint.
  <Github language='typescript' url='https://github.com/SurgeCode/near-relay-example/blob/main/client.ts' start='10' end='30'/>

  </TabItem>
  <TabItem value="@near-relay/client">
   As mentioned in the above note in order to be able to relay on the client side its necessary to have access to signing transactions directly on the client. Luckily leveraging the near biometric library its possible to do so in a non custodial way.

   By calling this method and passing in the url for the account creation endpoint (mentioned in the server section) as well as the accoundId everything is handled under the hood to successfully create an account.
  <Github language='typescript' url='https://github.com/SurgeCode/near-relay/blob/main/example/src/app/page.tsx' start='17' end='23'/>

   On the client side you just need to create an `Action` and pass it into the `relayTransaction` method along with the url of the relayer endpoint discussed in the server section and the id of the receiverId.

   <Github language='typescript' url='https://github.com/SurgeCode/near-relay/blob/main/example/src/app/page.tsx' start='25' end='36'/>
  </TabItem>
  </Tabs>

<details>
  <summary> Relaying with wallets </summary>


  At the moment, wallet selector standard doesn't support signing transactions without immediately sending them. This functionality is essential for routing transactions to a relayer. Therefore, to smoothly integrate relaying on the client side, it's necessary to be able to sign transactions without relying on wallets.
  Progress is being made to make this possible in the future.
</details>


### Gating the relayer

In most production applications its expected to want to be able to gate the relayer to only be used in certain cases. By taking apart the `delegateAction` object inside the `SignedDelegate`on the server this can be done simply.
```
export declare class DelegateAction extends Assignable {
    senderId: string;
    receiverId: string;
    actions: Array<Action>;
    nonce: BN;
    maxBlockHeight: BN;
    publicKey: PublicKey;
}
```
We can for example gate by some particular user or contract

```typescript
  const serializedTx: Buffer = req.body;
  const deserializedTx: SignedDelegate = deserialize(SCHEMA.SignedDelegate, Buffer.from(serializedTx)) as SignedDelegate;
  const relayerAccount: Account = await getAccount(NETWORK_ID, RELAYER_ID, RELAYER_PRIVATE_KEY);
  const delegateAction = deserializedTx?.delegateAction

  if(delegateAction.senderId == 'someUserId' || delegateAction.receiverId == 'someContractId' ){
       const receipt = await relayerAccount.signAndSendTransaction({
       actions: [actionCreators.signedDelegate(deserializedTx)],
       receiverId: deserializedTx.delegateAction.senderId
  });
  }

```

Other examples could be looking into the actions and seeing if there is deposit or gas and limiting them, gating by particular smart contract methods or even args.

You can decode the args using:

```
JSON.parse(Buffer.from(args_base64 || "", "base64").toString())
```










