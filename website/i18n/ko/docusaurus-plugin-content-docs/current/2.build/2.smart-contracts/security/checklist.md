---
id: checklist
title: ✅ 체크리스트
---

Once you finished developing your smart contract please go through the following list in order to ensure everything is safe for the end user.

:::info
Check our [security articles](./welcome.md) to understand how to improve the security of your contract.
:::

---

## Anatomy

1. All private methods are decorated as `private`.

## 환경

2. `predecessor`와 `signer`는 전체 컨트랙트 내에서 올바르게 사용되었습니다.

## 스토리지

3. 상태가 추가될 때마다 이를 감당할 수 있는 충분한 잔고가 존재합니다.
4. All collections (i.e. 모든 컬렉션 (예: 벡터, 맵, 트리 등)에는 고유한 ID가 있습니다. Vector, Map, Tree, etc) have an unique id
5. 언더플로우 및 오버플로우를 체크하세요! Rust에서는 `Cargo.toml`에 `overflow-checks = true` 플래그를 추가하기만 하면 됩니다.

## Action

6. 돈을 보낼 때, 컨트랙트에 스토리지 비용을 충당할 만큼 자금을 충분히 남겨 두었습다.
7. 사용자의 자금을 추적하는 경우, 사용자에게 이를 다시 보내기 전에 **빼 두었습니다**.

## 콜백

8. 모든 비공개 콜백은 `private`으로 표시됩니다.
9. All cross-contract calls have a callback
10. All callbacks check for errors and roll back the state if necessary
11. All callbacks return money to the `predecessor` if necessary
12. Callbacks are free of `panic!`
13. 모든 콜백에는 완전히 실행하기에 충분한 가스가 제공됩니다.
14. The contract is not left in an exploitable state between a cross-contract call and its callback
