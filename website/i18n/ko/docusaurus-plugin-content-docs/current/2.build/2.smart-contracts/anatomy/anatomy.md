---
id: anatomy
title: The Contract Class
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

컨트랙트의 로직 및 상태(스토리지)는 [핵심 클래스](#near-bindgen)에 의해 정의됩니다.

1. 속성은 [컨트랙트의 상태](#상태-정의)를 정의합니다.
2. [초기화 메서드](#상태-초기화)는 컨트랙트 상태를 초기화하는 방식에 대해 정의합니다.
3. 퍼블릭 메서드는 나머지 네트워크에 대한 컨트랙트의 인터페이스로 작용합니다.

---

## 컨트랙트 정의

컨트랙트는 고유한 특성과 메서드가 있는 또 다른 클래스입니다. 이를 다른 내부 클래스와 **구별**하려면, [`NEAR Bindgen` 데코레이터/매크로](#decorators--macros)를 사용해보세요.

<CodeTabs>
  <Language value="🌐 JavaScript" language="ts">
    <Github fname="contract.ts"
      url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
      start="6" end="9" />

</Language>

<Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
      url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/lib.rs"
      start="13" end="16" />

</Language>

</CodeTabs>

Under the hood, the `NEAR Bindgen` decorator/macro traverses the class, generating the necessary code to:

1. Transform the code into a valid NEAR contract.
2. Expose public methods, so they can be called externally.
3. Serialize objects for internal storage and communication with external actors.

<hr className="subsection" />

### The State

Each account has its own state (storage), which **only they can modify** but [anyone can see](../../../4.tools/cli.md#near-view-state-near-view-state).

The state is defined and modified through the **main class' attributes**.

Contracts [**pay for their storage**](./storage.md#storage-cost) by locking part of their balance. Currently it costs **~1 Ⓝ** to store **100kb**

:::info Key-Value Storage

The contract actually uses a `key-value` storage to persist values. This however is abstracted from you
by the SDK through [serialization](./serialization.md).

:::

:::tip Prefer SDK Collections

When defining attributes, **always prefer [SDK collections](./storage.md)** over native ones, since they are optimized for [serialization](./serialization.md).

:::

---

## Initializing the State

There are two ways to initialize the account's state, and they can co-exist:

1. An **initialization method** that receives the attributes needed for the state
2. A **default state**, which will be used until `init` is invoked, or a method writes into the state

<hr className="subsection" />

### Initialization Method

To define an initialization method simply decorate it with the [initialization macro](#decorators--macros).

The method will now be able to define the initial state's values, raising an error if invoked
while **the state is already initialized**.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

<Github fname="contract.ts" language="ts"
       url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
       start="11" end="14" />

:::info
To make the initialization mandatory use `@NearBindgen({requireInit: true})`
:::

:::caution
In JavaScript you **must always** define a [default state](#default-state)
:::

</TabItem>

<TabItem value="🦀 Rust">

<Github fname="lib.rs" language="rust"
       url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/lib.rs"
       start="35" end="40" />

:::info
To make the initialization mandatory use `#[derive(PanicOnDefault)]` in the contract's structure
:::

</TabItem>

</Tabs>

<hr className="subsection" />

### 기본 상태

컨트랙트는 초기화 메서드가 호출되지 않은 경우 사용할 **기본 상태**를 정의할 수 있습니다. 즉, `init` 이벤트가 발생하기 전에 메서드가 호출되면, 컨트랙트는 기본값을 사용합니다.

메서드가 상태에 기록되면, 상태가 초기화된 것으로 간주됩니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

<Github fname="contract.ts" language="ts"
       url="https://github.com/near-examples/donation-examples/blob/main/contract-ts/src/contract.ts"
       start="6" end="9" />

🌐 JavaScript에서 기본 상태는 클래스 정의 내 초기화 매개변수에 의해 정의됩니다.

:::caution
Javascript에서는 항상 **모든 클래스의 매개변수**에 값을 할당**해야 합니다**. 이렇게 하면 의도한 형식으로 올바르게 [역직렬화](./serialization.md)됩니다 .
:::

</TabItem>

<TabItem value="🦀 Rust">
    <Github fname="lib.rs" language="rust"
            url="https://github.com/near-examples/donation-examples/blob/main/contract-rs/src/lib.rs"
            start="19" end="26" />

</TabItem>

</Tabs>

---

## 인터페이스

모든 **퍼블릭 메서드**는 컨트랙트의 인터페이스로 네트워크에 공개됩니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

```ts
  @NearBindgen({})
  class Contract {

    @initialize({ ... })
    init({ ... }) { /* public `init` method */ }

    @view({})
    get_message({ ...  }) { /* public `view` method */ }
  
    @call({})
    add_message({ ... }) { /* public `call` method */ }

    private internal_search( ... ) { /* private internal method */ }

    @call({privateFunction: true})
    set_owner({ ... }) { /* public, panics when caller is not the contract's account */ }
  }
```

</TabItem>

<TabItem value="🦀 Rust">

```rust
  #[near_bindgen]
  impl Contract {
    #[init]
    pub fn init( ... ) -> Self { /* public `init` method */ }
    pub fn get_message(&self, ... ) { /* public `view` method */ }
    pub fn add_message(&mut self, ... ) { /* public `call` method */ }
    fn internal_search(&self, ... ) { /* private internal method */ }

    #[private]
    pub fn set_owner(&mut self, ... ) { /* public, panics when caller is not the contract's account */ }
  }
```

</TabItem>

</Tabs>

<hr className="subsection" />

### 퍼블릭 메서드

퍼블릭 메서드는 `init` 메서드, `view` 메서드, 그리고 `call` 메서드의 세 가지 유형으로 분류할 수 있습니다:

- **Init 메서드** : 컨트랙트 상태를 초기화하는 방법을 정의합니다.
- **View 메서드**: 상태를 **변경**하거나 다른 컨트랙트를 **호출**하지 않습니다. They can be called for free by everyone, **without needing** a NEAR account.
- **Call 메서드**: 상태를 변경하거나 다른 컨트랙트를 호출하는 것과 같은 [작업](./actions.md)을 수행할 수 있습니다.

:::caution
:::caution By default `view` methods have `200TGas` to execute, to increase this you can simply invoke them as `call` methods.
:::

:::danger
:::danger 기본적으로 `init` 메서드는 공개되어 있으므로, 이를 [`private`으로 만들거나](#private-methods), [배포 시 초기화를 일괄 호출](../deploy.md#initializing-the-contract)해야 합니다.
:::

<hr className="subsection" />

### 프라이빗 메서드

때로는 일부 메서드를 공개 상태로 유지하되, 컨트랙트 계정에서만 호출할 수 있기를 원할 것입니다. 예를 들자면 [교차 컨트랙트 콜백](./crosscontract.md#callback-method)이 그러한 경우입니다.

이를 위해 `private` 매크로/데코레이터를 사용할 수 있습니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

```ts
  @call({privateFunction: true})
  callback( ... ){
    // this method can only be called by the contract's account
  }
```

</TabItem>

<TabItem value="🦀 Rust">

```rust
  #[private]
  pub fn callback(&mut self, ... ){
    // this method can only be called by the contract's account
  }
```

</TabItem>

</Tabs>

<hr className="subsection" />

### 지불 가능 메서드

기본적으로 사용자가 메서드를 호출할 때, **돈을 첨부하면** 모든 메서드가 **패닉 상태**가 됩니다. 돈을 받는 방법을 활성화하려면, 지불 가능 데코레이터를 사용하십시오.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

```ts
  @call({payableFunction: true})
  deposit_and_stake( ... ){
    // this method can receive money from the user
  }
```

</TabItem>

<TabItem value="🦀 Rust">

```rust
  #[payable]
  pub fn deposit_and_stake(&mut self, ... ){
    // this method can receive money from the user
  }
```

</TabItem>

</Tabs>

<hr className="subsection" />

### 입력 및 반환 자료형

컨트랙트는 복잡한 구조를 포함하여 모든 `기본 자료형`을 수신하고 반환할 수 있습니다. 그러나 계약은 [JSON을 사용](./serialization.md)한 인터페이스를 통해 통신하기 때문에:

- 항상 입력 및 자료형으로 `SDK Collections`보다 \*\*`기본 자료형`\*\*을 선호합니다.
- `strings`을 `u64`/`u128`로 교체합니다(Rust SDK에서는 `U64`/`U128`).
