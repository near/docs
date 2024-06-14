---
id: core
title: Transfers
---

import {Github} from "@site/src/components/codetabs"

In this tutorial you'll learn how to implement NFT transfers as defined in the [core standards](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core) into your smart contract.

We will define two methods for transferring NFTs:
- `nft_transfer`: that transfers ownership of an NFT from one account to another
- `nft_transfer_call`: that transfers an NFT to a "receiver" and calls a method on the receiver's account

:::tip Why two transfer methods?

`nft_transfer` is a simple transfer between two user, while `nft_transfer_call` allows you to **attach an NFT to a function call**

:::

---

## Giới thiệu {#introduction}

Up until this point, you've created a simple NFT smart contract that allows users to mint tokens and view information using the [enumeration standards](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration). Hôm nay, bạn sẽ mở rộng smart contract của mình để cho phép các user không chỉ mint token mà còn transfer chúng.

Như chúng ta đã thực hiện trong [hướng dẫn mint](/tutorials/nfts/minting), hãy chia nhỏ vấn đề thành nhiều các subtask để dễ giải quyết hơn. Khi một token được mint, thông tin được lưu trữ ở 3 nơi:

- **tokens_per_owner**: tập các token cho mỗi account.
- **tokens_by_id**: map một token ID với một `Token` object.
- **token_metadata_by_id**: map một token ID với metadata của nó.

Bây giờ hãy xem xét tình huống sau đây. Nếu Benji là người sở hữu token A và muốn chuyển nó cho Mike như một món quà sinh nhật, điều gì sẽ xảy ra? Đầu tiên, token A sẽ bị xóa khỏi tập các token của Benji và được thêm vào tập các token của Mike.

Nếu đó chỉ là logic bạn thực hiện, bạn sẽ gặp một số vấn đề. Nếu bạn thực hiện một `view` call để truy vấn thông tin về token đó sau khi nó đã được chuyển cho Mike, nó sẽ vẫn trả về kết quả rằng Benji là chủ sở hữu.

Điều này là do contract vẫn đang map token ID với `Token` object cũ, object đó có field `owner_id` là account ID của Benji. Bạn vẫn phải thay đổi cấu trúc data của `tokens_by_id`, vì thế token ID map với một `Token` object mới mà Mike sở hữu.

Với những gì đã nói, quy trình cuối cùng khi chủ sở hữu chuyển token tới người nhận sẽ như sau:

- Xóa token khỏi tập token của chủ sở hữu.
- Thêm token tới tập token của người nhận.
- Map token ID tới một `Token` object mới chứa chính xác thông tin chủ sở hữu.

:::note Bạn có thể thắc mắc tại sao chúng ta không sửa field `token_metadata_by_id`. Điều này là do bất kể ai sở hữu token, token ID sẽ luôn map tới cùng một metadata. Metadata sẽ không bao giờ thay đổi và vì vậy chúng ta có thể để nó một mình (không map với một token Id nào cả). :::

Tại thời điểm này, bạn đã sẵn sàng để tiếp tục và tạo những sửa đổi quan trọng với smart contract của mình.

---

## Các sửa đổi với contract

Let's start our journey in the `nft-contract-skeleton/src/nft_core.rs` file.

### Transfer function {#transfer-function}

You'll start by implementing the `nft_transfer` logic. Function này sẽ chuyển `token_id` được chỉ định tới `receiver_id` với một tuỳ chọn `memo` ví dụ như `"Happy Birthday Mike!"`.

<Github language="rust" start="60" end="80" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/nft_core.rs" />

There are a couple things to notice here. Firstly, we've introduced a new function called `assert_one_yocto()`, which ensures the user has attached exactly one yoctoNEAR to the call. This is a [security measure](../../2.build/2.smart-contracts/security/one_yocto.md) to ensure that the user is signing the transaction with a [full access key](../../1.concepts/protocol/access-keys.md).

Since the transfer function is potentially transferring very valuable assets, you'll want to make sure that whoever is calling the function has a full access key.

Secondly, we've introduced an `internal_transfer` method. This will perform all the logic necessary to transfer an NFT.

<hr class="subsection" />

### Các internal helper function

Let's quickly move over to the `nft-contract/src/internal.rs` file so that you can implement the `assert_one_yocto()` and `internal_transfer` methods.

Let's start with the easier one, `assert_one_yocto()`.

