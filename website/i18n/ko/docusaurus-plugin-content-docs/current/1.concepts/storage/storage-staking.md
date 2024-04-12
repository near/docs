---
id: storage-staking
title: 스토리지 스테이킹
sidebar_label: 스토리지 스테이킹
---

> NEAR에 스마트 컨트랙트를 배포할 때, 스토리지 스테이킹이라는 메커니즘을 사용하여 이 컨트랙트에 필요한 스토리지 비용을 지불합니다.
> 
> 스토리지 스테이킹(_상태_ 스테이킹이라고도 함)에서 스마트 컨트랙트를 소유한 계정은 해당 스마트 컨트랙트에 저장된 데이터의 양에 따라 토큰을 스테이킹(또는 잠가야)하여 컨트랙트 계정의 잔고를 효과적으로 줄입니다.

<blockquote className="info">
<strong>Ethereum에서 오셨나요?</strong><br /><br />

Ethereum의 가격 책정 모델에 익숙하다면 NEAR와 마찬가지로 프로토콜이 각 트랜잭션에 대해 수수료("가스"라고 함)를 부과한다는 것을 알 수 있습니다. NEAR와 달리 Ethereum의 가스 요금은 해당 트랜잭션을 통해 저장된 데이터의 양을 설명합니다. 이것은 본질적으로 누구나 체인에 영구 데이터를 저장하기 위해 한 번 지불할 수 있음을 의미합니다. 이것은 적어도 두 가지 이유로 인해 좋지 않은 경제적 설계입니다. 1. 네트워크를 운영하는 사람들(이더리움 1의 경우 채굴자)은 먼 과거에 부과된 가스 요금이 스토리지 비용을 영원히 증가시킬 수 있기 때문에 대량의 데이터를 저장할 적절한 동기 부여를 받지 못합니다. 2. 스마트 컨트랙트 소유자에게 데이터 비용을 청구하는 대신, 그들이 저장하기 위해 스마트 컨트랙트 사용자에게 보낸 데이터에 대해 비용을 청구합니다.

</blockquote>

## How does NEAR's design align incentives?

