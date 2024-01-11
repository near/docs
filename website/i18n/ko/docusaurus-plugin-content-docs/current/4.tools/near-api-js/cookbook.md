---
id: cookbook
title: 일반적인 사용 사례
sidebar_label: 요리책
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

이 레퍼지토리에는 일반적인 사례 시나리오를 해결하는 데 쉽게 사용할 수 있는 [많은 레시피](https://github.com/near/near-api-js/blob/master/packages/cookbook)가 포함되어 있습니다.

| 이름                                                                                                                                                                                              | 설명                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **계정**                                                                                                                                                                                          |                                                                                                          |
| [계정 생성](https://github.com/near/near-api-js/blob/master/packages/cookbook/accounts/create-testnet-account.js)                                                                                   | [NEAR 지갑](/concepts/basics/accounts/creating-accounts)을 사용하지 않고 NEAR 계정을 만드세요.                           |
| [액세스 키 순환](https://github.com/near/near-api-js/tree/master/packages/cookbook/accounts/access-keys)                                                                                              | 보안 강화를 위해 [액세스 키](/concepts/basics/accounts/access-keys)를 생성 및 삭제해보세요.                                   |
| **트랜잭션**                                                                                                                                                                                        |                                                                                                          |
| [트랜잭션 상태 가져오기](https://github.com/near/near-api-js/blob/master/packages/cookbook/transactions/get-tx-status.js)                                                                                 | tx 해시 및 관련 계정/컨트랙트 ID를 사용하여 트랜잭션 상태를 가져옵니다.                                                              |
| [최근 트랜잭션 세부사항](https://github.com/near/near-api-js/blob/master/packages/cookbook/transactions/get-tx-detail.js)                                                                                 | [인덱싱](https://near-indexers.io/docs/projects/near-indexer-framework) 서비스를 사용하지 않고 최근 트랜잭션 세부사항을 가져와 보세요. |
| [배치(Batch) 트랜잭션](https://github.com/near/near-api-js/blob/master/packages/cookbook/transactions/batch-transactions.js)                                                                          | 여러 [트랜잭션](/concepts/basics/transactions/overview)에 서명하고 전송해 보세요.                                         |
| **유틸리티**                                                                                                                                                                                        |                                                                                                          |
| [컨트랙트 배포](https://github.com/near/near-api-js/blob/master/packages/cookbook/utils/deploy-contract.js)                                                                                           | 사전 컴파일된 WASM 파일을 사용하여 스마트 컨트랙트를 배포해보세요.                                                                  |
| [가스 계산](https://github.com/near/near-api-js/blob/master/packages/cookbook/utils/calculate-gas.js)                                                                                               | 컨트랙트 호출로부터 [소각된 가스](/concepts/basics/transactions/gas)를 계산하세요.                                           |
| [계정 없이 상태 읽기](https://github.com/near/near-api-js/blob/master/packages/cookbook/utils/get-state.js)                                                                                             | 계정 초기화 없이 컨트랙트의 상태를 읽어보세요.                                                                               |
| NEAR [래핑](https://github.com/near/near-api-js/blob/master/packages/cookbook/utils/wrap-near.js) & [언래핑](https://github.com/near/near-api-js/blob/master/packages/cookbook/utils/unwrap-near.js) | `wrap.near` 스마트 컨트랙트를 사용하여 NEAR를 래핑하고 언래핑합니다.                                                            |
| [서명 검증](https://github.com/near/near-api-js/blob/master/packages/cookbook/utils/verify-signature.js)                                                                                            | 키 쌍 서명을 검증해 보세요.                                                                                         |
