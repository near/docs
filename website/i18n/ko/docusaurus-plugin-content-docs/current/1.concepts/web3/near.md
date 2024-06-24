---
id: near
title: NEAR 프로토콜
sidebar_label: NEAR 프로토콜
---


초보자는 항상 [문서](/concepts/welcome)로 시작하는 것이 좋으며, NEAR에는 훌륭한 문서가 있습니다. 여기에서는 이후 장을 이해하는 데 필요한 기본 개념에만 초점을 맞추므로, 사전 NEAR 지식 없이도 전체 가이드를 이해할 수 있습니다.

## 계정 & 트랜잭션
NEAR의 계정 시스템은 매우 강력하며, 비트코인이나 이더리움과 같은 다른 블록체인과 상당히 다릅니다. 공개/개인 키 쌍으로 사용자를 식별하는 대신 계정을 일등 객체로 정의합니다. 여기에는 몇 가지 중요한 의미가 있습니다.
- 공개 키 대신 사용자는 읽을 수 있는 계정 이름을 사용할 수 있습니다.
- Multiple key pairs with [different permissions](../protocol/access-keys.md) can be used. 하나의 키 쌍이 손실되더라도 전체 계정이 손상되지 않고 영향이 매우 제한적이기 때문에 이는 사용자에게 더 나은 보안 모델을 제공합니다.
- 계층적 계정 구조가 지원됩니다. 이는 하나의 상위 계정에서 여러 스마트 컨트랙트를 관리하려는 경우에 유용하게 사용됩니다.
- 계정/공개 키는 블록체인에 저장되므로, 트랜잭션을 사용하여 생성됩니다.

More information on NEAR accounts can be [found in the docs](../protocol/account-model.md).

But an account by itself won’t get us anywhere, its [transactions](../protocol/transactions.md) that make things happen. NEAR에는 하나의 트랜잭션 유형만이 존재하지만, 트랜잭션 내에는 여러 Action이 포함될 수 있습니다. 대부분의 트랜잭션에는 하나의 작업이 포함되므로, 단순화를 위해 "Action"과 "트랜잭션"이라는 용어를 상호 교환적으로 사용할 것입니다. 각 트랜잭션에는 항상 발신자와 수신자 계정이 있습니다(그리고 발신자의 키로 암호화 서명됨). 다음과 같은 트랜잭션(Action) 유형이 지원됩니다.

