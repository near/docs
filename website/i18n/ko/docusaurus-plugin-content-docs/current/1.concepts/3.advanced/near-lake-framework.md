---
sidebar_label: "Lake 프레임워크"
---

# NEAR Lake 프레임워크

:::note GitHub 레퍼지토리

https://github.com/near/near-lake-framework/

:::

## 설명

NEAR Lake 프레임워크는 [NEAR Lake](/tools/realtime#near-lake-indexer)의 라이브러리들 내 하나의 생태계입니다. 이를 통해 [NEAR Lake](/tools/realtime#near-lake-indexer) 데이터 소스의 블록 스트림을 파악하는 고유한 인덱서를 구축하고, 선택한 프로그래밍 언어로 NEAR 프로토콜 데이터를 처리하는 고유한 로직을 생성할 수 있습니다(현재 [Python](http://pypi.org/project/near-lake-framework), [Javascript](https://www.npmjs.com/package/near-lake-framework) 및 [Rust](https://crates.io/crates/near-lake-framework)로 구현되어 있습니다).

:::tip NEAR Lake 프레임워크 발표

NEAR 거버넌스 포럼에서 NEAR Lake 프레임워크의 출시를 발표했습니다.

[해당 페이지 내 포스트](https://gov.near.org/t/announcement-near-lake-framework-brand-new-word-in-indexer-building-approach/17668)를 읽어보세요.

:::


## [NEAR 인덱서 프레임워크](near-indexer-framework.md)와 비교하면 어떤가요?

| 특징                              | 인덱서 프레임워크                                                      | Lake 프레임워크                                                                                                                                                                                                        |
| ------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NEAR 프로토콜의 블록 및 트랜잭션을 추적할 수 있는지 | **예**                                                          | **예**<br />(단, 메인넷 및 테스트넷 네트워크만 해당)                                                                                                                                                                         |
| 탈중앙화                            | **예**                                                          | 아니오<br />(Pagoda Inc는 블록을 AWS S3에 덤프합니다)                                                                                                                                                                    |
| 반응 시간 (end-to-end)              | [최소 3.8s (예상 평균 5-7s)](near-indexer-framework.md#limitations)  | [[최소 3.9s (예상 평균 6-8s)][label](https://www.thefreedictionary.com/cruft)(#limitations)](#limitations)                                                                                                              |
| 반응 시간 (프레임워크 오버헤드만 해당)          | 0.1s                                                           | 0.2-2.2s                                                                                                                                                                                                          |
| 예상 인프라 비용                       | [$500+/월](https://near-nodes.io/rpc/hardware-rpc)              | [**$20/월**](#what-is-the-cost-of-running-a-custom-indexer-based-on-near-lake)                                                                                                                                     |
| 유지 보수 용이성                       | 어려움<br />(모든 nearcore 업그레이드 및 동기화 상태를 따라야 함)             | **쉬움**<br />(한 번 배포하기만 하면 됨)                                                                                                                                                                                |
| 시작하는 데 얼마나 걸리는지                 | 며칠 (on mainnet/testnet)                                        | **몇 초**                                                                                                                                                                                                           |
| 로컬 개발 용이                        | 어려움<br />(로컬넷에 대해서는 좋은 옵션이지만 테스트넷/메인넷에서 테스트하는 것은 너무 무거움) | **Easy**<br />(see [tutorials](/build/data-infrastructure/lake-framework/near-lake-state-changes-indexer))                                                                                                  |
| 사용자 지정 인덱서를 구현할 수 있는 프로그래밍 언어   | Rust만                                                          | **모두**<br />(현재 헬퍼 패키지는 [Python](http://pypi.org/project/near-lake-framework), [JavaScript](https://www.npmjs.com/package/near-lake-framework) 및 [Rust](https://crates.io/crates/near-lake-framework)로 구현됨) |


## 한계점

Lake 프레임워크는 [NEAR 인덱서 프레임워크](near-indexer-framework.md)를 기반으로 하는 [NEAR Lake 인덱서](https://github.com/near/near-lake-indexer)에서 AWS S3로 덤프되는 데이터에 의존합니다. 따라서 Lake 프레임워크는 AWS S3 스토리지와 NEAR Lake 인덱서 노드(Pagoda Inc)의 관리자를 중심으로 중앙 집중화된 형태를 띱니다. 이는 위에서 언급한 다른 모든 이점과 절충되는 부분일 수 있습니다.

Lake 프레임워크 기반 인덱서는 [인덱서 프레임워크의 레이턴시 특성](near-indexer-framework.md#limitations)과 AWS S3으로의 덤핑 및 읽기에 대한 추가 레이턴시를 따릅니다. S3에 쓰는 동안 최소 50ms의 지연이 추가되고, S3에서 폴링 및 읽기에 50ms이 추가되는 것으로 추정됩니다(폴링 비용을 효율적으로 만들기 위해 기본적으로 2초마다 폴링하도록 설정하였으므로, 최악의 경우 추가로 2초의 레이턴시가 더해질 수 있습니다). 따라서 Lake 프레임워크에는 인덱서 프레임워크의 레이턴시만큼에다가 0.1-2.1초 만큼의 레이턴시가 추가될 수 있습니다. 그러나 대부분의 레이턴시는 종료 지연으로 인해 발생하며, 인덱서 프레임워크와 Lake 프레임워크 모두 최소한의 오버헤드를 추가합니다.

## NEAR Lake를 기반으로 사용자 지정 인덱서를 실행하는 비용은 얼마인가요?

NEAR Lake 기반 인덱서는 사전 로드 대기열의 크기에 따라 100~500MB의 RAM을 사용하고, 스토리지가 필요하지 않으며 Raspberry PI에서도 실행될 수 있습니다.

NEAR Lake는 읽는 사람이 비용을 지불하는 방식으로 S3 버킷을 구성했기 때문에, S3에서 블록체인 데이터를 가져오는 데 드는 비용은 월 약 $18.15입니다.

### AWS S3 비용 내역

NEAR 프로토콜이 정확히 초당 1개의 블록을 생성한다고 가정합시다(실제로는 그렇지 않습니다. 평균 블록 생성 시간은 1.3초입니다). 하루는 86400초로 구성되며, 생산할 수 있는 최대 블록 수도 86400개일 것입니다.

[Amazon S3 가격 정보](https://aws.amazon.com/s3/pricing/?nc1=h_ls)에 따르면 `list` 요청은 1,000개당 $0.005, `get` 요청은 1,000개당 $0.0004 만큼의 비용이 청구됩니다.

계산(항상 네트워크 끝을 따라간다고 가정):

```
86400 blocks per day * 5 requests for each block / 1000 requests * $0.0004 per 1k requests = $0.173 * 30 days = $5.19
```
**참고**: 각 블록에 대한 5개의 요청은, 4개의 샤드가 있음을 의미합니다(공통 블록 데이터용 파일 1개 및 각 샤드용 개별 파일 4개).

그리고 30일 동안 수행해야 하는 `list` 요청의 비용을 더하면:

```
86400 blocks per day / 1000 requests * $0.005 per 1k list requests = $0.432 * 30 days = $12.96

$5.19 + $12.96 = $18.15
```

가격은 샤드 수에 따라 다릅니다.

## 예제 & 튜토리얼

- [`near-examples/near-lake-raw-printer`](https://github.com/near-examples/near-lake-raw-printer): NEAR Lake 프레임워크 위에 구축된 데이터 출력기 간단한 예시
- [`near-examples/near-lake-accounts-watcher`](https://github.com/near-examples/near-lake-accounts-watcher): NEAR Lake 프레임워크 사용 방법에 대한 비디오 튜토리얼용 소스 코드
- [`near-examples/indexer-tx-watcher-example-lake`](https://github.com/near-examples/indexer-tx-watcher-example-lake) NEAR Lake 프레임워크 위에 구축된 특정 계정/컨트랙트에 대한 트랜잭션을 감시하는 인덱서 예제

:::note 튜토리얼

See [Tutorials page](/build/data-infrastructure/lake-framework/near-lake-state-changes-indexer)

:::
