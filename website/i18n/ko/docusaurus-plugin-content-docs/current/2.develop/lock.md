---
id: lock
title: 계정 잠금
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

계정에서 [전체 액세스 키](../4.tools/cli.md#near-delete-key-near-delete-key)를 모두 제거하면, 계정이 효과적으로 **잠깁니다**.

계정이 잠기면 아무도 계정 이름으로 트랜잭션을 수행할 수 없습니다(예: 코드 업데이트 또는 송금).

#### 계정을 잠그는 방법
<Tabs className="language-tabs" groupId="code-tabs">
  <TabItem value="near-cli">

  ```bash
  near keys <dev-account>
  # result: [access_key: {"nonce": ..., "public_key": '<key>'}]

  near delete-key <dev-account> '<key>'
  ```
  </TabItem>
  <TabItem value="near-cli-rs">

  ```bash
  near account list-keys <dev-account> network-config testnet now
  # result:

  +---+------------+-------+-------------+
  | # | Public Key | Nonce | Permissions |
  +---+------------+-------+-------------+
    ..    '<key>'      ...        ...
  +---+------------+-------+-------------+

  near account delete-key <dev-account> '<key>' network-config testnet sign-with-keychain send
  ```

  </TabItem>
</Tabs>

#### 계정을 잠그는 이유
계정을 잠그면 외부 행위자가 계정의 컨트랙트나 잔고를 조작할 수 없어지기 때문에, 최종 사용자가 더 안심할 수 있게끔 합니다.

외부 행위자는 컨트랙트를 업데이트할 수 없지만, 컨트랙트 자체는 여전히 업그레이드할 수 있습니다. 자세한 내용은 [이 문서](upgrade.md#programmatic-update)를 참조하세요.
:::