- CreateAccount/DeleteAccount, AddKey/DeleteKey - 계정 및 키 관리 트랜잭션입니다.
- Transfer - 한 계정에서 다른 계정으로 NEAR 토큰을 보냅니다. 모든 블록체인의 기본 명령입니다.
- Stake - 지분 증명 블록체인 네트워크에서 밸리데이터가 되기 위해 필요합니다. We won’t touch this topic in this guideline, more information [can be found here](https://near-nodes.io/validator/staking-and-delegation).
- DeployContract - 주어진 계정에 스마트 컨트랙트를 배포합니다. 기억해야 할 중요한 사항으로, 하나의 계정은 하나의 컨트랙트만 보유할 수 있으므로, 컨트랙트는 계정 이름으로 고유하게 식별된다는 점이 있습니다. 이미 배포된 컨트랙트가 있는 계정에 이 트랜잭션을 발행하면 컨트랙트 업데이트가 트리거됩니다.
- FunctionCall - 블록체인에서 가장 중요한 Action으로, 스마트 컨트랙트의 함수를 호출할 수 있습니다.

NEAR의 스마트 컨트랙트는 Rust 또는 JavaScript로 작성되고, [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)로 컴파일됩니다. 각 컨트랙트에는 FunctionCall 트랜잭션을 통해 호출할 수 있는 하나 이상의 메서드가 있습니다. 메서드에는 인수가 제공될 수 있으므로 각 스마트 컨트랙트 호출에는 계정 ID, 메서드 이름 및 인수와 같은 페이로드가 포함됩니다.

스마트 컨트랙트에서 메서드를 호출하는 방법에는 두 가지가 있습니다.
1. FunctionCall 트랜잭션을 만듭니다. 이렇게 하면 블록체인에 새 트랜잭션이 생성되어 컨트랙트 상태를 수정할 수 있습니다.
2. 스마트 컨트랙트 view 호출을 작성합니다. NEAR 블록체인 [RPC 노드](https://near-nodes.io/intro/node-types#rpc-node)는 컨트랙트 상태를 수정하지 않는 메서드(읽기 전용 메서드)를 실행할 수 있는 특수 API를 제공합니다.


두 번째 방법은 트랜잭션 비용이 발생하지 않기 때문에 가능할 때마다 항상 사용해야 합니다(당연히, 노드를 돌리는 데에는 비용이 들지만 이는 트랜잭션보다는 훨씬 저렴합니다; 무료로 사용할 수 있는 퍼블릭 노드들도 존재합니다). 또한 트랜잭션이 없기 때문에, view 호출을 위해 계정이 필요하지 않으므로 클라이언트 측 애플리케이션을 구축하는 데 매우 유용합니다.

## 가스 및 스토리지

이미 논의한 바와 같이 사용자는 각 트랜잭션에 대해 계산 비용을 지불해야 합니다. This cost is called “gas” and is measured in [gas units](../protocol/gas.md) (this is an established term in the blockchain world). 트랜잭션이 생성될 때마다, 비용을 충당하기 위해 일정량의 가스가 추가됩니다. 간단한 트랜잭션의 경우, 가스를 미리 계산하여 정확한 금액을 첨부할 수 있습니다. 그러나 FunctionCall 트랜잭션의 경우, 정확한 비용을 사전에 자동 계산하는 것이 불가능하므로 일반적인 접근 방식은 비용을 충당할 수 있을 만큼 충분한 양의 가스를 첨부하고 초과분은 자동으로 환불됩니다.


![image](/docs/assets/web3/web3-7.png)




하지만 별도의 가스 단위가 필요한 이유는 무엇인가요? NEAR 토큰으로 직접 지불하지 않는 이유는 무엇일까요? 시간이 지남에 따라 네트워크가 발전함에 따라 가스 단위 비용은 변경될 수 있지만, 트랜잭션에 필요한 가스의 양은 일정하게 유지됩니다.

그러나 계산 비용이 전부는 아닙니다. 대부분의 스마트 컨트랙트에는 스토리지도 필요합니다. NEAR의 저장 비용은 가스와 상당히 다릅니다. 우선, 저렴하지 않습니다. 가스는 매우 저렴하고 사용자가 그 비용을 거의 인지할 수 없지만, 스토리지는 매우 비쌉니다. 결과적으로 스토리지 예산을 신중하게 계산하고 필요한 데이터만 블록체인에 저장해야 합니다. 모든 보조 데이터(컨트랙트 작업에 필요하지 않음)는 오프체인에 저장해야 합니다(가능한 솔루션은 이후 장에서 다룰 예정입니다). 두 번째 중요한 차이점은 스토리지를 구매하는 것이 아니라 임대하는 것입니다(NEAR에서는 이를 스테이킹이라고 합니다). 스마트 컨트랙트가 일부 데이터를 저장하려고 하면 저장 비용이 계산되고 적절한 양의 NEAR 토큰이 계정에 "잠깁니다". 데이터가 제거되면 토큰이 잠금 해제됩니다. 그리고 가스와 달리, 이 토큰들은 스마트 컨트랙트의 계정에 잠겨져 있기 때문에, 사용자가 이 비용을 직접 지불하지 않습니다.

그러나 사용자가 스토리지 비용을 지불(또는 스마트 컨트랙트 사용에 대한 수수료만 지불)하려면 어떻게 해야 할까요? 지금까지 토큰을 전송하는 유일한 방법은 전송 트랜잭션입니다. 또한 FunctionCall 트랜잭션을 통해 호출과 함께 토큰을 전송할 수도 있습니다(이를 보증금이라고 함). 스마트 컨트랙트는 적절한 양의 토큰이 전송되었는지 확인할 수 있으며, 충분하지 않은 경우 모든 작업 수행을 거부할 수 있습니다(초과 토큰은 환불).

가스 수수료와 보증금 첨부를 함께 사용하면, 개발자가 지원하는 데 비용이 들지 않고 블록체인에서 영원히 동작하는 컨트랙트를 생성할 수 있습니다. Even more, 30% of gas fees spent on the contract execution will go to a contract’s account itself (read more [here](https://near.org/blog/near-protocol-economics/#:~:text=a%20new%20entity.-,Contract%20rewards,-As%20one%20of)), so just by being used it will bring some income. 공정하게 말하면, 저렴한 가스 비용으로 인해 이것은 가장 인기 있고 자주 호출되는 컨트랙트에만 상당한 영향을 주지만, 그럼에도 불구하고 이러한 옵션을 갖는 것이 좋습니다.

스토리지에 대한 마지막 문제로, 스마트 컨트랙트 자체도 블록체인에 저장된 코드일 뿐이므로 DeployContract 트랜잭션에도 스토리지 비용이 발생한다는 점을 기억하십시오. 스마트 컨트랙트 코드는 상당히 클 수 있으므로 크기를 최적화하는 것이 중요합니다. 이에 대한 몇 가지 팁은 다음과 같습니다:
- Windows에서 Rust 코드를 빌드하지 마세요. 이는 상당히 큰 출력을 생성합니다. WSL을 사용하거나 다른 OS에서 빌드하세요.
- 스마트 컨트랙트 코드 크기를 최적화합니다 - [더 많은 정보는 여기서 확인하세요](/sdk/rust/contract-size).

자세한 내용은 [여기를 참조하세요](../storage/storage-staking.md).

## 클라이언트 통합

지금까지 클라이언트에 구애받지 않는 방식으로 스마트 컨트랙트를 호출하는 방법에 대해 논의하였습니다. 그러나 현실 세계에서 호출은 웹, 모바일 또는 데스크톱 애플리케이션과 같은 클라이언트 측에서 수행됩니다.

이전 장에서 배운 것처럼 각 트랜잭션은 키를 사용하여 서명해야 합니다. 그리고 키는 지갑에서 관리하기 때문에 각 애플리케이션이 지갑과 통합되어야 합니다. 이 글을 쓰는 시점에서 공식적으로 지원되는 [NEAR 지갑](https://wallet.near.org/)은 단 하나뿐입니다. 이는 웹 애플리케이션이므로, HTTP 리디렉션을 사용하여 통합이 이루어집니다. 이 작업은 웹 애플리케이션(JavaScript SDK 사용 가능)에서는 비교적 간단하지만, 모바일 또는 데스크톱 애플리케이션의 경우 딥 링크 또는 기타 고급 접근 방식이 필요할 수 있습니다.

트랜잭션 서명의 일반적인 흐름은 다음과 같습니다.


![image](/docs/assets/web3/web3-9.png)



트랜잭션을 생성하려고 할 때마다 클라이언트는 사용자를 지갑으로 리디렉션합니다. 여기서 트랜잭션이 승인되고, 지갑은 서명된 트랜잭션을 클라이언트로 다시 반환합니다(리디렉션을 통해). 이는 개인 키가 클라이언트에 노출되지 않기 때문에 매우 안전한 서명 방법이지만, 지속적인 리디렉션은 사용자를 빠르게 성가시게 할 수 있습니다. 특히 적은 가스 비용만 발생시키는 스마트 컨트랙트 기능을 호출하려는 경우에 특히 그렇습니다. That’s why NEAR introduced [two types of access keys](../../1.concepts/protocol/access-keys.md) - full keys and functional call keys. 이름에서 알 수 있듯이, 전체 액세스 키는 모든 유형의 트랜잭션에 서명하는 데 사용할 수 있습니다. 반면에 함수 호출 키는 이러한 UX 문제를 해결하는 것을 목표로 합니다. 그들은 특정 컨트랙트에 묶여 있으며, 가스 요금에 대한 예산이 존재합니다. 이러한 키는 NEAR 토큰을 전송하는 트랜잭션(지불 가능한 트랜잭션)에 서명하는 데 사용할 수 없으며 가스 요금을 충당하는 데만 사용할 수 있으므로, 보안에 그다지 중요하지 않고 클라이언트에 저장할 수 있습니다. 이 때문에 지불 불가능한 거래에 대해 간소화된 서명 흐름을 생성할 수 있습니다. 먼저 함수 호출 키를 얻기 위한 로그인 흐름이 사용됩니다.


![image](/docs/assets/web3/web3-10.png)



클라이언트는 새로운 키 쌍을 생성하고, 이를 지정된 컨트랙트 대한 함수 호출 키로 추가하도록 지갑에 요청합니다. 그런 다음 클라이언트가 생성된 키 쌍을 가질 때까지 로그인 세션이 실행됩니다. 또한 최상의 사용자 경험을 제공하기 위해 두 키의 사용이 결합됩니다. 서명 유형은 트랜잭션 유형(유료 또는 비지불)에 따라 결정됩니다. 지불 가능한 트랜잭션의 경우 지갑 리디렉션이 있는 흐름이 사용되며, 그렇지 않으면 단순화된 로컬 서명 흐름(저장된 함수 호출 키 사용)이 적용됩니다.


<div align="center">
<img src="/docs/assets/web3/web3-11.png" alt="image" width="300" />
</div>

함수 호출 키와 동일한 키 추가 흐름을 사용하여 전체 액세스 키를 생성할 수 있지만, 이러한 키가 손상되면 계정에 대한 모든 권한이 부여되므로 이는 매우 위험합니다. 전체 키로 직접 작업하려는 애플리케이션은 특히 보안 문제에서 극도의 주의를 기울여 설계해야 합니다.

## 교차 컨트랙트 호출

이제까지 클라이언트로부터 스마트 컨트랙트를 호출하는 방법에 대해 논의했습니다. 그러나 단일 스마트 컨트랙트로는 많은 것들을 할 수 없습니다. 진정한 힘은 스마트 컨트랙트들이 함께 작동하고 서로 소통할 때 달성됩니다. 이를 달성하기 위해 NEAR는 하나의 컨트랙트가 다른 컨트랙트의 메서드를 호출할 수 있는 교차 컨트랙트 호출 기능을 제공합니다. 일반적인 흐름은 다음과 같습니다.



![image](/docs/assets/web3/web3-12.png)




간단해 보이지만, 몇 가지 문제가 있습니다.
- 호출 상태(성공 또는 실패)와 반환 값을 호출 컨트랙트에 제공하려면 콜백 메서드를 호출해야 하므로, ContractA 혼자서 활성화될 수 없습니다. 대신 사용자가 먼저 엔트리 메서드를 호출한 다음, 교차 컨트랙트 호출 완료에 대한 응답으로 콜백을 호출합니다.
- Transaction status is determined by the success or failure of a first function call. 예를 들어 ContractB.methodB 또는 ContractA.methodACb 호출이 실패해도 트랜잭션은 성공한 것으로 간주됩니다. 실패가 예상되는 경우, 적절한 롤백을 보장하기 위해 사용자 지정 롤백 코드를 ContractA.methodACb에 작성해야 하며, 콜백 메서드 자체가 전혀 실패하지 않아야 합니다. 그렇지 않으면 스마트 컨트랙트 상태가 일관되지 않은 상태로 남을 수 있습니다.
- 교차 컨트랙트 호출에는 호출 컨트랙트에 의해 첨부된 가스가 있어야 합니다. 사용 가능한 총 가스는 호출 사용자와 함께 트랜잭션에 연결되고, 컨트랙트에 의해 호출 체인 내부에 배포됩니다. 예를 들어 사용자가 15TGas를 첨부한 경우, ContractA는 5TGas를 예약하고 나머지는 ContractB에 전달할 수 있습니다. 사용하지 않은 모든 가스는 사용자에게 환불됩니다.


![image](/docs/assets/web3/web3-13.png)



- NEAR 토큰은 교차 컨트랙트 호출에도 첨부될 수 있지만, 가스와는 다른 방식으로 작동합니다. 첨부된 보증금은 이전 계정에서 직접 가져옵니다. 즉, 사용자가 보증금을 첨부하지 않았더라도 컨트랙트는 여전히 ​​계정에서 토큰을 가져와 첨부할 수 있습니다. 또한, 교차 컨트랙트 호출 실패는 트랜잭션 실패를 의미하지 않으므로, 자동 환불은 없습니다. 모든 환불은 롤백 코드에서 명시적으로 이루어져야 합니다.


![image](/docs/assets/web3/web3-14.png)



실패 모드에 대한 몇 가지 참고 사항 - 스마트 컨트랙트는 분산된 환경에서 실행되기 때문에 단일 실패 지점이 없으므로, 환경 문제(예: 시스템이 갑자기 전원이 끊어진 경우 또는 네트워크 연결 실패)로 인해 실패하지 않습니다. 유일하게 가능한 오류는 코드 자체에서 발생하므로 오류를 예측하고 적절한 장애 조치 코드를 추가할 수 있습니다.

일반적으로 교차 컨트랙트 호출 그래프는 매우 복잡할 수 있습니다(하나의 컨트랙트가 여러 컨트랙트를 호출하고 일부는 조건부로 호출 선택을 수행할 수도 있음). 유일한 제한 요소는 첨부된 가스의 양이며, 트랜잭션 당 얼마나 많은 가스를 가질 수 있는지에 대한 네트워크에 의해 정의된 하드 캡이 있습니다(이는 네트워크에 대한 모든 종류의 DoS 공격을 방지하고 합리적인 범위 내에서 컨트랙트 복잡성을 유지하는 데 필요합니다).

## 데이터 구조, 인덱서 및 이벤트

우리는 이미 NEAR에서 스토리지 모델에 대해 논의했지만, 정확한 구조를 가져오지 않고 추상적인 용어로만 다루었으므로 이제 좀 더 깊이 파고들 차례입니다.

기본적으로 NEAR 스마트 컨트랙트는 데이터를 키-값 쌍으로 저장합니다. 가장 단순한 어플리케이션이라도, 보통은 고급 데이터 구조를 요구하기 때문에 이는 상당히 제한적입니다. To help in development, NEAR provides [SDK for smart contracts](https://github.com/near/near-sdk-rs), which includes data structures like [vectors, sets and maps](../../1.concepts/storage/data-collections.md#rust-collection-types-rust-collection-types). 이는 매우 유용하지만 다음과 같은 몇 가지 사항을 기억하는 것이 중요합니다.
- 궁극적으로 이들은 바이너리 값으로 저장됩니다. 즉, 그것들을 직렬화하고 역직렬화하는 데 약간의 가스가 필요함을 의미합니다. 또한 작업마다 가스 비용이 다릅니다([복잡도 표](../../1.concepts/storage/data-collections.md#big-o-notation-big-o-notation-1)). 이 때문에 데이터 구조를 신중하게 선택하는 것이 매우 중요합니다. 나중에 다른 데이터 구조로 이동하는 것은 쉽지 않으며, 데이터 마이그레이션이 필요할 수 있습니다.
- 매우 유용하긴 하지만 벡터, 맵 및 집합은 기존 관계형 데이터베이스의 유연성 및 성능과 일치하지 않습니다. 간단한 필터링 및 검색의 구현도 상당히 복잡할 수 있으며 실행하는 데 많은 가스가 필요할 수 있습니다.
- 이 자료형들은 단일 컨트랙트 내로 제한됩니다. 여러 컨트랙트의 데이터가 필요한 경우 교차 컨트랙트 호출을 사용하거나, 클라이언트 측에서 집계를 수행해야 하며 이는 가스 및 시간 측면에서 상당히 비쌉니다.

더 복잡한 데이터 검색 시나리오를 지원하려면 스마트 컨트랙트 데이터를 관계형 데이터베이스와 같은 더 적절한 저장소에 넣어야 합니다. Indexers are used to achieve this. 간단히 말해서 인덱서는 들어오는 트랜잭션을 처리하고 관련 데이터를 데이터베이스에 저장하는 특별한 종류의 블록체인 노드입니다. 수집된 데이터는 간단한 API 서버(예: REST 또는 GraphQL)를 사용하여 클라이언트에 노출될 수 있습니다.


![image](/docs/assets/web3/web3-15.png)



In order to simplify creation of indexers, [NEAR Indexer Framework](/concepts/advanced/near-indexer-framework) has been created. 그러나 사용 가능한 프레임워크가 있더라도 트랜잭션에서 데이터를 추출하는 것은 쉬운 작업이 아닐 수 있습니다. 각 스마트 컨트랙트에는 고유한 구조와 데이터 저장 모델이 있기 때문입니다. 이 프로세스를 단순화하기 위해 스마트 컨트랙트는 결과에 대한 구조화된 정보를 로그에 기록할 수 있습니다(예: JSON 형식). 각 스마트 컨트랙트 그러한 로그에 대해 자체 형식을 사용할 수 있지만, 일반적인 형식은 [이벤트](https://nomicon.io/Standards/EventsFormat)로 표준화하는 것입니다.

이러한 아키텍처를 통해, 이벤트(트랜잭션)를 저장하고 인덱서를 사용하여 관계형 데이터베이스로 구체화하는 이벤트 소싱과 블록체인이 매우 유사한 특징을 가지게 됩니다. 이는 동일하게 단점도 적용됨을 의미합니다. 예를 들어, 클라이언트는 몇 초 정도 걸릴 수 있는 인덱싱 딜레이를 수용하도록 설계되어야 합니다.

데이터베이스와 API 서버로 자체 인덱서를 구축 하는 대신 현재 [NEAR를 베타 서비스로 지원](https://thegraph.com/docs/en/supported-networks/near/) 하는 [The Graph](https://thegraph.com/en/)를 대신 사용할 수 있습니다. The Graph는 Indexer-as-a-Service 모델을 사용하여 작동하며, 분산형 인덱싱 구현체도 존재합니다.

## 개발 도구

이제 WEB 3.0 애플리케이션 개발을 시작하는 데 필요한 개념에 익숙해졌으므로 사용 가능한 개발 도구를 살펴보겠습니다.

우선 개발 및 테스트 환경이 필요합니다. 물론 이론상 메인 블록체인 네트워크에서 개발과 테스트를 수행할 수 있지만 비용이 저렴하지는 않습니다. 이러한 이유로 NEAR는 개발 중에 사용할 수 있는 [여러 네트워크](../basics/networks.md)를 제공합니다.
- testnet - 메인넷과 동일하고 무료로 사용할 수 있는 퍼블릭 NEAR 네트워크입니다.
- localnet - 로컬 환경에 개인 NEAR 네트워크를 배포할 수 있습니다. 이는 당신의 소유이기 때문에, 개발 중에 데이터와 코드를 비공개로 유지할 수 있습니다. More info on how you can run your own node can be [found here](https://near-nodes.io/validator/running-a-node). Alternatively, you can bootstrap an entire testing infrastructure in Docker on your local machine using Kurtosis - [guide is here](../../2.build/2.smart-contracts/testing/kurtosis-localnet.md).
- 작업 공간 - 자체 로컬 네트워크를 시작하여 e2e 테스트를 수행할 수 있습니다. More info [here](../../2.build/2.smart-contracts/testing/integration-test.md).

사용할 네트워크를 선택한 후에는 네트워크와 상호 작용할 방법이 필요합니다. Of course, transactions can be constructed manually and posted into [node’s API](/api/rpc/setup). 그러나 이것은 [지루하고](https://github.com/near-examples/transaction-examples) 전혀 재미가 없습니다. 그렇기 때문에 NEAR 는 필요한 모든 작업을 자동화 하는 [CLI를 제공합니다](../../4.tools/cli.md). 이를 개발 목적으로 로컬에서 사용하거나 CI/CD 시나리오용 빌드 머신에서 사용할 수 있습니다.

NEAR 네트워크에서 계정을 관리하기 위해 [지갑](https://wiki.near.org/overview/tokenomics/creating-a-near-wallet)을 사용할 수 있습니다. 이를 통해 효과적으로 계정 잔액과 활성 키를 표시할 수 있습니다.

![image](/docs/assets/web3/web3-16.png)


위의 이미지에서 "Reserved for storage"는 현재 스토리지 요구 사항을 충족하기 위해 스마트 컨트랙트에 의해 잠긴 토큰입니다. "Reserved for transaction"은 함수 호출 키의 가스 비용을 충당하기 위해 잠긴 토큰의 양을 나타냅니다. 현재는 하위 계정을 지갑에 연결하는 UI가 없습니다. 이를 수행하려면, 특별히 구성된 링크를 통해 직접 가져와야 합니다:
```
https://testnet.mynearwallet.com/auto-import-secret-key#YOUR_ACCOUNT_ID/YOUR_PRIVATE_KEY
```
(해당 계정에 대한 전체 액세스 키의 개인 키를 제공해야 하므로 이 링크가 안전하게 사용되는지 확인하세요.)

마지막으로 NEAR 익스플로러를 사용하여 블록체인 트랜잭션을 볼 수 있습니다. 이는 트랜잭션 실행 및 결과에 대한 인사이트를 제공합니다. Let’s look at [one example](https://testnet.nearblocks.io/txns/ABh4zQ5aZ3CGhpQzstL16TAB8TvqPbiirJG1uTPJVxTt). 먼저 발신자, 수신자, 상태와 같은 일반적인 트랜잭션 정보를 볼 수 있습니다. 그런 다음 가스 사용 정보를 볼 수 있습니다:
- 첨부된 가스 - 트랜잭션에 제공된 총 가스입니다.
- 사용된 가스 - 실제 가스 지출입니다.
- 트랜잭션 수수료 - 사용된 가스에 현재 가스 가격을 곱하여 실제 트랜잭션 비용을 NEAR 토큰으로 표시합니다. 또한 Deposit Value는 송신자로부터 수신자에게 전송된 NEAR 토큰의 양을 보여줍니다.

![image](/docs/assets/web3/web3-17.png)


그 아래에서 트랜잭션 작업을 검사할 수 있습니다(트랜잭션에 여러 작업이 있을 수 있습니다). 이 경우 인수가 있는 단일 FunctionCall 작업이 있습니다.

![image](/docs/assets/web3/web3-18.png)


마지막에는 토큰 전송, 로그, 교차 컨트랙트 호출 및 가스 환불을 포함한 트랜잭션 실행에 대한 세부 정보가 제공됩니다. One thing that we haven’t covered yet is shown here - [receipts](../protocol/transactions.md#receipt-receipt). 이는 대부분의 경우 특정 목적을 위해 트랜잭션 내 구현되는 세부 사항일 뿐입니다. 이는 트랜잭션 익스플로러에서 트랜잭션 실행 방법을 이해하는 데 매우 유용하지만, 외부에서는 실제로 관련이 없습니다.

![image](/docs/assets/web3/web3-19.png)



## 컨트랙트 업그레이드

개발 중에, 때로는 프로덕션 단계에서도 컨트랙트 코드(또는 데이터)에 대한 업데이트가 필요합니다. 그렇기 때문에 다양한 컨트랙트 업그레이드 메커니즘이 만들어졌습니다.

While developing the contract, we recommend just creating a new account each time you need to deploy a contract (the [create-account](../../4.tools/cli.md#near-create-account) command in NEAR CLI exists for this). With such an approach, you will start with a clean state each time.

그러나 테스트나 프로덕션과 같은 안정적인 환경으로 이동하면 보다 정교한 방법이 필요합니다. 코드 재배치는 매우 간단합니다. 다른 `DeployContract` 트랜잭션을 발행하면 NEAR가 처리해 줄 것입니다. The biggest challenge is to migrate contract state - [several approaches are possible](../../2.build/2.smart-contracts/release/upgrade.md#migrating-the-state), but all of them involve some kind of migration code.

그러나 우리는 업그레이드 전략을 한 단계 더 발전시킬 수 있습니다. 이전 전략에서는 개발자가 코드 업그레이드를 완전히 제어할 수 있습니다. 이것은 많은 애플리케이션에 적합하지만, 사용자의 동의 없이 언제든지 악의적인 변경이 이루어질 수 있기 때문에(npm 세계에서 [때때로](https://www.bleepingcomputer.com/news/security/dev-corrupts-npm-libs-colors-and-faker-breaking-thousands-of-apps/) 발생 하는 것처럼) 사용자와 개발자 사이에 일정 수준의 신뢰가 필요합니다. To solve this, a contract update process itself can also be decentralized - this is called [Programmatic Updates](../../2.build/2.smart-contracts/release/upgrade.md#programmatic-update). 정확한 전략은 다를 수 있지만, 기본 아이디어는 컨트랙트 업데이트 코드가 스마트 컨트랙트 자체에서 구현되고, 컨트랙트 계정에 대한 전체 액세스 키가 블록체인에서 제거된다는 것입니다(DeleteKey 트랜잭션을 통해). 이러한 방식으로 업데이트 전략은 모든 사람에게 투명하며 개발자가 마음대로 변경할 수 없습니다.

## 더 많은 정보

NEAR에 대해 자세히 알아보려면 다음 링크들이 유용합니다.

- [NEAR 문서](https://docs.near.org)
- [Rust 스마트 컨트랙트 문서](/sdk/rust/introduction)
- [Smart Contract quick start guide](../../2.build/2.smart-contracts/quickstart.md)
- [NEAR Protocol Specification](https://nomicon.io/)
- [How to build a dApp on NEAR](../../3.tutorials/examples/guest-book.md)
