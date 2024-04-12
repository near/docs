---
id: token-loss
title: 토큰 손실 피하기
sidebar_label: 토큰 손실 피하기
---

:::warning
주의하세요! 토큰을 잃는다는 것은 돈을 잃는다는 것을 의미합니다!
:::

여러 시나리오에서 토큰 손실이 가능합니다. 이러한 시나리오는 몇 가지 관련 클래스로 그룹화할 수 있습니다.

1. Improper key management
2. Refunding deleted accounts
3. Failed function calls in batches

---

## Improper key management

부적절한 키 관리는 토큰 손실로 이어질 수 있습니다. 키를 분실하거나 삭제한 계정을 복구할 수 있는 백업 키를 발급하여 이러한 시나리오로 인한 손실을 최소화할 수 있습니다.

### Loss of `FullAccess` key

사용자는 `FullAccess` 키 외에 다른 키가 없는 계정에서 해당 키 쌍의 개인 키를 잃을 수 있습니다.
그러면 아무도 자금을 회수할 수 없습니다. 자금은 계정에 영원히 잠기게 됩니다.

### Loss of `FunctionCall` access key

계정 내 하나뿐인 `FunctionCall` 액세스 키가 삭제될 수 있습니다.
그러면 아무도 자금을 회수할 수 없습니다. 자금은 계정에 영원히 잠기게 됩니다.

---

## Refunding deleted accounts

계정에 대한 환불 Receipt가 발행될 때 해당 계정이 더 이상 존재하지 않는 경우, 자금은 현재 에포크의 지분에 비례하여 밸리데이터들에게 분배됩니다.

### Deleting account with non-existent beneficiary

계정을 삭제할 때, 수령인을 지정해야 합니다.
삭제되면 송금 Receipt가 생성되어 수령인 계정으로 전송됩니다.
수령인 계정이 존재하지 않는 경우, 환불 Receipt 생성되어 원래 계정으로 다시 전송됩니다.
그런데 이때는 원래 계정이 이미 삭제된 상태일 것이므로, 자금은 밸리데이터 간에 분배됩니다.

### Account with zero balance is garbage-collected, just before it receives refund

`A` 계정이 모든 자금을 다른 계정 `B`로 이체하였는데 `B` 계정이 존재하지 않는 경우, `A` 계정에 대한 환불 Receipt가 생성됩니다. 이 기간 동안 `A` 계정은 네트워크의 가비지 컬렉션 활동에 의해 삭제되기 쉽습니다.
환불 Receipt가 도착하기 전에 `A` 계정이 삭제되면 자금은 밸리데이터에게 분배됩니다.

---

## Failed function calls in batches

:::warning
스마트 컨트랙트를 설계할 때, NEAR 프로토콜의 비동기적인 특성을 항상 고려해야 합니다.
:::

컨트랙트 함수 `f1`이 두 개(또는 그 이상)의 다른 함수 `f2`와 `f3`를 호출하고, 이러한 함수 중 하나 이상이 실패하면, 실패한 함수에서는 토큰이 환불되지만, 성공한 함수에 대해서는 토큰이 적절하게 전송됩니다.

배치 내 단일한 실패가 전체 배치 실패를 의미하는 경우, 사용 사례에 따라 성공적인 호출에서의 토큰이 손실된 것으로 생각할 수 있습니다.
