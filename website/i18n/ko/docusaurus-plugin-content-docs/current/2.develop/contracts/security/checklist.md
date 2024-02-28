---
id: checklist
title: '✅ 체크리스트'
---

Once you finished developing your smart contract please go through the following list in order to ensure everything is safe for the end user.

:::info Check our [security articles](/develop/contracts/security/welcome) to understand how to improve the security of your contract. :::

---

## 구조
1. All private methods are decorated as `private`.

## 환경
2. `predecessor`와 `signer`는 전체 컨트랙트 내에서 올바르게 사용되었습니다.

## 스토리지
3. 상태가 추가될 때마다 이를 감당할 수 있는 충분한 잔고가 존재합니다.
4. 모든 컬렉션 (예: 벡터, 맵, 트리 등)에는 고유한 ID가 있습니다.
5. 언더플로우 및 오버플로우를 체크하세요! Rust에서는 `Cargo.toml`에 `overflow-checks = true` 플래그를 추가하기만 하면 됩니다.

## Action
6. 돈을 보낼 때, 컨트랙트에 스토리지 비용을 충당할 만큼 자금을 충분히 남겨 두었습다.
7. 사용자의 자금을 추적하는 경우, 사용자에게 이를 다시 보내기 전에 **빼 두었습니다**.

## 콜백
8. 모든 비공개 콜백은 `private`으로 표시됩니다.
9. 모든 교차 컨트랙트 호출에는 오류를 확인하고 필요한 경우 상태를 롤백하는 콜백이 존재합니다.
10. 모든 교차 컨트랙트 호출에는 오류를 확인하고 필요한 경우 `predecessor`에게 돈을 반환하는 콜백이 있습니다.
11. 모든 콜백에는 완전히 실행하기에 충분한 가스가 제공됩니다.
12. 교차 컨트랙트 호출과 콜백 사이에 컨트랙트가 악용 가능한 상태로 남아 있지 않습니다.