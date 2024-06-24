---
id: integration-test
title: Integration Tests
---

import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

통합 테스트를 사용하면 NEAR `testnet` 또는 로컬 `sandbox`에 컨트랙트를 배포하고, 컨트랙트와 상호 작용할 테스트 사용자를 만들 수 있습니다. 그러한 방식으로, 현실적인 환경에서 컨트랙트를 철저하게 테스트할 수 있습니다.

또한 로컬 `sandbox`을 사용하면 네트워크를 완전히 제어할 수 있습니다.

1. 테스트 `Accounts`를 생성하고 그들의 `State` 및 `Balance`를 처리합니다.
2. 콜백에서 에러를 시뮬레이션합니다.
3. 시간 흐름을 제어하고, 미래로 빠르게 이동합니다(Rust에서는 준비된 기능이고, TS에서는 출시 예정입니다).

:::tip NEAR Workspaces

In NEAR, integration tests are implemented using a framework called **Workspaces**. 작업 공간은 [🦀 Rust](https://github.com/near/workspaces-rs) 및 [🌐 Typescript](https://github.com/near/workspaces-js)의 두 가지 유형으로 제공됩니다.

All of our [examples](https://github.com/near-examples/docs-examples) come with integration testing.

:::

---

## 스니펫 I: Hello NEAR 테스트

Lets take a look at the test of our [Quickstart Project](../quickstart.md) [👋 Hello NEAR](https://github.com/near-examples/hello-near-examples), where we deploy the contract on an account and test it correctly retrieves and sets the greeting.

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/hello-near-examples/blob/main/contract-ts/sandbox-test/main.ava.js" start="11" end="45"/></Language>
</CodeTabs>

---

## Snippet II: Testing Donations

In most cases we will want to test complex methods involving multiple users and money transfers. A perfect example for this is our [Donation Example](https://github.com/near-examples/donation-examples), which enables users to `donate` money to a beneficiary. Lets see its integration tests

<CodeTabs>
  <Language value="js" language="js">
    <Github fname="main.ava.ts"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/sandbox-test/main.ava.js"
            start="51" end="75" /></Language>
</CodeTabs>

---

## Sandbox Testing

NEAR Workspaces allows you to write tests once, and run them either on `testnet` or a local `Sandbox`. **기본적으로**, 작업 공간은 **샌드박스**를 시작하고, **로컬 환경에서** 테스트를 실행합니다. 이 프레임워크의 기능에 대해 자세히 알아보고, 해당 프레임워크가 어떻게 도움이 되는지 살펴보겠습니다.

### Spooning Contracts

[블록체인을 스푸닝하는 것](https://coinmarketcap.com/alexandria/glossary/spoon-blockchain)은 한 네트워크에서 다른 네트워크로 데이터를 복사하는 것입니다. NEAR 작업 공간을 사용하면, Mainnet 또는 Testnet 컨트랙트에서 로컬 샌드박스 환경으로 데이터를 쉽게 복사할 수 있습니다.

<Tabs groupId="code-tabs">
<TabItem value="js" label="🌐 JavaScript" default>

```ts
const refFinance = await root.importContract({
  mainnetContract: 'v2.ref-finance.near',
  blockId: 50_000_000,
  withData: true,
});
```

This would copy the Wasm bytes and contract state from [v2.ref-finance.near](https://nearblocks.io/address/v2.ref-finance.near) to your local blockchain as it existed at block `50_000_000`. 최상위 계정이 로컬에 존재하지 않더라도 컨트랙트 이름을 동일하게 유지하기 위해, 여기서는 샌드박스의 특수한 [패치 상태](#실시간-패치-상태) 기능을 사용합니다 (이는 샌드박스 테스트 모드에서만 작동함을 의미합니다). 이렇게 하면 가까운 작업 공간에서 생성된 다른 모든 계정과 상호 작용하는 것과 동일하게, 결정론적 방식으로 컨트랙트와 상호 작용할 수 있습니다.

:::note

`withData` will only work out-of-the-box if the contract's data is 50kB or less. 이는 RPC 서버의 기본 구성 때문입니다.

:::

[컨트랙트 스푸닝에 대한 TypeScript 예제](https://github.com/near/workspaces-js/blob/main/__tests__/05.spoon-contract-to-sandbox.ava.ts)를 참조하세요.

</TabItem>

<TabItem value="rust" label="🦀 Rust">

`testnet`에서 가져오려는 컨트랙트 이름과, 특정 시간을 다시 참조하는 블록 ID를 지정하세요(참조하는 컨트랙트가 변경되거나 업데이트된 경우). (Just in case the contract you're referencing has been changed or updated)

````rust
```rust
const CONTRACT_ACCOUNT: &str = "contract_account_name_on_testnet.testnet";
const BLOCK_HEIGHT: BlockHeight = 12345;
````

이에 대해서는 ["주의" 메모](../../../5.api/rpc/contracts.md#view-contract-state-view-contract-state)를 참조하시기 바랍니다. You'll have to re-initialize it with all the data to run tests.

````rust
체인 내 컨트랙트의 `.wasm` 파일을 가져오는 `pull_contract` 함수를 만듭니다. 테스트를 실행하려면 모든 데이터를 다시 초기화해야 합니다.

```rust
async fn pull_contract(owner: &Account, worker: &Worker<Sandbox>) -> anyhow::Result<Contract> {
    let testnet = workspaces::testnet_archival();
    let contract_id: AccountId = CONTRACT_ACCOUNT.parse()?;
````

이 다음 줄은 실제로 testnet에서 관련 컨트랙트를 끌어오고, 1000 NEAR로 초기 잔고를 설정합니다.

```rust
    let contract = worker
        .import_contract(&contract_id, &testnet)
        .initial_balance(parse_near!("1000 N"))
        .block_height(BLOCK_HEIGHT)
        .transact()
        .await?;
```

그런 다음 메타데이터로 컨트랙트를 다시 초기화해야 합니다.
컨트랙트의 데이터가 너무 커서 RPC 서비스에서 끌어올 수 없기 때문입니다. (제한은 50Mb로 설정됨)

```rust
    owner
        .call(&worker, contract.id(), "init_method_name")
        .args_json(serde_json::json!({
            "arg1": value1,
            "arg2": value2,
        }))?
        .transact()
        .await?;
    Ok(contract)
}
```

</TabItem>

</Tabs>

### 실시간 상태 패치

샌드박스 모드에서는 컨트랙트 상태, 컨트랙트 코드, 계정 또는 액세스 키를 `patchState`로 추가하거나 수정할 수 있습니다.

:::tip

`DeployContract`, `CreateAccount` 및 `AddKey` [작업(Action)](https://nomicon.io/RuntimeSpec/Actions#addkeyaction)을 통해 일반 트랜잭션을 사용하여 컨트랙트 코드, 계정 및 액세스 키를 변경할 수 있습니다. 그러나 이것은 자신의 계정 또는 하위 계정을 변경하는 것만으로 제한됩니다. `patchState`를 통해 모든 계정에서 이러한 작업을 수행할 수 있습니다.

:::

트랜잭션은 컨트랙트가 프로그램된 방식으로 상태를 변경하는 컨트랙트 호출만 포함할 수 있기 때문에, 트랜잭션을 통해 컨트랙트 상태에 대해 임의로 변경하는 작업을 수행할 수 없음을 명심하세요. 예를 들어 NFT 컨트랙트를 사용하면 소유권을 가진 NFT에 대해 작업을 수행할 수는 있지만, 다른 계정이 소유한 NFT에 대해 작업하는 것은 불가능합니다. 이것은 NFT 컨트랙트의 예상된 작동 방식입니다. 그러나 테스트를 위해 다른 사람의 NFT를 변경하고 싶을 수 있습니다. 이를 "컨트랙트 상태의 임의 변경"이라고 하며, `patchState`를 통해 수행할 수 있습니다.

<Tabs groupId="code-tabs">
<TabItem value="js" label="🌐 JavaScript" >

```js
    const {contract, ali} = t.context.accounts;
    // Contract must have some state for viewState & patchState to work
    await ali.call(contract, 'set_status', {message: 'hello'});
    // Get state
    const state = await contract.viewState();
    // Get raw value
    const statusMessage = state.get('STATE', {schema, type: StatusMessage});
    // Update contract state
    statusMessage.records.push(
      new BorshRecord({k: 'alice.near', v: 'hello world'}),
    );
    // Serialize and patch state back to runtime
    await contract.patchState(
      'STATE',
      borsh.serialize(schema, statusMessage),
    );
    // Check again that the update worked
    const result = await contract.view('get_status', {
      account_id: 'alice.near',
    });
    t.is(result, 'hello world');
```

이를 수행하는 방법에 대한 전체 예제를 보고 싶다면, [상태 패치 테스트](https://github.com/near/workspaces-js/blob/main/__tests__/02.patch-state.ava.ts)를 참조하세요.

</TabItem>

<TabItem value="rust" label="🦀 Rust" >

```rust
    // Grab STATE from the testnet status_message contract. This contract contains the following data:
    //   get_status(dev-20211013002148-59466083160385) => "hello from testnet"
    let (testnet_contract_id, status_msg) = {
        let worker = workspaces::testnet().await?;
        let contract_id: AccountId = TESTNET_PREDEPLOYED_CONTRACT_ID
            .parse()
            .map_err(anyhow::Error::msg)?;
        let mut state_items = worker.view_state(&contract_id, None).await?;
        let state = state_items.remove(b"STATE".as_slice()).unwrap();
        let status_msg = StatusMessage::try_from_slice(&state)?;
        (contract_id, status_msg)
    };
    info!(target: "spooning", "Testnet: {:?}", status_msg);
    // Create our sandboxed environment and grab a worker to do stuff in it:
    let worker = workspaces::sandbox().await?;
    // Deploy with the following status_message state: sandbox_contract_id => "hello from sandbox"
    let sandbox_contract = deploy_status_contract(&worker, "hello from sandbox").await?;
    // Patch our testnet STATE into our local sandbox:
    worker
        .patch_state(
            sandbox_contract.id(),
            "STATE".as_bytes(),
            &status_msg.try_to_vec()?,
        )
        .await?;
    // Now grab the state to see that it has indeed been patched:
    let status: String = sandbox_contract
        .view(
            &worker,
            "get_status",
            serde_json::json!({
                "account_id": testnet_contract_id,
            })
            .to_string()
            .into_bytes(),
        )
        .await?
        .json()?;
    info!(target: "spooning", "New status patched: {:?}", status);
    assert_eq!(&status, "hello from testnet");
```

</TabItem>

</Tabs>

`patchState` 대신, 노드를 중지하고 제네시스에서 상태를 덤프한 다음, 제네시스를 편집하고 노드를 다시 시작할 수 있습니다.
이 접근 방식은 수행하기가 더 복잡하며, 노드를 다시 시작하지 않고서는 수행할 수도 없습니다.

### 시간 이동

`workspaces` offers support for forwarding the state of the blockchain to the future. 즉, 시간에 민감한 데이터가 필요한 컨트랙트는 샌드박스의 블록이 생성될 때까지 앉아서 기다릴 필요가 없습니다. We can simply just call `worker.fast_forward` to get us further in time:

<Tabs groupId="code-tabs">
<TabItem value="js" label="🌐 JavaScript" default>

<Github fname="fast-forward.ava.ts" language="js"
    url="https://github.com/near/near-workspaces-js/blob/main/__tests__/08.fast-forward.ava.ts"
    start="34" end="53" />

</TabItem>

<TabItem value="rust" label="🦀 Rust">

```rust
#[tokio::test]
async fn test_contract() -> anyhow::Result<()> {
    let worker = workspaces::sandbox().await?;
    let contract = worker.dev_deploy(WASM_BYTES);
    let blocks_to_advance = 10000;
    worker.fast_forward(blocks_to_advance);
    // Now, "do_something_with_time" will be in the future and can act on future time-related state.
    contract.call(&worker, "do_something_with_time")
        .transact()
        .await?;
}
```

_[See the full example on Github](https://github.com/near/workspaces-rs/blob/main/examples/src/fast_forward.rs)._

</TabItem>

</Tabs>

---

## 테스트넷 사용

NEAR 작업 공간은 테스트를 작성한 뒤 로컬 샌드박스 노드(기본 동작) 또는 [NEAR TestNet](../../../1.concepts/basics/networks.md)에 대해 실행할 수 있도록 설정됩니다. 이것이 도움이 될 수 있는 이유는 다음과 같습니다.

- 컨트랙트가 예상대로 작동한다는 높은 신뢰성 제공
- 배포된 테스트넷 컨트랙트에 대한 테스트 가능
- 샌드박스 모드에서 뭔가 꺼지는 것 같으면 테스트넷과 비교 가능

:::tip

테스트넷 모드에서 Workspaces를 사용하려면 `testnet` 계정이 있어야 합니다.
You can create one [here](https://testnet.mynearwallet.com/).

:::

다음과 같은 세 가지 단계를 통해 테스트넷 모드로 전환할 수 있습니다.

1. `testnet`에 작업자 설정 네트워크를 만들고 마스터 계정을 전달할 때

<Tabs groupId="code-tabs">
<TabItem value="js" label="🌐 JavaScript"  default>

```ts
const worker = await Worker.init({
 network: 'testnet',
 testnetMasterAccountId: '<yourAccountName>',
})
```

</TabItem>

<TabItem value="rust" label="🦀 Rust" >

```rust
#[tokio::main]  // or whatever runtime we want
async fn main() -> anyhow::Result<()> {
// Create a sandboxed environment.
// NOTE: Each call will create a new sandboxed environment
let worker = workspaces::sandbox().await?;
// or for testnet:
let worker = workspaces::testnet().await?;
}
```

</TabItem>

</Tabs>

2. 테스트를 실행할 때, `NEAR_WORKSPACES_NETWORK` 및 `TESTNET_MASTER_ACCOUNT_ID` 환경 변수를 설정

<Tabs groupId="code-tabs">
<TabItem value="js" label="🌐 JavaScript"  default>

```bash
NEAR_WORKSPACES_NETWORK=testnet TESTNET_MASTER_ACCOUNT_ID=<your master account Id> node test.js
```

이 환경 변수를 설정하고, `{network: 'testnet', testnetMasterAccountId: <masterAccountId>}`를 `Worker.init`에 전달하면 구성 객체가 우선합니다.

</TabItem>

</Tabs>

3. AVA를 통해 `near-workspaces`를 사용하고 있다면 커스텀 구성 파일을 사용할 수 있습니다. 다른 테스터들도 유사한 구성 파일을 허용합니다.

<Tabs groupId="code-tabs">
<TabItem value="js" label="🌐 JavaScript"  default>

다음과 같은 형태로 `ava.testnet.config.cjs` 파일을 `package.json`과 동일한 디렉토리에 만듭니다.

```js
module.exports = {
 ...require('near-workspaces/ava.testnet.config.cjs'),
 ...require('./ava.config.cjs'),
};
module.exports.environmentVariables = {
    TESTNET_MASTER_ACCOUNT_ID: '<masterAccountId>',
};
```

[near-workspaces/ava.testnet.config.cjs](https://github.com/near/workspaces-js/blob/main/ava.testnet.config.cjs) 가져오기(import)는 `NEAR_WORKSPACES_NETWORK` 환경 변수를 설정합니다. 이 접근 방식의 이점은 샌드박스 모드에서만 실행되어야 하는 파일을 쉽게 무시할 수 있다는 것입니다.

이제 `package.json`의 `scripts` 섹션에 `test:testnet` 스크립트를 추가하고 싶다면, 다음과 같이 할 수 있습니다.

```diff
"scripts": {
  "test": "ava",
+  "test:testnet": "ava --config ./ava.testnet.config.cjs"
}
```

</TabItem>

</Tabs>

---

## 추가 미디어 자료

#### 작업 공간과 AVA를 사용한 테스트 기반 설계 {#test-driven-design}

아래 비디오는 간단한 컨트랙트를 위해 TDD에 작업 공간 및 AVA를 적용하는 방법에 대해 안내합니다.

<iframe
  width="560"
  height="315"
  src="https://www.youtube-nocookie.com/embed/LCu03IYwu1I"
  title="TDD Using Workspaces"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>
