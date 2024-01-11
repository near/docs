---
sidebar_position: 2
title: "컬렉션"
---

# 컬렉션

애플리케이션의 데이터에 사용할 자료구조를 결정할 때, 스토리지에 읽고 쓰는 데이터의 양을 최소화하는 것이 중요하지만 트랜잭션 비용을 최소화하기 위해 직렬화 및 역직렬화되는 데이터의 양도 최소화해야 합니다. 애플리케이션이 확장되고, 상태를 새 데이터 구조로 마이그레이션하면 비용이 발생하고, 병목 현상이 발생할 수 있으므로, 스마트 컨트랙트에서 데이터 구조의 장단점을 이해하는 것이 중요합니다.

`near-sdk-js` 내 컬렉션은 데이터를 청크로 분할하고 필요할 때까지 스토리지에 대한 읽기 및 쓰기를 연기하도록 설계되었습니다. 이러한 데이터 구조는 저수준 스토리지 상호 작용을 처리하고, [JavaScript 내 기본 자료 구조](https://doc.rust-lang.org/std/collections/index.html)와 유사한 API를 갖는 것을 목표로 합니다.

컬렉션를 사용할 때, 상태가 로드될 때마다 자료 구조의 모든 항목이 스토리지에서 지속적으로 읽고 역직렬화된다는 점을 염두에 두는 것이 중요합니다. 이것은 적지 않은 양의 데이터에 대해서도 큰 비용이 드는 작업이기 때문에, 사용되는 가스의 양을 최소화하기 위해 대부분의 경우 SDK 컬렉션을 사용해야 합니다.

최신 컬렉션과 관련된 문서는 [Github 레퍼지토리](https://github.com/near/near-sdk-js)에서 찾을 수 있습니다.

<!-- TODO include/update link for store module to replace collections mod when docs updated -->

SDK에 존재하는 다음 데이터 구조는 다음과 같습니다.

| SDK 컬렉션                   | 해당하는 기본 컬렉션               | 설명                                                                                                           |
| ------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `Vector`                  | `Array`                   | 확장 가능한 배열 유형입니다. 값은 메모리에서 샤딩되며, 동적으로 크기가 조정되고, 반복 및 인덱싱 가능한 값에 사용할 수 있습니다.                                   |
| <code>LookupMap</code> | <code>Map</code> | 이 구조는 컨트랙트에 사용할 수 있는 키-값 스토리지를 둘러싼 얇은 래퍼 역할을 합니다. 이 구조에는 맵의 요소에 대한 메타데이터가 포함되어 있지 않으므로 반복할 수 없습니다.           |
| <code>UnorderedMap</code> | <code>Map</code> | 데이터 구조의 요소를 반복할 수 있도록 추가 데이터를 저장한다는 점을 제외하면, `LookupMap`과 유사합니다.                                             |
| `LookupSet`               | `Set`                     | `LookupMap`과 유사하지만 값을 저장하지 않는 집합입니다. 이는 값의 고유한 존재 여부를 확인하는 데 사용할 수 있습니다. 이 구조는 반복할 수 없으며, 값 조회에만 사용할 수 있습니다. |
| `UnorderedSet`            | `Set`                     | 세트에 포함된 요소에 대한 추가 메타데이터를 저장하는 반복 가능한 자료형으로, `LookupSet`과 같습니다.                                               |

## 인메모리 `Map` vs 영구 `UnorderedMap`

- `Map`은 모든 데이터를 메모리에 보관합니다. 액세스하려면 컨트랙트에서 전체 맵을 역직렬화해야 합니다.
- `UnorderedMap`은 영구 스토리지에 데이터를 보관합니다. 요소에 액세스하려면 해당 요소를 역직렬화하기만 하면 됩니다.

`Map` 사용 사례

- **한 번의 함수 호출**로 컬렉션의 모든 요소를 ​​반복해야 합니다.
- 요소의 수는 작거나 고정되어 있습니다(예: 10개 미만).

`UnorderedMap` 사용 사례:

- 컬렉션의 제한된 하위 집합(예: 호출당 하나 또는 두 개의 요소)에 액세스해야 합니다.
- 컬렉션을 메모리에 맞출 수 없습니다.

그 이유는, `Map`이 하나의 스토리지 작업으로 전체 컬렉션을 역직렬화(및 직렬화)하기 때문입니다. 전체 컬렉션에 액세스하는 것이 `N`개의 스토리지 작업을 통해 모든 요소에 액세스하는 것보다 가스 비용이 저렴합니다.

`Map` 예시:

```javascript
import { NearBindgen, call, view, near } from "near-sdk-js";

@NearBindgen({})
export class StatusMessage {
  constructor() {
    this.records = new Map();
  }

  @call({})
  set_status({ message }) {
    let account_id = near.signerAccountId();
    near.log(`${account_id} set_status with message ${message}`);
    this.records.set(account_id, message);
  }

  @view({})
  get_status({ account_id }) {
    near.log(`get_status for account_id ${account_id}`);
    return this.records.get(account_id);
  }
}
```

`UnorderedMap` 예시:

```javascript 
import { NearBindgen, call, view, near, UnorderedMap } from "near-sdk-js";

@NearBindgen({})
export class StatusMessage {
  constructor() {
    this.records = new UnorderedMap("a");
  }

  @call({})
  set_status({ message }) {
    let account_id = near.signerAccountId();
    near.log(`${account_id} set_status with message ${message}`);
    this.records.set(account_id, message);
  }

  @view({})
  get_status({ account_id }) {
    near.log(`get_status for account_id ${account_id}`);
    return this.records.get(account_id);
  }

  @view({})
  get_all_statuses() {
    return this.records.toArray();
  }
}
```

## 오류가 발생하기 쉬운 패턴

값은 메모리에 보관되지 않고 스토리지에서 느리게 로드되기 때문에, 컬렉션이 교체되거나 제거되면 스토리지가 지워지는지 확인하는 것이 중요합니다. 또한 컬렉션이 수정되면 대부분의 컬렉션이 일부 메타데이터를 저장하기 때문에, 컬렉션 자체가 상태에서 업데이트되는 것이 중요합니다.

일부 패턴은 자료형 수준에서 제한할 수 없는 오류가 발생하기 쉽고, 해당 패턴은 다음과 같습니다.

```javascript
import { UnorderedMap, assert } from "near-sdk-js";

let m = new UnorderedMap("m");
m.insert(1, "test");
assert(m.length(), 1);
assert(m.get(1), "test");

// Bug 1: Should not replace any collections without clearing state, this will reset any
// metadata, such as the number of elements, leading to bugs. If you replace the collection
// with something with a different prefix, it will be functional, but you will lose any
// previous data and the old values will not be removed from storage.
let m = new UnorderedMap("m");
assert(m.length(), 0);
assert(m.get(1), "test");

// Bug 2: Should not use the same prefix as another collection
// or there will be unexpected side effects.
let m2 = new UnorderedMap("m");
assert(m2.length(), 0);
assert(m2.get(1), "test");
```

<!-- TODO: pagination with persistent collections in JS -->

## `LookupMap` vs `UnorderedMap`

### 기능

- `UnorderedMap`은 키와 값에 대한 반복을 지원하고, 페이지 매김도 지원합니다. 내부적으로는 다음과 같은 구조를 가집니다.
    - 접두사 값
    - 키 벡터
    - 키와 값의 `LookupMap`
- `LookupMap`은 컨트랙트 스토리지로부터 값을 읽는 데에 쓰이는 접두사만 가지고 있습니다. 키 벡터가 없으면 키를 반복할 수 없습니다.

### 성능

`LookupMap`은 `UnorderedMap`에 비해 성능이 더 좋고 데이터 저장량이 적습니다.

- `UnorderedMap`은 값을 가져오기 위해 `2`개의 스토리지 읽기가 필요하고, 새 항목을 삽입하기 위해서 `2`개의 스토리지 쓰기가 필요합니다.
- `LookupMap`은 값을 가져오기 위해 하나의 스토리지 읽기만 필요하고 값을 저장하기 위해 하나의 스토리지 쓰기만 필요합니다.

### 스토리지 공간

`UnorderedMap`은 `LookupMap`에 비해 항목에 더 많은 저장 공간이 필요합니다.

- 기본 컬렉션
- `LookupMap`은 키와 값을 한 번만 저장합니다.

<!-- TODO: UnorderedSet and LookUpSet -->
