---
id: storage-solutions
title: 분산 스토리지 솔루션
sidebar_label: 대체 솔루션
---

> 이 글에서는 분산 애플리케이션(dApp)에 통합할 수 있는 다양한 분산 스토리지 솔루션에 대한 간략한 개요를 볼 수 있습니다. 이를 통해 기본 NEAR 스토리지에 대한 보다 경제적인 대안을 사용하여 많은 양의 데이터를 저장할 수 있습니다.

- [Arweave](#arweave)
- [Crust](#crust)
- [IPFS](#ipfs)

---

## 온체인 스토리지 제약 조건

데이터를 온체인에 저장하려면 다음 사항을 염두에 두어야 합니다:

- You can store an unlimited amount of files, but will cost you 1Ⓝ per 100KB
- 한 번에 업로드할 수 있는 용량에는 4MB의 제한이 있습니다.


예를 들어, NFT를 순수하게 체인에 저장하려는 경우(아래 언급된 것처럼 IPFS 또는 일부 분산형 스토리지 솔루션을 사용하는 대신), 스토리지 용량은 거의 무제한이지만 사용된 스토리지의 100KB당 1 $NEAR를 지불해야 합니다([스토리지 스테이킹](https://docs.near.org/concepts/storage/storage-staking) 참고).

`MAX_GAS`의 제약으로 인해 사용자는 컨트랙트 호출 업로드당 4MB로 제한됩니다. 주어진 `functionCall`에 첨부할 수 있는 최대 가스량은 300TG입니다.

## Arweave

[Arweave](https://www.arweave.org/)는 지속 가능하고 영구적인 자산(인플레이션 및 장기간에 걸친 스토리지 비용 감소의 혜택을 받는 프로토콜 내 보유 토큰)으로 데이터를 뒷받침하는 새로운 유형의 스토리지입니다. 이를 통해 사용자와 개발자는 데이터를 영원히 저장할 수 있습니다. Arweave는 공동 소유의 하드 드라이브 역할을 하며, 사용자가 귀중한 정보, 앱 및 기록을 무기한 보존할 수 있도록 합니다.

Arweave 프로토콜은 데이터를 저장하거나 콘텐츠를 영구적으로 호스팅해야 하는 개인 및 조직과 대규모 집단 하드 드라이브 공간을 가진 인센티브화된 채굴자 무리를 매칭시켜줍니다. 이는 탈중앙화 네트워크를 통해 달성되며, 저장된 모든 데이터는 블록 채굴 보상과 영구적으로 사용할 수 있도록 하는 [지속 가능한 기부금](https://arwiki.wiki/#/en/storage-endowment)으로 지원됩니다.

:::info Arweave에 대해 자세히 알아보려면 [채굴 메커니즘](https://arwiki.wiki/#/en/arweave-mining)과 [대역폭 공유 시스템](https://arwiki.wiki/#/en/karma)을 확인하세요. :::

### 구현 예시

로컬 Arweave 게이트웨이와 같은 서버를 실행하여 Arweave에 일부 파일을 저장하는 방법을 살펴보겠습니다.

### Arlocal 설정

[Arlocal](https://github.com/textury/arlocal)은 본질적으로 Arweave의 시뮬레이션 버전을 생성합니다. 정보를 저장하기 위해 컴퓨터에서 실행되는 로컬 노드라고 생각하면 됩니다.

이 예에서는 **두 개의 터미널**을 실행해야 합니다.

- 첫 번째 터미널을 열고 다음을 실행합니다.

```bash
npx arlocal
```

다음과 같은 응답이 표시되어야 합니다:  `arlocal started on port 1984`.

:::tip `npx arlocal <desired port number>`를 사용하여 포트를 지정할 수 있습니다. :::

### NEAR-Arweave 프론트엔드

[NEAR-Arweave 레퍼지토리](https://github.com/near-examples/NEAR-Arweave-Tutorial)에는 arlocal을 사용하여 `.png` 파일 을 저장할 수 있는 간단한 프론트엔드가 있습니다 .

- 이제 두 번째 터미널을 열고 다음 명령을 실행하여 프론트엔드를 복사합니다.

```bash
git clone https://github.com/near-examples/NEAR-Arweave-Tutorial.git
```

- 프로젝트 폴더에서 다음을 실행하여 의존성을 설치합니다.

```bash
cd NEAR-Arweave-Tutorial
yarn
```

- 다음을 실행하여 애플리케이션을 시작합니다.

```bash
yarn start
```


- 이제 <kbd>Choose File</kbd> 버튼을 선택하여 이미지를 업로드할 수 있습니다.

![Arweave step 1](/docs/assets/arweave-1.png)

- <kbd>Submit</kbd> 버튼을 누르면 트랜잭션 ID 창이 채워지는 것을 볼 수 있습니다.

![Arweave step 2](/docs/assets/arweave-2.png)

:::tip 오류가 발생하면 arlocal 노드가 **별도의 터미널**에서 실행 중인지 확인하세요. :::

### 트랜잭션 마이닝

Arweave에서 트랜잭션은 보류와 확정의 두 단계를 거칩니다. 트랜잭션이 완료되고 데이터를 검색할 수 있으려면, 트랜잭션이 확정되어야 합니다.

- 브라우저에서 `http://localhost:1984/mine`을 방문하여 로컬 노드에 채굴 요청을 보내십시오.

:::tip
you may find that you are still able to retrieve your data without this step, but that's because you are running a local node.
실제 Arweave 노드를 다룰 때는 트랜잭션이 채굴되고 확인될 때까지 기다려야 합니다.
:::

### 이미지 검색

- 이제 프론트엔드의 5단계에 나열된 arweave 트랜잭션 ID를 복사 후 붙여넣어 로컬 노드에서 파일을 검색할 수 있습니다.

![Arweave step 3](/docs/assets/arweave-3.png)

:::info Arweave의 라이브 네트워크를 사용하려면 스토리지 비용을 지불하기 위해 artoken을 구매해야 합니다. 자세한 내용은 [arweave.org](https://www.arweave.org/)에서 확인할 수 있습니다 . :::

:::tip [near-api-js](https://github.com/near/near-api-js) 및 [arweave -js](https://github.com/ArweaveTeam/arweave-js) JavaScript 라이브러리를 사용하면 이러한 단계 대부분을 자동화할 수 있습니다. :::

---

## Crust

[Crust](https://crust.network)는 Metaverse를 위한 Web3.0 분산 스토리지 네트워크를 제공합니다. 이는 탈중앙화, 개인 정보 보호 및 보증의 핵심 가치를 실현하도록 설계되었습니다. Crust는 IPFS와 같은 여러 스토리지 계층 프로토콜을 지원하고 즉시 액세스할 수 있는 온체인 스토리지 기능을 사용자에게 제공합니다. 또한 Crust의 기술 스택은 데이터 조작 및 컴퓨팅을 지원합니다.

Crust 프로토콜은 [IPFS](https://ipfs.io) 프로토콜과 100% 호환되며, 하드 드라이브 공간이 여유 있는 사람과 데이터를 저장하거나 콘텐츠를 호스팅해야 하는 사람을 매칭시킵니다. Crust는 Polkadot 생태계를 기반으로 하며 NEAR/Solana/Ethereum/Elrond 등을 포함한 대부분의 컨트랙트 플랫폼을 지원합니다.

:::info Crust에 대해 자세히 알아보려면 [탈중앙화 스토리지 시장](https://wiki.crust.network/docs/en/DSM)과 [보장된 지분 증명](https://wiki.crust.network/docs/en/GPoS)을 확인하세요. 또한 [Build-101](https://wiki.crust.network/docs/en/build101)을 통해 시작할 수 있습니다 . :::

### 통합 예제

다음은 Crust 및 NEAR로 파일을 저장하는 간단한 통합 예제입니다.

#### 1. IPFS에 파일 업로드하기

먼저 파일을 IPFS에 넣어야 합니다.

:::tip **파일 및 폴더**를 IPFS 에 업로드하는 방법을 알아보려면 이 [섹션](https://wiki.crust.network/docs/en/buildFileStoringWithGWDemo#1-upload-files-to-ipfs-gateway)을 참고하세요. :::

IPFS에 파일을 업로드하는 방법에는 두 가지가 있습니다.

- 로컬 IPFS 노드 사용
- 원격 [IPFS W3Authed 게이트웨이](https://docs.ipfs.io/concepts/ipfs-gateway/#authenticated-gateways) 사용

:::info
- 이 [링크](https://github.com/crustio/ipfsscan/blob/main/lib/constans.ts#L29)에서 `ipfsW3GW` 엔드포인트에 대한 자세한 내용을 확인할 수 있습니다 .
- 또한 [이 링크](https://github.com/crustio/crust-demo/blob/main/near/src/index.ts#L20-L51)에서 IPFS에 파일을 업로드하는 방법에 대한 코드 예제를 찾을 수 있습니다. :::

#### 2. 스토리지 주문 위치시키기

다음으로 Crust 체인에 `Place Storage Order`라는 이름의 트랜잭션을 보내야 합니다. 이 트랜잭션은 블록체인을 통해 스토리지 요구 사항을 각 Crust IPFS 노드로 발송합니다. 그러면 IPFS 노드가 IPFS 프로토콜을 사용하여 파일을 가져오기 시작합니다.

:::info
- [이 링크](https://github.com/crustio/crust-apps/blob/master/packages/apps-config/src/endpoints/production.ts#L9)에서 `crustChainEndpoint`에 대한 자세한 정보를 찾을 수 있습니다 .
- [다음 지침](https://wiki.crust.network/docs/en/crustAccount#create-an-account-1)에 따라 계정(`seeds`)을 만들 수 있습니다 .
- Crust에서 스토리지 주문을 하는 방법에 대한 코드 예제는 [이 링크](https://github.com/crustio/crust-demo/blob/main/near/src/index.ts#L82-L112)를 확인하세요. :::

#### 3. 쿼리 주문 상태

그런 다음 온체인 상태(`status{replica_count, storage_duration, ...}`)를 호출하여 스토리지 주문을 쿼리할 수 있습니다. 이 호출은 다음을 반환합니다.

```json
{
    "file_size": 23710,
    "spower": 24895,
    "expired_at": 2594488, // Storage duration
    "calculated_at": 2488,
    "amount": "545.3730 nCRU",
    "prepaid": 0,
    "reported_replica_count": 1, // Replica count
    "replicas": [{
        "who": "cTHATJrSgZM2haKfn5e47NSP5Y5sqSCCToxrShtVifD2Nfxv5",
        "valid_at": 2140,
        "anchor": "0xd9aa29dda8ade9718b38681adaf6f84126531246b40a56c02eff8950bb9a78b7c459721ce976c5c0c9cd4c743cae107e25adc3a85ed7f401c8dde509d96dcba0",
        "is_reported": true,
        "created_at": 2140
    }] // Who stores the file
}
```

:::info [이 링크](https://github.com/crustio/crust-demo/blob/main/near/src/index.ts#L144-L147)에서 스토리지 상태 쿼리에 대한 코드 예제를 찾으십시오 . :::

#### 4. 선불 파일 추가

단일 트랜잭션(주문)의 기본 보관 기간은 6개월입니다. 보관 기간을 연장하려면 Crust가 선불 풀을 제공하므로 파일의 보관 시간을 설정할 수 있습니다. 이 풀을 사용하면 일부 토큰을 넣을 수 있으며 파일의 저장 시간이 자동으로 연장됩니다.

:::info 파일에 선불 토큰을 추가하는 방법에 대한 코드 스니펫을 보려면 [이 링크](https://github.com/crustio/crust-demo/blob/main/near/src/index.ts#L114-L142)를 확인하세요. :::

---

## IPFS

IPFS([InterPlanetary File System](https://ipfs.io/) )는 분산 파일 시스템에서 데이터를 저장하고 공유하기 위한 프로토콜 및 피어 투 피어 네트워크입니다. IPFS는 컨텐츠 주소를 지정하여 모든 컴퓨팅 장치를 연결하는 글로벌 네임스페이스에서 각 파일을 고유하게 식별합니다.

### 컨텐츠 식별자

파일을 IPFS에 추가하면 파일이 암호화 해시된 더 작은 청크로 분할된 다음, 콘텐츠 식별자(CID)라는 고유한 지문이 부여됩니다.

:::tip
The CID acts as an permanent record of a file as it exists at that point in time.
:::

### 조회

파일을 찾을 때, 노드는 파일의 CID가 참조하는 컨텐츠에 대해 피어 노드에 요청합니다. 파일을 보거나 다운로드할 때, 노드는 복사본을 캐시하고 캐시가 지워질 때까지 다른 공급자가 됩니다.

### 고정된 컨텐츠

IPFS 네트워크에서 각 노드는 관심 있는 컨텐츠만 저장합니다. 노드는 컨텐츠를 영원히 보관하기 위해, 컨텐츠를 고정하거나 공간을 절약하기 위해 사용하지 않은 컨텐츠를 버릴 수 있습니다.

### 파일 버전

파일의 새 버전을 IPFS에 추가하면, 암호화 해시가 다르기 때문에 새 CID를 얻게 됩니다. 즉, 파일에 대한 변경 사항은 원래 파일을 덮어쓰지 않고, 저장 비용을 최소화하기 위해 파일 전체의 공통 청크를 재사용할 수 있습니다.

### 네이밍 시스템

IPFS는 탈중앙화 이름 지정 시스템을 제공하므로, 긴 CID 문자열을 기억할 필요가 없습니다. IPFS에서는 IPNS 분산 이름 지정 시스템을 사용하여 파일의 최신 버전을 찾을 수 있으며, DNSLink를 사용하여 CID를 사람이 읽을 수 있는 DNS 이름에 매핑할 수 있습니다.

### IPFS 공급자

- [Web3.Storage](https://web3.storage/): it's a service that simplifies building on top of IPFS and Filecoin. Web3.Storage는 Filecoin의 지원을 받으며 각 네트워크의 고유한 속성을 활용하여 IPFS를 통해 컨텐츠를 사용할 수 있도록 합니다.
- [NFT.Storage](https://nft.storage/): this service is built specifically for storing off-chain NFT data. 데이터는 IPFS 및 Filecoin에 분산되어 저장됩니다. 데이터는 스마트 컨트랙트에서 사용할 수 있는 컨텐츠 주소 지정 IPFS URI를 사용하여 참조됩니다.
- [Filebase](https://filebase.com/): 다양한 지리적 위치에 걸쳐 모든 IPFS 파일을 자동으로 3배의 중복성(redundancy)으로 고정하여 성능, 중복성 및 안정성을 추가할 수 있는 지리적 중복 IPFS 핀 공급자입니다.
