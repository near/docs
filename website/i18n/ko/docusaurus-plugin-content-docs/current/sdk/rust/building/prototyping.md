---
id: prototyping
sidebar_label: 신속한 프로토타이핑
title: "컨트랙트 업그레이드: 신속한 프로토타이핑"
---

import {CodeTabs, Language, Github} from "@site/src/components/codetabs";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 신속한 프로토타이핑

컨트랙트의 인터페이스를 변경하고 다시 배포하면 다음 오류가 표시될 수 있습니다.

    Cannot deserialize the contract state.

### 왜 이런 일이 발생할까요?

컨트랙트가 실행되면, NEAR 런타임은 디스크에서 직렬화된 상태를 읽고 현재 컨트랙트 코드를 사용하여 로드를 시도합니다. 코드가 변경되었지만 직렬화된 상태가 동일하게 유지되면, 런타임은 이를 수행하는 방법에 대해 알 수 없습니다.

### 이러한 오류를 방지하려면 어떻게 해야 할까요?

아직 연구 및 개발 단계에 있는 경우, 프로토타입을 빌드하고 로컬 또는 [테스트넷](/concepts/basics/networks)에 배포하면 변경 사항을 수정할 때 이전 컨트랙트 상태를 모두 삭제할 수 있습니다. 이를 수행하는 몇 가지 방법은 아래를 참고하세요.