#### assert_one_yocto

<Github language="rust" start="14" end="21" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/internal.rs" />

#### internal_transfer

It's now time to explore the `internal_transfer` function which is the core of this tutorial. This function takes the following parameters:

- **sender_id**: account đang cố gắng chuyển token.
- **receiver_id**: account nhận token.
- **token_id**: token ID đang được chuyển.
- **memo**: một tùy chọn memo kèm theo.

The first thing we have to do is to make sure that the sender is authorized to transfer the token. In this case, we just make sure that the sender is the owner of the token. We do that by getting the `Token` object using the `token_id` and making sure that the sender is equal to the token's `owner_id`.

Second, we remove the token ID from the sender's list and add the token ID to the receiver's list of tokens. Finally, we create a new `Token` object with the receiver as the owner and remap the token ID to that newly created object.

We want to create this function within the contract implementation (below the `internal_add_token_to_owner` you created in the minting tutorial).

<Github language="rust" start="96" end="132" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/internal.rs" />

Now let's look at the function called `internal_remove_token_from_owner`. That function implements the functionality for removing a token ID from an owner's set.

In the remove function, we get the set of tokens for a given account ID and then remove the passed in token ID. If the account's set is empty after the removal, we simply remove the account from the `tokens_per_owner` data structure.

<Github language="rust" start="71" end="94" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/internal.rs" />

Bây giờ, file `internal.rs` của bạn sẽ có outline như dưới đây:

```
internal.rs
├── hash_account_id
├── assert_one_yocto
├── refund_deposit
└── impl Contract
    ├── internal_add_token_to_owner
    ├── internal_remove_token_from_owner
    └── internal_transfer
```

<hr class="subsection" />

### Transfer call function {#transfer-call-function}

The idea behind the `nft_transfer_call` function is to transfer an NFT to a receiver while calling a method on the receiver's contract all in the same transaction.

This way, we can effectively **attach an NFT to a function call**.

<Github language="rust" start="82" end="126" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/nft_core.rs" />

Trước tiên, function sẽ xác nhận rằng người gọi đã đính kèm chính xác 1 yocto cho mục đích bảo mật. Nó sau đó sẽ transfer NFT sử dụng `internal_transfer` và bắt đầu cross contract call. It will call the method `nft_on_transfer` on the `receiver_id`'s contract, and create a promise to call back `nft_resolve_transfer` with the result. This is a very common workflow when dealing with [cross contract calls](../../2.build/2.smart-contracts/anatomy/crosscontract.md).

As dictated by the core standard, the function we are calling (`nft_on_transfer`) needs to return a boolean stating whether or not you should return the NFT to it's original owner.

<Github language="rust" start="146" end="201" url="https://github.com/near-examples/nft-tutorial/blob/main/nft-contract-basic/src/nft_core.rs" />

If `nft_on_transfer` returned true or the called failed, you should send the token back to it's original owner. Ngược lại, nếu trả về false thì không cần thêm logic nào cả.

As for the return value of our function `nft_resolve_transfer`, the standard dictates that the function should return a boolean indicating whether or not the receiver successfully received the token or not.

Điều này có nghĩa là nếu `nft_on_transfer` trả về true, bạn nên trả về false. Bởi vì nếu token đang được trả lại cho chủ sở hữu ban đầu của nó, thì cuối cùng `receiver_id` đã không nhận được thành công token. Ngược lại, nếu `nft_on_transfer` trả về false, bạn nên trả về true vì chúng ta không cần trả về token và do đó `receiver_id` sở hữu thành công token.

Với việc hoàn thành điều đó, bạn đã thêm thành công logic cần thiết để cho phép người dùng transfer các NFT. Bây giờ là lúc deploy và thực hiện một vài bài test.

---

## Redeploy contract {#redeploying-contract}

Using cargo-near, deploy the contract as you did in the previous tutorials:

```bash
cargo near deploy $NFT_CONTRACT_ID without-init-call network-config testnet sign-with-keychain send
```

:::tip Nếu bạn chưa hoàn thành các bài hướng dẫn trước đó và mới chỉ theo dõi bài này, đơn giản hãy tạo một account và login với CLI của mình bằng cách sử dụng `near login`. Bạn có thể export một biến môi trường `export NFT_CONTRACT_ID=YOUR_ACCOUNT_ID_HERE`. :::

---

