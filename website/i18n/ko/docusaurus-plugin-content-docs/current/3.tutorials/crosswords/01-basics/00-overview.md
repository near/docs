---
id: overview
sidebar_position: 1
sidebar_label: "십자말풀이 게임 개요"
title: "기본 개요 : 첫 섹션에서 달성해야 할 사항"
---

import basicCrossword from '/docs/assets/crosswords/basics-crossword.jpg';
import rustScary from '/docs/assets/crosswords/rust-scary--ksart.near.png';
import rustGood from '/docs/assets/crosswords/rust-good--ksart.near.png';

# 기본 개요

이 십자말풀이 퍼즐 튜토리얼의 이 첫 번째 장에서는 초보자에게 친숙한 방식으로 스마트 컨트랙트 개발에 대한 기본 개념을 소개합니다. 이 챕터에서는, [NEAR CLI](https://docs.near.org/tools/near-cli)를 통해 상호 작용할 수 있는 개념 증명(proof-of-concept) 컨트랙트와 [`near-api-js 라이브러리`를 사용하는 간단한 프론트엔드를 작성하게 됩니다.](https://www.npmjs.com/package/near-api-js)

## 생각보다 나쁘지 않습니다

Rust는 진지한 시스템 프로그래밍 언어입니다. 포인터, 수명(lifetime), 매크로 및 처음 볼 수도 있는 것들이 많을 것입니다. 아래 사진과 같이 느끼더라도 걱정하지 마세요.

<figure>
    <img src={rustScary} alt="Rust 코드를 보고 걱정하는 프로그래머 ksart.near 그림" width="600"/>
    <figcaption><a href="https://twitter.com/ksartworks" target="_blank">ksart.near</a> 그림</figcaption>
</figure>

<br/>

좋은 소식은 Rust SDK가 많은 양의 힘든 작업들을 처리할 수 있다는 것입니다.

우리는 또한 우리 편에 있는 컴파일러를 통해, 정확히 무엇이 잘못되었는지 알려주고 이에 대한 제안을 제공할 것입니다. 이 튜토리얼을 진행하면서, 반복해서 사용할 패턴들을 확인할 수 있을 것입니다.

따라서 NEAR의 Rust에서 스마트 컨트랙트를 작성하는 데에는 많은 엔지니어링 배경이 필요하지 않으므로 걱정하지 마세요.

<img src={rustGood} alt="NEAR SDK 내 Rust 코드를 보고 한숨 돌린 프로그래머 ksart.near 그림" width="600" />

## 첫 번째 챕터의 가정

- 하나의 십자말풀이 퍼즐 당 답은 하나뿐입니다.
- 자말풀이 퍼즐을 풀고 있는 사용자는 답을 알 수 없습니다.
- 십자말풀이 퍼즐의 스마트 컨트랙트 작성자만이 정답을 설정할 수 있습니다.

## 완료된 프로젝트

이 챕터의 최종 코드는 다음과 같습니다.

https://github.com/near-examples/crossword-tutorial-chapter-1

## 작동 원리

<img src={basicCrossword} alt="기본 십자말풀이 퍼즐" width="600" />

적절한 순서로 단어를 얻는 방법에 대한 규칙을 정할 것입니다. 우리는 숫자의 오름차순으로 단어를 수집하고, 숫자에 대해 가로와 세로가 있으면 가로가 먼저 시작합니다.

따라서 위 이미지에선, 정답은 **near nomicon ref finance**입니다.

시작해 봅시다!
