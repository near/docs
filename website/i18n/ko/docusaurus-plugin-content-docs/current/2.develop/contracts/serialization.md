---
id: serialization
title: 직렬화에 대한 참고 사항
---

스마트 컨트랙트는 **복잡한 데이터를 간단한 방법으로 전달**하는 동시에, 이러한 데이터를 효율적으로 **읽고 상태에 저장**할 수 있어야 합니다.

즉, 간단한 통신과 효율적인 저장이라는 목적을 달성하기 위해 스마트 컨트랙트는 데이터를 더 간단한 방식으로 변형합니다.

**복잡한 객체를 더 단순한 단일 값**으로 변환하는 이 프로세스를 **직렬화**라고 합니다. NEAR는 [JSON](https://www.json.org/json-en.html)과 [Borsh](https://borsh.io/)의 두 가지 직렬화 형식을 사용합니다.
1. [JSON](https://www.json.org/json-en.html)은 메서드 호출 중 컨트랙트의 입력/출력을 직렬화하는 데 사용됩니다.
2. [Borsh](https://borsh.io/)는 컨트랙트의 상태를 직렬화하는 데 사용됩니다.

---

## 직렬화 형식 개요

두 직렬화 형식에 대한 간략한 개요와 장단점, 그리고 직렬화가 어떻게 보이는지에 대한 예시는 다음과 같습니다.

<hr class="subsection" />

### [JSON](https://www.json.org/json-en.html): 객체를 문자열로

#### 특징
 - 자체 설명 형식
 - JavaScript와의 손쉬운 상호 운용성
 - 즉시 사용 가능한 여러 구현체들
 - 그러나... 계산 시간과 결과 크기 모두에서 효율적이지 않음

#### 예시
```js
Example{
  number: i32 = 2;
  arr: Vector<i32> = [0, 1];
}

// serializes to
"{\"number\": 2, \"arr\": [0, 1]}"
```

<hr class="subsection" />

### [Borsh](https://borsh.io/): 객체를 바이트로

#### 특징
  - 효율적으로 (역)직렬화될 수 있도록 구축된 컴팩트한 바이너리 형식
  - 엄격하고 표준적인 바이너리 표현
  - 오버헤드 감소: 속성 이름을 저장할 필요 없음
  - 하지만... 데이터를 (역)직렬화하려면 방법을 알아야 함

#### 예시
```js
Example{
  number: i32 = 2;
  arr: Vector<i32> = [0, 1];
}

// serializes into
[2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
```
---

## 입력 및 출력 직렬화
NEAR 컨트랙트는 복잡한 객체를 가져오고 반환하는 메서드를 구현할 수 있습니다. 이 데이터를 간단한 방식으로 처리하기 위해, JSON 직렬화가 사용됩니다.

대부분의 언어가 JSON (역)직렬 변환기를 쉽게 구현하므로, JSON을 사용하면 모든 사람이 컨트랙트와 더 쉽게 상호 작용할 수 있습니다.

#### 예시
아래 예시를 살펴보겠습니다. 이는 교육 목적으로만 작성되었습니다.

```rust
#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct A {
  pub a_number: i32,
  pub b_number: u128
}

#[derive(Serialize)]
#[serde(crate = "near_sdk::serde")]
pub struct B {
  pub success: bool,
  pub other_number: i32
}

pub fn method(&self, struct_a: A): B {
  return B{true, 0}
}
```


#### 데이터 수신
사용자가 `method`를 호출하면, 컨트랙트는 JSON 문자열(예: `"{\"a_number\":0, \"b_number\":\"100\"}"`)로 인코딩된 인자를 수신하고, 이를 올바른 객체(`A{0, 100}`)로 (역)직렬화합니다.


#### 데이터 반환
결과를 반환할 때, 컨트랙트는 자동으로 객체 `B{true, 0}`를 JSON 직렬화 값 `"{\"success\":true, \"other_number\":0}"`으로 인코딩하고 해당 문자열을 반환합니다.

:::caution JSON 제한 사항
JSON은 `52 bytes` 숫자로 제한되므로 `u64`/`u128`를 입력 또는 출력으로 사용할 수 없습니다. JSON은 단순히 이를 직렬화할 수 없기 때문에,  `Strings`를 사용해야 합니다 .

`NEAR SDK RS` 는 현재 입/출력 데이터로 사용할 수 있는 `near_sdk::json_types::{U64, I64, U128, I128}`를 구현하고 있습니다.
:::


---

## Borsh: 상태 직렬화

내부적으로 스마트 컨트랙트는 간단한 **키/값 쌍**을 사용하여 데이터를 저장합니다. 이는 컨트랙트가 복잡한 상태를 간단한 키-값 쌍으로 변환해야 함을 의미합니다.

이를 위해, NEAR 컨트랙트는 복잡한 객체를 더 작은 바이트 스트림으로 (역)직렬화하는 데 최적화된 [borsh](https://borsh.io)를 사용합니다.

:::tip SDK-JS는 JSON을 사용합니다.
JavaScript SDK는 JSON을 사용하여 상태의 개체를 직렬화합니다. borsh 구현은 곧 구현될 예정입니다.

#### 예시
아래 예시를 살펴보겠습니다. 이는 교육 목적으로만 작성되었습니다.

```rust
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
  string: String,
  vector: Vector<u8>
}

#[near_bindgen]
impl Contract {
  #[init]
  pub fn init(string: String, first_u8: u8) -> Self {
    let mut vector: Vector<u8> = Vector::new("prefix".as_bytes());
    vector.push(&first_u8);

    Self { string, vector }
  }

  pub fn change_state(&mut self, string: String, number: u8) {
    self.string = string;
    self.vector.push(&number);
  }
}
```

#### 배포 시 빈 상태
컨트랙트를 새 계정에 배포하고 즉시 상태를 요청하면 비어 있음을 확인할 수 있습니다.

```bash
near view-state $CONTRACT --finality optimistic

# Result is: []
```

#### 상태 초기화
상태를 초기화해보면, Borsh가 상태를 직렬화하는 데 어떻게 사용되는지 확인할 수 있습니다.

```bash
# initialize with the string "hi" and 0
near call $CONTRACT init '{"string":"hi", "first_u8":0}' --accountId $CONTRACT

# check the state
near view-state $CONTRACT --utf8 --finality optimistic

# Result is:
# [
#   {
#     key: 'STATE',
#     value: '\x02\x00\x00\x00hi\x01\x00\x00\x00\x00\x00\x00\x00\x06\x00\x00\x00prefix'
#   },
#   { key: 'prefix\x00\x00\x00\x00\x00\x00\x00\x00', value: '\x00' }
# ]
```

첫 번째 키-값은 다음과 같습니다.

```js
key: 'STATE'
value: '\x02\x00\x00\x00hi\x01\x00\x00\x00\x00\x00\x00\x00\x06\x00\x00\x00prefix'
```

`Contract`에는 `string, Vector` 구조가 존재하므로, 값은 다음과 같이 해석됩니다.

```bash
2, 0, 0, 0, "h", "i"] -> The `string` has 2 elements: "h" and "i".
[1, 0, 0, 0, 0, 0, 0, 0, 6, 0, 0, 0, "prefix"] -> The Vector has 1 element, and to see the values search for keys that start with (the 6 bytes prefix): "prefix"
```

그런 다음 두 번째 키-값은 `"prefix"` 문자열로 표시된 `Vector` 항목을 보여줍니다.

```js
key: 'prefix\x00\x00\x00\x00\x00\x00\x00\x00'
value: '\x00'
```

#### 상태 수정
저장된 문자열을 수정하고 새 숫자를 추가하면 그에 따라 상태가 변경됩니다.

```bash
near call $CONTRACT change_state '{"string":"bye", "number":1}' --accountId $CONTRACT

# Result is
# [
#   {
#     key: 'STATE',
#     value: '\x03\x00\x00\x00bye\x02\x00\x00\x00\x00\x00\x00\x00\x06\x00\x00\x00prefix'
#   },
#   { key: 'prefix\x00\x00\x00\x00\x00\x00\x00\x00', value: '\x00' },
#   { key: 'prefix\x01\x00\x00\x00\x00\x00\x00\x00', value: '\x01' }
# ]
```

새 문자열(`bye`)의 저장을 반영하도록 `STATE` 키가 변경되고, 벡터에 이제 2개의 요소가 있음을 알 수 있습니다.

동시에 새로운 벡터 항목(`1u8`)을 추가하는 새로운 키-값이 추가되었습니다.

<hr class="subsection" />

<!-- We should see where to move/replicate this -->

### 역직렬화 오류
누군가 스마트 컨트랙트 메서드를 호출하면, 컨트랙트의 첫 번째 단계는 자체 상태를 역직렬화하는 것입니다.

위에 사용된 예에서 컨트랙트는 `STATE` 키를 읽는 것으로 시작하고, 해당 값을 `Contract{string: String, vector: Vector<u8>}` 객체로 역직렬화하려고 시도합니다.

그런데 구조가 다른 계정에 컨트랙트를 배포하게 되면, 컨트랙트는 `STATE` 키 역직렬화에 실패하고, `Cannot deserialize the contract state` 오류가 발생하게 될 것입니다.

이 문제를 해결하려면 다음 중 하나를 수행하세요.
1. 이전 컨트랙트 코드로 롤백
2. [컨트랙트 상태를 마이그레이션](../upgrade.md)하는 메서드 구현
