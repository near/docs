---
sidebar_position: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs";

# 직렬화 프로토콜

SDK 내의 직렬화 형식은 자료 구조가 스마트 컨트랙트의 메서드로 데이터를 전달하거나 상태에 데이터를 저장하는 데 필요한 바이트로 변환하는 방식에 대해 정의합니다. 메서드 매개변수의 경우, SDK에서 [JSON](https://www.json.org/json-en.html)(기본값)과 Borsh를 지원하며, 데이터를 온체인에 저장하기 위해서는 Borsh를 사용합니다.

JSON과 Borsh의 특징은 다음과 같습니다.

JSON:
- 사람이 읽을 수 있음
- 자체 설명 형식(기본 자료형을 알 필요 없음)
- JavaScript와의 손쉬운 상호 운용성
- 덜 효율적인 크기 및 (비)직렬화

Borsh:
- 직렬화된 데이터 크기에 효율적인 컴팩트 바이너리 형식
- 데이터 형식을 알아야 하거나 데이터 역직렬화를 위한 스키마가 있어야 함
- 엄격하고 표준적인 바이너리 표현
- 대부분의 경우 빠르고 적은 오버헤드

일반적으로 JSON은 더 나은 DevX를 위한 컨트랙트 호출 및 교차 컨트랙트 호출에 사용되며, 여기서 Borsh는 더 적은 매개변수 직렬화 및 더 적은 역직렬화 계산을 컨트랙트 내에서 사용하여, 더 적은 가스를 소모하는 방향으로 최적화하는 데 사용할 수 있습니다.

### 기본 직렬화 프로토콜 재정의(override)

결과 및 매개변수 직렬화를 개별적으로 선택할 수 있지만, 모든 매개변수는 동일한 형식이어야 합니다(일부 매개변수를 borsh로 직렬화하고, 다른 매개변수를 JSON으로 직렬화할 수 없음). 결과와 매개변수를 모두 borsh로 전환하는 예는 다음과 같습니다.

```rust
#[result_serializer(borsh)]
pub fn sum_borsh(#[serializer(borsh)] a: u32, #[serializer(borsh)] b: u32) -> u32 {
    a + b
}
```

여기서 `result_serializer(borsh)` 주석은 JSON에서 borsh로의 기본 결과 직렬화 프로토콜을 재정의하고, `serializer(borsh)` 주석은 매개변수 직렬화를 재정의합니다.

#### 예시

단위 테스트에서 [Borsh로 직렬화](https://borsh.io)되어 있고 base64로 인코딩된 값을 가져오는 간단한 데모는 다음과 같습니다.

<Github language="rust" start="93" end="104" url="https://github.com/mikedotexe/rust-status-message/blob/b83c5126fdbe0f19bc904e547fda0bb12c2ea133/src/lib.rs" />

다음 스니펫은 프론트엔드 또는 CLI에서 이 값을 가져오는 간단한 함수를 보여줍니다. 참고: 이 메서드에는 반환 값이 없으므로 `#[result_serializer(borsh)]`가 필요하지 않습니다.

<Github language="rust" start="40" end="42" url="https://github.com/mikedotexe/rust-status-message/blob/b83c5126fdbe0f19bc904e547fda0bb12c2ea133/src/lib.rs" />

이는 다음과 같은 간단한 구조체를 사용하고 있습니다.

<Github language="rust" start="13" end="17" url="https://github.com/mikedotexe/rust-status-message/blob/b83c5126fdbe0f19bc904e547fda0bb12c2ea133/src/lib.rs" />

NEAR CLI로 이를 호출하려면 다음과 유사한 명령을 사용하세요.

<Tabs className="language-tabs" groupId="code-tabs">
<TabItem value="near-cli">

```bash
near call rust-status-message.demo.testnet set_status_borsh --base64 'DAAAAEFsb2hhIGhvbnVhIQ==' --accountId demo.testnet
```
</TabItem>
<TabItem value="near-cli-rs">

```bash
near contract call-function as-transaction rust-status-message.demo.testnet set_status_borsh base64-args 'DAAAAEFsb2hhIGhvbnVhIQ==' prepaid-gas '30 TeraGas' attached-deposit '0 NEAR' sign-as demo.testnet network-config testnet sign-with-keychain send
```
</TabItem>
</Tabs>

자세한 내용은 [Marcelo](https://gist.github.com/mfornet)의 [GitHub gist](https://gist.github.com/mfornet/d8a94af333a68d67affd8cb78464c7c0)에서 확인하세요.

### JSON 래퍼 자료형

예상치 못하거나 비효율적인 기본 형식이 있는 특정 유형을 JSON으로 직렬화하는 데 도움이 되도록, [`near_sdk::json_types`](https://docs.rs/near-sdk/3.1.0/near_sdk/json_types/index.html)에서 사용할 수 있는 몇 가지 래퍼 자료형이 있습니다.

JavaScript는 `2^53 - 1`까지의 정수만 지원하기 때문에, JSON 정수 역직렬화가 이 범위를 초과하면 정밀도를 잃게 됩니다. 이에 대응하기 위해, 이러한 매개변수 또는 결과에 대한 기본 자료형 대신 `I64`, `U64`, `I128`, 및 `U128`를 사용하여 값을 문자열로 직렬화할 수 있습니다. 기본적으로 모든 정수 자료형은 JSON에서 정수로 직렬화됩니다.

예를 들어, `std::convert::Into`를 사용하여 `U64`에서 `u64`로 변환할 수 있습니다.

```rust
#[near_bindgen]
impl Contract {
    pub fn mult(&self, a: U64, b: U64) -> U128 {
        let a: u64 = a.into();
        let b: u64 = b.into();
        let product = u128::from(a) * u128::from(b);
        product.into()
    }
}
```

내부 값에 액세스하고 `.0`을 사용할 수도 있습니다.

```diff
 #[near_bindgen]
 impl Contract {
     pub fn mult(&self, a: U64, b: U64) -> U128 {
-        let a: u64 = a.into();
+        let a = a.0;
-        let b: u64 = b.into();
+        let b = b.0;
         let product = u128::from(a) * u128::from(b);
         product.into()
     }
 }
```

그리고 `U64(...)`와 `U128(...)`를 사용하여, 소문자 `u` 변형을 대문자 `U` 변형으로 캐스트할 수 있습니다.

```diff
 #[near_bindgen]
 impl Contract {
     pub fn mult(&self, a: U64, b: U64) -> U128 {
         let a = a.0;
         let b = b.0;
         let product = u128::from(a) * u128::from(b);
-        product.into()
+        U128(product)
     }
 }
```

모두 결합하면 다음과 같습니다.

```rust
#[near_bindgen]
impl Contract {
    pub fn mult(&self, a: U64, b: U64) -> U128 {
        U128(u128::from(a.0) * u128::from(b.0))
    }
}
```

SDK에 이러한 JSON 래퍼 유형이 포함되어 있지만, [`serde`](https://serde.rs/)를 직렬화 및 역직렬화를 각각 구현하는 한 모든 사용자 정의 자료형을 사용할 수 있습니다. 이러한 유형은 모두 JSON 형식을 재정의하고, 내부 자료형으로 일관된 `borsh` 직렬화 및 역직렬화를 가집니다.

### Base64VecU8

기본 직렬화를 재정의할 수 있는 자료형의 또 다른 예는 Rust에서 바이트를 나타내는 `Vec<u8>`입니다. 기본적으로 이는 압축되지 않고 사용하기 매우 어려운 정수 배열로 직렬화됩니다. 보다 간결한 JSON 직렬화를 위해, [Base-64](https://en.wikipedia.org/wiki/Base64) 문자열로 직렬화 및 역직렬화하는 래퍼 자료형 [`Base64VecU8`](https://docs.rs/near-sdk/3.1.0/near_sdk/json_types/struct.Base64VecU8.html)이 있습니다.

예시는 다음과 같습니다:

```rust
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    // Notice, internally we store `Vec<u8>` 
    pub data: Vec<u8>,
}
#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(data: Base64VecU8) -> Self {
        Self {
            data: data.into(),
        }
    }
    pub fn get_data(self) -> Base64VecU8 {
        self.data.into()
    }
}
```
