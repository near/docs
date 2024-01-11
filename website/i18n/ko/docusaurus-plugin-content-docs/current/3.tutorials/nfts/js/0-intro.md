---
id: introduction
title: NFT Zero to Hero JavaScript 에디션
sidebar_label: 소개
---

> 이 _Zero to Hero_ 시리즈에서는 대체 불가능 토큰(NFT) 스마트 컨트랙트의 모든 측면을 다루는 일련의 튜토리얼를 찾을 수 있습니다. 미리 배포된 컨트랙트를 사용하여 NFT를 생성하는 것으로 시작하여 마지막에는 모든 확장을 지원하는 완전한 NFT 스마트 컨트랙트를 구축하게 됩니다.

:::caution

JS-SDK는 현재 **[`Alpha`](https://github.com/near/near-sdk-js/releases/)** 버전입니다.

JavaScript 런타임은 완전히 감사되지 않았습니다. 가치를 지닌 스마트 컨트랙트를 생성하려면 [`near-sdk-rs`](https://github.com/near/near-sdk-rs)을 사용하세요.

:::

## 전제 조건

이 튜토리얼을 성공적으로 완료하려면 다음이 필요합니다.

- [Node.js](/develop/prerequisites#nodejs)
- [NEAR 지갑](https://testnet.mynearwallet.com/create)
- [NEAR-CLI](/tools/near-cli#setup)

---

## 개요

다음은 **_Zero_** to **_Hero_**로 순식간에 데려다 줄 단계입니다! 💪

| 단계 | 이름                                                     | 설명                                                                         |
| -- | ------------------------------------------------------ | -------------------------------------------------------------------------- |
| 1  | [사전 배포된 컨트랙트](/tutorials/nfts/js/predeployed-contract) | 스마트 컨트랙트를 코딩, 생성 또는 배포할 필요 없이 NFT를 생성합니다.                                  |
| 2  | [컨트랙트 아키텍처](/tutorials/nfts/js/skeleton)               | NFT 스마트 컨트랙트의 기본 아키텍처를 배우고 코드를 컴파일합니다.                                     |
| 3  | [발행](/tutorials/nfts/js/minting)                       | 뼈대에 살을 채워 넣어 스마트 컨트랙트가 대체 불가능 토큰을 발행할 수 있도록 합니다.                           |
| 4  | [컨트랙트 업그레이드](/tutorials/nfts/js/upgrade-contract)      | 기존 스마트 컨트랙트를 업그레이드하는 프로세스에 대해 알아보세요.                                       |
| 5  | [열거(Enumeration)](/tutorials/nfts/js/enumeration)      | 스마트 컨트랙트의 상태를 반환하는 데 사용할 수 있는 열거 메서드를 살펴보세요.                               |
| 6  | [핵심](/tutorials/nfts/js/core)                          | 토큰 전송을 허용하는 핵심 표준을 사용하여 NFT 컨트랙트 확장                                        |
| 7  | [승인](/tutorials/nfts/js/approvals)                     | 다른 계정이 당신을 대신하여 NFT를 전송할 수 있도록 컨트랙트를 확장하세요.                                |
| 8  | [로열티](/tutorials/nfts/js/royalty)                      | NFT 로열티를 추가하여 일정 비율의 금액을 토큰 생성자에게 지급할 수 있습니다.                              |
| 9  | [이벤트](/tutorials/nfts/js/events)                       | 이 튜토리얼에서는 이벤트 확장을 탐색하여 컨트랙트가 특정 이벤트에 반응할 수 있도록 합니다.                        |
| 10 | [마켓플레이스](/tutorials/nfts/js/marketplace)               | 일반 마켓플레이스가 NEAR에서 작동하는 방식에 대해 알아보고, NFT 구매 및 판매를 허용하는 일부 코드에 대해 자세히 알아보세요. |

---

## 다음 단계

시작할 준비가 되셨습니까? [사전 배포된 컨트랙트](/tutorials/nfts/js/predeployed-contract) 튜토리얼로 이동하여 학습을 시작하세요!

대체 불가능 토큰과 스마트 컨트랙트에 대해 이미 알고 있다면 건너뛰고 관심 있는 튜토리얼로 바로 이동하십시오. 튜토리얼은 주어진 지점에서 시작할 수 있도록 설계되었습니다!

:::info 질문? 👉 Join us on [Discord](https://near.chat/) and let us know in the `#development` channels. 👈

We also host daily [Office Hours](https://pages.near.org/developers/get-help/office-hours/) live where the DevRel team will answer any questions you may have. 🤔

월요일 – 금요일 오전 11시 – 오후 12시(태평양 표준시 오후 6시 – 오후 7시) :::
