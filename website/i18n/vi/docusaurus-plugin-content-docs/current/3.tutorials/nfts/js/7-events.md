---
id: events
title: Event
sidebar_label: Event
---

import {Github} from "@site/src/components/codetabs"

In this tutorial, you'll learn about the [events standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event) and how to implement it in your smart contract.



## Giới thiệu

Để bắt đầu, hãy chuyển sang branch `6.approval` từ [GitHub repository](https://github.com/near-examples/nft-tutorial/) của chúng tôi, hoặc tiếp tục công việc của bạn từ các hướng dẫn trước.

```bash
git checkout 6.royalty
```

:::tip If you wish to see the finished code for this _Events_ tutorial, you can find it on the `7.events` branch. :::

## Hiểu rõ trường hợp sử dụng {#understanding-the-use-case}

Have you ever wondered how the wallet knows which NFTs you own and how it can display them in the [collectibles tab](https://testnet.mynearwallet.com//?tab=collectibles)? Ban đầu, một [indexer](/tools/indexer-for-explorer) đã được sử dụng và nó lắng nghe mọi function bắt đầu với `nft_` trên account của bạn. Những contract này sau đó được gắn cờ trên account của bạn có thể là các NFT contract.

Khi bạn chuyển đến collectibles tab của mình, wallet sau đó sẽ truy vấn tất cả các contract đó để biết danh sách NFT mà bạn đang sở hữu bằng cách sử dụng function `nft_tokens_for_owner` mà bạn đã nhìn thấy trong [hướng dẫn enumeration](/tutorials/nfts/js/enumeration).

### Vấn đề {#the-problem}

Phương pháp gắn cờ các contract này không đáng tin cậy vì mỗi ứng dụng điều khiển NFT có thể có cách mint hoặc transfer NFT riêng của nó. Ngoài ra, các ứng dụng thường transfer hoặc mint nhiều token cùng một lúc bằng cách sử dụng các batch function.

### Phương pháp {#the-solution}

Một tiêu chuẩn đã được giới thiệu để các smart contract có thể phát ra một event bất cứ lúc nào các NFT được transfer, mint, hay burn. Event này ở dạng log. Bất kể contract triển khai function như thế nào, giờ đây indexer có thể lắng nghe các log được tiêu chuẩn hóa đó.

Theo tiêu chuẩn, bạn cần triển khai một chức năng log kích hoạt khi các NFT được transfer hoặc mint. Trong trường hợp này, contract không hỗ trợ burn vì thế bạn không cần lo lắng về nó bây giờ.

Điều quan trọng cần lưu ý là tiêu chuẩn quy định rằng log phải được bắt đầu với `"EVENT_JSON:"`. Tuy nhiên, cấu trúc log của bạn luôn phải chứa 3 thứ dưới đây:

- **standard**: tên hiện tại của tiêu chuẩn (ví dụ nep171)
- **version**: phiên bản của tiêu chuẩn bạn đang sử dụng (ví dụ 1.0.0)
- **event**: một danh sách các event bạn đang phát ra.

Event interface khác nhau tùy thuộc vào việc bạn đang ghi lại các transfer hay mint. Interface của cả hai event được phác thảo như dưới đây.

**Các transfer event**:
- *Optional* - **authorized_id**: account đã được chấp thuận transfer thay cho chủ sở hữu.
- **old_owner_id**: chủ sở hữu cũ của NFT.
- **new_owner_id**: chủ sở hữu mới mà NFT đang được transfer tới.
- **token_ids**: danh dách các NFT đang được transfer.
- *Optional* - **memo**: một tùy chọn message để đưa vào event.

**Các mint event**:
- **new_owner_id**: chủ sở hữu mới mà NFT đang được mint tới.
- **token_ids**: danh dách các NFT đang được transfer.
- *Optional* - **memo**: một tùy chọn message để đưa vào event.

### Các ví dụ {#examples}

Để củng cố sự hiểu biết của bạn về tiêu chuẩn này, hãy cùng đi qua ba tình huống và xem các log sẽ như thế nào.

#### Tình huống A - mint đơn giản

Trong tình huống này, Benji muốn mint một NFT tới Mike với một token ID `"team-token"` và anh ấy không gửi một message nào. Log sẽ nhìn giống như sau.

```js
EVENT_JSON:{
  "standard": "nep171",
  "version": "1.0.0",
  "event": "nft_mint",
  "data": [
    {"owner_id": "mike.testnet", "token_ids": ["team-token"]}
  ]
}
```

#### Tình huống B- batch mint

Trong tình huống này, Benji muốn tiến hành một batch mint. Anh ấy sẽ mint NFT tới Mike, Damian, Josh, và Dorian. Tuy nhiên, Dorian sẽ nhận được hai NFT. Mỗi token ID sẽ là `"team-token"` theo sau bởi một số tăng dần. Log sẽ như sau.


```js
EVENT_JSON:{
  "standard": "nep171",
  "version": "1.0.0",
  "event": "nft_mint",
  "data": [
    {"owner_id": "mike.testnet", "token_ids": ["team-token0"]},
    {"owner_id": "damian.testnet", "token_ids": ["team-token1"]},
    {"owner_id": "josh.testnet", "token_ids": ["team-token2"]}
    {"owner_id": "dorian.testnet", "token_ids": ["team-token3", "team-token4"]},
  ]
}
```

#### Tình huống C - transfer các NFT

Trong tình huống này, Mike đang transfer cả hai token của team anh ấy tới Josh. Log sẽ nhìn giống như sau.

```js
EVENT_JSON:{
  "standard": "nep171",
  "version": "1.0.0",
  "event": "nft_transfer",
  "data": [
    {"old_owner_id": "mike.testnet", "new_owner_id": "josh.testnet", "token_ids": ["team-token", "team-token0"], "memo": "Go Team!"}
  ]
}
```

## Các sửa đổi với contract {#modifications-to-the-contract}

Ở thời điểm này, bạn đã hiểu rõ về mục tiêu cuối cùng là gì vì thế hãy bắt đầu làm việc!

### Log các token đã được mint {#logging-minted-tokens}

Vì contract chỉ mint các token ở một nơi, nên việc bạn đặt log ở đâu là không quan trọng. Mở file `nft-contract/src/mint.ts` và chuyển tới phía cuối file. Đây là nơi bạn sẽ xây dựng log để mint. Bây giờ nó sẽ phát ra một log chính xác, bất kỳ khi nào ai đó mint thành công một NFT.

```js
// Construct the mint log as per the events standard.
let nftMintLog = {
    // Standard name ("nep171").
    standard: NFT_STANDARD_NAME,
    // Version of the standard ("nft-1.0.0").
    version: NFT_METADATA_SPEC,
    // The data related with the event stored in a vector.
    event: "nft_mint",
    data: [
        {
            // Owner of the token.
            owner_id: token.owner_id,
            // Vector of token IDs that were minted.
            token_ids: [tokenId],
        }
    ]
}

// Log the json.
near.log(`EVENT_JSON:${JSON.stringify(nftMintLog)}`);
```

<Github language="js" start="7" end="85" url="https://github.com/near-examples/nft-tutorial-js/blob/7.events/src/nft-contract/mint.ts" />

### Log các transfer {#logging-transfers}

Let's open the `nft-contract/src/internal.ts` file and navigate to the `internalTransfer` function. This is the location where you'll build your transfer logs. Whenever an NFT is transferred, this function is called and so you'll correctly be logging the transfers.

```js
// Construct the transfer log as per the events standard.
let nftTransferLog = {
    // Standard name ("nep171").
    standard: NFT_STANDARD_NAME,
    // Version of the standard ("nft-1.0.0").
    version: NFT_METADATA_SPEC,
    // The data related with the event stored in a vector.
    event: "nft_transfer",
    data: [
        {
            // The optional authorized account ID to transfer the token on behalf of the old owner.
            authorized_id: authorizedId,
            // The old owner's account ID.
            old_owner_id: token.owner_id,
            // The account ID of the new owner of the token.
            new_owner_id: receiverId,
            // A vector containing the token IDs as strings.
            token_ids: [tokenId],
            // An optional memo to include.
            memo,
        }
    ]
}

// Log the serialized json.
near.log(`EVENT_JSON:${JSON.stringify(nftTransferLog)}`);
```
<Github language="js" start="113" end="205" url="https://github.com/near-examples/nft-tutorial-js/blob/7.events/src/nft-contract/internal.ts" />

Thật không may, có một trường hợp sẽ làm hỏng mọi thứ với giải pháp này. Nếu một NFT được transfer thông qua function `nft_transfer_call`, có khả năng quá trình transfer sẽ bị revert nếu `nft_on_transfer` function trả về `true`. Xem xét logic của `nft_transfer_call`, bạn sẽ thấy tại sao đây là một vấn đề.

Khi `nft_transfer_call` được gọi, nó sẽ:
- Call `internalTransfer` to perform the actual transfer logic.
- Khởi tạo một cross-contract call và gọi function `nft_on_transfer`.
- Resolve the promise and perform logic in `internalResolveTransfer`.
    - Nếu nó trả về true nghĩa là quá trình transfer đã diễn ra tốt đẹp còn trả về false thì quá trình transfer sẽ được revert.

If you only place the log in the `internalTransfer` function, the log will be emitted and the indexer will think that the NFT was transferred. If the transfer is reverted during `internalResolveTransfer`, however, that event should **also** be emitted. Bất cứ nơi nào mà một NFT **có thể** được transfer, chúng ta nên ghi vào log. Replace the `internalResolveTransfer` with the following code.

<Github language="js" start="138" end="242" url="https://github.com/near-examples/nft-tutorial-js/blob/7.events/src/nft-contract/nft_core.ts" />

Với việc hoàn thành điều đó, bạn đã triển khai thành công tiêu chuẩn các event và bây giờ là lúc để bắt đầu quá trình test.

## Deploy contract {#redeploying-contract}

Với mục đích dễ đọc và dễ develop, thay vì redeploy contract tới cùng account, hãy tạo một sub-account và deploy với tài khoản đó. Bạn có thể deploy cùng account vì không có thay đổi nào bạn đã triển khai trong hướng dẫn này gây ra lỗi.

### Tạo một sub-account

Chạy command dưới đây để tạo một sub-account `events` cho account chính của bạn với số dư ban đầu là 25 NEAR, nó sẽ được transfer từ account gốc sang account mới của bạn.

```bash
near create-account events.$NFT_CONTRACT_ID --masterAccount $NFT_CONTRACT_ID --initialBalance 25
```

Tiếp theo, bạn sẽ muốn export một biến môi trường cho việc develop được dễ dàng hơn:

```bash
export EVENTS_NFT_CONTRACT_ID=events.$NFT_CONTRACT_ID
```

Sử dụng build script, deploy contract như bạn đã làm ở các hướng dẫn trước:

```bash
yarn build && near deploy --wasmFile build/nft.wasm --accountId $EVENTS_NFT_CONTRACT_ID
```

### Khởi tạo và mint {#initialization-and-minting}

Vì đây là một contract mới, bạn sẽ cần phải khởi tạo và mint một token. Sử dụng command dưới đây để khởi tạo contract:

```bash
near call $EVENTS_NFT_CONTRACT_ID init '{"owner_id": "'$EVENTS_NFT_CONTRACT_ID'"}' --accountId $EVENTS_NFT_CONTRACT_ID
```

Tiếp theo, bạn sẽ cần mint một token. Bằng cách chạy command này, bạn sẽ mint một token với token ID `"events-token"` và người nhận sẽ là account mới của bạn. Ngoài ra, bạn đang truyền vào một map với hai account sẽ nhận được perpetual royalty bất cứ khi nào token của bạn được bán.

```bash
near call $EVENTS_NFT_CONTRACT_ID nft_mint '{"token_id": "events-token", "metadata": {"title": "Events Token", "description": "testing out the new events extension of the standard", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$EVENTS_NFT_CONTRACT_ID'"}' --accountId $EVENTS_NFT_CONTRACT_ID --amount 0.1
```

Bạn có thể kiểm tra xem mọi thứ có diễn ra đúng không bằng cách xem output trong CLI của mình:

```bash
Doing account.functionCall()
Receipts: F4oxNfv54cqwUwLUJ7h74H1iE66Y3H7QDfZMmGENwSxd, BJxKNFRuLDdbhbGeLA3UBSbL8UicU7oqHsWGink5WX7S
    Log [events.goteam.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"1.0.0","event":"nft_mint","data":[{"owner_id":"events.goteam.examples.testnet","token_ids":["events-token"]}]}
Transaction Id 4Wy2KQVTuAWQHw5jXcRAbrz7bNyZBoiPEvLcGougciyk
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/4Wy2KQVTuAWQHw5jXcRAbrz7bNyZBoiPEvLcGougciyk
''
```

Bạn có thể thấy rằng event đã được log một cách chính xác!

### Transfer {#transferring}

Bây giờ bạn có thể test xem transfer log của mình có hoạt động như mong đợi hay không bằng cách gửi NFT cho `benjiman.testnet`.

```bash
near call $EVENTS_NFT_CONTRACT_ID nft_transfer '{"receiver_id": "benjiman.testnet", "token_id": "events-token", "memo": "Go Team :)", "approval_id": 0}' --accountId $EVENTS_NFT_CONTRACT_ID --depositYocto 1
```

Nó sẽ trả về một output trong giống như sau:

```bash
Doing account.functionCall()
Receipts: EoqBxrpv9Dgb8KqK4FdeREawVVLWepEUR15KPNuZ4fGD, HZ4xQpbgc8EfU3PiV72LvfXb2f3dVC1n9aVTbQds9zfR
    Log [events.goteam.examples.testnet]: Memo: Go Team :)
    Log [events.goteam.examples.testnet]: EVENT_JSON:{"standard":"nep171","version":"1.0.0","event":"nft_transfer","data":[{"authorized_id":"events.goteam.examples.testnet","old_owner_id":"events.goteam.examples.testnet","new_owner_id":"benjiman.testnet","token_ids":["events-token"],"memo":"Go Team :)"}]}
Transaction Id 4S1VrepKzA6HxvPj3cK12vaT7Dt4vxJRWESA1ym1xdvH
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/4S1VrepKzA6HxvPj3cK12vaT7Dt4vxJRWESA1ym1xdvH
''
```

Chúc mừng! Tại thời điểm này, NFT contract của bạn đã hoàn thành đầy đủ và các tiêu chuẩn event đã được thực hiện.

## Tổng kết

Today you went through the [events standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event) and implemented the necessary logic in your smart contract. Bạn đã tạo các event cho việc [mint](#logging-minted-tokens) và [transfer](#logging-transfers) các NFT. Sau đó bạn đã deploy và [test](#initialization-and-minting) những thay đổi của mình bằng cách mint và transfer các NFT.

Trong hướng dẫn tiếp theo, bạn sẽ xem những thứ cơ bản của một marketplace contract và cách nó được xây dựng.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `3.0.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Events standard: [NEP297 extension](https://nomicon.io/Standards/Tokens/NonFungibleToken/Event), version `1.0.0`

:::