## Test các thay đổi mới {#testing-changes}

Bây giờ thì bạn đã deploy một bản vá lỗi cho contract, đã đến lúc để chuyển sang giai đoạn test. Sử dụng NFT contract trước đó mà bạn đã đã mint token cho chính mình, bạn có thể test method `nft_transfer`. Nếu bạn transfer NFT, nó sẽ bị xoá khỏi các bộ sưu tập trong account của bạn được hiển thị ở wallet. Ngoài ra, nếu bạn truy vấn bất kỳ enumeration function nào, nó sẽ cho thấy rằng bạn không còn là chủ sở hữu nữa.

Hãy test điều này bằng cách transfer một NFT tới account `benjiman.testnet` và xem NFT có còn thuộc quyền sở hữu của bạn hay không.

<hr class="subsection" />

### Test transfer function

:::note Điều này có nghĩa rằng NFT không thể khôi phục được trừ khi account `benjiman.testnet` transfer nó lại cho bạn. Nếu bạn không muốn NFT của mình bị mất, tạo một account mới và transfer token tới account đó. :::

Nếu bạn chạy command sau, nó sẽ transfer token `"token-1"` tới account `benjiman.testnet` với memo `"Go Team :)"`. Hãy lưu ý rằng bạn cũng đang đính kèm chính xác 1 yoctoNEAR bằng cách sử dụng `--depositYocto` flag.

:::tip Nếu bạn đã sử dụng một token ID khác trong những bài hướng dẫn trước, thay thế `token-1` với token ID của bạn. :::

```bash
near call $NFT_CONTRACT_ID nft_transfer '{"receiver_id": "benjiman.testnet", "token_id": "token-1", "memo": "Go Team :)"}' --accountId $NFT_CONTRACT_ID --depositYocto 1
```

Nếu bây giờ bạn truy vấn tất cả các token mà account bạn sở hữu, token đó sẽ bị thiếu. Tương tự, nếu bạn truy vấn danh sách các token được sở hữu bởi `benjiman.testnet`, account đó bây giờ sẽ sở hữu NFT của bạn.

<hr class="subsection" />

### Test transfer call function

Bây giờ thì bạn đã test `nft_transfer` function, đến lúc để test `nft_transfer_call` function. Nếu bạn cố gắng transfer một NFT tới một người nhận **không** tiến hành `nft_on_transfer` function, contract sẽ panic và NFT sẽ **không** được transfer. Hãy test chức năng này bên dưới.

Đầu tiên mint một NFT mới sẽ được sử dụng để test chức năng transfer call.

```bash
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "token-2", "metadata": {"title": "NFT Tutorial Token", "description": "Testing the transfer call function", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID --amount 0.1
```

Bây giờ thì bạn đã mint token, bạn có thể thử transfer NFT tới account `no-contract.testnet`, account này không có contract nào giống như tên của nó đã cho thấy. Điều này có nghĩa rằng người nhận không tiến hành `nft_on_transfer` function và NFT sẽ vẫn là của bạn sau khi transaction hoàn thành.

```bash
near call $NFT_CONTRACT_ID nft_transfer_call '{"receiver_id": "no-contract.testnet", "token_id": "token-2", "msg": "foo"}' --accountId $NFT_CONTRACT_ID --depositYocto 1 --gas 200000000000000
```

Nếu bạn truy vấn các token của mình, bạn sẽ vẫn có `token-2` và tại thời điểm này, bạn đã hoàn thành!

---

## Tổng kết

Trong bài hướng dẫn này, bạn đã học cách làm thế nào để mở rộng một NFT contract thông qua mint function và bạn đã biết thêm cách để người dùng transfer các NFT. Bạn đã [chia nhỏ](#introduction) vấn đề thành các vấn đề bé hơn, nhiều subtask dễ xử lý hơn và lấy thông tin đó để triển khai cả hai function là [NFT transfer](#transfer-function) và [NFT transfer call](#transfer-call-function). Ngoài ra, bạn đã deploy [bản vá lỗi](#redeploying-contract) khác tới smart contract của mình và [đã test](#testing-changes) chức năng transfer.

In the [next tutorial](/docs/tutorials/contracts/nfts/approvals), you'll learn about the approval management system and how you can approve others to transfer tokens on your behalf.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `4.0.13`
- cargo-near `0.6.1`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.1.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`

:::
