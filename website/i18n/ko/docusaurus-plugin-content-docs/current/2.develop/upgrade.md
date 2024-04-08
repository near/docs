---
id: upgrade
title: 컨트랙트 업데이트
---

import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

NEAR 계정은 로직(컨트랙트의 코드)을 상태(스토리지)와 분리하여, 코드를 변경할 수 있습니다.

컨트랙트는 두 가지 방법으로 업데이트할 수 있습니다.

1. **Through tools** such as [NEAR CLI](../4.tools/cli.md) or [near-api-js](../4.tools/near-api-js/quick-reference.md) (if you hold the account's [full access key](../1.concepts/protocol/access-keys.md)).
2. **Programmatically**, by implementing a method that [takes the new code and deploys it](#programmatic-update).

---

## Updating Through Tools
[NEAR CLI](../4.tools/cli.md) 등 선호하는 도구를 사용하여 다른 컨트랙트를 재배포하기만 하면 됩니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="near-cli">

  ```bash
  # (optional) If you don't have an account, create one
  near create-account <account-id> --useFaucet

  # Deploy the contract
  near deploy <account-id> <wasm-file>
  ```

  </TabItem>
  <TabItem value="near-cli-rs">

  ```bash
  # (optional) If you don't have an account, create one
  near account create-account sponsor-by-faucet-service somrnd.testnet autogenerate-new-keypair save-to-keychain network-config testnet create
  
  # Deploy the contract
  near contract deploy <accountId> use-file <route_to_wasm> without-init-call network-config testnet sign-with-keychain send
  ```
  </TabItem>
</Tabs>

---

## 프로그래밍을 통한 업데이트
스마트 컨트랙트를 다음과 같은 방법을 구현하여 자체적으로 업데이트할 수도 있습니다.
1. 새 wasm 컨트랙트를 입력값으로 받습니다.
2. Promise를 생성하여 자체적으로 배포합니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="update.rs"
        url="https://github.com/near-examples/update-migrate-rust/blob/main/self-updates/base/src/update.rs"
        start="10" end="31" />
  </Language>
</CodeTabs>

#### How to Invoke Such Method?
<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="near-cli">

  ```bash
  # Load the contract's raw bytes
  CONTRACT_BYTES=`cat ./path/to/wasm.wasm | base64`

  # Call the update_contract method
  near call <contract-account> update_contract "$CONTRACT_BYTES" --base64 --accountId <manager-account> --gas 300000000000000
  ```

  </TabItem>
  <TabItem value="near-cli-rs">

  ```bash
  # Call the update_contract method
  near contract call-function as-transaction <contract-account> update_contract file-args </path/to/wasm.wasm> prepaid-gas '300.0 Tgas' attached-deposit '0 NEAR' sign-as <manager-account> network-config testnet sign-with-keychain send
  ```

  </TabItem>
  <TabItem value="🌐 JavaScript">

  ```js
  // Load the contract's raw bytes
  const code = fs.readFileSync("./path/to/wasm.wasm");

  // Call the update_contract method
  await wallet.callMethod({contractId: guestBook, method: "update_contract", args: code, gas: "300000000000000"});
  ```
  </TabItem>
</Tabs>

:::tip DAO Factories
This is how DAO factories [update their contracts](https://github.com/near-daos/sputnik-dao-contract/blob/main/sputnikdao-factory2/src/factory_manager.rs#L60)
:::

---

## Migrating the State
Since the account's logic (smart contract) is separated from the account's state (storage), **the account's state persists** when re-deploying a contract.

Because of this, **adding methods** or **modifying existing ones** will yield **no problems**.

However, deploying a contract that **modifies or removes structures**  stored in the state will raise an error: `Cannot deserialize the contract state`, in which case you can choose to:
1. 다른 계정 사용
2. 이전 컨트랙트 코드로 롤백
3. 컨트랙트 상태를 마이그레이션하는 메서드 추가

<hr className="subsection" />

### 마이그레이션 메서드
상태를 마이그레이션하는 것 외에 다른 옵션이 없는 경우 다음과 같은 메서드를 구현해야 합니다.
1. 컨트랙트의 현재 상태를 읽습니다.
2. 새로운 상태로 변환하기 위해 다른 함수를 적용합니다.
3. 새로운 상태를 반환합니다.

이것이 DAO가 [스스로를 업데이트](https://github.com/near-daos/sputnik-dao-contract/blob/main/sputnikdao2/src/upgrade.rs#L59)하는 방법입니다.
:::

<hr className="subsection" />

### 예제: 방명록 마이그레이션

메시지를 저장하는 방명록이 있고, 사용자가 이러한 메시지에 대해 "프리미엄"으로 지불할 수 있다고 상상해 보세요. 다음과 같은 상태를 사용하여 메시지 및 결제를 추적할 수 있습니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
        url="https://github.com/near-examples/update-migrate-rust/blob/main/basic-updates/base/src/lib.rs"
        start="10" end="21" />        
  </Language>
</CodeTabs>

#### 컨트랙트 업데이트
만약 어느 시점에서 `PostedMessage` 내 `payments`를 추적할 수 있다는 것을 깨달아서, 컨트랙트를 다음과 같이 변경했다고 해봅시다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
        url="https://github.com/near-examples/update-migrate-rust/blob/main/basic-updates/update/src/lib.rs"
        start="12" end="23" />        
  </Language>
</CodeTabs>

#### 호환되지 않는 상태
초기화된 계정에 업데이트를 배포하면, 다음과 같은 이유로 컨트랙트는 계정 ​​상태를 역직렬화하지 못합니다.

1. (이전 컨트랙트로부터) 상태에 저장된 추가 `payments` 벡터가 존재합니다.
2. 저장된 `PostedMessages`에는 (이전 컨트랙트와 같이) `payment` 필드가 존재하지 않습니다.

<br />

#### 상태 마이그레이션
이 문제를 해결하려면, 이전 상태를 거쳐 `payments` 벡터를 제거하고, `PostedMessages`에 정보를 추가하는 메서드를 구현해야 합니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
        url="https://github.com/near-examples/update-migrate-rust/blob/main/basic-updates/update/src/migrate.rs"
        start="3" end="46" />
  </Language>
</CodeTabs>

실제로 `migrate`는 기존 상태(`[#init(ignore_state)]`)를 **무시하는**

:::tip
You can follow a migration step by step in the [official migration example](https://github.com/near-examples/update-migrate-rust/tree/main/basic-updates/base)
:::
