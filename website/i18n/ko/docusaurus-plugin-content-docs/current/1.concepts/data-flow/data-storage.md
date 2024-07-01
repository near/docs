---
id: data-storage
sidebar_label: "블록체인 데이터"
---

# 블록체인 데이터

이 글에서는 블록체인 데이터 읽기 및 쓰기를 용이하게 하는 블록체인 개념 및 도구에 대한 높은 수준의 개요를 다룹니다.

## 데이터 쓰기

기본적으로 블록체인은 분산 데이터베이스이며, 블록체인 데이터는 직렬화된 블록에 저장되도록 최적화되어 체인이 생성될 때 한 번에 하나의 블록을 작성합니다. 이러한 직렬화된 블록은 트랜잭션, 계정 및 컨트랙트와 같은 기본 구성 요소에 대한 정보를 저장합니다.


블록체인의 쓰기 프로세스는 요청된 변경 사항을 분산된 방식으로 상태에 적용하는 훌륭한 방법을 제공합니다. 그러나 변경 사항을 관찰하려면 네트워크에서 정보를 적극적으로 가져와야 합니다. 결과적으로 여러 컨트랙트 또는 더 긴 시간 범위에 걸쳐 데이터를 얻으려고 할 때면, 여러 블록에 걸쳐 데이터를 집계해야 합니다.


## 데이터 읽기


블록체인에서 특정 블록 또는 계정에 대한 데이터를 쿼리하는 것은 매우 간단하며, "좁은" 쿼리로 간주될 수 있습니다. 그러나 여러 블록에서 데이터를 쿼리하는 것은 여러 단일 블록 쿼리의 결과를 집계해야 하므로 번거로울 수 있습니다. 따라서 이러한 쿼리는 "넓은" 쿼리로 간주될 수 있습니다.


:::info

블록체인의 특성은 결정론적이어야 한다는 것입니다. 블록체인의 중요한 특징은 주어진 블록(또는 시간 단위)의 상태를 알고 있다는 것입니다. 이것들을 스냅샷이라고 생각하는 것이 편합니다. 즉, 블록체인은 모든 블록의 상태에 대한 스냅샷을 만듭니다.

:::


예를 들어 사용자는 특정 블록에 대한 스마트 컨트랙트를 호출할 수 있으며 블록체인은 호출할 때마다 동일한 블록에 대해 항상 동일한 결과를 생성하도록 보장합니다.


:::note

블록체인의 결정론적 특성은 블록체인을 오프체인(외부) 변수로부터 격리합니다. 즉, 스마트 컨트랙트 내에서 데이터를 읽기 위해 외부 API를 호출하는 것은 불가능합니다. 따라서 블록체인과 스마트 컨트랙트는 외부(오프체인) 세계와 차단됩니다.

:::

## 정보 가용성


언급한 바와 같이 블록체인의 상태에서 얻을 수 있는 필수 정보는 해당 블록에서 발생하는 트랜잭션, 계정 및 컨트랙트와 관련이 있습니다.


블록체인에서 이러한 정보를 얻는 간단한 방법은 RPC를 사용하는 것입니다. NEAR는 모든 사람이 블록체인과 상호 작용할 수 있도록 [JSON-RPC 엔드포인트](/api/rpc/introduction)를 구현합니다. JSON-RPC API를 통해 사용자는 스마트 컨트랙트를 호출하고 블록체인에서 데이터를 볼 수 있습니다. JSON-RPC를 통해 모든 데이터를 사용할 수 있는 것은 아닙니다. 예를 들어 로컬 Receipt는 NEAR 노드의 내부 데이터베이스에 저장되지 않기 때문에 JSON-RPC를 통해 사용할 수 없습니다.


:::tip

JSON-RPC 엔드포인트 접근 방식은 데이터를 가져오는 소위 풀 모델입니다. 이 접근 방식에는 잘못된 것이 없지만, 때로는 가장 편안하거나 신뢰할 수 있는 대안이 아닐 수 있습니다.

:::