스토리지 스테이킹 토큰은 검증 스테이킹과 같은 다른 용도로는 사용할 수 없습니다. 이는 밸리데이터가 받을 수익률을 증가시킵니다. Learn more in [the economics whitepaper](https://pages.near.org/papers/economics-in-sharded-blockchain/).

## When do tokens get staked?

데이터를 추가하는 각 트랜잭션에 대해 토큰이 스테이킹될 수 있습니다.

예를 들어 보겠습니다.

1. [방명록 앱](https://examples.near.org/guest-book)을 시작 하고 앱의 스마트 컨트랙트를 계정 `example.near`에 배포합니다.
2. 앱 방문자는 방명록에 메시지를 추가할 수 있습니다. This means your users will, [by default](/concepts/protocol/gas#what-about-prepaid-gas), pay a small gas fee to send their message to your contract.
3. 이러한 요청이 들어오면 NEAR는 `example.near`에 새로운 스토리지 요구 사항을 충당할 수 있을 만큼 충분한 잔액이 있는지 확인합니다. 그렇지 않으면 트랜잭션이 실패합니다.

## The "million cheap data additions" attack

이로 인해 공격 벡터가 생성될 수 있습니다. 만약 방명록에 데이터를 보내는 데 사용자에게는 거의 비용이 들지 않는 반면 컨트랙트 소유자에게는 훨씬 더 많은 비용이 든다고 한다면, 악의적인 사용자가 이 불균형한 상황을 악용하여 컨트랙트 유지 비용이 엄청나게 많이 들게 하는 공격을 할 수 있습니다.

따라서 스마트 컨트랙트를 설계할 때, 이러한 공격으로 인해 잠재적 공격자에게 공격의 비용보다 더 많은 가치가 발생하지 않도록 주의하세요.

## btw, you can remove data to unstake some tokens

블록체인에 대한 "불변 데이터" 내러티브에 익숙한 사람들은 이것에 놀라워할 수도 있습니다. *인덱싱 노드* 가 모든 데이터를 영원히 유지 하는 것은 사실이지만, 밸리데이터 노드(즉, 네트워크에서 대부분의 밸리데이터가 실행하는 노드)는 그렇지 않습니다. 스마트 컨트랙트는 데이터를 삭제하는 방법을 제공할 수 있으며, 해당 데이터는 몇 [에포크](../basics/epoch.md) 내에 네트워크의 대부분의 노드에서 제거됩니다.

데이터를 제거하기 위해 스마트 컨트랙트를 호출하면 관련 가스 요금이 부과됩니다. NEAR의 가스 한도를 감안할 때, 이는 단일 트랜잭션에서 얼마나 많은 데이터를 삭제할 수 있는지에 대한 상한선을 정하게 됩니다.

## How much does it cost?

스토리지 가격은 네트워크에서 설정한 금액으로 책정되며, 바이트당 **1E19 yocto NEAR** 또는 **NEAR 토큰(Ⓝ)당 100kb**로 설정됩니다. [^1] [^2]

NEAR의 JSON RPC API는 [이 초기 설정을 쿼리하는 방법](/api/rpc/setup#genesis-config)과 [라이브 구성/최근 블록을 쿼리하는 방법](/api/rpc/setup#protocol-config)을 제공합니다 .

## Example cost breakdown

예제를 살펴보겠습니다.

[대체불가능 토큰](https://github.com/near/NEPs/pull/4)은 고유합니다. 즉, 각 토큰에는 고유한 ID가 있습니다. 컨트랙트는 토큰 ID에서 소유자의 계정 ID로의 맵핑을 저장해야 합니다.

이러한 NFT를 사용하여 **100만 개**의 토큰을 추적하는 경우, 토큰-ID-소유자 매핑에 얼마나 많은 스토리지가 필요할까요? 그리고 해당 스토리지에 얼마나 많은 토큰을 스테이킹해야 할까요?

데이터를 UTF-8 문자열로 저장하는 `PersistentMap`를 사용할 때 필요한 스토리지를 계산해 봅시다.

여기 우리의 `PersistentMap`이 있습니다:

```ts
type AccountId = string;
type TokenId = u64;
const tokenToOwner = new PersistentMap<TokenId, AccountId>("t2o");
```

NEAR 블록체인에 저장된 모든 데이터는 키-값 데이터베이스에 저장됩니다. `PersistentMap`에 전달되는 변수 `'t2o'` 는 모든 값을 추적하는 데 도움이 됩니다 . 귀하의 계정 `example.near`가 ID `0` 인 토큰을 소유하고 있는 경우, 작성 당시 키-값 데이터베이스에 저장되는 데이터는 다음과 같습니다.

- 키: `t2o::0`
- 값: `example.near`

따라서 100만 토큰의 경우, 더해서 100만을 곱해야 하는 모든 항목은 다음과 같습니다.

1. 접두사 `t2o`는 UTF-8에서 3바이트로 직렬화되고, 두 개의 콜론은 다른 두 개를 추가합니다. 즉, 이는 총 5바이트입니다.
2. `TokenId`가 자동 증가 하는 경우, 값은 `0` ~ `999999` 사이에 있으므로 평균 길이는 5바이트가 됩니다.
3. NEAR `AccountId`가 잘 구성되었다고 가정하고, NEAR 계정 ID가 도메인 이름의 대략적인 패턴을 따른다고 가정해 보겠습니다. 도메인 이름은 [평균 약 10자 정도](https://www.gaebler.com/Domain-Length-Research.htm) 되고, `.near`와 같은 최상위 이름이 추가됩니다. 따라서 예상할 수 있는 합리적인 평균 길이는 약 15자일 수 있습니다. 추정치를 비관적으로 생각해서 25라고 가정해 보겠습니다. NEAR 계정 ID는 ASCII 집합의 문자를 사용해야 하므로 25바이트가 됩니다.

따라서:

    1_000_000 * (5 + 5 + 25)

총 3,500만 바이트가 필요합니다. 이는 350 곱하기 100Kib이고, Ⓝ350가 필요함을 의미합니다.. 정확한 계산을 위해: 바이트당 1e19 yoctoNEAR를 곱하면 35m 바이트의 `tokenToOwner` 매핑에 3.5e26 yoctoNEAR 또는 Ⓝ350을 스테이킹해야 한다는 것을 알 수 있습니다.

접두사를 `t2o`에서 단일 문자로 변경하기만 하면 Ⓝ330까지 줄일 수 있습니다. 아니면 완전히 제거해도 됩니다! 스마트 컨트랙트 내 한 `PersistentVector`에서 길이가 0인 접두사를 가질 수 있습니다. 그렇게 하면 요금은 Ⓝ250까지 내려갈 수 있습니다.

## Calculate costs for your own contract

위에 표시된 대로 수동으로 바이트 연산을 수행하는 것은 어렵고 오류가 발생하기 쉽습니다. 좋은 소식은 그럴 필요가 없다는 것입니다!

You can test the storage used using the [SDK environment](../../2.build/2.smart-contracts/anatomy/environment.md) and checking `env.storage_usage()`

## Other ways to keep costs down

데이터를 온체인에 저장하는 것은 네트워크를 운영하는 사람들에게 저렴하지 않으며, NEAR는 이 비용을 개발자에게 전가합니다. 그렇다면 개발자로서 어떻게 비용을 절감할 수 있을까요? 널리 사용되는 두 가지 접근 방식이 있습니다.

1. JSON이 아닌 바이너리 직렬화 형식을 사용하세요.
2. 데이터를 오프체인에 저장하세요.

### Use a binary serialization format, rather than JSON

핵심 NEAR 팀은 [borsh](https://borsh.io/)라는 라이브러리를 관리하는데, 이는 `near-sdk-rs`를 사용할 때 자동으로 사용됩니다. 나중에는 `near-sdk-js`에 의해서도 사용될 것입니다.

`[0, 1, 2, 3]`와 같은 배열을 저장하고 싶다고 생각해 보세요. 이를 문자열로 직렬화하고, UTF-8 바이트로 저장할 수 있습니다. 이것이 `near-sdk-js`가 하는 일입니다. 공백을 잘라내면 결국 9바이트를 사용하게 됩니다.

borsh를 사용하면 동일한 배열이 아래와 같이 8바이트로 저장됩니다.

    \u0004\u0000\u0000\u0000\u0000\u0001\u0002\u0003

언뜻 보기에 1바이트를 절약하는 것이 중요해 보이지 않을 수 있습니다. 하지만 자세히 살펴보겠습니다.

여기서 처음 4바이트인 `\u0004\u0000\u0000\u0000`는 리틀 엔디안 인코딩을 사용하는 길이 `4`의 `u32`배열임을 직렬 변환기에 알려줍니다. 나머지 바이트는 배열의 리터럴 번호 –`\u0000\u0001\u0002\u0003`- 입니다. 더 많은 요소를 직렬화함에 따라, 각 요소는 데이터 구조에 1바이트를 추가합니다. JSON을 사용하면 새 요소마다 다른 쉼표와 숫자를 모두 나타내기 위해 2바이트를 추가해야 합니다.

일반적으로 Borsh는 더 빠르고 더 적은 저장 공간을 사용하며 가스 비용도 더 적게 듭니다. 가능하면 사용하시는 것을 추천드립니다.

### Store data off-chain

이는 사용자 생성 데이터를 저장하는 경우 특히 중요합니다!

Let's use this [Guest Book](https://github.com/near-examples/guest-book-examples) as an example. 아까 구현된 대로 앱 방문자는 NEAR로 로그인하고 메시지를 남길 수 있습니다. 그들의 메시지는 온체인에 저장됩니다.

이 앱이 큰 인기를 얻었고 방문자가 예기치 않게 긴 메시지를 남기기 시작했다고 상상해 보세요. 컨트랙트 소유자의 보관 자금은 매우 빨리 바닥날 수 있습니다!

더 나은 전략은 데이터를 오프체인에 저장하는 것입니다. 앱을 분산된 상태로 유지하려는 경우 널리 사용되는 오프체인 데이터 스토리지 솔루션은 [IPFS](https://ipfs.io/)입니다. 이를 통해 다음과 같은 예측 가능한 컨텐츠 주소로 모든 데이터 집합을 나타낼 수 있습니다.

    QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG

이러한 컨텐츠 주소는 JSON 구조, 이미지 또는 기타 유형의 데이터를 나타낼 수 있습니다. 이 데이터는 물리적으로 어디에 저장될까요? [Filecoin](https://filecoin.io/)을 사용하거나 자체 IPFS 서버를 실행하여 앱 데이터를 고정할 수 있습니다.

이 접근 방식을 사용하면, 컨트랙트에 추가하는 각 레코드의 크기를 예측할 수 있습니다.

## Summary

NEAR의 구조는 네트워크 운영자에게 인센티브를 제공하는 동시에 컨트랙트 개발자에게 유연성과 예측 가능성을 제공합니다. 스토리지 관리는 스마트 컨트랙트 설계의 중요한 측면이며 NEAR의 라이브러리를 사용하면 애플리케이션에 필요한 스토리지 비용을 쉽게 파악할 수 있습니다.

:::tip 질문이 있으신가요?
<a href="https://stackoverflow.com/questions/tagged/nearprotocol"><h8>StackOverflow에 물어보세요!</h8></a>
:::

## Footnotes

[^1]: [스토리지 스테이킹 가격](https://gov.near.org/t/storage-staking-price/399)
[^2]: [스토리지 비용 10배 절감](https://github.com/near/nearcore/pull/3881)
