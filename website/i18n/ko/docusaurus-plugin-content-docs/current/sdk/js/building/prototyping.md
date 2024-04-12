---
id: prototyping
sidebar_label: 신속한 프로토타이핑
title: "컨트랙트 업그레이드: 신속한 프로토타이핑"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 신속한 프로토타이핑

컨트랙트의 인터페이스를 변경하고 다시 배포하면 다음 오류가 표시될 수 있습니다.

    Cannot deserialize the contract state.

### 왜 이런 일이 발생할까요?

컨트랙트가 실행되면, NEAR 런타임은 디스크에서 직렬화된 상태를 읽고 현재 컨트랙트 코드를 사용하여 로드를 시도합니다. 코드가 변경되었지만 직렬화된 상태가 동일하게 유지되면, 런타임은 이를 수행하는 방법에 대해 알 수 없습니다.

### 이러한 오류를 방지하려면 어떻게 해야 할까요?

아직 연구 및 개발 단계에 있는 경우, 프로토타입을 빌드하고 로컬 또는 [테스트넷](/concepts/basics/networks)에 배포하면 변경 사항을 수정할 때 이전 컨트랙트 상태를 모두 삭제할 수 있습니다. 이를 수행하는 몇 가지 방법은 아래를 참고하세요.

When you're ready to deploy a more stable contract, there are a couple of [production strategies](../../../2.build/2.smart-contracts/release/upgrade.md#migrating-the-state) that will help you update the contract state without deleting it all. And once your contract graduates from "trusted mode" (when maintainers control a [Full Access key](/concepts/protocol/access-keys)) to community-governed mode (no more Full Access keys), you can set up your contract to [upgrade itself](../../../2.build/2.smart-contracts/release/upgrade.md#programmatic-update).


## 신속한 프로토타이핑: 항상 모든 항목 삭제

모든 계정 상태를 삭제하는 방법에는 두 가지가 있습니다.

1. Deploying on a new account each time
2. 컨트랙트 계정 삭제 & 재생성

두 경우 모두, 다음 예시를 살펴보겠습니다.

[JS 상태 메시지 컨트랙트](https://github.com/near/near-sdk-js/blob/263c9695ab7bb853ced12886c4b3f8663070d900/examples/src/status-message-collections.js#L10-L42)를 테스트넷에 배포하고 다음과 같이 호출한다고 가정해 보겠습니다.

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

이는 `set_status`에 대한 호출로 설정한 메시지(이 경우는 `"lol"`)를 반환합니다.

이 시점에서 컨트랙트는 배포되고 몇 가지 상태를 가집니다.

이제 각 계정에 대해, 상태 메시지와 태그라인이라는 두 종류의 데이터를 저장하도록 컨트랙트를 변경한다고 가정해 보겠습니다. 이때 계정 ID로 인덱싱된 상태 메시지와 태그라인에 대한 컨트랙트 코드 `LookupMap`을 추가할 수 있습니다.

새 `taglines` LookupMap이 이전 `records` LookupMap과 동일한 접두사(접두사는 `a`, `new LookupMap("a")`에 의해 설정됨)를 가지고 있기 때문에, `you.testnet`에 대한 태그라인은 `"lol"`이 되어야 한다고 생각하면서 컨트랙트를 다시 빌드하고 배포합니다. 그러나 컨트랙트에서 `near view`를 실행하면, "Cannot deserialize"라는 오류 메시지가 나타납니다. 무엇을 해야 할까요?

### 1. Deploying on a new account each time

When first getting started with a new project, the fastest way to deploy a contract is [creating an account](../../../4.tools/cli.md#near-create-account) and [deploying the contract](../../../4.tools/cli.md#near-deploy) into it using `NEAR CLI`.

<Tabs className="language-tabs" groupId="code-tabs">
<TabItem value="near-cli">

```bash
  near create-account <account-id> --useFaucet
  near deploy <account-id> ./path/to/compiled.wasm
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

1. Creates a new testnet account pre-funded with 10N from the faucet
2. 이 계정에 대한 개인 키를 `~/.near-credentials` 폴더에 저장합니다.
3. 이 계정에 컨트랙트 코드를 배포합니다.

### 2. Deleting & Recreating Contract Account
Another option to start from scratch is to delete the account and recreate it.

<Tabs className="language-tabs" groupId="code-tabs">
<TabItem value="near-cli">

```bash title="Delete sub-account"
near delete <accountId> <beneficiaryId>
```
</TabItem>
<TabItem value="near-cli-rs">

```bash title="Delete sub-account"
near account delete-account app-name.you.testnet beneficiary you.testnet network-config testnet sign-with-keychain send
```
</TabItem>
</Tabs>

This sends all funds still on the `<accountId>` account to `<beneficiaryId>` and deletes the contract that had been deployed to it, including all contract state.

이제 하위 계정을 생성하고, 위의 명령을 사용하여 다시 배포하면 처음 배포했을 때와 같이 빈 상태가 됩니다.
