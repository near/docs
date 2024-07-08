---
sidebar_position: 1
sidebar_label: "개요"
title: "증급 개요(교차 컨트랙트 호출 등)"
---

import accessKeys from '/docs/assets/crosswords/keys-cartoon-good--alcantara_gabriel.near--Bagriel_5_10.png';

# 중급 개념

이 챕터는 이전 챕터보다 조금 더 빠르게 진행됩니다.

우리는 스마트 컨트랙트 개발의 중요한 부분인 교차 컨트랙트 호출(cross-contract call)을 다룰 것입니다.

## 교차 컨트랙트 호출

교차 컨트랙트 호출은 스마트 컨트랙트가 다른 스마트 컨트랙트를 호출하는 경우입니다. `alice.near`가 컨트랙트 A를 호출하고 컨트랙트 A가 컨트랙트 B를 호출하는 경우를 예로 들 수 있습니다..

NEAR에는 비동기 트랜잭션이 있으며 일부 교차 컨트랙트 호출에는 호출 결과를 결정하기 위한 콜백이 있습니다. 이것은 다른 블록체인과 약간 다르게 작동합니다. 이 챕터에서 더 자세히 설명하겠습니다.

## 액세스 키

마지막 장에서는 액세스 키에 대해 다루었으며, 십자말풀이 퍼즐 dApp에 연결된 계정에 함수 호출 액세스 키를 추가하여 사용자가 "로그인"하는 로그인 시스템을 구현했습니다.

로그인은 액세스 키의 일반적인 사용 사례이지만, 더 크게 생각해 봅시다!

키체인 그림에서 두 개의(더 작은 회색) 함수 호출 액세스 키를 기억하십니까?

<figure>
    <img src={accessKeys} width="600" alt="A keychain with three keys. A large, gold key represents the full-access keys on NEAR. The two other keys are gray and smaller, and have detachable latches on them. They represent function-call access key. Art created by alcantara_gabriel.near" />
    <figcaption>Art by <a href="https://twitter.com/Bagriel_5_10" target="_blank" rel="noopener noreferrer">alcantara_gabriel.near</a></figcaption>
</figure><br/>

걸쇠가 있어 탈착이 가능하다는 점을 기억하세요.

다른 사람에게 전체 액세스 키를 제공할 가능성은 거의 없지만 함수 호출 액세스 키를 다른 사람에게 제공하거나 공개할 수 있습니다. 왜 그런 작업을 할까요? 이는 우리가 곧 할 것처럼, 원활한 온보딩 경험을 가능하게 하는 데 도움이 될 수 있습니다.

## 완료된 프로젝트

이 챕터의 최종 코드는 다음과 같습니다.

https://github.com/near-examples/crossword-tutorial-chapter-3
