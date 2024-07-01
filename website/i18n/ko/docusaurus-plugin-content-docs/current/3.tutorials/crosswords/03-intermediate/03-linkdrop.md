---
sidebar_position: 4
sidebar_label: "Linkdrop 컨트랙트"
title: "사용 중인 Linkdrop 컨트랙트 소개"
---

import {Github} from "@site/src/components/codetabs"

import createMainnetAccount from '/docs/assets/crosswords/create-mainnet-account.png';
import createTestnetAccount from '/docs/assets/crosswords/create-testnet-wallet-account.png';

# Linkdrop 컨트랙트

우리는 linkdrop 스마트 컨트랙트에 대해 이야기하기 위해, 약간 다른 이야기를 할 것입니다.  먼저 이 컨트랙트와 그 목적을 이해한 다음 이 컨트랙트에서 메서드 호출에 대해 논의하는 것이 가장 좋습니다.

[linkdrop 컨트랙트](https://github.com/near/near-linkdrop)는 테스트넷과 메인넷 네트워크의 최상위 계정으로 각각 알려진 계정 `testnet`과 `near`에 배포됩니다. (누구나 linkdrop 스타일의 컨트랙트를 다른 곳에서 만들 수 있지만, 여기에 표시된 컨트랙트는 다른 사람들이 패턴화한 주요 컨트랙트입니다.)

## 테스트넷

테스트넷 계정에는 특별한 것이 없습니다. 테스트넷 계정을 생성할 때 개발자로서 실제 비용은 없으므로 편의에 따라 자유롭게 생성하거나 삭제할 수 있습니다.

사용자가 NEAR Wallet에서 테스트넷 계정에 가입하면 다음과 같이 표시됩니다.

<img src={createTestnetAccount} width="400" />

이 테스트넷 계정이 어떻게 생성되는지 논의해 봅시다.

새 계정은 `.testnet`로 끝납니다. 이는 ([이 튜토리얼의 앞부분](../01-basics/02-add-functions-call.md#create-a-subaccount)에서 배운 것처럼) `testnet<code> 계정이 <code>.vacant-name.testnet`이라는 하위 계정(sub-account)을 생성하기 때문입니다.

이 하위 계정을 만드는 방법에는 두 가지가 있습니다.

1. `testnet` 계정에 대한 전체 액세스 키를 사용하여 `CreateAccount` Action으로 트랜잭션에 서명합니다.
2. `testnet` 계정에 배포된 스마트 컨트랙트에서, Promise를 반환하는 비동기 메서드인 `CreateAccount` Action을 호출합니다. (More info about writing a [`CreateAccount` Promise](../../../2.build/2.smart-contracts/anatomy/actions.md#create-a-sub-account))

(NEAR CLI를 사용하여 새 계정을 생성하는 아래 예에서는, 메인넷의 최상위 "near" 계정에 배포되는 linkdrop 컨트랙트 내 `CreateAccount`를 호출합니다.)


## 메인넷

메인넷에서 `near` 계정에는 linkdrop 컨트랙트도 배포되어 있습니다.

Using NEAR CLI, a person can create a `mainnet` account by calling the linkdrop contract, like shown below:

```bash
near contract call-function as-transaction near create_account json-args '{"new_account_id": "aloha.near", "new_public_key": "3cQ...tAT"}' prepaid-gas '300.0 Tgas' attached-deposit '15 NEAR' sign-as mike.near network-config mainnet sign-with-legacy-keychain
```

The above command calls the `create_account` method on the account `near`, and would create `aloha.near` **if it's available**, funding it with 15 Ⓝ.

We'll want to write a smart contract that calls that same method. However, things get interesting because it's possible `aloha.near` is already taken, so we'll need to learn how to handle that.

## 간단한 콜백

### `create_account` 메서드

Here, we'll show the implementation of the `create_account` method. Note the `#[payable]` macro, which allows this function to accept an attached deposit. (Remember in the CLI command we were attaching 15 Ⓝ.)

<Github language="rust" start="128" end="152" url="https://github.com/near/near-linkdrop/blob/master/src/lib.rs" />

The most important part of the snippet above is around the middle where there's:

```rust
Promise::new(...)
    ...
    .then(
        Self::ext(env::current_account_id())
            .on_account_created(...)
    )
```

This translates to, "we're going to attempt to perform an Action, and when we're done, please call myself at the method `on_account_created` so we can see how that went."

:::caution This doesn't work

Not infrequently, developers will attempt to do this in a smart contract:

```rust
let creation_result = Promise::new("aloha.mike.near")
  .create_account();

// Check creation_result variable (can't do it!)
if creation_result {...}

```

In other programming languages promises might work like this, but we must use callbacks instead. :::

### 콜백

Now let's look at the callback:

<Github language="rust" start="199" end="212" url="https://github.com/near/near-linkdrop/blob/master/src/lib.rs" />

This calls the private helper method `is_promise_success`, which basically checks to see that there was only one promise result, because we only attempted one Promise:

<Github language="rust" start="35" end="45" url="https://github.com/near/near-linkdrop/blob/master/src/lib.rs" />

Note that the callback returns a boolean. This means when we modify our crossword puzzle to call the linkdrop contract on `testnet`, we'll be able to determine if the account creation succeeded or failed.

And that's it! Now we've seen a method and a callback in action for a simple contract.

:::tip This is important Understanding cross-contract calls and callbacks is quite important in smart contract development.

Since NEAR's transactions are asynchronous, the use of callbacks may be a new paradigm shift for smart contract developers from other ecosystems.

Feel free to dig into the linkdrop contract and play with the ideas presented in this section.

There are two additional examples that are helpful to look at:
1. [높은 수준의 교차 컨트랙트 호출](https://github.com/near/near-sdk-rs/blob/master/examples/cross-contract-calls/high-level/src/lib.rs) — 이는 linkdrop 컨트랙트에서 본 것과 유사합니다.
2. [낮은 수준의 교차 컨트랙트 호출](https://github.com/near/near-sdk-rs/blob/master/examples/cross-contract-calls/low-level/src/lib.rs)— 우리가 언급한 특성을 사용하지 않는 다른 접근 방식입니다. :::

---

Next we'll modify the crossword puzzle contract to check for the signer's public key, which is how we now determine if they solved the puzzle correctly.
