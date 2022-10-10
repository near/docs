---
id: workspaces-migration
sidebar_label: "Workspaces Migration"
title: "Migrating from Simulation Testing to Workspaces"
---

# Migrating from Simulation Testing to Workspaces

### Why did we stop supporting Simulation Testing?

Simulation tests were not suitable for purpose for a few reasons, namely:

- `near-sdk-sim` was hooking into parts of nearcore that were not meant to be released, in the most recent version those crates aren't released so `near-sdk-sim` is currently using duplicate dependencies (maintenance nightmare).
- Not a fully accurate simulation because it just used a subset of the runtime in a specific way - we can't rely on this. And thus couldn't measure gas burnt accurately. Also, all the intricacies of nearcore (like protocol features) wouldn't be one-to-one with the runtime since the runtime was just code built on top of VM logic. People would also need to write their own automation scripts to deploy to testnet, so we'd end up with very split workflows for testing.
- Bulky dependencies pulled in (drastically increases compile time).
- Unergonomic API, not specific to this strategy, but likely would have had to be re-built.
- Can't test parallel transactions easily - current pattern would process blocks until a transaction succeeded but you can't create specific conditions, which is required for a strategy like this that isn't fully simulated.

:::info
This guide presumes that you are transitioning from near-sdk-sim `3.2.0` (the last non-deprecated release) to `workspaces-rs` `0.2.1`. Given that near-sdk-sim is deprecated, it is very unlikely that its API will ever change, but future releases of `workspaces-rs` might. Hopefully, this guide will be helpful even if you are migrating your project to a more recent workspaces version. If workspaces have changed, feel free to migrate your tests to `0.2.1` first using this guide and upgrade to the most recent workspaces-rs version later by looking at the release notes to see how public API has changed since `0.2.1`.
:::

## Async Runtime and Error Handling

In this section we will be working purely with test signatures, so it applies to pretty much all NEAR contract tests regardless of what is written inside. We will walk through each change one by one. Let's start with how your tests look like right now; chances are something like this:

```rust
#[test]
fn test_transfer() {
    ...
}
```

