---
id: core
title: Core
sidebar_label: Core
---

import {Github} from "@site/src/components/codetabs"

In this tutorial you'll learn how to implement the [core standards](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core) into your smart contract. Nếu bạn tham gia với chúng tôi lần đầu, đừng ngại clone [repo này](https://github.com/near-examples/nft-tutorial) và checkout branch `3.enumeration` để theo dõi.


:::caution

The JS-SDK is currently in **[`Alpha`](https://github.com/near/near-sdk-js/releases/)**.

:::

```bash
git checkout 3.enumeration
```

:::tip If you wish to see the finished code for this _Core_ tutorial, you can find it on the `4.core` branch. :::

## Giới thiệu {#introduction}

Up until this point, you've created a simple NFT smart contract that allows users to mint tokens and view information using the [enumeration standards](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration). Hôm nay, bạn sẽ mở rộng smart contract của mình để cho phép các user không chỉ mint token mà còn transfer chúng.

Như chúng ta đã thực hiện trong [hướng dẫn mint](/tutorials/nfts/js/minting), hãy chia nhỏ vấn đề thành nhiều các subtask để dễ giải quyết hơn. Khi một token được mint, thông tin được lưu trữ ở 3 nơi:

- **tokensPerOwner**: set of tokens for each account.
- **tokensById**: maps a token ID to a `Token` object.
- **tokenMetadataById**: maps a token ID to its metadata.

Bây giờ hãy xem xét tình huống sau đây. Nếu Benji là người sở hữu token A và muốn chuyển nó cho Mike như một món quà sinh nhật, điều gì sẽ xảy ra? Đầu tiên, token A sẽ bị xóa khỏi tập các token của Benji và được thêm vào tập các token của Mike.

Nếu đó chỉ là logic bạn thực hiện, bạn sẽ gặp một số vấn đề. Nếu bạn thực hiện một `view` call để truy vấn thông tin về token đó sau khi nó đã được chuyển cho Mike, nó sẽ vẫn trả về kết quả rằng Benji là chủ sở hữu.

Điều này là do contract vẫn đang map token ID với `Token` object cũ, object đó có field `owner_id` là account ID của Benji. You still have to change the `tokensById` data structure so that the token ID maps to a new `Token` object which has Mike as the owner.

Với những gì đã nói, quy trình cuối cùng khi chủ sở hữu chuyển token tới người nhận sẽ như sau:

- Xóa token khỏi tập token của chủ sở hữu.
- Thêm token tới tập token của người nhận.
- Map token ID tới một `Token` object mới chứa chính xác thông tin chủ sở hữu.

:::note You might be curious as to why we don't edit the `tokenMetadataById` field. Điều này là do bất kể ai sở hữu token, token ID sẽ luôn map tới cùng một metadata. Metadata sẽ không bao giờ thay đổi và vì vậy chúng ta có thể để nó một mình (không map với một token Id nào cả). :::

Tại thời điểm này, bạn đã sẵn sàng để tiếp tục và tạo những sửa đổi quan trọng với smart contract của mình.

## Các sửa đổi với contract

Let's start our journey in the `nft-contract/src/nft_core.ts` file.

### Transfer function {#transfer-function}

You'll start by implementing the `nft_transfer` logic. Function này sẽ chuyển `token_id` được chỉ định tới `receiver_id` với một tuỳ chọn `memo` ví dụ như `"Happy Birthday Mike!"`. The core logic will be found in the `internalNftTransfer` function.

<Github language="js" start="37" end="64" url="https://github.com/near-examples/nft-tutorial-js/blob/4.core/src/nft-contract/nft_core.ts" />

There are a couple things to notice here. Firstly, we've introduced a new function called `assertOneYocto()`. This method will ensure that the user has attached exactly one yoctoNEAR to the call. If a function requires a deposit, you need a full access key to sign that transaction. By adding the one yoctoNEAR deposit requirement, you're essentially forcing the user to sign the transaction with a full access key.

Since the transfer function is potentially transferring very valuable assets, you'll want to make sure that whoever is calling the function has a full access key.

Secondly, we've introduced an `internalTransfer` method. This will perform all the logic necessary to transfer an NFT.

### Các internal helper function

Let's quickly move over to the `nft-contract/src/internal.ts` file so that you can implement the `assertOneYocto()` and `internalTransfer` methods.

Let's start with the easier one, `assertOneYocto()`.

#### assertOneYocto

<Github language="js" start="38" end="41" url="https://github.com/near-examples/nft-tutorial-js/blob/4.core/src/nft-contract/internal.ts" />

#### internal_transfer

It's now time to implement the `internalTransfer` function which is the core of this tutorial. Function này sẽ nhận các tham số sau:

- **senderId**: the account that's attempting to transfer the token.
- **receiverId**: the account that's receiving the token.
- **tokenId**: the token ID being transferred.
- **memo**: một tùy chọn memo kèm theo.

Điều đầu tiên bạn cần làm là đảo bảo rằng người gửi được ủy quyền để chuyển token. Trong trường hợp này, bạn chỉ cần đảm bảo rằng người gửi là chủ sở hữu của token. Bạn sẽ làm điều đó bằng cách lấy `Token` object sử dụng `token_id` và đảm bảo rằng người gửi giống với `owner_id` của token.

Thứ hai, bạn sẽ xóa token ID từ danh sách token của người gửi và thêm token ID vào danh sách token của người nhận. Cuối cùng, bạn sẽ tạo một `Token` object mới với chủ sở hữu là người nhận và map lại token ID tới nó.

<Github language="js" start="80" end="114" url="https://github.com/near-examples/nft-tutorial-js/blob/4.core/src/nft-contract/internal.ts" />

Phía trên, bạn đã triển khai function để thêm token ID tới một tập các token của chủ sở hữu nhưng bạn chưa tạo một function để xóa một token ID từ một tập các token. Let's do that now by created a new function called `internalRemoveTokenFromOwner` which we'll place right above our `internalTransfer` and below the `internalAddTokenToOwner` function.

Trong remove function này, bạn sẽ lấy tập các token của một account ID và sau đó remove token ID đã truyền vào. If the account's set is empty after the removal, you'll simply remove the account from the `tokensPerOwner` data structure.

<Github language="js" start="60" end="78" url="https://github.com/near-examples/nft-tutorial-js/blob/4.core/src/nft-contract/internal.ts" />

Với việc hoàn thành những internal function này, logic cho việc transfer các NFT đã xong. Bây giờ là lúc để tiếp tục và tiến hành `nft_transfer_call`, một trong những hàm tích phân phức tạp nhất trong các standard function.

### Transfer call function {#transfer-call-function}

Hãy xem xét kịch bản sau đây. Một account muốn transfer một NFT sang một smart contract để thực hiện một dịch vụ. Cách tiếp cận truyền thống là sẽ sử dụng một hệ thống approval management, trong đó contract được cấp khả năng để transfer NFT tới chính nó sau khi hoàn thành. Bạn có thể tìm hiểu về hệ thống approval management này trong [phần các approval](/tutorials/nfts/js/approvals) của serie hướng dẫn.

Workflow này cần nhiều transaction. Nếu chúng ta giới thiệu “transfer and call” workflow bằng một transaction duy nhất, quy trình này có thể được cải thiện rất nhiều.

Vì lý do này, chúng ta có một function là `nft_transfer_call`, nó sẽ transfer một NFT tới một người nhận và cũng call một method trên contract của người nhận trong cùng một transaction.

<Github language="js" start="66" end="125" url="https://github.com/near-examples/nft-tutorial-js/blob/4.core/src/nft-contract/nft_core.ts" />

Trước tiên, function sẽ xác nhận rằng người gọi đã đính kèm chính xác 1 yocto cho mục đích bảo mật. It will then transfer the NFT using `internalTransfer` and start the cross contract call. Nó sẽ call một method `nft_on_transfer` trên contract của `receiver_id` để trả về một promise. Sau khi promise kết thúc, hàm `nft_resolve_transfer` được gọi. Đây là workflow rất phổ biến khi xử lý các cross contract call. Trước tiên, bạn bắt đầu khởi tạo call và đợi nó thực hiện xong. Sau đó bạn gọi một function xử lý kết quả của promise và hành động phù hợp.

Trong trường hợp cùa chúng ta, khi call `nft_on_transfer`, function đó sẽ trả về một giá trị boolean để cho biết bạn có nên trả lại NFT cho chủ sở hữu ban đầu của nó hay không. This is logic will be executed in the `internalResolveTransfer` function.

<Github language="js" start="127" end="187" url="https://github.com/near-examples/nft-tutorial-js/blob/4.core/src/nft-contract/nft_core.ts" />

Nếu `nft_on_transfer` trả về true, bạn sẽ gửi token trở lại cho người sở hữu ban đầu của nó. Ngược lại, nếu trả về false thì không cần thêm logic nào cả. Đối với giá trị trả về của `nft_resolve_transfer`, hàm này phải trả về một giá trị boolean theo tiêu chuẩn quy định để cho biết người nhận có nhận thành công token hay không.

Điều này có nghĩa là nếu `nft_on_transfer` trả về true, bạn nên trả về false. This is because if the token is being returned to its original owner. The `receiver_id` didn't successfully receive the token in the end. Ngược lại, nếu `nft_on_transfer` trả về false, bạn nên trả về true vì chúng ta không cần trả về token và do đó `receiver_id` sở hữu thành công token.

Với việc hoàn thành điều đó, bạn đã thêm thành công logic cần thiết để cho phép người dùng transfer các NFT. Bây giờ là lúc deploy và thực hiện một vài bài test.

## Redeploy contract {#redeploying-contract}

Sử dụng build script, build và deploy contract giống như bạn đã làm trong các hướng dẫn trước:

```bash
yarn build && near deploy --wasmFile build/nft.wasm --accountId $NFT_CONTRACT_ID
```

Lúc này sẽ có một cảnh báo nói rằng tài khoản đã có một contract đã được deploy và sẽ hỏi bạn có muốn tiếp tục hay không. Đơn giản hãy gõ `y` và ấn enter.

```
This account already has a deployed contract [ AKJK7sCysrWrFZ976YVBnm6yzmJuKLzdAyssfzK9yLsa ]. Do you want to proceed? (y/n)
```

:::tip Nếu bạn chưa hoàn thành các bài hướng dẫn trước đó và mới chỉ theo dõi bài này, đơn giản hãy tạo một account và login với CLI của mình bằng cách sử dụng `near login`. Bạn có thể export một biến môi trường `export NFT_CONTRACT_ID=YOUR_ACCOUNT_ID_HERE`. :::

## Test các thay đổi mới {#testing-changes}

Bây giờ thì bạn đã deploy một bản vá lỗi cho contract, đã đến lúc để chuyển sang giai đoạn test. Sử dụng NFT contract trước đó mà bạn đã đã mint token cho chính mình, bạn có thể test method `nft_transfer`. Nếu bạn transfer NFT, nó sẽ bị xoá khỏi các bộ sưu tập trong account của bạn được hiển thị ở wallet. Ngoài ra, nếu bạn truy vấn bất kỳ enumeration function nào, nó sẽ cho thấy rằng bạn không còn là chủ sở hữu nữa.

Hãy test điều này bằng cách transfer một NFT tới account `benjiman.testnet` và xem NFT có còn thuộc quyền sở hữu của bạn hay không.

### Test transfer function

:::note Điều này có nghĩa rằng NFT không thể khôi phục được trừ khi account `benjiman.testnet` transfer nó lại cho bạn. Nếu bạn không muốn NFT của mình bị mất, tạo một account mới và transfer token tới account đó. :::

Nếu bạn chạy command sau, nó sẽ transfer token `"token-1"` tới account `benjiman.testnet` với memo `"Go Team :)"`. Hãy lưu ý rằng bạn cũng đang đính kèm chính xác 1 yoctoNEAR bằng cách sử dụng `--depositYocto` flag.

:::tip Nếu bạn đã sử dụng một token ID khác trong những bài hướng dẫn trước, thay thế `token-1` với token ID của bạn. :::

```bash
near call $NFT_CONTRACT_ID nft_transfer '{"receiver_id": "benjiman.testnet", "token_id": "token-1", "memo": "Go Team :)"}' --accountId $NFT_CONTRACT_ID --depositYocto 1
```

Nếu bây giờ bạn truy vấn tất cả các token mà account bạn sở hữu, token đó sẽ bị thiếu. Tương tự, nếu bạn truy vấn danh sách các token được sở hữu bởi `benjiman.testnet`, account đó bây giờ sẽ sở hữu NFT của bạn.

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

## Tổng kết

Trong bài hướng dẫn này, bạn đã học cách làm thế nào để mở rộng một NFT contract thông qua mint function và bạn đã biết thêm cách để người dùng transfer các NFT. Bạn đã [chia nhỏ](#introduction) vấn đề thành các vấn đề bé hơn, nhiều subtask dễ xử lý hơn và lấy thông tin đó để triển khai cả hai function là [NFT transfer](#transfer-function) và [NFT transfer call](#transfer-call-function). Ngoài ra, bạn đã deploy [bản vá lỗi](#redeploying-contract) khác tới smart contract của mình và [đã test](#testing-changes) chức năng transfer.

Trong [hướng dẫn tới](/tutorials/nfts/js/approvals), bạn sẽ học về hệ thống approval management và làm thế nào để bạn có thể chấp thuận người khác transfer token thay cho bạn.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `3.0.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Enumeration standard: [NEP181](https://nomicon.io/Standards/Tokens/NonFungibleToken/Enumeration), version `1.0.0`

:::
