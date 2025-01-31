---
id: relaying
title: Relaying EIP-1559 Transaction to EVM Network
sidebar_label: Relaying Transaction
---

At the end of the previous section, we obtained a signed transaction payload using the Near Multi-Chain DAO Governance Contract. For your use case, it will definitely contain different data, but the structure in general must be similar to the following:

```json
{
  "signature": {
    "big_r": {
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

Now that we have this signed transaction, we need to relay it to the target EVM chain. However, manually sending a transaction to a network doesn't sound exciting for people to do. That's why was developed a [script](https://github.com/nearuaguild/multichain-dao-scripts) to automate this process.

### Key Advantages

The script handles all the complexity behind the scenes, ensuring your transactions are sent to the correct network with minimal effort. It does the following:

- Tranforms signature response of Near Multi-chain DAO Contract into EVM-compatible data format
- Detects Chain ID from the provided transaction data
- Finds an available RPC on the destination chain

Let's explore further how it can be used.

### Setting Up

To use the script, it's needed to be set up on your local machine. Run the following commands to install:

```bash
git clone https://github.com/nearuaguild/multichain-dao-scripts.git
cd multichain-dao-scripts
yarn install
```

### Running the script

Once the setup is complete, you can use the script to relay your signed transaction to the EVM chain. All you need to do is copy the JSON signature response from the previous section and pass it to the script in single quotes.

```bash
node relay.mjs '{
  "signature": {
    "big_r": {
      "affine_point": "02D532992B0ECBF67800DB14E04530D9BA55609AD31213CC7ABDB554E8FDA986D3"
    },
    "recovery_id": 1,
    "s": {
      "scalar": "40E81711B8174712B9F34B2540EE0F642802387D15543CBFC84211BB04B83AC3"
    }
  },
  "tx": "0x02f85083aa36a702850485034c878517a4eb0789829dd094e2a01146fffc8432497ae49a7a6cba5b9abd71a380a460fe47b1000000000000000000000000000000000000000000000000000000000000a84bc0"
}'
```

This process can be repeated as many times as needed for different transactions/chains.

### Conclusion

Congratulations on making it through the tutorial!

Feel free to reach out if you have any questions or feedback. Happy building, and best of luck with your projects!

:::info

- [Telegram Chat](https://t.me/neardev)

:::
