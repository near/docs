---
id: signing
title: "Abstract Dao: Signatures"
---

In the previous section, we saw how to register a signature request on the Abstract DAO contract. Now, it is time to sign the transaction for different chains and relay it to the target EVM network.

---

## Signing the Transaction

To sign a transaction for a specific chain, the allowed account needs to call the `get_signature` function, passing the `request_id` (generated on the previous section) and all the necessary info to finish creating the transaction before signing it.

For example, to sign the transaction for the Sepolia Testnet, the following command can be used:

```bash
near contract call-function as-transaction abstract-dao.testnet get_signature json-args '{
    "request_id": 1,
    "other_payload": {
        "chain_id": 11155111,
        "max_fee_per_gas": "1000000000",
        "max_priority_fee_per_gas": "100000000"
    }
}' prepaid-gas '300.0 Tgas' attached-deposit '0.05 NEAR' sign-as executor.testnet network-config testnet
```

Note that all we are specifying now is the `chain_id` (to identify the destination chain), the `max_fee_per_gas`, and the `max_priority_fee_per_gas` (to set the transaction fee).

The account authorized to call `get_signature` - in this case `executor.testnet` cannot change any parameter of the transaction being signed besides setting a gas fee per chain.

---

## Signature Response

The signature response is going to look like this:

```json
{
  "big_r": {
      "signature": {
      "affine_point": "02D532992B0ECBF67800DB14E04530D9BA55609AD31213CC7ABDB554E8FDA986D3"
    },
    "recovery_id": 1,
    "s": {
      "scalar": "40E81711B8174712B9F34B2540EE0F642802387D15543CBFC84211BB04B83AC3"
    }
  },
  "tx": "0x02f85083aa36a702850485034c878517a4eb0789829dd094e2a01146fffc8432497ae49a7a6cba5b9abd71a380a460fe47b1000000000000000000000000000000000000000000000000000000000000a84bc0"
}
```

As we can see, it is not the signed transaction itself, but instead the data we need to reconstruct it. We have created an [script](https://github.com/nearuaguild/multichain-dao-scripts) to automate this process, as well as the relaying to the target EVM network.