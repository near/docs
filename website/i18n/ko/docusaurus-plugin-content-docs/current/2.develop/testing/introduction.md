---
id: introduction
title: 소개
---

스마트 컨트랙트를 개발하는 동안, 컨트랙트가 예상대로 작동하는지, 더 나아가 안전하게 작동하는지 테스트하고 싶을 것입니다. NEAR에서는 이러한 테스트를 수행하는 데 도움이 되는 도구를 개발했습니다. 다음과 같이 두 가지 유형의 기본 테스트가 존재합니다.

1. 메서드를 개별적으로 테스트하기 위한 **단위 테스트(unit test)**. 컨트랙트의 언어로 작성되며, 로컬 환경에서 실행됩니다.
2. 실제 환경에서 컨트랙트 어떻게 작동하는지 테스트하기 위한 **통합 테스트(integration test)**. Rust 또는 Typescript로 작성되고, 로컬 샌드박스 또는 NEAR 테스트넷에서 실행할 수 있습니다.

위 두 테스트는 각각 다른 유형의 오류를 감지하고 코드를 의도대로 동작하도록 만드는 데 적합하므로, 모든 개발자는 두 가지 유형의 테스트를 모두 구현하는 것이 좋습니다. 또한 모든 프로젝트를 테스트넷에서 먼저 릴리스하고, 사용자가 메인넷에 릴리스하기 전에 사용해 볼 시간을 주는 것이 좋습니다.

---
## 테스트 환경 설정
스마트 컨트랙트 테스트를 할 때, 수행 중인 테스트 유형에 따라 다양한 소프트웨어를 사용하게 될 것입니다. In order to save you from the trouble of setting them up, we recommend you copy the structure from one of our [example projects](https://github.com/near-examples).