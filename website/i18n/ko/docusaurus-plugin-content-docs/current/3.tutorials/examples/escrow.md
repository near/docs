---
id: escrow
title: 에스크로 컨트랙트
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"

이 예제는 구매자가 주어진 기간 내에 승인을 제공하지 않은 경우 트랜잭션을 종료하는 타임아웃 기능이 있는 에스크로 컨트랙트의 간단한 구현을 제공합니다.

이 코드에는 컨트랙트 간 호출을 통해 컨트랙트가 서로 데이터를 전달하는 방법과, 호출자 컨트랙트가 결과를 처리하는 방법에 대한 예제도 포함되어 있습니다.

:::info
이 예제에는 프론트엔드가 없습니다.

---

## 프로젝트 시작
프로젝트 사용을 시작할 수 있는 두 가지 옵션이 있습니다.
- 첫 번째 권장 방법은 Gitpod를 통해 프로젝트를 여는 것입니다. 그러면 모든 의존성(dependency)이 설치된 웹 기반 대화형 환경이 열립니다.
- 두 번째 옵션은 레퍼지토리를 로컬로 복제하는 것으로, 모든 [필수 구성 요소](../../2.develop/prerequisites.md)를 설치해야 합니다.


<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="🌐 JavaScript"> 

  | Gitpod                                                                                                                                                                                           | 로컬로 복제                                                                 |
  | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
  | <a href="https://gitpod.io/#https://github.com/near-examples/escrow-js"><img src="https://gitpod.io/button/open-in-gitpod.svg" alt="Open in Gitpod" /></a> | 🌐 `https://github.com/near-examples/escrow-js.git` |

  </TabItem>
</Tabs>

---

### 컨트랙트와 상호 작용
이 예제에는 프론트엔트가 없으므로, [NEAR CLI](../../4.tools/cli.md)를 사용하거나 [`workspaces-js`](../../2.develop/testing/integration.md)를 사용한 테스트를 작성하는 방식으로 컨트랙트와 상호 작용할 수 있습니다.

프로젝트의 [README.md](https://github.com/near-examples/escrow-js/blob/master/README.md)를 확인하세요. 간단히 말해서 다음을 수행해야 합니다.

#### 1. 의존성 설치
의존성을 설치하려면 다음 명령을 실행합니다.

```bash
npm i
```

#### 1. 컨트랙트 구축
다음을 실행하여 컨트랙트를 구축할 수 있습니다(네트워크에 배포할 `.wasm` 파일 생성).

```bash
npm run build
```

완료되면, `build/` 폴더를 확인했을 때 `escrow.wasm` 파일이 표시될 것입니다. 이는 자산 소유권을 관리하는 데 사용되는 `assets.wasm` 파일과 함께 네트워크에 배포될 파일입니다.

#### 2. 컨트랙트 배포

테스트넷에 에스크로 컨트랙트를 배포하려면 다음을 실행하세요.

```bash
near deploy --wasmFile build/escrow.wasm --accountId <your-escrow-testnet-account-id>
```

테스트넷에 자산 컨트랙트를 배포하려면 다음을 실행하세요.

```bash
near deploy --wasmFile build/assets.wasm --accountId <your-assets-testnet-account-id>
```

#### 3. 자산 컨트랙트 초기화

자산 컨트랙트를 초기화하려면 다음을 실행하세요.

```bash
near call <your-assets-testnet-account-id> init '{"owner_id": "<your-asset-owner-account-id>", "total_supply": "1000", "escrow_contract_id": "<your-escrow-testnet-account-id>", "asset_price": "100000000000000000000000"}' --accountId <your-assets-testnet-account-id>
```

`asset_price`는 yoctoNEAR(10^-24 NEAR) 단위로 표현된 자산의 가격입니다. 이 예제에서 가격은 0.1 NEAR로 설정됩니다.

#### 3. 에스크로에서 구매 진행

에스크로 컨트랙트에서 구매를 수행하려면 다음을 실행하세요.

```bash
near call <your-escrow-testnet-account-id> purchase_in_escrow '{"seller_account_id": "<your-asset-owner-account-id>", "asset_contract_id ": "<your-assets-testnet-account-id>"}' --accountId <your-account-id> --amount 0.11 --gas=300000000000000
```

자산 가격을 0.1 NEAR로 설정했기 때문에, 자산 가격과 가스 비용을 충당하기 위해 에스크로 컨트랙트에 0.11 NEAR를 보내야 합니다.

#### 4. 구매자 계정 잔고 확인

에스크로 구매 후 구매자 계정의 자산 잔고를 확인하려면 다음을 실행하세요.

```bash
near view <your-assets-testnet-account-id> get_account_assets '{"account_id": "<your-account-id>"}'
```

판매자 계정의 NEAR 잔액을 확인하여 아직 지불을 받지 않았는지 확인할 수도 있습니다.

```bash
near state <your-asset-owner-account-id>
```

#### 5. 구매를 승인하려면 다음을 실행하세요.

구매를 승인하려면 다음을 실행하세요.

```bash
near call <your-escrow-testnet-account-id> approve_purchase '{}' --accountId <your-account-id>
```

판매자 계정의 NEAR 잔액을 다시 확인하면 결제가 완료되었음을 알 수 있습니다.

---

### 컨트랙트

컨트랙트는 에스크로에서 자산을 구매하고 구매자가 구매를 승인하거나 취소하는 메서드를 공개합니다. 또한 컨트랙트는 구매 생성 시간을 확인하는 메서드를 공개하며, 구매가 하루 이상 전에 생성된 경우 컨트랙트는 구매자의 입력 없이 구매를 승인합니다.

<CodeTabs>
<Language value="🌐 JavaScript" language="js">
    <Github fname="contract.ts" 
            url="https://github.com/near-examples/escrow-js/blob/master/contracts/escrow.js"
            start="41" end="119" />
  </Language>
</CodeTabs>

---

## 테스트

스마트 컨트랙트를 작성할 때 모든 메서드를 철저하게 테스트하는 것이 중요합니다. 이 프로젝트에서는 `workspaces-js`를 사용하여 컨트랙트 메서드를 테스트합니다. 테스트를 진행하기 전에 `npm test` 명령을 통해 dApp에 있는 테스트를 수행하세요. 그러면 `tests/main.ava.js`에서 테스트가 실행됩니다. 또한, 테스트 이름과 결과가 콘솔에 표시됩니다.

<CodeTabs>
  <Language value="🌐 JavaScript" language="js">
    <Github fname="main.ava.js"
            url="https://github.com/near-examples/escrow-js/blob/master/tests/main.ava.js"
            start="4" end="78" />
  </Language>
</CodeTabs>

---

## 더 알아보기

배울 수있는 좋은 방법은 컨트랙트를 확장하는 것입니다. `escrow-js` 컨트랙트를 수정하여 [NFT](../nfts/0-intro.md)를 사용하도록 예제를 수정해 보세요! 이러한 방식으로 사용자가 에스크로에서 NFT를 구매하는 기능을 만들 수 있습니다! [콜백을 올바르게 처리](../../2.develop/contracts/crosscontract.md#callback-method)하고 오류가 발생한 경우 사용자에게 금액을 반환해야 합니다.
