---
id: production-components
title: Key Components
sidebar_label: Key Components
---



In this section, we'll explore the main components of a Shade Agent and how you can modify this [template](https://github.com/NearDeFi/shade-agent-template) to build your own agent.

---

## Approving a Code Hash

When an agent contract is deployed, it's initialized with an `owner` account Id. This owner can set and update the worker agent `code hash`.

The code hash ensures that only workers running the correct code can access the `gated functions` of the agent contract and request signatures.

After deploying the agent contract, the owner should submit the code hash. This is done by calling the `approve_codehash` function. This function first checks if it's the owner account Id calling the function then inserts the new code hash into the map of code hashes.

```
    pub fn approve_codehash(&mut self, codehash: String) {
        self.require_owner();
        self.approved_codehashes.insert(codehash);
    }

```

In the template, this function is called in the `contract deployment script`, eliminating the need for to manually call it.

The same function is used to add new code hashes. Since a NEAR account can be a smart contract, you can implement upgradeability restrictions on the owner account. Common upgrade methods include approving a new code hash through DAO voting or implementing a grace period or cooldown, allowing users to withdraw funds if they're uncomfortable with the incoming code hash for the new worker agent.

---

## Worker Account Derivation

When the TEE boots up, a `private key` and `worker agent account Id` is derived. These are used to interact with the agent contract.

The function to derive a worker agent is provided by the `shade-agent-js` library.

```
        const accountId = await deriveAgentAccount();
        const balance = await getBalance(accountId);
```

The worker agent's private key is generated from the combined `entropy` of the crypto module and the TEE instance.

When running the worker agent locally, the worker agent account is replaced by the account Id set in your environment variables.

---

## Registering a Worker