First big change is that `workspaces-rs` API is asynchronous, meaning that contract function calls return values that implement `Future` trait. You will not be able to operate on the call results in a synchronous environment, thus you will have to add an async runtime (if you do not already have one). In this guide we are going to be using [`tokio`](https://tokio.rs/), but you should be able to use any other alternative (e.g. [`async-std`](https://async.rs/), [`smol`](https://github.com/smol-rs/smol)). Rewrite the test above like this:

```rust
#[tokio::test]
async fn test_transfer() {
    ...
}
```

:::note
If you are using another attribute on top of the standard `#[test]`, make sure it plays nicely with the async runtime of your choosing. For example, if you are using [`test-env-log`](https://crates.io/crates/test-env-log) and `tokio`, then you need to mark your tests with <br/> `#[test_env_log::test(tokio::test)]`.
:::

The second change is that `workspaces-rs` makes an extensive use of [`anyhow::Result`](https://docs.rs/anyhow/latest/anyhow/type.Result.html). Although you can work with `Result` directly, our recommendation is to make your tests return `anyhow::Result<()>` like this:

```rust
#[tokio::test]
async fn test_transfer() -> anyhow::Result<()> {
    ...
}
```

This way you can use `?` anywhere inside the test to safely unpack any `anyhow::Result<R>` type to `R` (will be very useful further down the guide). Note that the test will fail if `anyhow::Result<R>` cannot be unpacked.

## Initialization and Deploying Contracts

Unlike NEAR Simulator, `workspaces-rs` uses an actual NEAR node and makes all calls through it. First, you need to decide which network you want your tests to be run on:

- `sandbox` - perfect choice if you are just interested in local development and testing; `workspaces-rs` will instantiate a [sandbox](https://github.com/near/sandbox) instance on your local machine which will run an isolated NEAR node.
- `testnet` - an environment much closer to the real world; you can test integrations with other deployed contracts on testnet without bearing any financial risk.
- `mainnet` - a network with reduced amount of features due to how dangerous it can be to do transactions there, but can still be useful for automating deployments and pulling deployed contracts.

In this guide we will be focusing on `sandbox` since it covers the same use cases NEAR Simulator did. But of course feel free to explore whether other networks can be of potential use to you when writing new tests/workflows.

One of the ways to initialize simulator and deploy a contract is shown below (the other way is through `deploy!` macro which we will look at in the next section):

```rust title="Deployment - near-sdk-sim"
use near_sdk_sim::{init_simulator, to_yocto};

near_sdk_sim::lazy_static_include::lazy_static_include_bytes! {
    WASM_BYTES => "res/contract.wasm",
}

const ID: &str = "contract-id";

...

let root = init_simulator(...);
let contract = root.deploy(&WASM_BYTES, ID.parse().unwrap(), to_yocto("5"));
```

Although `workspaces-rs` provides a way to specify the account id for a contract to be deployed, usually it does not matter in the context of a single test. If you are fine with generating a random developer account and initializing it with 100N, then you can replace the snippet above with this:

```rust title="Deployment - workspaces-rs"
let worker = workspaces::sandbox().await?;
let contract = worker.dev_deploy(include_bytes!("../res/contract.wasm")).await?;
```

Alternatively, use this if you care about the account id:

```rust title="Deployment - workspaces-rs (with explicit account id)"
let worker = workspaces::sandbox().await?;
let (_, sk) = worker.dev_generate().await;
let id: AccountId = "contract-id".parse()?;
let contract = worker
    .create_tla_and_deploy(
        id,
        sk,
        include_bytes!("../examples/res/non_fungible_token.wasm"),
    )
    .await?
    .result;
```

:::danger
'dev_deploy' can't supply the initial balance since testnet controls this amount in the helper contract which is what we're using to create dev accounts on testnet. So, to make it simple, we don't supply it at all (sandbox included). It is however possible to create a **subaccount** with a certain balance in sandbox, they can grab the root account and do:

```rust title="Deployment - workspaces-rs (with initial balance)"
let root = worker.root_acount();
root.create_subaccount(...)
   .initial_balance(...)
   ...
```

:::

:::caution
You might have noticed that `init_simulator` used to accept an optional genesis config. Unfortunately, `workspaces-rs` does not support this feature yet, but we are trying to understand the need for this and properly design it. Please feel free to share your use case [here](https://github.com/near/workspaces-rs/issues/68).
:::

## Making Transactions and View Calls

As always, let's take a look at how we used to make calls with NEAR Simulator:

```rust title="Calls - near-sdk-sim"
// Example 1: No Macros
root.call(
    ft.account_id(),
    "ft_transfer",
    &json!({
        "receiver_id": alice.account_id(),
        "amount": U128::from(transfer_amount)
    })
    .to_string()
    .into_bytes(),
    300_000_000_000_000,
    1,
);

let root_balance: U128 = root.view(
    ft.account_id(),
    "ft_balance_of",
    &json!({
        "account_id": root.account_id()
    })
    .to_string()
    .into_bytes(),
)
.unwrap_json();

// Example 2: With Macros
call!(
    root,
    ft.ft_transfer(alice.account_id(), transfer_amount.into(), None),
    deposit = 1
    gas = 300_000_000_000_000
);

let root_balance: U128 = view!(ft.ft_balance_of(root.account_id())).unwrap_json();
```

Note how Example 2's `call!` and `view!` macros accept a contract function invocation as if it was just regular Rust. Unlike NEAR Simulator, `workspaces-rs` never stores metadata about the deployed contract and hence does not support high-level syntax like that. This might change in the future once our ACI implementation is ready, but for the remainder of this section we will be migrating Example 1.

Workspaces have a unified way of making all types of calls via a [builder](https://doc.rust-lang.org/1.0.0/style/ownership/builders.html) pattern. Generally, calls are constructed by following these steps:

1. Create a `CallBuilder` by invoking `Contract::call`
2. Pass function call arguments via `CallBuilder::args_json` or `CallBuilder::args_borsh` depending on which serialization algorithm your contract is using
3. Configure gas and deposit (if needed) via `CallBuilder::gas` and `CallBuilder::deposit`
4. Finalize the call by consuming builder via `CallBuilder::transaction` or `CallBuilder::view` depending on what kind of call you want to make

Reference this migration of Example 1 for migrating your own calls:

```rust title="Calls - workspaces-rs"
contract
    .call(&worker, "ft_transfer")
    .args_json((alice.id(), transfer_amount, Option::<bool>::None))?
    .gas(300_000_000_000_000)
    .deposit(ONE_YOCTO)
    .transact()
    .await?;

let root_balance: U128 = contract
    .call(&worker, "ft_balance_of")
    .args_json((contract.id(),))?
    .view()
    .await?
    .json()?;
```

:::note
Note that you have to pass arguments as any serializable type representing a sequential list. Tuples are usually the best candidate due to their heterogeneous nature (remember that you can construct a unary tuple by placing a comma before the closing bracket like this: `(el,)`). Passing in an object formatted with the `json!()` macro is also supported.
:::

### Batch Transactions

There is a special builder for making batch transactions that can be instantiated by calling `Contract::batch`. Consider the following snippet making a batch transaction consisting of two calls:

```rust title="Batch Transaction - near-sdk-sim"
let res = root
    .create_transaction(contract.account_id())
    .function_call(
        "ft_transfer_call".to_string(),
        json!({
            "receiver_id": defi_contract.account_id(),
            "amount": transfer_amount.to_string(),
            "msg": "10",
        })
        .to_string()
        .into_bytes(),
        300_000_000_000_000 / 2,
        1,
    )
    .function_call(
        "storage_unregister".to_string(),
        json!({
            "force": true
        })
        .to_string()
        .into_bytes(),
        300_000_000_000_000 / 2,
        1,
    )
    .submit();
```

There are no caveats here, the snippet can be straightforwardly mapped into the following:

```rust title="Batch Transaction - workspace-rs"
let res = contract
    .batch(&worker)
    .call(
        Function::new("ft_transfer_call")
            .args_json((defi_contract.id(), transfer_amount, Option::<String>::None, "10"))?
            .gas(300_000_000_000_000 / 2)
            .deposit(1),
    )
    .call(
        Function::new("storage_unregister")
            .args_json((Some(true),))?
            .gas(300_000_000_000_000 / 2)
            .deposit(1),
    )
    .transact()
    .await?;
```

## Inspecting Logs

The API for inspecting logs is fairly close to what it was in NEAR Simulator, but there are still some things you should keep in mind when migrating. Let's take the same transaction we used in the [batch transactions](#batch-transactions) section and try to inspect its logs. This is how one would check that the transaction logged a specific message in a certain position with NEAR Simulator:

```rust title="Logs - near-sdk-sim"
assert_eq!(
    res.logs()[1],
    format!("Closed @{} with {}", contract.account_id(), initial_balance - transfer_amount)
);
```

The `workspaces-rs` counterpart might seem almost identical at the first look:

```rust title="Logs - workspaces-rs"
assert_eq!(
    res.logs()[1],
    format!("Closed @{} with {}", contract.id(), initial_balance.0 - transfer_amount.0)
);
```

However, it can actually behave differently depending on your use case, because while near-sdk-sim version only returns the logs from the transaction, the workspaces version returns all logs from both the transaction and receipt outcomes. If you want a literal counterpart, please use `res.outcome().logs`.

Another common use case is examining receipt outcome logs like this:

```rust title="Logs - nead-sdk-sim"
let outcome = res.get_receipt_results().remove(5).unwrap();

assert_eq!(outcome.logs()[0], "The account of the sender was deleted");
assert_eq!(
    outcome.logs()[2],
    format!("Account @{} burned {}", root.account_id(), 10)
);
```

Which is straightforwardly replaced with:

```rust title="Logs - workspaces-rs"
let outcome = &res.receipt_outcomes()[5];
assert_eq!(outcome.logs[0], "The account of the sender was deleted");
assert_eq!(outcome.logs[2], format!("Account @{} burned {}", contract.id(), 10));
```

## Profiling Gas

NEAR Simulator never had accurate gas estimations since it only tried to mirror nearcore, but nearcore has extra functionality on top which consumes gas (like cross-contract calls are processed separately from the same transaction and that incurs gas fees). Workspaces offers the better experience here and aligns very well with what you can do on testnet and mainnet. It provides the added benefit of allowing the developer to accurately profile gas usage before deploying to `mainnet`.

:::warning
Since `workspaces-rs` is now using accurate gas measurements, some testing flows that were previously being tested with sdk-sim that would depend on gas reports might not work anymore. You should do your due diligence if you plan to deploy to `mainnet`.
:::

Let's once again return to the [batch transactions](#batch-transactions) example and see how we would estimate gas burnt by a given transaction:

```rust title="Gas (transaction) - near-sdk-sim"
println!("Burnt gas (transaction): {}", res.gas_burnt());
```

Just like with [inspecting logs](#inspecting-logs), one might mistakenly think that

```rust title="Gas (all) - workspaces-rs"
println!("Burnt gas (all): {}", res.total_gas_burnt);
```

is the corresponding `workspaces-rs` snippet, but `CallExecutionDetails::total_gas_burnt` includes all gas burnt by call execution, including by receipts. This is exposed as a surface level API since it is a much more commonly used concept, but if you do actually want gas burnt by transaction itself you can do it like this:

```rust title="Gas (transaction) - workspaces-rs"
println!("Burnt gas (transaction): {}", res.outcome().gas_burnt);
```