상상할 수 있듯이, 이 기본 블록 정보는 복잡한 프로젝트에 충분하지 않을 수 있습니다. 예를 들어 NFT 마켓플레이스에서 RPC 호출을 통한 기본 읽기 작업은 구매 상태를 얻거나 NFT 생성자 계정의 NEAR 잔액을 얻는 데 도움이 될 수 있지만, 특정 NFT의 소유자를 얻는 것과 같은 정보의 경우 ID를 기반으로 하는 NFT의 메타데이터 혹은 특정 유형의 NFT에 대한 총 공급량 같은 정보를 얻기 위해서 dApp 개발자는 RPC 기본 메서드를 호출한 후 추가 구문 분석 및 처리를 수행해야 합니다.


데이터 취합, 검색, 관계 및 필터링과 같이 더 진보된 실제 세계의 쿼리와 작업들은 단순히 RPC 호출만을 사용해서는 불가능할 것입니다. 이에 대한 예시는, 지난 일주일 간 가장 유명했던 NFT 컬렉션에 대한 리더보드를 보여주는 것입니다. 해당 정보는 컨트랙트 자체나 RPC를 통해서 직접 상호작용하는 방식으로는 얻을 수 없습니다. 이 데이터를 얻는 것은 발생한 모든 트랜잭션을 처리하고, 컬렉션의 관점으로 이들을 취합해서, 타임스탬프 계산을 통해 이들을 필터링하고, 전체 트랜잭션 값의 순서로 정렬하는 과정을 필요로 합니다.


이러한 복잡한 데이터 요구 사항을 해결하는 한 가지 옵션은 인덱싱 프레임워크를 사용하여 서버를 구축하는 것입니다. 블록체인 인덱서는 데이터를 가져오는 푸시 모델을 구현한 것입니다. 인덱서는 소스에서 적극적으로 데이터를 가져오는 대신, 블록체인에서 데이터 스트림을 수신하고 정의된 요구 사항에 따라 데이터를 즉시 필터링하고 처리할 수 있습니다. 인덱서는 "넓은" 쿼리 실행을 단순화하는 데에도 사용할 수 있습니다. For example, a data stream can be written to a permanent database for later data analysis using a convenient query language like SQL.


## 데이터 도구


자체적으로 서버를 구축하고 블록체인 데이터를 인덱싱하는 것은 쉬운 일이 아닙니다. 인덱스 서버는 모든 트랜잭션을 처리하고 데이터베이스에 저장하는 역할을 합니다. 그런 다음 dApp에 대한 데이터를 가져오기 위해 일련의 API를 구축해야 합니다. 이 옵션은 리소스 집약적이며, 유지 관리가 필요하고, 단일 실패 지점을 제공하며, 분산화에 필요한 중요한 보안 속성을 손상시킵니다. 또한 완결성, 체인 재구성 또는 빈 블록과 같은 특정 블록체인 속성은 이 프로세스를 더욱 복잡하게 만들고 블록체인 데이터에서 올바른 쿼리 결과를 검색하는 데 시간이 많이 걸릴 뿐만 아니라 개념적으로도 어렵습니다.


