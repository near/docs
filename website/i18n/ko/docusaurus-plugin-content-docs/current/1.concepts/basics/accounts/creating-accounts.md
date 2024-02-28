---
id: creating-accounts
title: 계정 생성
---

NEAR 계정을 만드는 가장 간단한 방법은 [NEAR 지갑](https://mynearwallet.com/)을 이용하는 것이지만, 로컬 도구를 사용하여 계정을 만들 수도 있습니다.

---

## NEAR 지갑
NEAR 지갑은 웹 기반 사용자 친화적인 지갑입니다. You can readily use it without installing any software or add-ons (e.g browser extensions) on your devices.

#### 테스트넷
In **testnet** you can directly create [named accounts](account-id.md#named-accounts) such as `your-name.near`. Simply go to the [wallet](https://testnet.mynearwallet.com/create), pick a name of your choice, and you are ready to go. Remember to save your mnemonic phrase somewhere safe.

#### 메인넷
**메인넷** [지갑](https://mynearwallet.com/)에서는, 먼저 자금을 넣어두어야 하는 [암시적 계정](account-id.md#implicit-accounts-implicit-accounts)(implicit account) 이 제공됩니다. 그런 다음 [암시적 계정](account-id.md#implicit-accounts-implicit-accounts)을 사용하여 [명명된 계정](account-id.md#named-accounts)을 만들 수 있습니다 .

---

## 로컬 암시적 계정
We can create a implicit account with ED25519 key-pair locally using [near cli](../../../4.tools/cli.md)

```bash
near generate-key --saveImplicit
```

Example Output
```
Generated key pair with ed25519:BGCCDDHfysuuVnaNVtEhhqeT4k9Muyem3Kpgq2U1m9HX public key
Seed phrase: lumber habit sausage used zebra brain border exist meat muscle river hidden
Key pair: {"publicKey":"ed25519:AQgnQSR1Mp3v7xrw7egJtu3ibNzoCGwUwnEehypip9od","secretKey":"ed25519:51qTiqybe8ycXwPznA8hz7GJJQ5hyZ45wh2rm5MBBjgZ5XqFjbjta1m41pq9zbRZfWGUGWYJqH4yVhSWoW6pYFkT"}
Implicit account: 8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8
Storing credentials for account: 8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8 (network: testnet)
Saving key to '~/.near-credentials/testnet/8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8.json'
```
> A new implicit account credentials will be stored at `~/.near-credentials/testnet/8bca86065be487de45e795b2c3154fe834d53ffa07e0a44f29e76a2a5f075df8.json`.

You can share this `id` with anyone to receive Near tokens. 계정을 사용하려면 최소 **0.001Ⓝ**가 필요합니다.

---

## 로컬 명명된 계정
명명된 계정을 생성하려면, 관련 스마트 컨트랙트에 하위 계정을 생성하도록 요청해야 합니다: 메인넷에서는 `near`이고, 테스트넷에서 `testnet`입니다.

이를 위해 다음과 같이 `near-cli`를 사용할 수 있습니다.

```bash
near call testnet create_account '{"new_account_id": "<account-name>.testnet", "new_public_key": "ed25519:<data>"}' --deposit 0.00182 --accountId <account-with-funds>
```

> Notice that you need an **already funded** account, because you are making a contract call.

:::tip 전달한 공개 키는 계정의 [전체 액세스 키](access-keys.md#full-access-keys-full-access-keys)가 됩니다. :::

:::info For **sub-accounts** check the [near-cli create-account](../../../4.tools/cli.md#near-create-account) docs. :::
