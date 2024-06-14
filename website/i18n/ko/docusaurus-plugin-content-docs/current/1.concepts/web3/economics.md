---
id: economics
title: Web 3.0 경제학
sidebar_label: 경제학
---

기술적인 탈중앙화와 함께, 경제적인 탈중앙화도 이루어졌습니다. 이는 NFT(대체 불가능 토큰), FT(대체 가능한 토큰), DeFi(탈중앙화 금융)의 3가지 기둥을 기반으로 합니다.

## 대체 불가능 토큰(NFT)
새로운 Web 3 경제의 중심에는 NFT([대체 불가능 토큰](https://en.wikipedia.org/wiki/Non-fungible_token))가 있습니다. 이는 간단히 말해서 탈중앙화된 방식으로 디지털 소유권을 표현하는 방법입니다. 기술적인 관점에서 볼 때, 이는 단순히 블록체인 내 데이터 조각일 뿐입니다. The simplest case of such data is just a `(token_id, account_id)` tuple, where `token_id` uniquely identifies an asset, and `account_id` identifies an owner. 이 데이터를 소유하는 스마트 컨트랙트는 새 토큰 생성(민팅) 또는 다른 계정으로의 토큰 전송과 같은 허용된 작업 집합을 정의합니다. 허용되는 작업의 정확한 집합은 NFT 표준에 정의되어 있습니다. 블록체인마다 표준이 다르며 NEAR NFT 표준은 [여기](https://nomicon.io/Standards/NonFungibleToken/)에서 사용할 수 있습니다.

NFT는 특정 컨트랙트에 연결되어 있기 때문에, 대부분 해당 컨트랙트 범위에서만 의미가 있으며, 이후에 특정 dApp에 연결됩니다. 컨트랙트 간 NFT 전송을 구현할 수 있지만, 이를 수행하는 표준화된 방법은 없습니다.

`token_id` 뒤 어떤 디지털 자산이 숨어 있는지는 스마트 컨트랙트가 결정할 일입니다. 이를 처리하는 몇 가지 일반적인 방법이 있습니다.

-  소유권 정보와 함께 스마트 컨트랙트에 자산 자체를 저장합니다. 이것은 가장 간단한 방법이지만, 스토리지 비용이 상당히 높고 많은 유형의 디지털 자산, 특히 미디어가 상당히 크기 때문에 실행 가능하지 않은 경우가 많습니다.

<div align="center">
<img src="/docs/assets/web3/web3-20.png" alt="image" width="400" />
</div>

- 토큰 데이터를 오프체인에 저장합니다. 이러한 접근 방식은 스토리지 비용 문제를 해결하지만, 오프체인 스토리지의 데이터가 변경되거나 제거되지 않도록 보장하기 위해 일정 수준의 신뢰가 필요합니다.

![image](/docs/assets/web3/web3-21.png)


- 자산의 메타데이터와 해시를 체인에 저장하고, 자산 자체를 일부 오프체인 스토리지에 저장합니다. 자산의 해시를 체인에 저장하면 데이터 무결성과 불변성이 보장됩니다. 온체인 메타데이터에는 일반적으로 제목, 설명 및 미디어 URL과 같은 기본 토큰 정보가 포함됩니다. 이는 스토리지에서 자산을 다운로드하지 않고 신속하게 자산을 식별하는 데에 필수적입니다. 이것은 NFT를 처리하는 가장 인기 있는 접근 방식입니다. 이전의 2가지 접근 방식 중 가장 좋은 점을 결합했기 때문입니다. 즉, 토큰은 변경할 수 없고 스토리지 비용이 저렴합니다(정확한 비용은 스토리지 솔루션에 따라 다르지만 일반적으로 온체인 스토리지보다 몇 배 더 저렴합니다).

![image](/docs/assets/web3/web3-22.png)


올바른 오프체인 스토리지를 선택하는 것도 어려울 수 있습니다. 일반적으로 2개의 버킷으로 나눌 수 있습니다.
- 중앙 집중식 스토리지 - 관계형 데이터베이스 또는 Blob 저장소와 같은 기존 Web2 저장소 솔루션입니다. 일부 어플리케이션에는 적합하지만, 중앙 서버가 오프라인 상태가 되면 NFT가 파괴될 수 있으므로 Web3 세계에서 많이 사용되지는 않습니다.
- 탈중앙화 스토리지 -  탈중앙화 스토리지 -  탈중앙화 스토리지 - 이미 언급했듯이 BitTorrent 프로토콜은 이러한 분산 스토리지 솔루션의 첫 번째 예 중 하나입니다. 최근에는 [IPFS](https://ipfs.io/), [FileCoin](https://filecoin.io/) 및 [Arweawe](https://www.arweave.org/)와 같은 고급 솔루션이 등장했습니다. 이러한 솔루션은 저렴하고 분산되어 있어, 아무도 NFT 자산을 파괴하거나 변경할 수 없기 때문에 디지털 자산을 저장하는 데 선호되는 방법입니다.

NEAR는 NFT 표준 외에도 스마트 컨트랙트 개발자가 컨트랙트에서 NFT를 구현하는 데 사용할 수 있는 [구현체](https://docs.rs/near-contract-standards/latest/near_contract_standards/non_fungible_token/index.html)를 제공합니다. 구현 자체는 자산 저장 모델을 지시하지 않으므로, 저장 방법과 위치를 결정하는 것은 개발자의 몫입니다.

## 대체 가능한 토큰 (Fungible Token)
NFT는 디지털 자산 소유 모델을 변경했지만, 그 자체로는 완전한 디지털 경제를 구축하기에 충분하지 않습니다. 가장 간단한 모델에서 NFT는 기본 블록체인 통화(예: NEAR 토큰)를 사용하여 판매 및 구매할 수 있지만 이러한 토큰의 유통 및 가격은 블록체인 자체에 의해 결정되기 때문에 이는 상당히 제한적입니다. 블록체인 통화에 의존하는 대신 어플리케이션이 자체 통화를 만들 수 있다면 어떨까요? 정확히 이러한 이유로 FT(대체 가능한 토큰)가 생성되었습니다.

NFT와 마찬가지로, 대체 가능한 토큰도 스마트 컨트랙트에 저장된 데이터의 일부일 뿐이지만, 고유한 토큰 ID를 저장하는 대신 계정이 보유한 토큰의 양이 저장됩니다.

<div align="center">
<img src="/docs/assets/web3/web3-23.png" alt="image" width="400" />
</div>

스마트 컨트랙트는 이 토큰을 사용한 전송 또는 지불과 같은 허용된 작업을 정의할 수 있습니다. NEAR는 FT에 대한 [표준을 정의](https://nomicon.io/Standards/FungibleToken/Core)하고 [기본 구현체](https://docs.rs/near-contract-standards/latest/near_contract_standards/fungible_token/index.html)를 제공합니다 .

어플리케이션이 이러한 토큰의 공급 및 순환을 완전히 제어하기 때문에, 본격적인 어플리케이션 경제를 만들 수 있습니다. 예를 들어, 사용자는 작업을 수행하여 FT를 획득하고, 이를 사용하여 새로운 NFT를 구매하거나 발행할 수 있습니다. 또 다른 흥미로운 옵션은 FT를 멤버십(또는 거버넌스) 도구로 사용할 수 있는 [탈중앙화 자율 조직](https://near.org/use-cases/dao/) (DAO)을 만드는 것입니다. 이러한 시나리오에서 토큰은 구성원에게 수여되며, 결정에 투표하거나 커뮤니티 이벤트에 참여하는 데 사용할 수 있습니다.

그러나 더 나아가, 우리는 토큰을 다른 암호 화폐에 연결하고 실제 금전적 가치를 부여함으로써 토큰을 더욱 확장할 수 있습니다. 여기에서 [탈중앙화 금융](https://www.investopedia.com/decentralized-finance-defi-5113835) (DeFi), 특히 [탈중앙화 거래소](https://en.wikipedia.org/wiki/Decentralized_exchange) (DEX)가 등장합니다. 여기서 자세히 다루지는 않겠지만, 핵심적으로 DEX에서 대체 가능 토큰을 위한 [유동성 풀](https://academy.binance.com/en/articles/what-are-liquidity-pools-in-defi)을 생성할 수 있으며, 이를 통해 이 토큰을 다른 토큰이나 [스테이블 코인](https://en.wikipedia.org/wiki/Stablecoin)으로 교환할 수 있습니다. 이것은 새로운 게임 모델인 플레이 투 언([Play-to-Earn](https://en.wikipedia.org/wiki/Blockchain_game))의 문을 열어, 플레이어가 게임을 플레이하는 것만으로도 실제 돈을 벌 수 있습니다.
