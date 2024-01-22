---
id: minting
title: Minting
sidebar_label: Minting
---

import {Github} from "@site/src/components/codetabs"

Đây là hướng dẫn đầu tiên trong một loạt serie chỉ bạn cách tạo một NFT smart contract hoàn chỉnh từ đầu, phù hợp với tất cả [các chuẩn NFT](https://nomicon.io/Standards/NonFungibleToken/) của NEAR. Hôm nay bạn sẽ học cách tạo logic cần thiết để mint (đúc) NFT và để chúng hiển thị trong ví NEAR của bạn. Bạn sẽ sửa đổi một phần của [skeleton smart contract](/tutorials/nfts/skeleton) bằng cách điền vào các code snippet cần thiết cần thiết để thêm các chức năng mint.

## Giới thiệu

Để bắt đầu, hãy switch sang branch `1.skeleton` trong repo của chúng tôi. Nếu bạn chưa clone repository, hãy tham khảo [Kiến trúc của Contract](/tutorials/nfts/skeleton) để bắt đầu.

```
git checkout 1.skeleton
```

Nếu bạn muốn xem code hoàn chỉnh cho phần mint của hướng dẫn, bạn có thể tìm trên branch `2.minting`.

## Các sửa đổi đối với skeleton contract {#what-does-minting-mean}

Để implement logic cần thiết cho việc mint, chúng ta nên chia nó thành các nhiệm vụ nhỏ hơn và xử lý từng việc một. Hãy lùi lại và suy nghĩ về cách tốt nhất để làm điều này, bằng cách tự hỏi bản thân một câu hỏi đơn giản: mint NFT nghĩa là gì?

Để mint ra một non-fungible token, theo cách đơn giản nhất có thể, một contract cần có khả năng liên kết token với một owner trên blockchain. Có nghĩa là bạn sẽ cần:

- Một cách để theo dõi các token và thông tin khác trên contract.
- Một cách để lưu trữ thông tin cho từng token, chẳng hạn như `metadata` (sẽ tìm hiểu thêm ở phần sau).
- Một cách để liên kết một token với một owner.

Chỉ vậy thôi! Vậy là chúng ta đã chia nhỏ vấn đề lớn thành một vài nhiệm vụ nhỏ hơn, ít khó khăn hơn. Hãy bắt đầu bằng cách giải quyết phần đầu tiên và thực hiện theo cách chúng tôi đến các phần còn lại.

### Lưu thông tin trên contract {#storing-information}

Bắt đầu bằng cách đến `nft-contract/src/lib.rs` và điền vào một số code block. Bạn cần có thể lưu trữ thông tin quan trọng trên contract, chẳng hạn như danh sách các token mà account sở hữu.

#### Contract Struct

Việc đầu tiên cần làm là modify contract `struct` như sau:

<Github language="rust" start="25" end="42" url="https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/lib.rs" />

This allows you to get the information stored in these data structures from anywhere in the contract. The code above has created 3 token specific storages:

- **tokens_per_owner**: cho phép bạn theo dõi các token thuộc sở hữu của bất kỳ account nào
- **tokens_by_id**: trả về tất cả thông tin của một token xác định
- **token_metadata_by_id**: trả về metadata của một token xác định

In addition, you'll keep track of the owner of the contract as well as the metadata for the contract.

You might be confused as to some of the types that are being used. In order to make the code more readable, we've introduced custom data types which we'll briefly outline below:

- **AccountId**: một string đảm bảo không có ký tự đặc biệt hoặc không được hỗ trợ.
- **TokenId**: đơn giản chỉ là một string.

As for the `Token`, `TokenMetadata`, and `NFTContractMetadata` data types, those are structs that we'll define later in this tutorial.

#### Các Initialization Function

Next, create what's called an initialization function; you can name it `new`. This function needs to be invoked when you first deploy the contract. It will initialize all the contract's fields that you've defined above with default values. Don't forget to add the `owner_id` and `metadata` fields as parameters to the function, so only those can be customized.

This function will default all the collections to be empty and set the `owner` and `metadata` equal to what you pass in.

<Github language="rust" start="86" end="106" url="https://github.com/near-examples/nft-tutorial/tree/2.minting/nft-contract/src/lib.rs" />

Thường thì khi develop, bạn sẽ cần deploy các contract một vài lần. Bạn có thể tưởng tượng được sự tẻ nhạt khi phải pass metadata mỗi khi init contract. Vì lý do này, hãy tạo một function có thể init contract với một bộ `metadata` mặc định. Bạn có thể gọi nó là `new_default_meta` và nó chỉ có một parameter `owner_id` duy nhất.

<Github language="rust" start="64" end="79" url="https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/lib.rs" />

Function này chỉ đơn giản là gọi function `new` trước đó và truyền vào owner mà bạn chỉ định và cũng truyền vào một vài metadata mặc định.

### Metadata và thông tin token {#metadata-and-token-info}

Bây giờ bạn đã xác định thông tin nào cần lưu trữ trên chính contract cũng như một số cách để init contract, bạn cần xác định thông tin nào sẽ có trong các data type `Token`, `TokenMetadata`, và `NFTContractMetadata`.

Hãy chuyển qua file `nft-contract/src/metadata.rs` vì đây là nơi sẽ chứa thông tin. If you look at the [standards for metadata](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata), you'll find all the necessary information that you need to store for both `TokenMetadata` and `NFTContractMetadata`. Đơn giản chỉ cần điền vào code sau.

<Github language="rust" start="10" end="37" url="https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/metadata.rs" />

Đến đây bạn sẽ có struct `Token` và có `JsonToken`. Struct `Token` sẽ chứa tất cả thông tin liên quan đến token, ngoại trừ metadata. The metadata, if you remember, is stored in a map on the contract in a data structure called `token_metadata_by_id`. Nó cho phép bạn có thể lấy nhanh metadata của bất kỳ token nào, bằng cách chỉ cần pass vào ID của token.

Đối với struct `Token`, bạn sẽ chỉ cần theo dõi owner từ lúc này.

<Github language="rust" start="39" end="43" url="https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/metadata.rs" />

Mục đích của `JsonToken` là chứa tất cả các thông tin cho một NFT mà bạn muốn gởi trả lại dưới dạng JSON khi ai đó thực hiện một view call. Nghĩa là bạn sẽ cần chứa owner, token ID, và metadata.

<Github language="rust" start="45" end="55" url="https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/metadata.rs" />

:::tip Có thể một vài bạn sẽ nghĩ _"tại sao chúng ta không chứa tất cả thông tin trong struct `Token` cho đơn giản?"_. Lý do là, việc chỉ tạo JSON token khi bạn cần đến sẽ hiệu quả hơn là lưu trữ tất cả thông tin trong struct token. Hơn nữa, một số hoạt động có thể chỉ cần metadata của một token và do đó, việc có metadata trong một data structure riêng biệt sẽ tối ưu hơn. :::

#### Function cho việc query contract metadata

Bây giờ bạn đã xác định một số kiểu đã được sử dụng trong phần trước, hãy tiếp tục và tạo view function đầu tiên `nft_metadata`. This will allow users to query for the contract's metadata as per the [metadata standard](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata).

<Github language="rust" start="57" end="67" url="https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/metadata.rs" />

Function này sẽ lấy object `metadata` từ contract thuộc type `NFTContractMetadata` và trả về nó.

Như vậy, bạn đã hoàn thành hai nhiệm vụ đầu tiên và sẵn sàng chuyển sang phần cuối cùng của hướng dẫn.

### Logic của việc Mint {#minting-logic}

Bây giờ tất cả các thông tin và type đã được xác định, chúng ta hãy bắt đầu động não xem logic của việc mint sẽ diễn ra như thế nào. Cuối cùng, bạn cần phải link một `Token` và `TokenId` đến một owner cụ thể. Hãy tham khảo lại file `lib.rs` để xem bạn có thể hoàn thành điều này như thế nào. Có một số data structure có thể hữu ích:

```rust
//theo dõi tất cả các token ID của một account nhất định
pub tokens_per_owner: LookupMap<AccountId, UnorderedSet<TokenId>>,

//theo dõi tất cả các token struct của một account nhất định
pub tokens_by_id: LookupMap<TokenId, Token>,

//theo dõi tất cả các token metadata của một account nhất định
pub token_metadata_by_id: UnorderedMap<TokenId, TokenMetadata>,
```

Nhìn vào các data structure này, bạn có thể làm như sau:

- Thêm token ID vào tập hợp các token mà người nhận sở hữu. Điều này sẽ được thực hiện trên trường `tokens_per_owner`.
- Tạo một object token và map token ID với object token đó trong trường `tokens_by_id`.
- Map token ID đến metadata của nó bằng `token_metadata_by_id`.

#### Storage Implications {#storage-implications}
Với những bước đã nêu, điều quan trọng là phải tính đến chi phí lưu trữ của việc mint NFT. Vì bạn đang thêm byte vào contract bằng cách tạo các mục trong các data structure, nên contract cần chi trả chi phí lưu trữ. Nếu bạn chỉ tạo contract để bất kỳ người dùng nào cũng có thể sử dụng và mint một NFT miễn phí, hệ thống đó có thể dễ dàng bị lạm dụng và người dùng có thể "rút ruột" tất cả số tiền của contract bằng cách mint ra hàng nghìn NFT. Vì lý do này, bạn cần phải yêu cầu người dùng phải đính kèm một khoản deposit khi call để trang trải chi phí lưu trữ. Bạn sẽ đo mức sử dụng storage ban đầu trước khi mọi thứ được thêm vào và đo mức sử dụng storage cuối cùng sau khi tất cả logic hoàn tất. Sau đó, bạn cần đảm bảo rằng người dùng đã đính kèm đủ $NEAR để trang trải chi phí đó và hoàn lại tiền cho họ nếu họ đã đính kèm quá nhiều.

Bây giờ bạn đã hiểu rõ mọi thứ sẽ diễn ra như thế nào, hãy điền vào đoạn code cần thiết.

<Github language="rust" start="3" end="45" url="https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/mint.rs" />

Bạn sẽ nhận thấy rằng chúng tôi đang sử dụng một số internal method như `refund_deposit` và `internal_add_token_to_owner`. Chúng tôi đã mô tả chức năng của `refund_deposit`, còn đối với `internal_add_token_to_owner`, method này sẽ thêm một token vào tập hợp các token mà một account sở hữu, cụ thể là cho data structure `tokens_per_owner` của contract. Bạn có thể tạo các function này trong một file có tên `internal.rs`. Hãy tiếp tục và tạo file. Kiến trúc contract mới của bạn sẽ trông như sau:

```
nft-contract
├── Cargo.lock
├── Cargo.toml
├── README.md
├── build.sh
└── src
    ├── approval.rs
    ├── enumeration.rs
    ├── internal.rs
    ├── lib.rs
    ├── metadata.rs
    ├── mint.rs
    ├── nft_core.rs
    └── royalty.rs
```

Thêm code sau vào file `internal.rs` mà bạn vừa tạo.

<Github language="rust" start="1" end="63" url="https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/internal.rs" />

Bây giờ, hãy nhanh chóng di chuyển đến file `lib.rs` và làm cho các function chúng ta vừa tạo có thể invoke trong các file khác. Chúng ta sẽ thêm các internal crate và sửa đổi file như được hiển thị bên dưới:

<Github language="rust" start="10" end="23" url="https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/lib.rs" />

Tại thời điểm này, tất cả logic cốt lõi đã sẵn sàng để bạn có thể mint các NFT. Bạn có thể dùng function `nft_mint`, với các parameter sau:

- **token_id**: ID của token mà bạn đang mint (kiểu string).
- **metadata**: metadata cho token mà bạn đang mint (kiểu `TokenMetadata`, có thể được tìm thấy trong file `metadata.rs`).
- **receiver_id**: chỉ định ai sẽ là owner của token.

Phía đằng sau, function này sẽ:

1. Tính toán storage ban đầu trước khi thêm bất kỳ thứ gì vào contract
2. Tạo một object `Token` với owner ID
3. Liên kết token ID với object token mới được tạo ra, bằng cách chèn chúng vào trường `tokens_by_id`.
4. Liên kết token ID với metadata được pass vào, bằng cách chèn chúng vào trường `token_metadata_by_id`.
5. Thêm token ID vào danh sách các token mà owner sở hữu bằng cách gọi function `internal_add_token_to_owner`.
6. Tính toán net storage cuối cùng để đảm bảo rằng người dùng đã gắn đủ NEAR vào lệnh call để trang trải các chi phí đó.

### Query thông tin token

Nếu bạn tiếp tục và triển khai hợp đồng này, khởi tạo nó và mint NFT, bạn sẽ không có cách nào để biết hoặc query thông tin về token bạn vừa mint ra. Hãy nhanh chóng thêm một cách để query thông tin của một NFT cụ thể. Bạn hãy đến file `nft-contract/src/nft_core.rs` và edit function `nft_token`.

Nó sẽ lấy token ID làm tham số và trả về thông tin cho token đó. `JsonToken` chứa token ID, owner ID, và metadata của token.

<Github language="rust" start="89" end="104" url="https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/nft_core.rs" />

Sau khi hoàn thành, cuối cùng cũng đã đến lúc build và deploy contract để bạn có thể mint NFT đầu tiên của mình.

## Tương tác với on-chain contract

Bây giờ logic để mint đã hoàn tất và bạn đã thêm một cách để query thông tin về các token cụ thể, đã đến lúc build và deploy contract của bạn lên blockchain.

### Deploy một contract {#deploy-the-contract}

Chúng tôi đã đưa ra một cách rất đơn giản để build các smart contract trong suốt hướng dẫn này bằng cách sử dụng `yarn`. Lệnh sau sẽ build contract và sao chép file `.wasm` đến một folder `out/main.wasm`. Lệnh này sử dụng một build script có thể được tìm thấy trong file `nft-contract/build.sh`.

```bash
yarn build
```

Sẽ có một danh sách các cảnh báo trên console của bạn, nhưng khi hướng dẫn tiếp tục, những cảnh báo này sẽ biến mất. Bây giờ bạn sẽ thấy folder `out/` với file `main.wasm` bên trong nó. Đây là những gì chúng ta sẽ deploy lên blockchain.

Để deploy, bạn cần một account NEAR với các key chứa sẵn trong local machine của bạn. Navigate to the [NEAR wallet](https://testnet.mynearwallet.com//) site and create an account.

:::info
Hãy đảm bảo rằng bạn deploy contract cho một account không có contract nào tồn tại từ trước. Cách đơn giản nhất là chỉ cần tạo một account mới hoặc tạo một account phụ cho hướng dẫn này.
:::

Đăng nhập vào account vừa mới tạo với `near-cli` bằng cách chạy câu lệnh sau trong terminal của bạn.

```bash
near login
```

Để làm cho hướng dẫn này dễ dàng hơn với copy/paste, chúng tôi đã set một biến môi trường cho account ID của bạn. Trong command dưới đây, thay `YOUR_ACCOUNT_NAME` với account name bạn vừa đăng nhập, bao gồm phần `.testnet`:

```bash
export NFT_CONTRACT_ID="YOUR_ACCOUNT_NAME"
```

Kiểm tra biến môi trường được cài đặt đúng hay chưa bằng cách chạy:

```bash
echo $NFT_CONTRACT_ID
```

Hãy xác nhận rằng account được in ra trong terminal là chính xác. Nếu mọi thứ đều đúng, thì bây giờ bạn có thể deploy contract của bạn. Trong thư mục root của NFT project, chạy câu lệnh sau để deploy smart contract của bạn.

```bash
near deploy --wasmFile out/main.wasm --accountId $NFT_CONTRACT_ID
```

Tại thời điểm này, contract đã được deploy vào account của bạn, và đã sẵn sàng để chuyển sang test và mint NFT.

### Init contract {#initialize-contract}

Điều đầu tiên bạn cần làm khi contract đã được deploy là init nó. Để đơn giản hơn, hãy gọi hàm init metadata mặc định mà bạn đã viết trước đó, để không cần phải nhập metadata theo cách thủ công trong CLI.

```bash
near call $NFT_CONTRACT_ID new_default_meta '{"owner_id": "'$NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID
```

Bạn vừa khởi tạo contract với một số metadata mặc định và đặt account ID của bạn làm owner. Giờ đây, bạn đã sẵn sàng để gọi view function đầu tiên của mình.

### Xem metadata của contract

Bây giờ contract đã được init, bạn có thể call một số function mà bạn đã viết trước đó. Cụ thể hơn, hãy test function trả về metadata của contract:

```bash
near view $NFT_CONTRACT_ID nft_metadata
```

Nó sẽ trả về một output trong giống như sau:

```bash
{
  spec: 'nft-1.0.0',
  name: 'NFT Tutorial Contract',
  symbol: 'GOTEAM',
  icon: null,
  base_uri: null,
  reference: null,
  reference_hash: null
}
```

Tại thời điểm này, bạn đã sẵn sàng để tiếp tục và mint NFT đầu tiên của mình.

### Mint NFT đầu tiên của chúng ta {#minting-our-first-nft}

Nào hãy call function dùng để mint mà bạn đã tạo trước đó. Function này cần một `token_id` và `metadata`. Nếu bạn nhìn lại struct `TokenMetadata` mà bạn đã tạo trước đó, có nhiều trường có thể được lưu trữ on-chain:

<Github language="rust" start="24" end="37" url="https://github.com/near-examples/nft-tutorial/blob/2.minting/nft-contract/src/metadata.rs" />

Hãy bắt đầu mint một NFT với một title, description, và media. Trường media có thể là bất kỳ URL nào trỏ đến một file media. Chúng ta có một file GIF tuyệt vời để mint nhưng nếu bạn muốn tạo một NFT tùy chỉnh, chỉ cần thay thế media link của chúng ta bằng một trong những lựa chọn của bạn. Nếu bạn chạy lệnh sau, nó sẽ mint ra một NFT với các tham số sau:

- **token_id**: "token-1"
- **metadata**:
  - _title_: "My Non Fungible Team Token"
  - _description_: "The Team Most Certainly Goes :)"
  - _media_: `https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif`
  - **receiver_id**: "'$NFT_CONTRACT_ID'"

```bash
near call $NFT_CONTRACT_ID nft_mint '{"token_id": "token-1", "metadata": {"title": "My Non Fungible Team Token", "description": "The Team Most Certainly Goes :)", "media": "https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif"}, "receiver_id": "'$NFT_CONTRACT_ID'"}' --accountId $NFT_CONTRACT_ID --amount 0.1
```

:::info Cờ `amount` đang chỉ định bao nhiêu NEAR để đính kèm vào call. Do bạn cần phải trả tiền cho storage, 0,1 NEAR sẽ được đính kèm và cuối cùng bạn sẽ được hoàn lại khoản tiền thừa chưa được sử dụng. :::

### Xem thông tin của NFT

Bây giờ NFT đã được mint, bạn có thể kiểm tra và xem mọi thứ có diễn ra chính xác hay không bằng cách gọi function `nft_token`. Nó sẽ trả về một `JsonToken`, trong đó chứa `token_id`, `owner_id`, và `metadata`.

```bash
near view $NFT_CONTRACT_ID nft_token '{"token_id": "token-1"}'
```

<details>
<summary>Các kết quả cuối cùng của transaction có thể được query qua <a href="/docs/api/rpc/transactions#transaction-status">Transaction Status</a> hoặc <a href="https://explorer.testnet.near.org/">NEAR Explorer</a> bằng cách sử dụng <code>kết quả</code> hash được trả về như ví dụ sau đây. </summary>
<p>

```bash
{
  token_id: 'token-1',
  owner_id: 'goteam.examples.testnet',
  metadata: {
    title: 'My Non Fungible Team Token',
    description: 'The Team Most Certainly Goes :)',
    media: 'https://bafybeiftczwrtyr3k7a2k4vutd3amkwsmaqyhrdzlhvpt33dyjivufqusq.ipfs.dweb.link/goteam-gif.gif',
    media_hash: null,
    copies: null,
    issued_at: null,
    expires_at: null,
    starts_at: null,
    updated_at: null,
    extra: null,
    reference: null,
    reference_hash: null
  }
}
```

</p>
</details>

**Chúc mừng!** Bây giờ bạn đã xác minh được rằng mọi thứ đã hoạt động chính xác và đã đến lúc xem NFT mới mint của bạn trong tab collectibles của NEAR wallet!

## Xem NFT của bạn trong wallet

If you navigate to the [collectibles tab](https://testnet.mynearwallet.com//?tab=collectibles) in the NEAR wallet, this should list all the NFTs that you own. Nó sẽ trông giống như bên dưới đây.

![empty-nft-in-wallet](/docs/assets/nfts/empty-nft-in-wallet.png)

Chúng ta có một vấn đề. Wallet đã biết chính xác rằng bạn đã mint ra một NFT, tuy nhiên, contract không implement view function cụ thể đang được call. Phía đằng sau, wallet đang cố gắng call `nft_tokens_for_owner` để lấy danh sách tất cả các NFT của bạn trên contract. Tuy nhiên, function duy nhất mà bạn đã tạo ra, chính là function `nft_token`. Sẽ không hiệu quả lắm nếu wallet call `nft_token` cho mỗi NFT đơn lẻ mà người dùng phải lấy thông tin và vì vậy chúng cố gắng call function `nft_tokens_for_owner`.

Trong hướng dẫn tiếp theo, bạn sẽ tìm hiểu về cách deploy bản sửa lỗi cho một contract đã có từ trước để bạn có thể xem NFT trong wallet.

## Kết luận

Trong hướng dẫn này, bạn đã trải qua những điều cơ bản về thiết lập và hiểu logic đằng sau việc mint NFT trên blockchain bằng cách sử dụng một skeleton contract.

Đầu tiên, bạn đã xem [ý nghĩa](#what-does-minting-mean) của việc mint NFT và cách chia vấn đề thành nhiều phần nhỏ khả thi hơn. Sau đó, bạn bắt đầu sửa đổi skeleton contract theo từng phân đoạn bắt đầu bằng việc giải quyết vấn đề của [storing information / state](#storing-information) trên contract. Sau đó, bạn xem những gì cần đưa vào [metadata và thông tin token](#metadata-and-token-info). Cuối cùng, bạn đã xem xét logic cần thiết để [mint các NFT](#minting-logic).

Sau khi contract được viết, đã đến lúc deploy vào blockchain. Bạn [đã deploy contract](#deploy-the-contract) và [init nó](#initialize-contract). Cuối cùng, bạn [đã mint NFT đầu tiên của mình](#minting-our-first-nft) và thấy rằng cần thay đổi một ít trước khi bạn có thể thấy nó trong wallet.

## Các bước tiếp theo

In the [next tutorial](/docs/tutorials/contracts/nfts/upgrade-contract), you'll find out how to deploy a patch fix and what that means so that you can view your NFTs in the wallet.

:::note Versioning for this article

At the time of this writing, this example works with the following versions:

- near-cli: `3.0.0`
- NFT standard: [NEP171](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core), version `1.0.0`
- Metadata standard: [NEP177](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata), version `2.1.0`

:::