따라서 이에 대한 대안으로 NEAR 블록체인에서 사용 가능한 많은 인덱싱 서비스 중 하나를 시도할 수 있으며, 다음은 Pagoda에서 제공하는 데이터 요구 사항에 사용할 도구에 대한 [암시적인 결정 트리(decision tree)](https://docs.pagoda.co/decision-tree-lt)입니다.

<details>
<summary><b>데이터 플랫폼 결정 트리</b></summary>
<a href="/docs/assets/data-decision-tree.png" target="_blank">
<img src="/docs/assets/data-decision-tree.png" />
</a>
</details>

* [NEAR 인덱서 프레임워크](/concepts/advanced/near-indexer-framework): 블록의 "라이브" 스트림을 제공하는 마이크로 프레임워크입니다. 실시간 온체인 "이벤트"를 처리하는 데 유용합니다.
* [NEAR Indexer for Explorer](https://github.com/near/near-indexer-for-explorer): leverages the indexer micro-framework to watch and store all of the blockchain's events/data into a transactional PostgreSQL database. [GitHub 레퍼지토리](https://github.com/near/near-indexer-for-explorer)를 복제하고 고유한 인덱서 솔루션을 사용자 지정할 수 있습니다.
* [NEAR Lake 프레임워크](/concepts/advanced/near-lake-framework): NEAR Lake의 동반 라이브러리입니다. 이를 통해 NEAR Lake 데이터 원본에서 블록 스트림을 감시하는 고유한 인덱서를 구축하고, 해당 데이터를 처리하는 고유한 로직을 생성할 수 있습니다. 이는 인덱서 프레임워크 대신 미래 프로젝트를 위해 당신이 사용할 것이라는 점을 기억하세요. Read [why it is better](/concepts/advanced/near-indexer-framework#why-is-it-better-than-near-indexer-framework).
* [NEAR Lake 인덱서](/concepts/advanced/near-lake-framework): 인덱서 마이크로 프레임워크를 활용하여 블록체인의 모든 이벤트/데이터를 사용자 지정 AWS S3 또는 S3 호환 스토리지에서 JSON 파일로 보고 저장합니다.
* [Near Query API](https://dev.near.org/dataplatform.near/widget/QueryApi.App): Query API allows you to seamlessly create, manage, and discover indexers on NEAR. Developers can deploy their indexers to aggregate historical data in a matter of minutes, while accessing the data via custom GraphQL queries.
* [The Graph](https://thegraph.com/docs/en/cookbook/near/): The Graph는 블록체인 이벤트를 처리하고 개별적으로 하위 그래프로 알려진 GraphQL API를 통해 결과 데이터를 쉽게 사용할 수 있는 개발자 도구를 제공합니다. [Graph Node](https://github.com/graphprotocol/graph-node)는 이제 NEAR 이벤트를 처리할 수 있습니다. 즉, NEAR 개발자는 이제 하위 그래프를 만들어 스마트 컨트랙트를 인덱싱할 수 있습니다.
* [Pagoda API](https://pagoda.co): Pagoda에서 관리하는 호스팅 서비스로, 블록체인을 데이터마트로 인덱싱하여 복잡한 데이터 문제를 해결하고, 애플리케이션의 모든 부분에서 직접 사용할 수 있도록 표준 RESTful API를 통한 액세스를 제공합니다. API를 사용하면 자체 인덱서 인프라를 구축하고 관리할 필요 없이 블록체인 데이터를 효율적으로 쿼리할 수 있습니다. Pagoda는 또한 인덱서 프레임워크를 온체인 데이터 인덱싱을 위한 분산형 솔루션으로 제공하며, 이러한 데이터 쿼리 요구 사항을 위해 자체 인덱서 및 서버를 구축하는 데 사용할 수 있는 중앙 집중식 Data Lake 소스를 제공합니다.
* [PIKESPEAK API](https://pikespeak.ai): 기업 단계의 API로, 블록체인 이벤트를 가지고 와서 지갑, 밸리데이터, 위임자, 자금 전송, dapp 활동 등에 대한 분석을 취합합니다. [문서](https://doc.pikespeak.ai/)
* [Mintbase 인덱서](https://mintbase.xyz/): NEAR 생태계 내 NFT 이벤트를 포착, 처리 및 저장하기 위해 개발된 효율적이고 적용 가능한 인덱싱 솔루션입니다. 이 인덱서는 개발자에게 간소화되고 잘 구성된 데이터 스트림을 제공하므로 NFT 공간에서 데이터 중심 애플리케이션을 구성하는 데 최적의 선택입니다. Mintbase 인덱서는 NEAR의 다양한 플랫폼 및 프로젝트에서 NFT 관련 광범위한 이벤트를 체계적으로 모니터링하고 인덱싱함으로써 개발자에게 혁신적이고 실용적인 애플리케이션을 구축하는 데 필요한 도구와 데이터 액세스를 제공합니다. 또한 GraphQL을 사용하여 인덱싱된 데이터를 편리하게 쿼리할 수 있으므로 특정 개발자의 요구에 맞춘 유연하고 효율적인 데이터 검색이 가능합니다. [문서](https://docs.mintbase.xyz/dev/mintbase-graph)
* [SubQuery](https://academy.subquery.network/quickstart/quickstart_chains/near.html): SubQuery는 빠르고, 유연하며, 믿을만한 오픈소스 데이터 인덱서로, NEAR를 포함한 많은 다른 체인의 web3 프로젝트에 대한 커스텀 API를 제공합니다. NEAR 개발자들은 SubQuery 생태계가 제공하는 오픈소스 SDK, 도구, [문서](https://academy.subquery.network), 개발자 지원을 포함한 뛰어난 SubQuery 경험을 통해 이점을 얻을 것입니다. Additionally, NEAR is accommodated by [SubQuery’s Managed Service](http://managedservice.subquery.network/), which provides enterprise-level infrastructure hosting.