To register a worker, the worker agent calls the [register_worker function](https://github.com/NearDeFi/shade-agent-template/blob/main/contract/src/lib.rs#L79-L101).

```
    const registered = await registerAgent();

```

The `shade-agent-js` library abstracts away the complexity of this process, but essentially, the worker agent generates a `remote attestation quote` and the Docker image's SHA256 `code hash`. The agent contract then uses the attestation quote to verify that the worker agent is running inside a genuine TEE and confirms that the code hash matches one of the approved worker code hashes. Upon successful verification, the worker agent's account Id is registered in the agent contract.

```
        require!(self.approved_codehashes.contains(&shade_agent_app_image));

        let predecessor = env::predecessor_account_id();
        self.worker_by_account_id.insert(
            predecessor,
            Worker {
                checksum,
                codehash: shade_agent_app_image,
            },
        );

```

Once registered, the worker agent gains access to all worker agent gated functions (i.e. it can sign transactions for the Shade Agent).

---

## Signing Transactions

The sign tx function accepts three arguments:
- The transaction `payload` - a hash of the transaction to be signed.
- The `derivation_path` - a string that modifies the address on the target chain being used.
- The `key_version` - sets the signature scheme required for the transaction. `0` for `secp256k1` and `1` for `ed25519`.

```
    pub fn sign_tx(
        &mut self,
        payload: Vec<u8>,
        derivation_path: String,
        key_version: u32,
    ) -> Promise {
        // Comment out this line for local development
        self.require_registered_worker();

        // Call the MPC contract to get a signature for the payload
        ecdsa::get_sig(payload, derivation_path, key_version)
    }

```

In this example, we're signing a transaction to call an Ethereum contract to update the stored price of ETH. First, we retrieve the price of ETH (in this example, the function queries two different APIs and calculates the average).

```
  const ethPrice = await getEthereumPriceUSD();

```

Next, we build the transaction and transaction payload to be sent to the agent to sign. To do this, we're using the `chainsig.js library`. 
Using this library, we:
1. `Derive the Ethereum addresses` that will be sending the transaction. This function takes the agent contract Id since this is the predecessor account that is calling the Chain Signatures [MPC contract](https://github.com/Near-One/mpc/tree/main/libs/chain-signatures/contract), and a path. The path can be whatever string you like, but different paths will derive different addresses.
2. Create the `data`. This is what action we're performing, in this case, a function call to update the price in the contract.
3. `Build the transaction` by inputting the derived address, the target Ethereum smart contract, and the data.
4. Get the `payload` from the transaction.

```
  const { address: senderAddress } = await Evm.deriveAddressAndPublicKey(
    contractId,
    "ethereum-1",
  );
  const provider = new JsonRpcProvider(ethRpcUrl);
  const contract = new Contract(ethContractAddress, ethContractAbi, provider);
  const data = contract.interface.encodeFunctionData('updatePrice', [ethPrice]);
  const { transaction, hashesToSign} = await Evm.prepareTransactionForSigning({
    from: senderAddress,
    to: ethContractAddress,
    data,
  });

```

Once we have the payload (also known as the hash), we can call the `sign_tx` function on the agent contract. The Shade Agent library exposes a `contract call` function that signs the call to the agent contract with the worker's private key. 

```
        signRes = await contractCall({
            methodName: 'sign_tx',
            args: {
                payload: hashesToSign[0],
                derivation_path: 'ethereum-1',
                key_version: 0,
            },
        });
        verified = true;
```

The result is the parts of the `signature`.

We then attach the signature to the Ethereum transaction and broadcast it to the target network.

```
    // Reconstruct the signed transaction
    const signedTransaction = Evm.finalizeTransactionSigning({
      transaction,
      rsvSignatures: [toRSV(signRes)],
    })

    // Broadcast the signed transaction
    const txHash = await Evm.broadcastTx(signedTransaction);
    
```

---

## Modifying this Example

The simplest way to create your own agent is to modify the example template and alter the transaction payload being sent to the agent contract in the [sendTransaction.js](https://github.com/NearDeFi/shade-agent-template/blob/main/pages/api/sendTransaction.js) API route. You can create a payload for any chain that supports `secp256k1` and `ed25519` signatures. The `sign_tx` function supports any arbitrary payload, allowing you to send multiple different transaction payloads through this function.

In this example, we're using the [chainsig.js library](https://github.com/NearDeFi/chainsig.js), which supports transaction building for several different chains. By defining a different [chain adapter](https://github.com/NearDeFi/shade-agent-template/blob/main/utils/ethereum.js#L42-L49), you can easily start building transactions for other chains the library supports. Review our [chain signature docs](../../../chain-abstraction/chain-signatures/implementation.md) for building transactions to learn how to integrate different chains. Note that step 3 of requesting a signature differs since we're calling the agent contract here instead of the MPC directly, and we're signing with a private key instead of a wallet.

:::tip
If you're seeking inspiration for what to build, consider reviewing our [ideas page](../examples.md).
:::
---

## Security Considerations

Please review this list of security considerations before deploying anything to mainnet.

### Duplicate Agents, Duplicate Actions

To ensure liveness, the Shade Agent should consist of multiple identical worker agents hosted by different providers/on different hardware. When multiple agents are running, all agents will respond to updates (user inputs, agent pings, API updates, etc.). You must ensure that the agent collectively performs the desired action only `once` in response to each update.

Consider a Kaito Mindshare Trading Agent as an example. If Solana's mindshare increases relative to NEAR, the agent would swap SOL for NEAR. With two worker agents running, you must ensure this swap doesn't occur twice.

This logic is typically best implemented within the agent contract.

### Restricting Actions

While TEEs are considered trusted and tamper-resistant, implementing tight restrictions or `guard rails` on agent actions within the agent contract is recommended so that even if the private key to a worker agent was extracted funds can't be withdrew.

Examples of restrictions could be:
- The agent contract can only build transactions for a list of functions and smart contract addresses.
- The agent contract can only build transactions for specific chains.
- The agent contract can only build transactions that swap or send up to 0.1 ETH per 24 hours.

We recommend using the [omni-transactions-rs](https://github.com/near/omni-transaction-rs) library to build transactions within your agent contract rather than in the worker agent.

### Failed or Unsent Transactions

A successful MPC signature on a transaction payload doesn't guarantee the transaction's success or transmission. Transactions may fail for various reasons, such as network congestion, incorrect nonce, or insufficient gas.

We suggest you build your agent in such a way that if the transaction fails, then a new signature can be requested without allowing for unlimited signing.

For some use cases, it may be beneficial to emit signed transactions from your agent contract, allowing anyone or an indexer to relay them if your worker agent fails to retrieve the result. Signed transactions can be built using [omni-transactions-rs](https://github.com/near/omni-transaction-rs). Exercise caution with unsent signatures.

### Parallel Transactions

Building on the above, the MPC signing a transaction payload doesn't change any nonce or state on the destination chain. So if you'd like to create an agent that can issue several parallel transactions, you will have to have an intimate knowledge of the destination chain and increment nonces for the derived accounts that you're generation signatures for.

This can cause a lot of issues in the EVM world, for example: Transactions can get stuck in the mempool if the nonce used is not in sequential order. A transaction with a higher nonce will remain pending if a previous transaction (with a lower nonce) hasn't been processed.

If your agent frequently tries to sign multiple transactions in parallel with the MPC, then you must keep track of which transactions are successful and handle failures appropriately so that all transactions eventually are included in blocks of the destination chain.

<SigsSupport />
