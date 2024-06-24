---
sidebar_label: "인덱서 프레임워크"
---

# NEAR 인덱서 프레임워크

:::note GitHub 레퍼지토리

https://github.com/near/nearcore/tree/master/chain/indexer

:::


:::caution NEAR LAKE 프레임워크를 찾고 있는 건 아닌지 확인해보세요.

[NEAR Lake 프레임워크](near-lake-framework.md)는 NEAR 인덱서 프레임워크의 경량 대안으로, 중앙화가 허용될 때 사용하도록 권장됩니다.

:::


## 설명

NEAR 인덱서 프레임워크는 [nearcore](https://github.com/near/nearcore)를 내장하고 NEAR 네트워크에서 생성된 각 블록과 관련된 모든 정보를 수집하는 모든 복잡성을 추상화하는 Rust 패키지(크레이트)입니다. 크레이트 이름은 [`near-indexer`](https://github.com/near/nearcore/tree/master/chain/indexer)이고, 이는 [nearcore 레퍼지토리](https://github.com/near/nearcore)의 일부입니다.

`near-indexer`는 NEAR 네트워크에 기록된 블록 스트림을 제공하는 마이크로 프레임워크입니다. 이는 체인에서 실시간 "이벤트"를 처리하는 데에 유용합니다.

## 근거

스케일링 dApp이 NEAR의 메인넷에 진입함에 따라, 문제가 발생할 수 있습니다. 배포된 스마트 컨트랙트에서 상태에 빠르고 효율적으로 액세스하고, 방해물을 제거하는 방법은 무엇일까요? 컨트랙트는 복잡한 데이터 구조를 갖도록 성장할 수 있으며, 네트워크 RPC를 쿼리하는 것은 상태 데이터에 액세스하는 최적의 방법이 아닐 수 있습니다. NEAR 인덱서 프레임워크를 사용하면 사용자가 지정한 방식으로 스트림을 캡처하고 인덱싱할 수 있습니다. 일반적인 사용 사례 중 하나는 이 데이터가 관계형 데이터베이스로 가는 것입니다. 이는 프로젝트별로 맞춤화되어 있으므로, 이 프레임워크를 사용하는 데 관련된 엔지니어링 작업이 필요합니다.

## 한계

NEAR 인덱서 프레임워크는 전체 NEAR 노드를 포함하므로, P2P 네트워크와 동기화하고 모든 네트워크 데이터를 로컬에 저장해야 하며 이에 따른 스토리지 요구 사항이 적용됩니다. 추출만 필요한 경우 SSD에 수백 GB가 필요합니다. ~2.5일 이하의 데이터, 그리고 네트워크의 전체 기록을 검토하려는 경우 수천 GB의 SSD 용량이 필요하죠. 또한 네트워크 동기화 프로세스는 매우 느린 것으로 알려져 있습니다(블록 생성은 초당 1 블록이지만 블록 동기화는 일반적으로 초당 2 블록에 도달하므로 라이브 네트워크를 빠른 속도로 따라 잡을 수 있습니다. 따라서 노드가 한 시간 동안 오프라인 상태였다면 새로 생성된 블록을 계속 가져오는 네트워크 끝을 따라잡는 데 한 시간이 걸립니다.).

NEAR 인덱서 프레임워크는 완료된 블록만 노출합니다. NEAR 프로토콜에서는 블록을 완료하는 데 3개의 연속된 블록이 필요합니다. 즉, 이는 일부 트랜잭션이 네트워크에 도달하는 시간과 NEAR 인덱서 프레임워크에서 완료되고 스트리밍되는 시간 사이에 최소 3초의 지연이 있음을 의미합니다. If we measure the delay between the moment when a transaction gets submitted from the client device to the moment Indexer Framework-based indexers would receive it, we can see the following timings:

* 인터넷을 통해 NEAR 노드로 전송되는 직렬화된 트랜잭션(가장 일반적으로 [NEAR JSON RPC broadcast_tx_commit](https://docs.near.org/api/rpc/transactions#send-transaction-await)을 통해)은 약 50ms(대부분 TCP 핸드셰이크 + HTTPS 핸드셰이크의 네트워크 대기 시간이므로 정확하게 측정되지 않음)가 소요됩니다.
* 트랜잭션은 [밸리데이터 노드](https://near-nodes.io/intro/what-is-a-node)로 라우팅되어, 약 50ms(대부분 피어 노드 간의 네트워크 대기 시간)가 소요됩니다.
* 트랜잭션은 밸리데이터 노드의 mempool에 도착하고 최소한 다음 청크/블록이 생성될 때까지 지연되므로, 현재 블록에 대한 트랜잭션이 선택된 순간에 트랜잭션이 수신된 경우 다음 블록 생성을 위해 메인넷에서 1.2초가 소요됩니다.
* 트랜잭션이 블록에 포함되면 다음 블록에서 실행되는 Receipt를 생성합니다(또 다른 1.2초 지연). [여기](../data-flow/near-data-flow.md)에서 NEAR 프로토콜 데이터 흐름에 대해 자세히 알아보세요.
* 블록 완료에 3블록(1.2초 * 3)이 걸린다는 점을 감안할 때 인덱서 프레임워크는 3.6초 후에 트랜잭션이 포함된 블록에 대한 정보 수집을 시작할 수 있지만, 생성된 블록이 검증 노드에서 일반 노드로 다시 전파될 때 네트워크 대기 시간에 의한 최소 50ms의 지연 시간도 포함해야 합니다.
* 그런 다음 인덱서 프레임워크는 생성된 블록에 대한 모든 정보를 수집하고 스트리밍합니다. 약 50-100ms가 소요됩니다.
* 사용자 지정 인덱서 구현은 블록을 수신하는데에 추가 지연 시간이 존재할 수도 있지만, 여기서는 범위를 벗어납니다.

Ultimately, it takes at least 3.8 seconds from the moment one submits a transaction to the network, and Indexer Framework-based indexers pick it up, where the finalization time contributes the most of the delay. 실제 시나리오에서 dApp은 일반적으로 실행 결과를 알아야 하므로 트랜잭션이 포함된 후 모든 Receipt를 실행하려면 몇 블록이 걸립니다(데이터 흐름에 대한 자세한 내용은 [여기](../data-flow/near-data-flow.md) 참조). 트랜잭션 제출 및 인덱서에서 관찰되는 결과는 5-7초가 될 수 있습니다.

## 현재 상태

인덱서 프레임워크는 분산형 NEAR 프로토콜 피어 투 피어 네트워크에서 작동하는, 완결된 NEAR 프로토콜 블록의 스트림을 얻는 가장 빠르고 간단한 방법을 제공하는 도구입니다.

그러나 인덱서 생태계에 대한 실험에서 우리는 완전한 [nearcore](https://github.com/near/nearcore) 노드를 유지하는 대신 마이크로 인덱서를 구축하기 위한 경량 버전이 필요하다는 것을 깨달았습니다. 우리는 이벤트를 전달하기 위해 다양한 솔루션(Kafka, RabbitMQ 등)을 고려했지만 결국 모든 블록을 AWS S3 버킷에 덤프하기로 결정했습니다. 여기에서 NEAR Lake 생태계가 탄생했습니다. [여기](near-lake-framework.md)에서 자세한 내용을 알아 보세요.

요즘 우리는 [NEAR Lake 인덱서](near-lake-framework.md)를 구현하기 위해 NEAR Indexer Framework를 사용하고 거기에서 [NEAR Lake 프레임워크](https://github.com/near/near-lake-indexer)를 기반으로 마이크로 인덱서를 구축 합니다. Having said that, Indexer Framework plays a crucial role in the ecosystem even though most of the indexers these days are implemented without using it directly.

## 애플리케이션

자세한 기술 정보는 [예제](https://github.com/nearprotocol/nearcore/tree/master/tools/indexer/example)를 참고하세요.

- [`near-examples/indexer-tx-watcher-example`](https://github.com/near-examples/indexer-tx-watcher-example)는 지정된 계정/컨트랙트에 대한 트랜잭션을 감시하는 NEAR 인덱서 예제입니다.
