---
sidebar_position: 1
sidebar_label: "개요"
title: "몇 가지 초보자용 주제들의 핵심"
---

import chapter2Correct from '/docs/assets/crosswords/chapter-2-solve.gif';
import multipleCrosswords from '/docs/assets/crosswords/puzzle-piggy-bank--r3v.near--rev_rodrigueza.png';

# 딥다이브

지난 챕터에서 우리는 Rust를 설치하고 간단한 스마트 컨트랙트를 실행했습니다. 그러나 컨트랙트에는 몇 가지 문제가 있으며, 원하는 만큼 강력하지 않습니다. 예를 들어, 우리는 스마트 컨트랙트에 하나의 십자말풀이 퍼즐만 저장할 수 있고, 프론트엔드는 하드코딩되어 있으며, 승리한 사람에게 어떠한 인센티브도 제공하지 않습니다.

스마트 컨트랙트에 여러 십자말풀이를 저장할 수 있는 기능을 부여하고, 당첨자에게 NEAR로 지급되는 상금을 제공합시다.

<figure>
    <img src={multipleCrosswords} alt="십자말풀이 퍼즐로 가득 찬 책을 들고 있는 남자, 다른 한 손에는 돼지 저금통을 들고 있습니다. r3v.near 그림"/>
    <figcaption class="full-width"><a href="https://twitter.com/rev_rodrigueza" target="_blank">r3v.near</a> 그림</figcaption>
</figure>

<br/>

이 챕터에서는 다음과 같은 것들을 수행합니다.

- 컨트랙트가 여러 십자말풀이 퍼즐을 저장하도록 허용
- 단서의 위치를 컨트랙트에 저장
- 사용자가 NEAR 계정으로 로그인하도록 허용
- 퍼즐을 가장 먼저 푸는 사람에게 (NEAR 토큰으로) 상금을 지급
- Rust 구조체 및 열거형(Enumeration)을 사용하여 탐
- 기타 등등

<figure>
    <img src={chapter2Correct} width="600" alt="사용자가 십자말풀이 퍼즐의 마지막 단서를 채우면 트랜잭션이 보류 중이라는 오버레이가 나타납니다" />
    <figcaption>사용자가 십자말풀이 퍼즐을 풀고, 블록체인과 상호 작용하며, 상금을 받습니다.</figcaption>
</figure>

위의 목록을 구현하면서, 다음과 같이 NEAR에 대한 주요 개념을 배우게 됩니다.

- [[Action](https://nomicon. io/RuntimeSpec/Actions. html)](https://nomicon.io/RuntimeSpec/Actions.html)
- 전체 / 함수 호출 [액세스 키](https://docs.near.org/concepts/basics/account#access-keys)
- NEAR 특화 [컬렉션](https://docs.near.org/concepts/storage/data-storage#rust-collection-types)(Rust의 표준 HashMap과 같은 것들보다 일반적으로 더 선호됨)
- 탈중앙화 앱(dApp) 로그인 흐름
- 기타 등등

바로 시작해 봅시다!

## 완료된 프로젝트

이 챕터의 최종 코드는 다음과 같습니다.

https://github.com/near-examples/crossword-tutorial-chapter-2
