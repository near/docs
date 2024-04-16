---
id: deploy
title: NEAR CLI - 기초
sidebar_label: 배포 및 사용
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

컨트랙트가 준비되면, 모든 사람이 사용할 수 있도록 NEAR 네트워크에 배포할 수 있습니다.

[NEAR CLI](../../../4.tools/cli.md)를 사용하여 컨트랙트를 배포하고, 컨트랙트 내 메서드를 호출하는 방법을 안내해 드립니다.

:::info
:::info 이 페이지에서는 NEAR CLI의 기본 사항만 다룹니다. 자세한 내용은 [NEAR CLI 설명서 페이지](../../../4.tools/cli.md)를 참조하세요.
:::

---

## Deploying the Contract

`NEAR CLI` 덕분에 컨트랙트 배포는 다음과 같이 간단하게 수행될 수 있습니다.

1. 컨트랙트를 wasm으로 컴파일합니다(템플릿 내 `yarn build`를 통해 자동으로 수행됨).
2. [Create an account](../../../4.tools/cli.md#near-create-account) and [deploy the contract](../../../4.tools/cli.md#near-deploy) into it using `NEAR CLI`.

#### 계정 생성 및 배포

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="near-cli">

```bash
# Create a new account pre-funded by a faucet & deploy
near create-account <accountId> --useFaucet
near deploy <accountId> <route_to_wasm>

# Get the account name
cat ./neardev/dev-account
```

</TabItem>

<TabItem value="near-cli-rs">

```bash
# Automatically deploy the wasm in a new account
near account create-account sponsor-by-faucet-service <my-new-dev-account>.testnet autogenerate-new-keypair save-to-keychain network-config testnet create

near contract deploy <my-new-dev-account>.testnet use-file <route_to_wasm> without-init-call network-config testnet sign-with-keychain
```

</TabItem>

</Tabs>

#### 기존 계정에 배포

<Tabs className="language-tabs" groupId="code-tabs">
<TabItem value="near-cli">

```bash
# login into your account
near login

# deploy the contract
near deploy <accountId> <route_to_wasm>
```

</TabItem>

<TabItem value="near-cli-rs">

```bash
# login into your account
near account import-account using-web-wallet network-config testnet

# deploy the contract
near contract deploy <accountId> use-file <route_to_wasm> without-init-call network-config testnet sign-with-keychain send
```

</TabItem>

</Tabs>

:::tip
You can overwrite a contract by deploying another on top of it. 이 경우 계정의 로직이 변경되지만, 상태는 유지됩니다.
:::

:::info
:::info 기본적으로 `near-cli`는 `testnet` 네트워크를 사용합니다. `mainnet`에 배포하려면, `NEAR_ENV=mainnet`를 정의하세요.
:::

:::info Naming Convention for Public-Facing Methods

이를 고려하여, 대부분 Rust 컨트랙트로 구성된 나머지 NEAR 생태계와 호환되도록 모든 SDK에서 `snake_case`를 사용해 메서드의 이름을 정하는 것이 좋습니다.
:::

---

## Initializing the Contract

컨트랙트에 [초기화 메서드](../anatomy/anatomy.md#initialization-functions)가 있는 경우, 이를 호출하여 상태를 초기화할 수 있습니다. 컨트랙트가 상태에 대한 `default` 값을 구현하는 경우에는 필요하지 않습니다.

<Tabs className="language-tabs" groupId="code-tabs">
<TabItem value="near-cli">

```bash
# Call the initialization method (`init` in our examples)
near call <contractId> <initMethod> [<args>] --accountId <accountId>
```

</TabItem>

<TabItem value="near-cli-rs">

```bash
# Call the initialization method (`init` in our examples)
near contract call-function as-transaction <contractId> <initMethod> json-args [<args>] prepaid-gas '30 TeraGas' attached-deposit '0 NEAR' sign-as <accountId> network-config testnet sign-with-keychain send
```

</TabItem>

</Tabs>

:::info
:::info `--initFunction` 및 `--initArgs` 인자를 사용해서 [배포 중에](#컨트랙트-배포) 컨트랙트를 초기화할 수 있습니다.
:::

---

## Calling the Contract

컨트랙트가 배포되고 나면, [NEAR CLI](../../../4.tools/cli.md)를 통해 바로 컨트랙트와 상호 작용할 수 있습니다.

<hr className="subsection" />

### View 메서드

View 메서드는 **읽기 전용** 작업을 수행하는 메서드입니다. 이러한 메서드를 호출하는 것은 무료이며, 호출에 사용되는 계정을 지정할 필요가 없습니다.

<Tabs className="language-tabs" groupId="code-tabs">
<TabItem value="near-cli">

```bash
near view <contractId> <methodName>
```

</TabItem>

<TabItem value="near-cli-rs">

```bash
near contract call-function as-read-only <contractId> <methodName> text-args '' network-config testnet now
```

</TabItem>

</Tabs>

:::tip
:::tip View 메서드는 실행에 기본적으로 200 TGAS를 소모합니다.
:::

<hr className="subsection" />

### 메서드 변경

변경 방법은 읽기 및 쓰기 작업을 모두 수행하는 방법입니다. 이러한 방법의 경우, 호출에 사용되는 계정을 지정해야 합니다.

<Tabs className="language-tabs" groupId="code-tabs">
<TabItem value="near-cli">

```bash
near call <contractId> <methodName> <jsonArgs> --accountId <yourAccount> [--deposit <amount>] [--gas <GAS>]
```

</TabItem>

<TabItem value="near-cli-rs">

```bash
near contract call-function as-transaction <AccountId> <MethodName> json-args <JsonArgs> prepaid-gas <PrepaidGas> attached-deposit <AttachedDeposit> sign-as <AccountId>  network-config testnet sign-with-keychain send
```

</TabItem>

</Tabs>
