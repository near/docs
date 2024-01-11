---
id: validators
title: 밸리데이터
---

NEAR 네트워크는 탈중앙화되어 있어, 여러 사람이 협력하여 네트워크를 안전하게 유지합니다. 우리는 그런 역할을 하는 사람들을 **밸리데이터**라고 부릅니다 .

네트워크의 모든 트랜잭션이 유효한지, 즉 아무도 돈을 훔치려 하지 않는지 확인하기 위해 밸리데이터는 특정 합의 메커니즘을 따릅니다.

현재 블록체인이 올바르게 작동하고 공격에 저항할 수 있도록 하는 몇 가지 잘 알려진 합의 메커니즘이 있습니다. NEAR 프로토콜은 **Proof-of-Stake** 버전, 특히 [Thresholded Proof of Stake](https://near.org/blog/thresholded-proof-of-stake/) 버전을 사용합니다.

지분 증명에서 사용자는 NEAR 토큰을 위임하여 특정 네트워크 밸리데이터에 대해 지원을 합니다. 이 프로세스를 **스테이킹**이라고 합니다. 핵심 아이디어는, 커뮤니티의 신뢰를 얻은 밸리데이터에 많은 양의 토큰을 위임한다는 것입니다.

### 네트워크 보안
밸리데이터에는 두 가지 주요 임무가 있습니다. 첫 번째는 트랜잭션을 검증하고 실행하여 블록체인을 형성하는 블록에 모으는 것입니다. 그들의 두 번째 임무는 다른 밸리데이터를 감독하여, 아무도 유효하지 않은 블록을 생성하거나 대체 체인을 생성(예: 이중 지출)하지 않도록 하는 것입니다.

밸리데이터가 악의적인 행동을 하다 걸릴 경우, 그들은 "슬래싱"되어 지분(의 일부)이 소각될 것입니다.

NEAR 네트워크에서 체인을 조작하려는 시도는, 악의적인 활동이 드러나지 않도록 한 번에 대부분의 밸리데이터를 제어해야 함을 의미합니다. 그러나 공격에 실패하면 스테이킹된 토큰이 삭감될 수 있으므로, 본인이 가진 막대한 자본을 위험에 빠뜨려야 한다는 리스크가 있습니다.

### 밸리데이터의 경제학
네트워크를 서비스하는 대가로 밸리데이터는 매 에포크마다 목표된 만큼의 NEAR로 보상을 받습니다. 목표 값은 연간 기준으로 총 공급량의 4.5%가 되도록 계산됩니다.

각 에포크에 수집된 모든 트랜잭션 수수료(컨트랙트에 대한 리베이트로 할당된 부분 제외)는 시스템에 의해 소각됩니다. 인플레이션 보상은 수집되거나 소각된 수수료의 수에 관계없이 동일한 비율로 밸리데이터에게 지급됩니다.


## 밸리데이터 인트로

[밸리데이터](https://near.org/papers/the-official-near-white-paper/#economics)는 블록 생성 및 네트워크 보안을 담당합니다.

밸리데이터는 모든 샤드를 검증하므로 이를 실행하기 위해 높은 요구 사항이 설정됩니다(16GB RAM 및 1TB SSD 스토리지가 있는 8코어 CPU). 블록 생성 밸리데이터 노드를 실행하는 비용은 호스팅 시 월 $330로 추정됩니다. 자세한 내용은 [하드웨어 및 비용 견적 페이지](https://near-nodes.io/validator/hardware)를 참고하세요.

현재 활성 밸리데이터는 익스플로러에서 확인할 수 있습니다. The minimum seat price to become a block-producing validator is based on the 300th proposal. (If more than 300 proposals are submitted, the threshold will simply be the stake of the 300th proposal, provided that it’s larger than the minimum threshold of 25,500 $NEAR.) 블록 생성 밸리데이터가 되기 위한 가격은 익스플로러에서 실시간으로 업데이트됩니다. 해당 가격보다 높은 지분을 가진 밸리데이터 노드는 활성 밸리데이터 집합에 참여할 수 있습니다.

<blockquote class="lesson">
<strong>특정 밸리데이터 노드가 GPU 컴퓨팅을 제공할 수 있도록 하거나, CPU인 경우 GPU 컴퓨팅을 지원할 계획이 있나요?</strong><br /><br />

우리는 POS 체인이기 때문에 GPU 지원이 필요하지 않으며 검증 과정에 계산 능력이 거의 필요하지 않습니다.

<a href="https://github.com/near/wiki/blob/master/Archive/validators/about.md">Validator Quickstart</a> 및 <a href="https://github.com/near/wiki/blob/master/Archive/validators/faq.md">Staking FA</a>에서 합의 전략에 대해 자세히 알아볼 수 있습니다.
</blockquote>

## Chunk-Only 밸리데이터

Chunk-Only Producer는 하드웨어 및 토큰 요구 사항이 더 낮은 밸리데이터입니다. 이 새로운 역할은 네트워크의 밸리데이터 수가 증가하도록 할 것이고, 이를 통해 보상을 얻으며 NEAR 생태계를 보호할 수 있는 기회를 더 많이 만들 수 있습니다.

[Chunk-Only Producers](https://near.org/papers/the-official-near-white-paper/#economics)는 하나의 샤드(네트워크의 파티션)에서 [청크](https://near.org/papers/nightshade/#nightshade)(샤드의 블록 부분, 자세한 내용은 [Nightshade](https://near.org/papers/nightshade/) 참조) 를 생성할 책임이 있습니다. Because Chunk-Only Producers only need to validate one shard, they can run the validator node on a 8-Core CPU, with 16GB of RAM, and 500 GB SSD of storage.

밸리데이터와 마찬가지로 Chunk-Only Producer는 최소 연간 4.5%의 보상을 받습니다. 네트워크에 있는 토큰의 100% 미만이 스테이킹된 경우 Chunk-Only Producer는 훨씬 더 많은 보상을 받을 수 있습니다. Validator의 경제학에 대한 자세한 내용은 NEAR의 [Economics Explained](https://near.org/blog/near-protocol-economics/)를 확인하십시오 .

## 밸리데이터 전용 문서 사이트

밸리데이터 및 노드에 대해 자세히 알아보려면 [밸리데이터 전용 문서 사이트](https://near-nodes.io/)를 방문하세요 .

<blockquote class="lesson">
<strong>개발자가 취약하거나 악의적인 dApp을 작성하는 경우 밸리데이터는 암묵적으로 위험을 감수해야 하나요?</strong><br /><br />
 
아니요. 우리는 프로토콜 수준에서 네트워크에 대한 잠재적 손상을 방지하였습니다. 예를 들어, 함수 호출에 전달할 수 있는 데이터의 양이나 함수 호출 한 번에 수행할 수 있는 계산의 양 등을 제한하는 많은 제한 사항이 존재합니다. 즉, 단계 게이트 또는 승인 프로세스가 없기 때문에 스마트 컨트랙트 개발자는 자신의 dApp에 대해 책임을 져야 합니다. 모든 취약점은 스마트 컨트랙트 자체를 손상시킬 수 있습니다. 다행스럽게도 NEAR에서는 스마트 컨트랙트 업데이트가 매우 원활하므로, 취약점이 발견되었을 때 다른 블록체인과는 다르게 계정에 쉽게 업데이트/패치할 수 있습니다.
</blockquote>
