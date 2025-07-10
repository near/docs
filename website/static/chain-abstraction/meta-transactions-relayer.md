---
id: meta-transactions-relayer
title: Building a Meta Transaction Relayer
sidebar_label: Building a Relayer
---



Relayers serve to delegate gas fees to a web service, allowing users to transact on NEAR without the need to acquire the token themselves while still retaining the security of signing their own transactions. This guide will lead you through the components necessary to construct a relayer capable of handling meta transactions.

:::tip

If you're already acquainted with the technology and you just want to run your own Relayer, you can fast track to a complete [Rust Relayer server](#rust-relayer-server) open-source implementation.

:::

## How it works

A basic relayer consists of a web server housing a funded NEAR account. This account receives an encoded signed transaction, which can subsequently be decoded into a `SignedDelegate` format and transmitted on-chain.

The client can then generate a `SignedDelegateAction` (a signed message that hasn't yet been sent), encode it, and transmit it to this server, where it will be relayed onto the blockchain.

![relayer-overview-technical](/docs/assets/welcome-pages/relayer-overview-technical.png)

## Relayer (server)

<Tabs groupId="code-tabs">

<TabItem value="near-api-js">

Here's a simple express endpoint that deserializes the body, instantiates the relayer account and then sends the transaction.

```

app.post('/', async (req: Request, res: Response) => {
  const serializedTxs: Buffer[] = req.body;
  const relayerAccount: Account = await getAccount(
    NETWORK_ID,
    RELAYER_ID,
    RELAYER_PRIVATE_KEY,
  );

  const outcomes = await Promise.all(
    serializedTxs.map(async (serializedTx) => {
      const deserializedTx: SignedDelegate = deserialize(
        SCHEMA.SignedDelegate,
```

You can easily get the account object used to send the transactions from its private key using this snippet

```

export async function getAccount(network: string, accountId: string, privateKey: string): Promise<Account> {
    const keyStore: InMemoryKeyStore = new InMemoryKeyStore();
    await keyStore.setKey(network, accountId, KeyPair.fromString(privateKey as KeyPairString));

    const config = {
        networkId: network,
        keyStore,
        nodeUrl: `https://rpc.${network}.near.org`,
    };

    const near = await connect(config);
    return near.account(accountId);
}
```


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

`@near-relay` simplifies meta transactions making it easier to get started for a beginner.

To start, call the relay method inside an endpoint to automatically deserialize the transaction and send it with the account defined in the environment variables.

```
app.post('/', async (req: any, res: any) => {
    const body = req.body;
    const results = await relay(body)
    res.json({ message: 'Relayed', data: results });
});

```

If you're interested in relaying account creation as well, it's quite straightforward. Simply create another endpoint and directly call the createAccount method with the accountId and publicKey. These parameters are automatically included in the body when using the corresponding client library.

```
app.post('/create-account', async (req: any, res: any) => {
    const body = req.body;
    const result = await createAccount(body.accountId, body.publicKey)
    res.json({ message: 'Relayed', data: result });
});

```
  
</TabItem>

</Tabs>


## Client

<Tabs groupId="code-tabs">

<TabItem value="near-api-js">

In this method we are creating an arbitrary smart contract call, instantiating an account and using it to sign but not send the transaction. We can then serialize it and send it to the relayer where it will be delegated via the previously created endpoint.

```

