---
id: implementation
title: Implementing Chain Signatures
---




Chain signatures enable NEAR accounts, including smart contracts, to sign and execute transactions across many blockchain protocols.

This unlocks the next level of blockchain interoperability by giving ownership of diverse assets, cross-chain accounts, and data to a single NEAR account.

---

## Create a Chain Signature

There are five steps to create a Chain Signature:

1. [Deriving the Foreign Address](#1-deriving-the-foreign-address) - Derive the address that will be controlled on the target blockchain.
2. [Creating a Transaction](#2-creating-the-transaction) - Create the transaction or message to be signed.
3. [Requesting a Signature](#3-requesting-the-signature) - Call the NEAR MPC contract requesting it to sign the transaction.
4. [Formatting the Signature](#4-formatting-the-signature) - Format the signature from the MPC contract and add it to the transaction.
5. [Relaying the Signed Transaction](#5-relaying-the-signed-transaction) - Send the signed transaction to the destination chain for execution.

![chain-signatures](/docs/assets/welcome-pages/chain-signatures-overview.png)
_Diagram of a chain signature in NEAR_

The [chainsig.js](https://github.com/NearDeFi/chainsig.js) library provides a convenient interface for completing each of these steps.

:::tip
For building transactions inside of NEAR smart contracts written in Rust, you can use the [Omni Transaction](https://github.com/near/omni-transaction-rs) library to easily build transactions for different blockchains (like Bitcoin and Ethereum).
:::

:::info MPC Contracts

There is an [MPC contract](https://github.com/Near-One/mpc/tree/main/libs/chain-signatures/contract) available on both `mainnet` and `testnet`:

- Mainnet: `v1.signer`
- Testnet: `v1.signer-prod.testnet`

The MPC network is made up of 8 nodes.

:::

---

## Chain Signatures Contract

To interact with the chain signatures library you first need to instantiate a `ChainSignaturesContract`.

```
export const SIGNET_CONTRACT = new contracts.ChainSignatureContract({
  networkId: NetworkId,
  contractId: MPC_CONTRACT,
});

```

The `networkId` and `contractId` are set to the values specified in the previous section depending which network you are on.

---

## Chain Adapters

To interact with a specific chain, you need to instantiate the relevant `chainAdapter`.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ EVM">
    ```
  const publicClient = createPublicClient({
    transport: http(rpcUrl),
  });

  const Evm = new chainAdapters.evm.EVM({
    publicClient,
    contract: SIGNET_CONTRACT,
  });

```

  The EVM chain adapter takes the `ChainSignaturesContract` as an argument as well as `publicClient` which is constructed from an EVM RPC URL.

  :::tip
  To use different EVM networks, simply specify the RPC URL for your desired network.
  The example demonstrates compatibility with multiple EVM-compatible networks including Ethereum, Base, BNB Chain, Avalanche, Polygon, Arbitrum, zkSync, and many others.
  You can find RPC URLs for various networks at [ChainList](https://chainlist.org/?testnets=true).
  :::

</TabItem>

<TabItem value="₿ Bitcoin">
    ```
const btcRpcAdapter = new chainAdapters.btc.BTCRpcAdapters.Mempool(
  "https://mempool.space/testnet4/api",
);

const Bitcoin = new chainAdapters.btc.Bitcoin({
  network: NetworkId,
  btcRpcAdapter,
  contract: SIGNET_CONTRACT,
});

```

  The Bitcoin chain adapter takes the `ChainSignaturesContract` as an argument as well as the `network` ("mainnet", "testnet" or "regtest") and a `btcRpcAdapter` which handles communication with the Bitcoin network.

</TabItem>

<TabItem value="◎ Solana">
    ```
const connection = new SolanaConnection("https://api.devnet.solana.com");

const Solana = new chainAdapters.solana.Solana({
  solanaConnection: connection,
  contract: SIGNET_CONTRACT,
});

```

  The Solana chain adapter takes the `ChainSignaturesContract` as an argument as well as a `connection` which is constructed from a Solana RPC URL. If you want to use Mainnet, then you need to choose a Mainnet RPC.

</TabItem>

<TabItem value="◉ XRP">
   ```
const Xrp = new chainAdapters.xrp.XRP({
  rpcUrl: "wss://s.altnet.rippletest.net:51233/",
  contract: SIGNET_CONTRACT,
});

```

  The XRP chain adapter takes the `ChainSignaturesContract` as an argument as well as an `rpcUrl` for the XRP Ledger and the `rpcURl` specification. For testnet, use `https://s.altnet.rippletest.net:51234`.

</TabItem>

<TabItem value="◈ SUI">
   ```
const rpcUrl = getFullnodeUrl("testnet");
const suiClient = new SuiClient({ url: rpcUrl });

const Sui = new chainAdapters.sui.SUI({
  client: suiClient,
  contract: SIGNET_CONTRACT,
  rpcUrl: rpcUrl,
});

```

  The SUI chain adapter takes the `ChainSignaturesContract` as an argument as well as a `connection` which is a SuiClient constructed from a SUI RPC URL.

</TabItem>

<TabItem value="⬟ Aptos">
    ```
const aptosClient = new AptosClient(
  new AptosConfig({
    network: Network.TESTNET,
  }),
);

const Aptos = new chainAdapters.aptos.Aptos({
  client: aptosClient,
  contract: SIGNET_CONTRACT,
});

```

  The Aptos chain adapter takes the `ChainSignaturesContract` as an argument as well as a `nodeUrl` for the Aptos network and the `network` specification.

</TabItem>

</Tabs>

---

## 1. Deriving the Foreign Address

Chain Signatures use [`derivation paths`](../chain-signatures.md#derivation-paths-one-account-multiple-chains) to represent accounts on the target blockchain. The foreign address to be controlled can be deterministically derived from:

- The NEAR account calling the MPC contract (e.g., `example.near`, `example.testnet`, etc.)
- A derivation path (a string such as `ethereum-1`, `ethereum-2`, etc.)
- The MPC service's master public key (we don't need to worry about this as it is defined in the library we're using).

To derive the address call the `deriveAddressAndPublicKey` method passing the near account Id from which the address is being derived and the derivation path.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ EVM">
    ```
    const { address } = await Evm.deriveAddressAndPublicKey(
      signedAccountId,
      debouncedDerivationPath,
    );
    setSenderAddress(address);
```

</TabItem>

<TabItem value="₿ Bitcoin">
    ```
      const { address, publicKey } = await Bitcoin.deriveAddressAndPublicKey(
        signedAccountId,
        debouncedDerivationPath,
      );
      setSenderAddress(address);
```

</TabItem>

<TabItem value="◎ Solana">
    ```
      const { publicKey } = await Solana.deriveAddressAndPublicKey(
        signedAccountId,
        debouncedDerivationPath,
      );

```

  On Solana, your address is the same as your public key.

</TabItem>

<TabItem value="◉ XRP">
   ```
      const { address, publicKey } = await Xrp.deriveAddressAndPublicKey(
        signedAccountId,
        debouncedDerivationPath,
      );

```
  </TabItem>

  <TabItem value="◈ SUI">

   ```
      const { address, publicKey } = await Sui.deriveAddressAndPublicKey(
        signedAccountId,
        debouncedDerivationPath,
      );

```

  </TabItem>

  <TabItem value="⬟ Aptos">
    ```
      const { address, publicKey } = await Aptos.deriveAddressAndPublicKey(
        signedAccountId,
        debouncedDerivationPath,
      );

```
  </TabItem>

</Tabs>

:::info

The same NEAR account and path will always produce the same address on the target blockchain.

- `example.near` + `ethereum-1` = `0x1b48b83a308ea4beb845db088180dc3389f8aa3b`
- `example.near` + `ethereum-2` = `0x99c5d3025dc736541f2d97c3ef3c90de4d221315`

:::

---

## 2. Creating the Transaction

To construct the transaction to be signed use the method `prepareTransactionForSigning`.

<CodeTabs>
  <TabItem value="Ξ EVM" language="js">
        Constructing a transaction to transfer ETH is very simple. The `value` is the amount of ETH in Wei as type BigInt (1 ETH = 10<sup>18</sup> Wei).
        ```
        return await Evm.prepareTransactionForSigning({
          from: senderAddress,
          to: receiverAddress,
          value: BigInt(Web3.utils.toWei(transferAmount, "ether")),
        });
      },
```

    This method returns the `unsigned transaction` and the transaction `hash(es)` (also known as the `payload`).
  </TabItem>

  <TabItem value="₿ Bitcoin" language="js">
    Constructing a transaction to transfer BTC is very simple. The `value` is the amount of BTC in satoshis as a string (1 BTC = 100,000,000 sats).
    ```
    const { transaction, hashesToSign } =
      await Bitcoin.prepareTransactionForSigning({
        publicKey: senderPublicKey,
        from: senderAddress,
        to: receiverAddress,
        value: transferAmount.toString(),
      });

```

    This method returns the `unsigned transaction` and the transaction `hash(es)` (also known as the `payload`).
  </TabItem>

  <TabItem value="◎ Solana" language="js">
    Constructing a transaction to transfer SOL is very simple. The `value` is the amount of SOL in lamports as type BigInt (1 SOL = 1,000,000,000 lamports).
    ```
    const {
      transaction: { transaction },
    } = await Solana.prepareTransactionForSigning({
      from: senderAddress,
      to: receiverAddress,
      amount: decimalToBigInt(transferAmount, 9),
    });

```

    This method returns the `unsigned transaction`.
  </TabItem>
    <TabItem value="◉ XRP" language="js">
    Constructing a transaction to transfer XRP is straightforward. The `value` is the amount of XRP in drops as a string (1 XRP = 1,000,000 drops).
   ```
    const { transaction, hashesToSign } =
      await Xrp.prepareTransactionForSigning({
        from: senderAddress,
        to: receiverAddress,
        amount: decimalToBigInt(transferAmount, 6).toString(),
        publicKey: senderPublicKey,
      });

```

    This method returns the `unsigned transaction` and the transaction `hash` (also known as the `payload`).
  </TabItem>

  <TabItem value="◈ SUI" language="js">
    Constructing a transaction to transfer SUI is simple. The `value` is the amount of SUI in MIST as type BigInt (1 SUI = 1,000,000,000 MIST).
   ```
    const transactionSui = new Transaction();

    const [coin] = transactionSui.splitCoins(transactionSui.gas, [
      decimalToBigInt(transferAmount, 9),
    ]);

    transactionSui.transferObjects([coin], receiverAddress);
    transactionSui.setSender(senderAddress);

    const { hashesToSign, transaction } =
      await Sui.prepareTransactionForSigning(transactionSui);

```

    This method returns the `unsigned transaction` and the transaction `hash` (also known as the `payload`).
  </TabItem>

  <TabItem value="⬟ Aptos" language="js">
    Constructing a transaction to transfer APT is straightforward. The `value` is the amount of APT in octas as type BigInt (1 APT = 100,000,000 octas).
    ```
    const transactionPayload = {
      function: "0x1::aptos_account::transfer",
      functionArguments: [receiverAddress, decimalToBigInt(transferAmount, 8)],
    };

    const transaction = await aptosClient.transaction.build.simple({
      sender: senderAddress,
      data: transactionPayload,
    });

    const { hashesToSign } =
      await Aptos.prepareTransactionForSigning(transaction);
    setStatus(
```

    This method returns the `unsigned transaction` and the transaction `hash` (also known as the `payload`).
  </TabItem>
</CodeTabs>

<details>

<summary> EVM Function Calls </summary>

To call a function on a smart contract we need the ABI of the contract, in our repo this is defined in the [config.js](https://github.com/near-examples/near-multichain/blob/main/src/config.js#L23-L63) file (this can be gathered from Remix or using Etherscan).

Then define a `Contract` object using the `ethers` library

```
    const contract = new Contract(contractAddress, ABI, provider);

```

Then to construct the transaction

```
        const data = contract.interface.encodeFunctionData("set", [number]);

        return await Evm.prepareTransactionForSigning({
          from: senderAddress,
          to: contractAddress,
          data,
        });
      },
```

This approach allows you to call smart contract functions by encoding the function data and including it in the transaction.

</details>

---

## 3. Requesting the Signature

Once the transaction is created and ready to be signed, a signature request is made by calling `sign` on the MPC smart contract.

The method requires four parameters:

  1. The `payloads` (or hashes) to be signed for the target blockchain
  2. The derivation `path` for the account we want to use to sign the transaction
  3. The `keyType`, `Ecdsa` for `Secp256k1` signatures and `Eddsa` for `Ed25519` signatures.
  4. The `signerAccount` which contains the `accountId` that is signing and the `signAndSendTransactions` function from the [wallet selector](../../tools/wallet-selector.md).

<Tabs groupId="code-tabs">
  <TabItem value="Ξ EVM">
    ```
      const rsvSignatures = await SIGNET_CONTRACT.sign({
        payloads: hashesToSign,
        path: debouncedDerivationPath,
        keyType: "Ecdsa",
        signerAccount: {
          accountId: signedAccountId,
          signAndSendTransactions,
        },
      });

```

</TabItem>

  <TabItem value="₿ Bitcoin">
    ```
      const rsvSignatures = await SIGNET_CONTRACT.sign({
        payloads: hashesToSign,
        path: debouncedDerivationPath,
        keyType: "Ecdsa",
        signerAccount: {
          accountId: signedAccountId,
          signAndSendTransactions,
        },
      });

```

For Bitcoin, it is common to have multiple UTXOs to sign when sending a single transaction. We create a NEAR transaction (to call `sign` on the MPC contract) for each UTXO and send them to be signed by the MPC individually. Each signature is then parsed from each transaction outcome to produce an array of signatures.

  </TabItem>

<TabItem value="◎ Solana">
  To get the payload, serialize the transaction to a `uint8Array` and then convert it to hex.
    ```
      const rsvSignatures = await SIGNET_CONTRACT.sign({
        payloads: [transaction.serializeMessage()],
        path: debouncedDerivationPath,
        keyType: "Eddsa",
        signerAccount: {
          accountId: signedAccountId,
          signAndSendTransactions,
        },
      });

```

</TabItem>

<TabItem value="◉ XRP">
   ```
      const rsvSignatures = await SIGNET_CONTRACT.sign({
        payloads: hashesToSign,
        path: debouncedDerivationPath,
        keyType: "Ecdsa",
        signerAccount: {
          accountId: signedAccountId,
          signAndSendTransactions,
        },
      });

```
</TabItem>

<TabItem value="◈ SUI">
   ```
      const rsvSignatures = await SIGNET_CONTRACT.sign({
        payloads: hashesToSign,
        path: debouncedDerivationPath,
        keyType: "Eddsa",
        signerAccount: {
          accountId: signedAccountId,
          signAndSendTransactions,
        },
      });

```
</TabItem>

<TabItem value="⬟ Aptos">
    ```
      const rsvSignatures = await SIGNET_CONTRACT.sign({
        payloads: hashesToSign,
        path: debouncedDerivationPath,
        keyType: "Eddsa",
        signerAccount: {
          accountId: signedAccountId,
          signAndSendTransactions,
        },
      });

```
</TabItem>

</Tabs>

:::info

The contract will take some time to respond, as the `sign` method [yields execution](/blog/yield-resume), waiting for the MPC service to sign the transaction.

:::

---

## 4. Formatting the Signature

Once the signature is returned from the MPC it needs to be formatted and added to the transaction to produce a signed transaction.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ EVM">
    ```
      const finalizedTransaction = Evm.finalizeTransactionSigning({
        transaction,
        rsvSignatures,
      });

```

</TabItem>

<TabItem value="₿ Bitcoin">
    ```
      const finalizedTransaction = Bitcoin.finalizeTransactionSigning({
        transaction,
        rsvSignatures,
      });

```

For Bitcoin, the array of signatures is added to the transaction to produce a complete signed transaction.

</TabItem>

<TabItem value="◎ Solana">
    ```
      const finalizedTransaction = Solana.finalizeTransactionSigning({
        transaction,
        rsvSignatures: rsvSignatures[0],
        senderAddress,
      });

```

</TabItem>

<TabItem value="◉ XRP">
   ```
      const finalizedTransaction = Xrp.finalizeTransactionSigning({
        transaction,
        rsvSignatures,
      });

```
</TabItem>

<TabItem value="◈ SUI">
   ```
      const finalizedTransaction = Sui.finalizeTransactionSigning({
        transaction,
        rsvSignatures: rsvSignatures[0],
        publicKey: senderPublicKey,
      });

```
</TabItem>

<TabItem value="⬟ Aptos">
    ```
      const finalizedTransaction = Aptos.finalizeTransactionSigning({
        transaction,
        rsvSignatures: rsvSignatures[0],
        publicKey: senderPublicKey,
      });

```
</TabItem>

</Tabs>

---

## 5. Relaying the Signed Transaction

Now that we have a signed transaction, we can relay it to the target network using `broadcastTx`.

<Tabs groupId="code-tabs">
  <TabItem value="Ξ EVM">
      ```
      const transactionHash = await Evm.broadcastTx(signedTransaction);
      setStatus(
```

</TabItem>

<TabItem value="₿ Bitcoin">
    ```
      const transactionHash = await Bitcoin.broadcastTx(signedTransaction);

```

</TabItem>

<TabItem value="◎ Solana">
    ```
      const transactionHash = await Solana.broadcastTx(signedTransaction);

```

</TabItem>
<TabItem value="◉ XRP">
   ```
      const transactionHash = await Xrp.broadcastTx(signedTransaction);

```
</TabItem>

<TabItem value="◈ SUI">
  ```
      const transactionHash = await Sui.broadcastTx(signedTransaction);

```
</TabItem>

<TabItem value="⬟ Aptos">
    ```
      const transactionHash = await Aptos.broadcastTx(signedTransaction);

```
</TabItem>
</Tabs>

The method returns a transaction hash which can be used to locate the transaction on an explorer.

:::info
⭐️ For a deep dive into the concepts of Chain Signatures, see [What are Chain Signatures?](../chain-signatures.md)

⭐️ For a complete example of a NEAR account using chain signatures in a frontend, see our [web app example](https://github.com/near-examples/near-multichain).

:::