보다 안정적인 컨트랙트를 배포할 준비가 되면, 상태를 모두 삭제하지 않고 업데이트하는 데 도움이 되는 몇 가지 [생산 전략](../../../2.develop/upgrade.md#migrating-the-state)이 있습니다. 그리고 컨트랙트가 "신뢰할 수 있는 모드"(관리자가 [전체 액세스 키](/concepts/basics/accounts/access-keys)를 제어하는 ​​경우)에서 커뮤니티 관리 모드(더 이상 전체 액세스 키가 없음)로 전환되면, 컨트랙트로 하여금 [자체적으로 업그레이드](../../../2.develop/upgrade.md#programmatic-update)하도록 설정할 수 있습니다.


## 신속한 프로토타이핑: 항상 모든 항목 삭제

모든 계정 상태를 삭제하는 방법에는 두 가지가 있습니다.

1. `rm -rf neardev && near dev-deploy`
2. 컨트랙트 계정 삭제 & 재생성

두 경우 모두, 다음 예시를 살펴보겠습니다.

[rust-status-message](https://github.com/near-examples/rust-status-message) 예제 컨트랙트의 구조는 다음과 같습니다.

<CodeTabs>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
            url="https://github.com/near-examples/rust-status-message/blob/b5fa6f2a30559d56a3a3ea52da8c26c5d3907606/src/lib.rs" start="5" end="29"/>
  </Language>
</CodeTabs>

Let's say you deploy this contract to testnet, then call it with:

<Tabs className="language-tabs" groupId="code-tabs">
<TabItem value="near-cli">

```bash
near call [contract] set_status '{"message": "lol"}' --accountId you.testnet
near view [contract] get_status '{"account_id": "you.testnet"}'
```

</TabItem>
<TabItem value="near-cli-rs">

```bash
near contract call-function as-transaction [contract] set_status json-args '{"message": "lol"}' prepaid-gas '30 TeraGas' attached-deposit '0 NEAR' sign-as you.testnet network-config testnet sign-with-keychain send

near contract call-function as-read-only [contract] get_status text-args '{"account_id": "you.testnet"}' network-config testnet now
```
</TabItem>
</Tabs>
This will return the message that you set with the call to `set_status`, in this case `"lol"`.

이 시점에서 컨트랙트는 배포되고 몇 가지 상태를 가집니다.

이제 각 계정에 대해 두 종류의 데이터를 저장하도록 컨트랙트를 변경한다고 가정해 보겠습니다.

```rust
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct StatusMessage {
    taglines: LookupMap<AccountId, String>,
    bios: LookupMap<AccountId, String>,
}

impl Default for StatusMessage {
    fn default() -> Self {
        Self {
            taglines: LookupMap::new(b"r"),
            bios: LookupMap::new(b"b"),
        }
    }
}

#[near_bindgen]
impl StatusMessage {
    pub fn set_tagline(&mut self, message: String) {
        let account_id = env::signer_account_id();
        self.taglines.insert(&account_id, &message);
    }

    pub fn get_tagline(&self, account_id: AccountId) -> Option<String> {
        return self.taglines.get(&account_id);
    }

    pub fn set_bio(&mut self, message: String) {
        let account_id = env::signer_account_id();
        self.bios.insert(&account_id, &message);
    }

    pub fn get_bio(&self, account_id: AccountId) -> Option<String> {
        return self.bios.get(&account_id);
    }
}
```

다시 이 컨트랙트를 빌드 및 배포하면서, 새 `taglines`이 이전 `records` LookupMap(`LookupMap::new(b"r".to_vec())`에 의해 설정된 접두사 `r`)과 같은 접두사를 가지고 있기 때문에 `you.testnet`에 대한 태그라인은 `"lol"`이 되어야 한다고 생각하고 있을 수 있습니다. 그러나 컨트랙트에 대해 `near view`를 실행하면, "Cannot deserialize" 메시지가 나타날 것입니다. 어떻게 해야 하나요?

### 1. `rm -rf neardev && near dev-deploy`

새 프로젝트를 처음 시작할 때 컨트랙트를 배포하는 가장 빠른 방법은 [`dev-deploy`](/concepts/basics/accounts/creating-accounts)입니다.
<Tabs className="language-tabs" groupId="code-tabs">
<TabItem value="near-cli">

```bash
near dev-deploy [--wasmFile ./path/to/compiled.wasm]
```
</TabItem>
<TabItem value="near-cli-rs">

```bash
near account create-account sponsor-by-faucet-service <my-new-dev-account>.testnet autogenerate-new-keypair save-to-keychain network-config testnet create

near contract deploy <my-new-dev-account>.testnet use-file <route_to_wasm> without-init-call network-config testnet sign-with-keychain

```



</TabItem>
</Tabs>

이는 다음과 같은 몇 가지 작업을 수행합니다.

1. `dev-1626793583587-89195915741581`과 같은 이름을 가진 새 테스트넷 계정을 생성합니다.
2. 이 계정 이름을 프로젝트 내 `neardev` 폴더에 저장합니다.
3. 이 계정에 대한 개인 키를 `~/.near-credentials` 폴더에 저장합니다.
4. 이 계정에 컨트랙트 코드를 배포합니다.

다음 번에 `dev-deploy`를 실행하면, 이는 `neardev` 폴더를 확인한 다음, 새 계정을 만들지 않고 동일한 계정에 다시 컨트랙트를 배포합니다.

그러나 위의 예에서, 우리는 계정 상태를 삭제하고 싶습니다. 이는 어떻게 할까요?

가장 쉬운 방법은 `neardev` 폴더를 삭제한 다음, `near dev-deploy`를 다시 실행하는 것입니다. 이렇게 하면 상태를 비운 채로 완전히 새로운 테스트넷 계정이 생성되고, 업데이트된 컨트랙트가 배포됩니다.

### 2. 컨트랙트 계정 삭제 & 재생성

끊임없이 변화하는 `dev-*` 계정이 아닌 예측 가능한 계정 이름을 갖고 싶다면, 가장 좋은 방법은 하위 계정(sub-account)을 만드는 것입니다.

<Tabs className="language-tabs" groupId="code-tabs">
<TabItem value="near-cli">

```bash title="Create sub-account"
near create-account app-name.you.testnet --masterAccount you.testnet
```
</TabItem>
<TabItem value="near-cli-rs">

```bash title="Create sub-account"
near account create-account fund-myself app-name.you.testnet '100 NEAR' autogenerate-new-keypair save-to-keychain sign-as you.testnet network-config testnet sign-with-keychain send
```

</TabItem>
</Tabs>

그런 다음 여기에 컨트랙트를 배포합니다.

<Tabs className="language-tabs" groupId="code-tabs">
<TabItem value="near-cli">

```bash title="Deploy to sub-account"
near deploy --accountId app-name.you.testnet [--wasmFile ./path/to/compiled.wasm]
```
</TabItem>
<TabItem value="near-cli-rs">

```bash title="Deploy to sub-account"
near contract deploy app-name.you.testnet use-file <./path/to/compiled.wasm> without-init-call network-config testnet sign-with-keychain send
```

</TabItem>
</Tabs>

이 경우 모든 컨트랙트 상태를 삭제하고 다시 시작하려면 어떻게 해야 할까요? 하위 계정을 삭제하고 다시 만드세요.


<Tabs className="language-tabs" groupId="code-tabs">
<TabItem value="near-cli">

```bash title="Delete sub-account"
near delete app-name.you.testnet you.testnet
```
</TabItem>
<TabItem value="near-cli-rs">

```bash title="Delete sub-account"
near account delete-account app-name.you.testnet beneficiary you.testnet network-config testnet sign-with-keychain send
```
</TabItem>
</Tabs>

이렇게 하면 `app-name.you.testnet` 계정에 남아 있는 모든 자금이 `you.testnet`로 보내지고, `app-name.you.testnet`에 배포된 컨트랙트는 상태를 포함한 모든 것이 삭제됩니다.

이제 하위 계정을 생성하고, 위의 명령을 사용하여 다시 배포하면 처음 배포했을 때와 같이 빈 상태가 됩니다.
