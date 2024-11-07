---
id: scripts
title: Scripts
---

import {Github, Language} from "@site/src/components/codetabs"


We implement a few scripts to interact with the contract. This is not just as simple as calling a method in the contract as we will have to do manage the MPC public key added to the subscriber account.

---

## Key derivation

You'll see in each of these scripts that we are using a file called [derive-mpc-key.js](https://github.com/PiVortex/subscription-example/blob/main/scripts/utils/derive-mpc-key.js), as the name suggests this is used to derive the public key of the MPC key being used to sign the transactions on behalf of the subscriber. Feel free to look into this code but you don't particularly need to understand it.

However, there are some things worth noting. NEAR accounts usually use ed25519 keys but they also support secp256k1 keys. As mentioned previously we are using `secp256k1` keys here since this is the only key type currently supported by the MPC contract. You can also see that the  full `path` is a combination of the `predeccessor` to the MPC contract (the subscription contract) along with the path given as the argument. The inclustion of the predeccessor means that only this contract is able to sign transactions for the given key. 

---

## Subscribe

To start a new subscription we simply derive the MPC key for the subscriber by inputting the `contractAccountId` as the `predecessorId` and the `subscriberAccountId` as the `derviationPath` and add it to the account. We then call the `subscribe` method in the contract.

<Language language="javascript" showSingleFName={true}>
    <Github fname="start-subscription.js"
            url="https://github.com/PiVortex/subscription-example/blob/main/scripts/start-subscription.js#L32-L46"
            start="32" end="46" />
</Language>

---

## Charge

In the charge script we will call the `charge_subscription` method from the `admin` account to charge a payment from the `subscriber` account. To call this method we need to supply the off-chain data to construct the transaction as mentioned before. We need:
- The subscriber's MPC controlled `public_key` again, as this is the public key that the MPC will produce a signature for.
- The `next nonce` of the key, that ensures that the transaction is unique.
- A `block hash` within the last 24 hours, this is used to ensure that the transaction was recently signed. If the signed transaction is not relayed within the last 24 hours of the block hash supplied then the network will reject the transaction.  

These details are available via RPC calls.

<Language language="javascript" showSingleFName={true}>
    <Github fname="charge-subscription.js"
            url="https://github.com/PiVortex/subscription-example/blob/main/scripts/charge-subscription.js#L33-L56"
            start="33" end="56" />
</Language>

The admin then calls the `charge_subscription` method with the input details and the account Id of the subscriber being charged. We are attatching 0.1 NEAR as deposit for the MPC contract which in most cases will be more than enough and we will be refunded any excess. The admin is attatching a deposit and not just the contract because refunds are given to the original `signer` of the call to the MPC.

<Language language="javascript" showSingleFName={true}>
    <Github fname="charge-subscription.js"
            url="https://github.com/PiVortex/subscription-example/blob/main/scripts/charge-subscription.js#L58-L68"
            start="58" end="68" />
</Language>

We then fetch the result (which is the signed transaction) from the transaction outcome, convert it to a `Uint8Array`, serialize it to `base64` and then broadcast it to the network. 

<Language language="javascript" showSingleFName={true}>
    <Github fname="charge-subscription.js"
            url="https://github.com/PiVortex/subscription-example/blob/main/scripts/charge-subscription.js#L70-L77"
            start="70" end="77" />
</Language>

This will execute the method call to the contract from the subscriber charging the subscriber 5 NEAR tokens, as long as the subscriber has enough funds in their account.

---

## Unsubscribe

To unsubscribe from the service the subscriber calls the `unsubscribe` method in the contract. While the contract will no longer have access to the path of the subscriber sign transactions for the user it is best practice to remove the MPC key from the account just incase the contract is compromised.

<Language language="javascript" showSingleFName={true}>
    <Github fname="end-subscription.js"
            url="https://github.com/PiVortex/subscription-example/blob/main/scripts/end-subscription.js#L32-L46"
            start="32" end="46" />
</Language>
