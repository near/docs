---
sidebar_position: 1
sidebar_label: 소개
pagination_label: "Promise: 소개"
title: "소개"
---

# Promise

트랜잭션은 [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)를 통해 컨트랙트에서 비동기적으로 전송될 수 있습니다. 많은 프로그래밍 언어의 Promise와 마찬가지로, 이들은 미래에 코드가 실행되도록 합니다. NEAR의 경우 이 "미래" 는 원래 함수 호출과 동일한 블록이 아니라 _다음 블록(또는 그 부근)에서_ 실행될 트랜잭션을 의미합니다.

함수가 호출될 때 동일한 블록에서 이러한 작업을 동기적으로 수행하지 않는 이유는 무엇일까요? NEAR 에서 토큰을 보내거나 계정을 생성하며, 컨트랙트를 배포하는 데 `Promise`가 필요한 이유는 무엇입니까?

발신자와 수신자 계정이 서로 다른 샤드에 있을 수 있습니다. 이 경우 교차 샤드 통신은 Receipt를 전달하는 방식으로 블록 간에 발생하므로, 별도의 블록에서 진행되어야 합니다(NEAR의 Receipt를 "내부 트랜잭션"으로 생각할 수 있음). You can see these receipts being passed from block to block [in NEAR Explorer](https://nearblocks.io/txns/36n3tBNiF497Tm9mijEpsCUvejL8mBYF1CEWthCnY8FV).
:::