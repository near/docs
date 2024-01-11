---
id: overview
title: 개요
---

NEAR simplifies building, deploying and accessing decentralized frontends. 커뮤니티와 웹3의 힘을 경험해보세요.

![bos](/docs/bos-landing.png)

---

## Why Using NEAR Tech Stack?

NEAR is more than just a blockchain, it is also a development environment and a platform in which to deploy and discover new applications. NEAR simplifies building Web 3 applications providing easy onboarding, high security and a seamless interaction with all chains.

#### 접근성
With NEAR, users always have the ability to locally run blockchain applications which helps assure robustness and censorship-resistance, while maintaining a user-friendly experience.

#### 보안
컴포넌트의 코드는 항상 온체인에 존재하고, 익스플로러에서 확인 가능하며 모두가 감사 가능합니다. 이는 보안을 향상하는 동시에, 사용자로 하여금 자신 있게 풀스택 애플리케이션을 로컬에서 실행할 수 있도록 합니다.

#### 구성 가능성
NEAR fosters composability by enabling developers to reuse and remix Components. Building with NEAR is extremely lightweight and easy, with the ability to deploy new front-ends for smart contracts on mainnet in less than 10 minutes.

#### Chain Agnostic Components
Additionally, NEAR Components are chain-agnostic, making it a flexible solution for developers working with different blockchains.

---

## The Pillars of NEAR Stack

The NEAR stack is based on three pillars:
- [컴포넌트](#components): 특정 문제점들을 해결하는 구성 가능한 프론트엔드를 의미합니다.
- [블록체인](#blockchains): 컴포넌트의 코드, 자산, 데이터를 저장합니다.
- [게이트웨이](#gateways): 모든 곳에 컴포넌트를 렌더링하는 단순한 방법입니다.

<hr class="subsection" />

### 컴포넌트

[Components](./components.md) are small web 3 applications (think [Lido](tutorial/hello-lido.md), Uniswap, Aave) that are stored **entirely on-chain**.

Developers can fork these apps and [compose them](./components.md#composing-components) to create full web applications.

<hr class="subsection" />

### 블록체인

컴포넌트는 현재 모든 EVM 체인(e.g. 폴리곤, zkSync) 및 NEAR를 지원하기 때문에, 모든 블록체인에서 함수를 호출할 수 있습니다.

앱(프론트엔드)의 소스 코드는 HTML/CSS/JS를 매우 저렴하게(몇 센트) 저장할 수 있다는 장점을 가진 NEAR에 존재합니다.

<hr class="subsection" />

### 게이트웨이

게이트웨이는 로컬에서 실행되는 분산형 프론트엔드를 대중이 사용할 수 있도록 합니다. 게이트웨이는 Ethereum, L2 및 NEAR와 같은 기타 레이어 1에 구축된 프로토콜용 프론트엔드를 로드하고 실행하는 특별히 설계된 가상 머신으로 구성됩니다. 이러한 프론트엔드의 코드는 NEAR 블록체인에 저장됩니다.

Examples of gateways include [near.org](https://near.org), [bos.gg](https://bos.gg), [near.social](https://near.social), [Cantopia](https://cantopia.pages.dev), and [nearpad.dev](https://nearpad.dev).
