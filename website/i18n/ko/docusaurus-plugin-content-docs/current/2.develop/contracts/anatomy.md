---
id: anatomy
title: 컨트랙트 클래스
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
      url="https://github.com/near-examples/donation-js/blob/master/contract/src/contract.ts"
      start="6" end="9" />
  </Language>
  <Language value="🦀 Rust" language="rust">
    <Github fname="lib.rs"
      url="https://github.com/near-examples/donation-rust/blob/main/contract/src/lib.rs"
      start="7" end="12" />
  </Language>
</CodeTabs>

실제로 내부에선, `NEAR Bindgen` 데코레이터/매크로가 클래스를 훑은 다음 아래와 같은 용도로 사용될 코드를 생성합니다.

1. 코드를 유효한 NEAR 컨트랙트로 변환합니다.
2. 외부에서 호출될 수 있도록 퍼블릭 메서드를 공개합니다.
3. 내부 저장 및 외부와의 통신을 위해 개체를 직렬화합니다.

<hr class="subsection" />

### 상태
각 계정에는 고유한 상태(스토리지)가 있으며, **해당 계정만이 수정할 수 있지만** [누구나 볼 수 있습니다](../../4.tools/cli.md#near-view-state-near-view-state).

상태는 **핵심 클래스의 속성**을 통해 정의되고 수정됩니다.

컨트랙트는 잔고의 일부를 잠그는 방식으로 [**스토리지 비용을 지불**](./storage.md#storage-cost)합니다 . 현재 **100kb**를 저장하는 데 **~1 Ⓝ**의 비용이 듭니다.

:::info 키-값 스토리지

컨트랙트는 실제로 `키-값` 스토리지를 사용하여 값을 저장합니다. 그러나 이는 SDK에 의한 [직렬화](./serialization.md)를 통해 추상화되어 제공됩니다.

:::

:::tip SDK 컬렉션 선호

속성을 정의할 때는, **항상 기본 컬렉션보다 [SDK 컬렉션](./storage.md)을 선호**합니다. SDK 컬렉션이 [직렬화](./serialization.md)에 최적화되어 있기 때문입니다.

:::

---

## Initializing the State
계정 상태를 초기화하는 방법에는 두 가지가 있으며, 둘은 공존할 수 있습니다.
1. 상태에 필요한 속성을 받는 **초기화 메서드**
2. `init`이 호출되거나 메서드가 상태에 기록될 때까지 사용되는 **기본 상태**


<hr class="subsection" />

### 초기화 방법
초기화 메서드 정의하려면, 이를 간단히 [초기화 매크로](#decorators--macros)라고 표기하면 됩니다.

이 메서드는 이제 초기 상태의 값을 정의할 수 있으며, **상태가 이미 초기화된 상태**에서 호출하면 오류가 발생합니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  <Github fname="contract.ts" language="ts"
          url="https://github.com/near-examples/donation-js/blob/master/contract/src/contract.ts"
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
          url="https://github.com/near-examples/donation-rust/blob/main/contract/src/lib.rs"
          start="25" end="32" />

:::info
To make the initialization mandatory use `#[derive(PanicOnDefault)]` in the contract's structure
:::


  </TabItem>
</Tabs>

<hr class="subsection" />

### 기본 상태
컨트랙트는 초기화 메서드가 호출되지 않은 경우 사용할 **기본 상태**를 정의할 수 있습니다. 즉, `init` 이벤트가 발생하기 전에 메서드가 호출되면, 컨트랙트는 기본값을 사용합니다.

메서드가 상태에 기록되면, 상태가 초기화된 것으로 간주됩니다.

<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript">

  <Github fname="contract.ts" language="ts"
          url="https://github.com/near-examples/donation-js/blob/master/contract/src/contract.ts"
          start="6" end="9" />

  🌐 JavaScript에서 기본 상태는 클래스 정의 내 초기화 매개변수에 의해 정의됩니다.


:::caution
Javascript에서는 항상 **모든 클래스의 매개변수**에 값을 할당**해야 합니다**. 이렇게 하면 의도한 형식으로 올바르게 [역직렬화](./serialization.md)됩니다 .
:::


  </TabItem>
  <TabItem value="🦀 Rust">
    <Github fname="lib.rs" language="rust"
            url="https://github.com/near-examples/donation-rust/blob/main/contract/src/lib.rs"
            start="14" end="21" />
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
    get_message({ ... }) { /* public `view` method */ }
  
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

<hr class="subsection" />

### 퍼블릭 메서드
퍼블릭 메서드는 `init` 메서드, `view` 메서드, 그리고 `call` 메서드의 세 가지 유형으로 분류할 수 있습니다:

- **Init 메서드** : 컨트랙트 상태를 초기화하는 방법을 정의합니다.
- **View 메서드**: 상태를 **변경**하거나 다른 컨트랙트를 **호출**하지 않습니다. NEAR 계정이 **없어도** 누구나 무료로 호출할 수 있습니다.
- **Call 메서드**: 상태를 변경하거나 다른 컨트랙트를 호출하는 것과 같은 [작업](./actions.md)을 수행할 수 있습니다.

:::caution By default `view` methods have `200TGas` to execute, to increase this you can simply invoke them as `call` methods. :::

:::danger 기본적으로 `init` 메서드는 공개되어 있으므로, 이를 [`private`으로 만들거나](#private-methods), [배포 시 초기화를 일괄 호출](../deploy.md#initializing-the-contract)해야 합니다. :::

<hr class="subsection" />

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

<hr class="subsection" />

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

<hr class="subsection" />


### 입력 및 반환 자료형
컨트랙트는 복잡한 구조를 포함하여 모든 `기본 자료형`을 수신하고 반환할 수 있습니다. 그러나 계약은 [JSON을 사용](./serialization.md)한 인터페이스를 통해 통신하기 때문에:
- 항상 입력 및 자료형으로 `SDK Collections`보다 **`기본 자료형`**을 선호합니다.
- `strings`을 `u64`/`u128`로 교체합니다(Rust SDK에서는 `U64`/`U128`).
