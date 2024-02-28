---
id: faq
title: 통합 FAQ
sidebar_label: 통합 FAQ
---

## Orientation

### What is a good project summary for NEAR?

NEAR는 샤딩된 공개 지분 증명(Proof-of-Stake) 블록체인 및 스마트 컨트랙트 플랫폼입니다. Rust로 구축되었으며 컨트랙트는 WASM으로 컴파일됩니다. 이는 개념적으로 Ethereum 2.0과 유사합니다.

### What's special about NEAR?

NEAR는 빌더를 위한 블록체인입니다.

웹 개발의 기본 사항을 이해한다면 새로운 도구나 언어를 배우지 않고도 가장 개발자 친화적인 블록체인에서 확장 가능한 탈중앙화 애플리케이션을 몇 분 만에 작성, 테스트 및 배포할 수 있습니다.

### Is NEAR open source?

그렇습니다. Have a look at our [GitHub organization](https://github.com/near).

### How are cryptographic functions used?

우리는 계정 키에 대해 `secp256k1`과 `ed25519`, 트랜잭션 서명에 `ed25519`를 지원하고 있습니다. 현재 암호화를 위해 `ed25519_dalek`과 `sha2` 라이브러리를 사용하고 있습니다.

### Do you have any on-chain governance mechanisms?

NEAR는 현재 온체인 거버넌스가 없습니다. 상태 또는 상태 전환 함수에 대한 모든 변경은 하드 포크를 통해 수행되어야 합니다.

### Do you have a bug-bounty program?

우리의 계획은 보고된 문제에 대해 얼만큼 지불할지에 대한 명확한 지침이 있는 투명한 버그 바운티 프로그램을 갖는 것입니다. 지불할 금액은 문제 심각도에 따라, 프로토콜 개발자가 제공하는 공개 순위를 기반으로 할 것입니다.

### What contracts should we be aware of right now?

우리는 여러 [초기 컨트랙트](https://github.com/near/core-contracts)를 개발했습니다. **굵게 표시된** 것들이 작성 시점에 가장 성숙한 코드입니다.

- **스테이킹 풀 / 위임 컨트랙트**
- **락업 / 베스팅 컨트랙트**
- 화이트리스트 컨트랙트
- 스테이킹 풀 팩토리
- 다중 서명(Multisig) 컨트랙트

### Do you have a cold wallet implementation (ie. Ledger)?

https://github.com/near/near-ledger-app

## Validators

### What is the process for becoming a validator?

검증은 무허가이며, 경매를 통해 결정됩니다. 밸리데이터가 되고자 하는 사람은 하루 전에 체인에 특정 트랜잭션을 제출하여 얼마나 많은 토큰을 걸고 싶은지 나타냅니다. 다음 에포크 동안 검증 자리를 얻기 위해 필요한 최소 지분을 결정하는 경매가 실행되며, 제출된 금액이 최소 임계값보다 큰 경우 제출자는 다음 에포크 동안 적어도 하나의 샤드를 검증할 수 있습니다.

### How long does a validator remain a validator?

다음 이유로, 밸리데이터는 자격이 정지될 수 있습니다.

- 충분한 블록 또는 청크를 생성하지 않습니다.
- 지분이 충분히 크지 않아 다음 에포크의 경매에서 선출되지 않습니다.
- 슬래싱을 당합니다. 그렇지 않으면 밸리데이터는 자격을 무기한 유지할 수 있습니다.

밸리데이터 선출은 에포크에서 발생합니다. The [Nightshade whitepaper](/docs/Nightshade.pdf) introduces epochs this way: "the maintenance of the network is done in epochs" where an epoch is a period of time on the order of half a day.

각 에포크가 시작될 떄, 계산을 통해 _바로 다음 에포크_ 에 대한 밸리데이터 목록을 생성합니다 . 이 계산에 대한 입력에는 "밸리데이터가 되기 위해 손을 든" 모든 계정이 포함되며, 이전 에포크의 밸리데이터뿐만 아니라 시스템의 스테이킹 임계값을 초과하는 일정량의 토큰 제공을 표현하는 특수 트랜잭션([`StakeAction`](https://nomicon.io/RuntimeSpec/Actions.html#stakeaction))을 제출한 모든 사람이 포함됩니다. 이 계산을 통해 바로 다음 에포크의 밸리데이터 목록이 출력됩니다.

### What is the penalty for misbehaving validators?

밸리데이터는 오프라인 상태여도 슬래싱되지 않지만, 밸리데이터에 대한 보상을 받지 못합니다. 너무 많은 블록 또는 청크를 놓친 밸리데이터는 다음 검증 세트에서 제거되며, 보상을 받지 못합니다(다시 말하지만, 슬래싱 없음).

Any foul play on the part of the validator that is detected by the system may result in a "slashing event" where the validator is marked as out of integrity and forfeit their stake (according to some formula of progressive severity). 슬래싱된 지분은 소각됩니다.

### What is the mechanism for delegating stake to validators?

NEAR는 지분을 위임하기 위해, 스마트 컨트랙트에서 사용할 수 있는 별도의 검증 키를 지원합니다. 위임은 스마트 컨트랙트를 통해 이루어지고, 여기서 밸리데이터는 지분을 수집하고 관리하며 보상을 분할하는 맞춤형 방법을 정의할 수 있습니다. 이를 통해 밸리데이터는 지분에 대한 레버리지 또는 파생 상품을 제공할 수 있습니다. 다른 지분과 마찬가지로, 위임된 지분은 노드가 오작동하는 경우 슬래싱됩니다.

밸리데이터가 오작동하는 경우 위임자의 자금도 삭감됩니다. 위임자가 지분을 출금하는 데에는 대기 시간이 따로 없습니다.

### Does a validator control funds that have been delegated to them?

위임은 수탁 서비스입니다(자금을 다른 계정, 즉 스테이킹 풀을 구현하는 스마트 컨트랙트로 이체하고 있습니다). 작성 시점에서, 100명의 밸리데이터가 보안을 검토하고 테스트하는 참조 구현을 제공하고 있습니다.

우리는 밸리데이터가 새 컨트랙트를 작성하고 배포할 수 있도록 허용하지만, 위임 여부를 결정하는 것은 사용자에게 달려 있습니다. 밸리데이터는 수수료 최적화 등에 대해 다양한 논리와 조건을 선택하여 위임에 대해 경쟁할 수 있습니다.

현재 슬래싱은 없지만, 시스템에 샤드를 추가함에 따라 추가될 예정입니다. 어느 시점에서 밸리데이터는 위임자를 슬래싱으로부터 보호하는 옵션을 추가할 수 있습니다(Tezos 모델과 유사).

### How do we get the balance of an account after it has delegated funds?

잔액을 가져오려면 스테이킹 풀 컨트랙트를 쿼리해야 합니다.

## Nodes

### Can a node be configured to archive all blockchain data since genesis?

그렇습니다. 다음 명령을 사용하여 노드를 시작합니다.

```sh
./target/release/near run --archive
```

### Can a node be configured to expose an RPC (ex: HTTP) interface?

그렇습니다. 모든 노드는 노드 내 `config.json` 파일에서 `listen_addr:port` 값을 설정하는 방식으로, 이 인터페이스를 기본적으로 노출합니다.

### Can a node be gracefully terminated and restarted (using archived data on disk to continue syncing)?

그렇습니다.

### Does a node expose an interface for retrieving health telemetry in a structured format (ex: JSON) over RPC?

그렇습니다. `GET /status`와 `GET /health`가 이 인터페이스를 제공합니다.

- `/status`: 블록 높이, 동기화 상태, 피어 수 등을 나타냅니다.
- `/health`: 노드가 실행 중이고 진행 중일 때 성공/실패를 나타냅니다.

### Can a node be started using a Dockerfile without human supervision?

그렇습니다.

```sh
docker run <port mapping> <mount data folder> <ENV vars> nearprotocol/nearcore:latest
```

다른 구성 예시를 보려면, `nearcore/scripts/nodelib.py`를 확인하세요.

### What is the source of truth for current block height exposed via API?

- MainNet
  - https://nearblocks.io
  - `https://rpc.mainnet.near.org/status`
- TestNet
  - https://testnet.nearblocks.io
  - `https://rpc.testnet.near.org/status`

### How old can the referenced block hash be before it's invalid?

모든 네트워크에서 제네시스 매개변수는 다음과 같이 확인할 수 있습니다.

```sh
http post https://rpc.testnet.near.org jsonrpc=2.0 id=dontcare method=EXPERIMENTAL_genesis_config
# in the line above, testnet may be replaced with mainnet or betanet
```

이는 `43200` 초 또는 `~12` 시간입니다. [`protocol_config` RPC 엔드포인트](/api/rpc/setup#protocol-config)를 통해 `epoch_length`에 대한 실시간 구성 정보를 확인할 수도 있습니다.

응답에서 `transaction_validity_period": 86400`임을 확인할 수 있습니다(블록을 생성하는 데 약 1초가 걸리므로, 이 기간은 약 24시간입니다)

## Blockchain

### How will the network will be bootstrapped?

제네시스에서의 배포는 NEAR 팀, 기여자, 프로젝트 파트너(예: 기여자, 베타 애플리케이션, 인프라 개발자 등) 및 NEAR 재단에 분배되었습니다(메인넷 이후 분배를 위해 많은 부분이 분리되었으며, 재단이 네트워크를 제어할 수 없도록 하였습니다).

향후 2년 동안 플랫폼 런칭 후 많은 양의 토큰을 할당할 경매가 있을 것입니다. 또한 우리는 참여하는 밸리데이터가 실제 토큰으로 보상을 받는 테스트넷을 실행할 계획입니다. 우리는 출시 시점에 밸리데이터가 될 최소 50개의 주체들을 온보딩할 계획입니다.

### What is the network upgrade process?

현재 새로운 제네시스 블록으로 재시작하는 방식을 통해 업그레이드 중입니다.

### Which consensus algorithm does NEAR use?

NEAR는 샤딩된 **지분 증명** 블록체인입니다.

_You can read more in our [Nightshade whitepaper](/docs/Nightshade.pdf)._

> _편의를 위해 몇 가지 관련 세부 정보를 말씀드리겠습니다._
> 
> [NEAR는 샤딩된 블록체인이기 때문에, 상태 유효성 및 데이터 가용성 문제를 포함하여 극복해야 할 과제가 있습니다]. _Nightshade_ 는 이러한 문제를 해결하기 위해 NEAR 프로토콜이 구축한 솔루션입니다
> 
> Nightshade는 가장 무거운 체인 합의를 사용합니다. 특히 블록 생산자가 블록을 생산할 때(섹션 3.3 참조), 이전 블록을 증명하는 다른 블록 생산자와 밸리데이터로부터 서명을 수집할 수 있습니다. 블록의 가중치는 서명이 블록에 포함된 모든 서명자의 누적된 지분입니다. 체인의 가중치는 블록 가중치들의 합입니다.
> 
> 가장 무거운 체인 합의를 바탕으로, 우리는 블록을 완성하기 위해 증명을 사용하는 파이널리티 가젯을 사용합니다. 시스템의 복잡성을 줄이기 위해 포크 선택 규칙에 어떤 식으로든 영향을 미치지 않는 파이널리티 가젯을 사용하고, 대신 블록이 파이널리티 가젯에 의해 완료되면 총 지분의 매우 많은 비율이 삭감되지 않는 한 포크가 불가능하도록 추가 슬래싱 조건만 도입하였습니다.

### How does on-chain transaction finality work?

완결성은 결정론적이며, 최소 3개의 블록과 현재 밸리데이터 집합에서 (2/3 +1) 개의 서명이 필요합니다.

정상적으로 작동한다면 트랜잭션 완결은 3 번째 블록에서 바로 발생할 것으로 예상되지만, 이것이 보장되지는 않습니다.

완결성은 블록 또는 트랜잭션을 쿼리할 때 RPC를 통해 노출됩니다.

완결성에 대한 우리의 정의는 다음 두 가지입니다.

- 블록에는 파이널리티 가젯의 pre-commit 정족수가 존재합니다. See details of the finality gadget [[here]](/docs/PoST.pdf)
- 해당 블록 위에 최소 120개의 블록(2-3분 소요)이 구축됩니다. 이것은 일부 샤드에서 유효하지 않은 상태 전환과 관련이 있으며, 상태 변경 문제에 대해 충분한 시간을 제공합니다. 만약 모든 샤드가 추적되고 노드에서 일부 일시 중지 메커니즘이 사용되는 경우에는 필요하지 않습니다. 거래 시 모든 샤드를 추적하는 것이 좋습니다.

## Accounts

### How are addresses generated?

https://nomicon.io/DataStructures/Account.html에서 계정에 대한 설명을 확인하세요.

### What is the balance record-keeping model on the NEAR platform?

NEAR는 `Account` 기반 모델을 사용합니다. 모든 사용자 및 컨트랙트는 최소 1개의 계정과 연결됩니다. 각 컨트랙트는 단일 샤드에 있습니다. 각 계정에는 트랜잭션 서명을 위한 여러 개의 키가 있을 수 있습니다.

_[여기](https://nomicon.io/DataStructures/Account.html)에서 NEAR 계정에 대한 자세한 내용을 읽을 수 있습니다._

### How are user accounts represented on-chain?

사용자는 사람이 읽을 수 있는 이름(예: `alice`)으로 계정을 만들고, 이는 개별 권한이 있는 여러 키 쌍을 포함할 수 있습니다. 계정은 네트워크의 기본 트랜잭션을 통해 당사자 간에 원자적이고 안전하게 전송될 수 있습니다. 계정 권한은 스마트 컨트랙트로도 프로그래밍할 수 있습니다. 예를 들어, 잠금 컨트랙트 잠금 해제된 것보다 더 많은 자금을 이체할 수 없도록 하는 키에 대한 권한이 있는 계정일 뿐입니다.

### Is there a minimum account balance?

온체인 "더스트"(더스트 공격을 의미)를 제한하기 위해 계정(및 컨트랙트)에는 환불 가능한 보증금이 청구되고, 이를 통해 체인에 데이터를 저장할 수 있습니다. 즉, 추가 데이터 저장을 위해 증가한 보증금을 감당하기에 충분한 잔액이 계정에 없으면, 추가 데이터 저장이 실패합니다. 또한 모든 사용자는 자신의 계정을 제거하고 남은 잔액을 다른(수령자) 계정으로 이체할 수 있습니다.

향후, 이러한 방식으로 제거된(또는 잠든) 계정에 대한 복원 메커니즘이 구현될 것입니다.

### How many keys are used?

스토리지에 충분한 토큰이 있는 한 계정은 가지고 싶은 만큼 많은 키를 가질 수 있습니다.

### Which balance look-ups exists? What is required?

[계정을 보기 위한 RPC 메서드](/api/rpc/setup#view_account)가 있습니다.

이에 대한 [JS 구현은 여기](https://github.com/near/near-api-js/blob/d7f0cb87ec320b723734045a4ee9d17d94574a19/src/providers/json-rpc-provider.ts#L73)에 있습니다. 이 RPC 인터페이스에서 최종 요구 사항(최신 상태 또는 최종 상태를 쿼리할지 여부)을 지정할 수 있습니다.

For custody purposes, it is recommended not to rely on latest state but only what is finalized.

## Fees

### What is the fee structure for on-chain transactions?

NEAR는 일반적으로 네트워크 혼잡도에 따라 가격이 결정론적으로 조정되는 가스 기반 모델을 사용합니다.

사용 가능한 샤드 수(따라서 처리량)를 변경하는 리샤딩을 통해, 너무 큰 변화를 방지합니다.

계정에는 연결된 리소스가 없습니다. 가스량은 함수 호출을 제외한 모든 트랜잭션에 대해 미리 결정됩니다. 함수 호출 트랜잭션의 경우, 사용자(또는 개발자일 가능성이 더 높음)는 필요한 양의 가스를 첨부합니다. 함수 호출 후 일부 가스가 남으면 다시 NEAR로 전환되어 원래 계정으로 환불됩니다.

### How do we know how much gas to add to a transaction?

- 다음 문서를 참고하세요: https://nomicon.io/Economics/
- 여기에서 [RPC를 통해 가스 가격을 조회](/api/rpc/setup#gas-price)하는 API 문서를 참고하세요.

트랜잭션 발행자는 트랜잭션을 처리할 예산을 추측하여 일정량의 가스를 첨부해야 합니다. 컨트랙트는 서로 다른 교차 컨트랙트 호출에 얼마만큼 자금을 지원해야 하는지 알고 있습니다. 가스 가격은 블록당 계산되고 고정되지만, 블록이 얼마나 가득 차 있는지/사용 중인지에 따라 블록마다 변경될 수 있습니다. 블록이 절반 이상 차면 가스 가격이 상승합니다.

우리는 또한 최대 가스 가격 제한을 추가하는 것을 고려하고 있습니다.

## Transactions

### How do we follow Tx status?

[여기에서 트랜잭션 상태를 가져오기 위한 관련 RPC 인터페이스](/api/rpc/setup#transaction-status)를 참고하세요.

### How are transactions constructed and signed?

트랜잭션은 보낸 사람이 개인 키를 사용하여 구성하고 암호학적으로 서명한 데이터 모음입니다. 관련 공개 키는 트랜잭션의 일부이며, 서명 확인에 사용됩니다. 서명된 트랜잭션만 네트워크로 보내 처리할 수 있습니다.

트랜잭션은 오프라인에서 구성하고 서명할 수 있습니다. 서명에는 노드가 필요하지 않습니다. 다양한 리플레이 공격을 방지하기 위해, 선택적으로 최근 블록 해시를 추가할 계획입니다.

문서의 개념 섹션에서 [트랜잭션](/concepts/basics/transactions/overview) 문서를 참고하세요.

### How is the hash preimage generated? Which fields does the raw transaction consist of?

트랜잭션의 경우, 우리는 트랜잭션 해시에 서명합니다. 보다 구체적으로, 서명된 것은 borsh( https://github.com/near/borshsha256)를 통해 직렬화된 트랜잭션 객체의 `sha256`입니다.

### How do transactions work on the NEAR platform?

A `Transaction` is made up of one or more `Action`s. Action은 (현재) 다음과 같은 8가지 유형 중 하나가 될 수 있습니다: `CreateAccount`, `DeployContract`, `FunctionCall`, `Transfer`, `Stake`, `AddKey`, `DeleteKey`, `DeleteAccount`. 트랜잭션은 발신자에 의해 구성된 다음, 유효한 NEAR 계정의 개인 키를 사용하여 서명되어 `SignedTransaction`를 생성합니다. 이 서명된 트랜잭션은 네트워크로 보내 처리될 준비가 된 것으로 간주됩니다.

트랜잭션은 JSON-RPC 엔드포인트를 통해 수신되며, `sender` 계정이 있는 샤드 위치로 라우팅됩니다. 발신자 계정에 대한 이 "홈 샤드"는 트랜잭션을 처리하고 네트워크 전체에 적용할 관련 Receipt를 생성하는 일을 담당합니다.

네트워크에 수신되면, 서명된 트랜잭션이 확인되고(서명자의 내장된 공개 키 사용) 작업당 하나씩 `Receipt` 컬렉션으로 변환됩니다. Receipt에는 두 가지 유형이 있습니다. `Action Receipt`는 가장 일반적이며, 네트워크의 거의 모든 작업을 나타냅니다. 한편 `Data Receipt`는 "Promise를 포함하는 `FunctionCallAction`"이라는 매우 특수한 경우에 대해 처리합니다. 이러한 Receipt는 영향을 받는 모든 수신자 계정에 대한 "홈 샤드" 규칙에 따라 네트워크 전체에 전파 및 적용됩니다.

그런 다음, 각 계정은 단 하나의 샤드에 위치하기 때문에 이러한 Receipt는 수신자 계정의 "홈 샤드"를 사용하여 네트워크 전체에 전파됩니다. 올바른 샤드에 있는 Receipt는 논스(nonce) 기반의 [대기열](https://nomicon.io/ChainSpec/Transactions#pool-iterator)에서 가져옵니다.

Receipt는 모든 Receipt가 적용될 때까지 네트워크 전체에 전파되는 다른 새로운 Receipt를 생성할 수 있습니다. 트랜잭션 내의 Action이 실패하면, 전체 트랜잭션이 롤백되고 소각되지 않은 수수료는 적절한 계정으로 환불됩니다.

자세한 내용은 [`Transactions`](https://nomicon.io/RuntimeSpec/Transactions), [`Actions`](https://nomicon.io/RuntimeSpec/Actions.html), [`Receipts`](https://nomicon.io/RuntimeSpec/Receipts) 내 설명을 확인하세요.

### How does NEAR serialize transactions?

우리는 결정론적이고 간단한 바이너리 직렬화 형식을 사용합니다: https://borsh.io

## Additional Resources

- 백서

  - [NEAR 블록체인 초보자 가이드](https://near.org/blog/the-beginners-guide-to-the-near-blockchain) - 일반 개요
  - [NEAR 백서](https://pages.near.org/papers/the-official-near-white-paper/)

- Github
  - https://www.github.com/near

:::tip 질문이 있으신가요?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"> Ask it on StackOverflow! </a>
:::