async function sendRelay() {
  const action = actionCreators.functionCall(
    'set_greeting',
    {
      greeting: 'hello',
    },
    3000000000000n,
  );

  const account = await getAccount(NETWORK_ID, CLIENT_ID, CLIENT_PRIVATE_KEY);

  const signedDelegate = await account.signedDelegate({
    actions: [action],
    blockHeightTtl: 120,
    receiverId: CONTRACT_ID,
  });
  const res = await fetch(SERVER_URL, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify([Array.from(encodeSignedDelegate(signedDelegate))]),
    headers: new Headers({ 'Content-Type': 'application/json' }),
```

</TabItem>

<TabItem value="@near-relay/client">

As mentioned in the above note in order to be able to relay on the client side it's necessary to have access to signing transactions directly on the client. Luckily leveraging the near biometric library it's possible to do so in a non custodial way.

By calling this method and passing in the URL for the account creation endpoint (mentioned in the server section) as well as the `accountId` everything is handled under the hood to successfully create an account.

```
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [createReceipt, setCreateReceipt] = useState<any>();
  const [relayReceipt, setRelayReceipt] = useState<any>();
  const [error, setError] = useState<string>();
  const [createMethod, setCreateMethod] = useState<"passkey" | "password" | "keypair">("passkey");
  const [isCreating, setIsCreating] = useState(false);
  const [isRelaying, setIsRelaying] = useState(false);
```

On the client side, you just need to create an `Action` and pass it into the `relayTransaction` method along with the URL of the relayer endpoint discussed in the server section and the id of the `receiverId`.

```

  const handleCreateAccount = async () => {
    try {
      setIsCreating(true);
      let receipt;
      
      switch(createMethod) {
        case "passkey":
          receipt = await createAccount(
            CREATE_ACCOUNT_URL,
            accountId,
            { usePasskey: true }
          );
```

</TabItem>

</Tabs>

<details>
<summary> Relaying with wallets </summary>

At the moment, wallet selector standard doesn't support signing transactions without immediately sending them. This functionality is essential for routing transactions to a relayer. Therefore, to smoothly integrate relaying on the client side, it's necessary to be able to sign transactions without relying on wallets.
Progress is being made to make this possible in the future.

</details>

### High volume parallel processing

When running a relayer that handles a large number of transactions, you will quickly run into a `nonce` collision problem. At the protocol level, transactions have a unique number that identifies them (nonce) that helps to mitigate reply attacks. Each key on an account has its own nonce, and the nonce is expected to increase with each signature the key creates.

When multiple transactions are sent from the same access key simultaneously, their nonces might collide. Imagine the relayer creates 3 transactions `Tx1`, `Tx2`, `Tx3` and send them in very short distance from each other, and lets assume that `Tx3` has the largest nonce. If `Tx3` ends up being processed before `Tx1` (because of network delays, or a node picks `Tx3` first), then `Tx3` will execute, but `Tx1` and `Tx2` will fail, because they have smaller nonce!

One way to mitigate this is to sign each transaction with a different key. Adding multiple full access keys to the NEAR account used for relaying (up to 20 keys can make a significant difference) will help.

<details>
<summary> Adding keys </summary>

```js
const keyPair = nearAPI.KeyPair.fromRandom("ed25519");

const receipt = await account.addKey(keyPair.getPublicKey().toString())
```

After saving these keys, its possible to rotate the private keys randomly when instantiating accounts before relaying ensuring you won't create a nonce collision.

</details>

### Gating the relayer

In most production applications it's expected that you want to be able to gate the relayer to only be used in certain cases.
This can be easily accomplished by specifying constraints inside the `SignedDelegate.delegateAction` object.

```typescript
export declare class DelegateAction extends Assignable {
    senderId: string;
    receiverId: string;
    actions: Array<Action>;
    nonce: BN;
    maxBlockHeight: BN;
    publicKey: PublicKey;
}
```

You can, for example, gate by some particular user or contract:

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

---

## Rust Relayer Server

The open-source Rust [reference implementation of a Relayer server](https://github.com/near/pagoda-relayer-rs/) offers the following features:

:::info
Features can be combined as needed. Use of one feature does not preclude the use of any other feature unless specified.
:::

1. Sign and send Meta Transactions to the RPC to cover the gas costs of end users while allowing them to maintain custody of their funds and approve transactions (`/relay`, `/send_meta_tx`, `/send_meta_tx_async`, `/send_meta_tx_nopoll`)
2. Sign Meta Transactions returning a Signed Meta Transaction to be sent to the RPC later - (`/sign_meta_tx`, `/sign_meta_tx_no_filter`)
3. Only pay for users interacting with certain contracts by whitelisting contracts addresses (`whitelisted_contracts` in `config.toml`)
4. Specify gas cost allowances for all accounts (`/update_all_allowances`) or on a per-user account basis (`/create_account_atomic`, `/register_account`, `/update_allowance`) and keep track of allowances (`/get_allowance`)
5. Specify the accounts for which the relayer will cover gas fees (`whitelisted_delegate_action_receiver_ids` in `config.toml`)
6. Only allow users to register if they have a unique Oauth Token (`/create_account_atomic`, `/register_account`)
7. Relayer Key Rotation: `keys_filenames` in `config.toml`
8. Integrate with [FastAuth SDK](fastauth-sdk.md)
9. Mix and Match configuration options

:::tip
Check the [Use cases section](#use-cases) for example configuration files corresponding to different usage scenarios.
:::

### Basic Setup

You can follow these steps to set up your local Relayer server development environment:

1. [Install Rust for NEAR Development](../smart-contracts/quickstart.md#prerequisites)
2. If you don't have a NEAR account, [create one](../protocol/account-model.md)
3. With the account from step 2, create a JSON file in this directory in the format
   ```js
   [{"account_id":"example.testnet","public_key":"ed25519:98GtfFzez3opomVpwa7i4m3nptHtc7Ha514XHMWszLtQ","private_key":"ed25519:YWuyKVQHE3rJQYRC3pRGV56o1qEtA1PnMYPDEtroc5kX4A4mWrJwF7XkzGe7JWNMABbtY4XFDBJEzgLyfPkwpzC"}]
   ```
   using a [Full Access Key](../protocol/access-keys.md#full-access-keys) from an account that has enough NEAR to cover the gas costs of transactions your server will be relaying. Usually, this will be a copy of the json file found in the `.near-credentials` directory.
4. Update values in `config.toml`
5. Open up the `port` from `config.toml` in your machine's network settings
6. Run the server using `cargo run`.
   > **(OPTIONAL)** To run with logs (tracing) enabled run `RUST_LOG=tower_http=debug cargo run`

:::info Optional setup

If you're integrating with [FastAuth](fastauth-sdk.md) make sure to enable feature flags:
```
cargo build --features fastauth_features,shared_storage
```
If you're using shared storage, make sure to enable feature flags:
```
cargo build --features shared_storage
```

:::

### Redis Setup

:::tip
This is only needed if you intend to use whitelisting, allowances, and OAuth functionality.
:::

1. [Install Redis](https://redis.io/docs/latest/get-started/).
   > Steps 2 & 3 assume Redis was installed on machine instead of a Docker setup. If you're connecting to a Redis instance running in GCP, follow the above steps to connect to a VM that will forward requests from your local relayer server to [Redis running in GCP](https://cloud.google.com/memorystore/docs/redis/connect-redis-instance#connecting_from_a_local_machine_with_port_forwarding)
2. Run `redis-server --bind 127.0.0.1 --port 6379` - make sure the port matches the `redis_url` in the `config.toml`.
3. Run `redis-cli -h 127.0.0.1 -p 6379`


### Advanced setup

- [Multiple Key Generation](https://github.com/near/pagoda-relayer-rs/tree/main?tab=readme-ov-file#multiple-key-generation---optional-but-recommended-for-high-throughput-to-prevent-nonce-race-conditions): this is optional, but recommended for high throughput to prevent nonce race conditions. Check
- [Docker Deployment](https://github.com/near/pagoda-relayer-rs/tree/main?tab=readme-ov-file#docker-deployment): instructions to deploy with Docker
- [Cloud Deployment](https://github.com/near/pagoda-relayer-rs/tree/main?tab=readme-ov-file#cloud-deployment): instructions to deploy on Cloud providers

### API Specifications

You can find the complete Relayer server API specification on the [GitHub repository](https://github.com/near/pagoda-relayer-rs/tree/main?tab=readme-ov-file#api-spec-).

### Use cases

The [examples folder](https://github.com/near/pagoda-relayer-rs/tree/main/examples) on the GitHub repository contains example configuration files corresponding to different use cases.

:::info
These files are for reference only and you should update the `config.toml` values before using it on your development environment.
:::

#### No filters

This is a config for a relayer that covers gas for all user transactions to all contracts with no filters. To prevent abuse, this should only be used if there's only a secure backend calling the relayer
- [`no_filters.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/no_filters.toml)

#### Basic whitelist

This is a configuration for a basic relayer that covers gas for user transactions to interact with a whitelisted set of contracts
- [`basic_whitelist.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/basic_whitelist.toml)

#### Redis

This is a configuration for a relayer that covers gas for user transactions up to a allowance specified in Redis to interact with a whitelisted set of contracts.
- Allowances are on a per-account id basis and on signup (account creation in Redis and on-chain) an OAuth token is required to help with sybil resistance
- [`redis.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/redis.toml)

#### FastAuth

:::info Closed access beta

[FastAuth](fastauth-sdk.md) is currently in a private beta stage. If you want to try it out during this early development stage, please [contact us on Telegram](https://t.me/neardev).

:::

This is a configuration for use if you intend to integrate with [FastAuth SDK](fastauth-sdk.md)
- It covers gas for user transactions up to a allowance specified in Redis to interact with a whitelisted set of contracts.
- Allowances are on a per-account id basis and on signup (account creation in Redis and on-chain) an OAuth token is required to help with sybil resistance
- This also makes use of a shared storage functionality on the Near Social DB contract
- and a whitelisted sender (`whitelisted_delegate_action_receiver_ids`)
- [`fastauth.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/fastauth.toml)

#### Pay with fungible tokens

This is a configuration for a relayer that ensures there's FTs sent to a burn address used to cover the equivalent amount of gas for user transactions to interact with a whitelisted set of contracts
- [`pay_with_ft.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/pay_with_ft.toml)

#### Whitelist senders

This is a config for a relayer that covers gas for a whitelisted set of users' transactions to interact with a whitelisted set of contracts
- [`whitelist_senders.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/whitelist_senders.toml) (`whitelisted_delegate_action_receiver_ids`)

#### Shared storage

This is a configuration for a relayer that covers BOTH gas AND storage fees for user transactions to interact with a whitelisted set of contracts

- be sure to include shared storage logic based on [`shared_storage.rs`](https://github.com/NearSocial/social-db/blob/master/contract/src/shared_storage.rs) in your contract that is being whitelisted
- [`shared_storage.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/shared_storage.toml)

#### Exchange withdraw

This is a configuration for a relayer where an exchange running the relayer covers user withdraw fees when they are withdrawing stablecoins on NEAR (e.g., `USDT` or `USDC`)

- [`exchange_withdraw.toml`](https://github.com/near/pagoda-relayer-rs/blob/main/examples/configs/exchange_withdraw.toml)
