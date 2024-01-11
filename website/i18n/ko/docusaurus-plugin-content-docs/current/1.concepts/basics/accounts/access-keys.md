---
id: access-keys
title: 액세스 키
---

In blockchain, using an account refers to using a `private key` to sign [transactions](../transactions/overview.md).

NEAR Accounts have the unique feature of holding multiple [public/private key pairs](https://en.wikipedia.org/wiki/Public-key_cryptography), called Access Keys, each with its **own set of permissions**.

액세스 키는 [OAuth](https://en.wikipedia.org/wiki/OAuth)와 유사합니다. 즉, 계정에 대한 **제한된 접근권**을 제3자에게 부여할 수 있습니다.

---

## 액세스 키의 장점
Since the concept of Access Keys is unique to NEAR it is worth understanding why and how they can be used.

#### 안전하게 앱 사용하기
웹 앱과 스마트 컨트랙트로 구성된 웹3 게임을 하고 싶다고 상상해 보세요. You can create a key that only allows you to **call specific methods** in the game's contract.

키를 게임에 안전하게 제공할 수 있으므로, 트랜잭션마다 게임 플레이를 중단할 필요 없이 **게임 관련 트랜잭션**에 서명할 수 있습니다.

#### 키 교체하기
키가 유출되었다고 생각되면, 간단히 키를 제거하거나 새 키로 교체할 수 있습니다. Just as how you can change your password on any website.

#### 키 복구하기
계정에서 키 복구 [컨트랙트](smartcontract.md)을 구현하고, 믿을 만한 사람을 위한 "복구 키"를 만들 수 있습니다. Such a key could only be used to start the recovery.

필요한 경우 해당 제3자 구성 요소가 복구 프로세스를 시작하게 할 수도 있습니다.

---

## 키 종류

NEAR는 `FullAccess` 키와 `FunctionCall` 키라는 두 가지 유형의 액세스 키를 구현하고 있습니다.

<hr class="subsection" />

### 전체 액세스 키 (Full Access Key) {#full-access-keys}
이름에서 알 수 있듯이, `FullAccess` 키는 운영 체제에서 관리자 권한을 갖는 것과 유사하게 계정을 완전히 제어할 수 있는 권한을 가집니다.

특히, 전체 액세스 키는 계정을 대신해서 [모든 종류의](https://nomicon.io/RuntimeSpec/Actions) 트랜잭션에 서명하는 데 사용될 수 있습니다. 예시로든 다음과 같은 것을 들 수 있습니다.

1. Create immediate [sub-accounts](account-id.md#rules-for-creating-named-accounts) and [top-level accounts](account-id.md#named-accounts) if the account ID's length is at least 32 characters.
2. Delete your account (but **not** sub-accounts, since they have their keys).
3. 액세스 키를 추가하거나 제거하는 작업.
4. 계정 내 스마트 컨트랙트를 배포하는 작업.
5. 모든 컨트랙트(귀하 또는 다른 사람)의 메서드를 호출하는 작업.
6. NEAR Ⓝ 전송 작업.

누군가에게 `FullAccess`를 넘겨주면, 그들은 해당 계정을 **완전히 제어할 수 있습니다**.

:::tip [계정을 만들 때](creating-accounts.md) 계정의 첫 번째 **전체 액세스 키**를 추가하게 될 것입니다. :::

<hr class="subsection" />

### 함수 호출 키 (Function Call Key) {#function-call-keys}

`FunctionCall` keys only have permission to call specific methods on a contract (potentially all methods) but do **NOT allow to attach NEAR Ⓝ** to the call.

`FunctionCall` 키는 다음과 같은 세 가지 속성으로 정의됩니다.
1. `receiver_id`: 키가 호출하는 것을 허용하는 **컨트랙트**입니다. 이 키를 사용하여 다른 컨트랙트를 호출할 수 없습니다.
2. `method_names` (Optional): The contract's **methods** the key allows to call. If omitted, all methods can be called.
3. `allowance` (Optional): The **amount of Ⓝ** allowed to spend on [gas](../transactions/gas.md). If omitted, the key can consume **UNLIMITED** Ⓝ as gas.

함수 호출 키의 주요 목적은 앱에 전달되어서, 당신의 이름으로 컨트랙트 호출을 할 수 있도록 하는 것입니다.

NEAR 는 [**로그인**](../../../2.develop/integrate/frontend.md#user-sign-in) 프로세스를 구현하여 dApp에 대한 키 생성 및 제공 작업을 단순화합니다. 간단히 말해 dApp은 [지갑](https://testnet.mynearwallet.com)을 사용하여 로그인하도록 요청하여, 자동으로 dApp에 `FunctionCall` 키를 생성하고 제공하도록 할 수 있습니다.

`FunctionCall` 키를 사용하면 dApp은 **계정을 대신하여** 특정 메서드를 호출할 수 있습니다. 이때, dApp은 가스에 대해 기본적으로 0.25Ⓝ까지 사용할 수 있도록 허용됩니다.

dApp이 `FunctionCall` 키를 사용하여 **일정량의 토큰**을 전송하도록 요청하면, 지갑에서 사용자에게 **트랜잭션을 승인**하라는 메시지가 다시 한 번 표시됩니다.


---

## 잠긴 계정(Locked Account)
계정에서 모든 키를 제거하면 계정이 **잠기게** 됩니다. 즉, 외부에서 계정 이름으로 트랜잭션을 수행할 수 없게 됩니다.

In practice, this means that only the account's smart contract can transfer assets, create sub-accounts, or update its code.

계정을 잠그는 것은 컨트랙트를 배포하였을 때, 커뮤니티가 해당 컨트랙트만이 계정을 제어할 수 있음을 확신한다면 매우 유용하게 사용될 수 있습니다.
