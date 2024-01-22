---
id: contract-size
title: "컨트랙트 크기 축소"
---

import {Github} from "@site/src/components/codetabs"

# 컨트랙트 크기 축소

## 조언 및 예시

이 페이지는 코드 가독성을 희생하면서 컨트랙트 크기를 크게 줄이려는 하위 수준 개념에 익숙한 개발자를 위해 만들어졌습니다.

이 접근 방식이 도움이 될 수 있는 몇 가지 일반적인 시나리오는 다음과 같습니다.

- 계정 관리와 연결되어 있는 컨트랙트
- 팩토리를 사용하여 배포된 컨트랙트
- NEAR의 EVM과 같은 향후 발전 사항

컴파일 시 컨트랙트 크기에 원치 않는 바이트를 추가할 수 있는 몇 가지 항목이 있습니다. 이들 중 일부는 다른 접근 방식으로 더 쉽게 교체될 수 있는 반면, 다른 일부는 시스템 호출에 대한 더 많은 내부 지식이 필요합니다.

## 작은 승리

### 플래그 사용

컨트랙트를 컴파일할 때, `-C link-arg=-s` 플래그를 Rust 컴파일러에 전달해야 합니다.

```bash
RUSTFLAGS='-C link-arg=-s' cargo build --target wasm32-unknown-unknown --release
```

다음은 대부분의 예제 내 `Cargo.toml`에 사용하는 매개변수입니다.

```toml
[profile.release]
codegen-units = 1
opt-level = "s"
lto = true
debug = false
panic = "abort"
overflow-checks = true
```

더 작은 바이너리를 생성하는지 확인하기 위해, `opt-level = "z"` 대신 `opt-level = "s"`를 사용하여 실험해 볼 수 있습니다. 이에 대한 자세한 내용은 [Cargo Book Profiles](https://doc.rust-lang.org/cargo/reference/profiles.html#opt-level) 섹션을 참조하세요. 이 [.wasm 크기 축소](https://rustwasm.github.io/book/reference/code-size.html#tell-llvm-to-optimize-for-size-instead-of-speed) 자료를 참조할 수도 있습니다.

### 매니페스트에서 `rlib` 제거

필요한 경우가 아니면 매니페스트(`Cargo.toml`)에 `rlib`가 포함되지 않도록 합니다. 일부 NEAR 예제에서는 이를 포함합니다.

:::caution 불필요한 블롯 추가

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```
:::

  다음과 같은 경우:

:::tip

```toml
[lib]
crate-type = ["cdylib"]
```
:::

3. Rust SDK를 사용할 때, 기본 JSON 직렬화를 재정의하여 대신 [Borsh](https://borsh.io)를 사용하도록 할 수 있습니다. 자세한 내용과 예제는 [이 페이지](contract-interface/serialization-interface.md#overriding-serialization-protocol-default)를 참조하세요.
4. assertion 또는 가드를 사용하는 경우, [`assert!`](https://doc.rust-lang.org/std/macro.assert.html), [`assert_eq!`](https://doc.rust-lang.org/std/macro.assert_eq.html), 또는 [`assert_ne!`](https://doc.rust-lang.org/std/macro.assert_ne.html) 같은 표준 `assert` 매크로를 사용하지 마세요. `unwrap`, `expect`, 그리고 Rust의 `panic!()` 매크로에도 유사한 문제가 있습니다.

  표준 assertion 예시:

  :::caution 불필요한 블롯 추가

  ```rust
  assert_eq!(contract_owner, predecessor_account, "ERR_NOT_OWNER");
  ```
  :::

  다음과 같은 경우:

  :::tip

  ```rust
  if contract_owner != predecessor_account {
    env::panic(b"ERR_NOT_OWNER");
  }
  ```
  :::

  `expect` 제거 예시:

  :::caution 불필요한 블롯 추가

  ```rust
  let owner_id = self.owner_by_id.get(&token_id).expect("Token not found");
  ```
  :::

  다음과 같은 경우:

  :::tip

  ```rust
  fn expect_token_found<T>(option: Option<T>) -> T {
    option.unwrap_or_else(|| env::panic_str("Token not found"))
  }
  let owner_id = expect_token_found(self.owner_by_id.get(&token_id));  
  ```
  :::

  표준 `panic!()` 변경 예시:

  :::caution 불필요한 블롯 추가

  ```rust
  panic!("ERR_MSG_HERE"); 
  ```
  :::

  다음과 같은 경우:

  :::tip

  ```rust
  env::panic_str("ERR_MSG_HERE");  
  ```
  :::

## 저수준 접근 방식

최소 컨트랙트에 대한 `no_std` 접근 방식은 다음 예를 참조하세요.

- [작은 컨트랙트](https://github.com/near/nearcore/tree/1e7c6613f65c23f87adf2c92e3d877f4ffe666ea/runtime/near-test-contracts/tiny-contract-rs)
- [NEAR ETH 게이트웨이](https://github.com/ilblackdragon/near-eth-gateway/blob/master/proxy/src/lib.rs)
- [관련 Youtube 비디오](https://youtu.be/Hy4VBSCqnsE) : 여기서는 Eugene이 `no_std` 모드에서의 대체 가능한 토큰에 대해 설명합니다. 이에 대한 코드 예시는 [여기](https://github.com/near/core-contracts/pull/88)에 있습니다.
- `nesdie` 프로젝트 사용 예시
- Aurora는 [rjson](https://crates.io/crates/rjson)을 가벼운 JSON 직렬화 크레이트로 사용하여 성공을 거두었습니다. 이는 현재 Rust SDK와 함께 패키징된 [serde](https://crates.io/crates/serde)보다 작은 공간을 차지합니다. Aurora 레퍼지토리에서 [rjson의 예시](https://github.com/aurora-is-near/aurora-engine/blob/65a1d11fcd16192cc1bda886c62005c603189a24/src/json.rs#L254)를 참조하세요. 구현 세부 정보는 독자가 수집해야 하며, 여기에서 설명하지는 않겠습니다. [이 nesdie 예제](https://github.com/austinabell/nesdie/blob/bb6beb77e32cd54077ac54bf028f262a9dfb6ad0/examples/multisig/src/utils/json/vector.rs#L26-L30)는 또한 [miniserde 크레이트](https://crates.io/crates/miniserde)를 사용하고, 이는 Rust SDK를 사용하지 않기로 선택한 사람들이 고려해야 할 또 다른 옵션입니다.

:::note 시스템 호출에 대한 정보

<details>
  <summary>펼쳐서 <code>sys.rs</code>에서 사용 가능한 항목 보기</summary>

<Github language="rust" start="" end="" url="https://github.com/near/near-sdk-rs/blob/master/near-sdk/src/environment/sys.rs" />

</details>

:::
