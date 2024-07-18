---
id: minting-nfts
title: Mint NFT
sidebar_label: Mint NFT
---

Trong hướng dẫn này bạn sẽ tìm hiểu làm thế nào để tạo NFT của riêng bạn một cách dễ dàng mà không cần phát triển bất cứ phần mềm nào, bằng cách sử dụng smart contract có sẵn và giải pháp lưu trữ phi tập trung là [IPFS](https://ipfs.io/).

## Tổng quan {#overview}

Bài viết này sẽ hướng dẫn bạn cài đặt một [NFT smart contract](#non-fungible-token-contract), và chỉ cho bạn [cách build](#building-the-contract), [test](#testing-the-contract) và [deploy](#deploying-the-contract) NFT contract này lên NEAR. Khi contract được deploy, bạn sẽ tìm hiểu [cách mint](#minting-your-nfts) non-fungible token từ các file media [lưu trữ trên IPFS](#uploading-the-image) và xem chúng trong Wallet của bạn.

## Điều kiện tiên quyết {#prerequisites}

Để hoàn thành tốt hướng dẫn này, bạn sẽ cần:

- [Rust toolchain](/build/smart-contracts/quickstart#prerequisites)
- [Một NEAR account](#wallet)
- [NEAR command-line interface](/docs/develop/contracts/rust/intro#installing-the-near-cli) (`near-cli`)

## Wallet {#wallet}

To store your non-fungible tokens you'll need a [NEAR Wallet](https://testnet.mynearwallet.com//). If you don't have one yet, you can create one easily by following [these instructions](https://testnet.mynearwallet.com/create).

> **Tip:** trong hướng dẫn này chúng ta sẽ sử dụng một wallet account trên `testnet`. Network `testnet` này miễn phí và không cần phải gửi tiền.

Once you have your Wallet account, you can click on the [Collectibles](https://testnet.mynearwallet.com//?tab=collectibles) tab where all your NFTs will be listed:

![Wallet](/docs/assets/nfts/nft-wallet.png)


<!--
Briefly talks about how the wallet listens for methods that start with `nft_` and then flags the contracts.
-->

## IPFS {#ipfs}

[InterPlanetary File System](https://ipfs.io/) (IPFS) được biết đến như là một giao thức, một mạng ngang hàng (peer-to-peer) cho phép người dùng lưu trữ, chia sẻ dữ liệu trên một hệ thống tệp dữ liệu phân tán (distributed file system). IPFS sử dụng công nghệ content-addressing nhằm xác định tính duy nhất của từng file, trong một không gian toàn cục được hình thành bằng cách kết nối các thiết bị điện toán lại với nhau.

### Upload image {#uploading-the-image}

To upload the NFT image, you should use a [decentralized storage](/concepts/storage/storage-solutions) provider such as IPFS.

:::note
This example uses IPFS, but you could use a different solution like Filecoin, Arweave, or a regular centralized Web2 hosting.
:::

Once you have uploaded your file to IPFS, you'll get a unique `CID` for your content, and a URL like:

```
https://bafyreiabag3ztnhe5pg7js4bj6sxuvkz3sdf76cjvcuqjoidvnfjz7vwrq.ipfs.dweb.link/
```

## Non-fungible Token contract {#non-fungible-token-contract}

[This repository](https://github.com/near-examples/NFT) includes an example implementation of a [non-fungible token][] contract which uses [near-contract-standards][] and simulation tests.

### Clone NFT repository {#clone-the-nft-repository}

Trong terminal của bạn chạy lệnh sau để clone NFT repo:

```
git clone https://github.com/near-examples/NFT
```

### Khám phá smart contract {#explore-the-smart-contract}

Source code của contract này có thể được tìm thấy tại `nft/src/lib.rs`. Contract này chứa logic theo [chuẩn NEP-171][non-fungible token] (NEAR Enhancement Proposal) và phần thực hiện của tiêu chuẩn này có thể được tìm thấy tại [đây](https://github.com/near/near-sdk-rs/blob/master/near-contract-standards/src/non_fungible_token/core/core_impl.rs).

Lúc đầu, code có thể hơi choáng ngợp, nhưng nếu chúng ta chỉ quan tâm tới các khía cạnh của quá trình mint, chúng ta có thể chia nó thành 2 loại chính - contract struct và quá trình mint.

#### Contract Struct {#contract-struct}

Contract sẽ theo dõi hai phần thông tin - `tokens` và `metadata`. Đối với mục đích của hướng dẫn này, chúng ta chỉ xử lý field `tokens`.

```rust
#[near(contract_state)]
#[derive(PanicOnDefault)]
pub struct Contract {
    tokens: NonFungibleToken,
    metadata: LazyOption<NFTContractMetadata>,
}
```

Các token thuộc loại `NonFungibleToken` đến từ [các tiêu chuẩn cốt lõi](https://github.com/near/near-sdk-rs/blob/master/near-contract-standards/src/non_fungible_token/core/core_impl.rs). Có một vài field nằm trong struct nhưng đối với mục đích của hướng dẫn này, chúng ta chỉ quan tâm đến field `owner_by_id`. Điều này giúp theo dõi thông tin chủ sở hữu của bất kỳ token cụ thể nào.

```rust
pub struct NonFungibleToken {
    // chủ sở hữu của contract
    pub owner_id: AccountId,

    // theo dõi chủ sở hữu của bất kì token ID cụ thể nào.
    pub owner_by_id: TreeMap<TokenId, AccountId>,

    ...
}
```

Chúng ta vừa khám phá hậu trường và nơi dữ liệu được lưu giữ, bây giờ hãy đi tiếp tới chức năng mint.

#### Mint {#minting}

Để một token được mint, bạn sẽ cần call function `nft_mint`. Có ba argument được truyền vào function này:

- `token_id`
- `receiver_id`
- `token_metadata`

Function này thực thi `self.tokens.mint` sẽ call tới function mint trong [các tiêu chuẩn cốt lõi](https://github.com/near/near-sdk-rs/blob/master/near-contract-standards/src/non_fungible_token/core/core_impl.rs) để tạo một record của token với người sở hữu là `receiver_id`.

```rust
#[payable]
pub fn nft_mint(
    &mut self,
    token_id: TokenId,
    receiver_id: ValidAccountId,
    token_metadata: TokenMetadata,
) -> Token {
    self.tokens.mint(token_id, receiver_id, Some(token_metadata))
}
```

Việc này tạo record đó bằng cách thêm token này vào cấu trúc dữ liệu `owner_by_id` mà chúng ta vừa đề cập trong phần trước.

```rust
self.owner_by_id.insert(&token_id, &owner_id);
```

### Build contract {#building-the-contract}

Chạy lệnh sau trong terminal của bạn để build contract, sử dụng Rust `cargo`.

```bash
./scripts/build.sh
```

Lệnh này sẽ tạo ra WASM binary ở trong thư mục `res/`. File WASM này là một smart contract mà chúng ta sẽ deploy lên trên NEAR blockchain.

> **Tip:** If you run into errors make sure you have [Rust installed](/build/smart-contracts/quickstart#prerequisites) and are in the root directory of the NFT example.

### Test contract {#testing-the-contract}

Có các test được viết sẵn nằm trong smart contract mà bạn có thể chạy. Chạy câu lệnh sau trong terminal của bạn để thực thi những test đơn giản này nhằm đảm bảo contract code hoạt động tốt.

```bash
cargo test -- --nocapture
```

> **Lưu ý:** những test giả lập phức tạp hơn không được thực thi trong command này, nhưng bạn có thể tìm thấy chúng tại thư mục `tests/sim`.

## Sử dụng NFT contract {#using-the-nft-contract}

Bây giờ bạn đã build và test NFT smart contract thành công, bạn đã sẵn sàng để [deploy nó](#deploying-the-contract) và bắt đầu sử dụng nó [để mint NFT](#minting-your-nfts).

### Deploy contract {#deploying-the-contract}

Smart contract này sẽ được deploy trên NEAR account của bạn. Bởi vì NEAR cho phép khả năng nâng cấp contract trên cùng một account, các function khởi tạo phải được xóa.

> **Lưu ý:** Nếu bạn muốn chạy ví dụ này trên một NEAR account đã được deploy contract trước đó, vui lòng sử dụng lệnh `near delete` của `near-cli` và sau đó tạo lại nó trong Wallet. To create (or recreate) an account, please follow the directions in [Test Wallet](https://testnet.mynearwallet.com/) or ([NEAR Wallet](https://wallet.near.org/) if we're using `mainnet`).

Đăng nhập vào account vừa mới tạo với `near-cli` bằng cách chạy câu lệnh sau trong terminal của bạn.

```bash
near login
```

Để làm cho hướng dẫn này dễ dàng hơn với copy/paste, chúng tôi đã set một biến môi trường cho account ID của bạn. Trong câu lệnh dưới đây, hãy thay `YOUR_ACCOUNT_NAME` với tên account name mà bạn mới vừa đăng nhập, bao gồm cả `.testnet` (hoặc `.near` nếu trên `mainnet`):

```bash
export ID=YOUR_ACCOUNT_NAME
```

Kiểm tra biến môi trường được cài đặt đúng hay chưa bằng cách chạy:

```bash
echo $ID
```

Hãy xác nhận rằng account được in ra trong terminal là chính xác. Nếu mọi thứ đều đúng, thì bây giờ bạn có thể deploy contract của bạn. Trong thư mục root của NFT project, chạy câu lệnh sau để deploy smart contract của bạn.

```bash
near deploy $ID res/non_fungible_token.wasm
```

<details>
<summary>Ví dụ về response nhận được: </summary>
<p>

```bash
Starting deployment. Account id: ex-1.testnet, node: https://rpc.testnet.near.org, file: res/non_fungible_token.wasm
Transaction Id E1AoeTjvuNbDDdNS9SqKfoWiZT95keFrRUmsB65fVZ52
To see the transaction in the transaction explorer, please open this url in your browser
https://testnet.nearblocks.io/txns/E1AoeTjvuNbDDdNS9SqKfoWiZT95keFrRUmsB65fVZ52
Done deploying to ex-1.testnet
```

</p>
</details>

> **Lưu ý:** Đối với `mainnet` bạn cần thêm `NEAR_ENV=mainnet` vào trước câu lệnh của bạn. [See here](/tools/near-cli#network-selection) for more information.

### Mint NFT {#minting-your-nfts}

Một smart contract có thể có một method khởi tạo để có thể được dùng để thiết lập các state ban đầu của contract. Trong trường hợp này, chúng ta cần khởi tạo NFT contract trước khi sử dụng. Bây giờ, chúng ta sẽ khởi tạo nó với metadata mặc định.

> **Lưu ý:** mỗi account có một vùng dữ liệu gọi là `storage`, để lưu các function call và transaction. Ví dụ, khi bạn khởi tạo một contract, state ban đầu được lưu trong persistent storage này.

```bash
near call $ID new_default_meta '{"owner_id": "'$ID'"}' --accountId $ID
```

> **Tip:** you can find more info about the NFT metadata at [nomicon.io](https://nomicon.io/Standards/Tokens/NonFungibleToken/Metadata).

Sau đó, bạn có thể xem metadata bằng cách chạy lệnh `view` call sau:

```bash
near view $ID nft_metadata
```

<details>
<summary>Ví dụ về response nhận được: </summary>
<p>

```json
{
  "spec": "nft-1.0.0",
  "name": "Example NEAR non-fungible token",
  "symbol": "EXAMPLE",
  "icon": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg id='l' data-name='l'%3E%3Cpath d='M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'/%3E%3C/g%3E%3C/svg%3E",
  "base_uri": null,
  "reference": null,
  "reference_hash": null
}
```

</p>
</details>

Bây giờ, hãy bắt đầu mint token đầu tiên! Câu lệnh sau sẽ mint một bản copy của NFT. Thay thế `media` url với url mà bạn [đã upload lên IPFS](#uploading-the-image) trước đó:

```bash
near call $ID nft_mint '{"token_id": "0", "receiver_id": "'$ID'", "token_metadata": { "title": "Some Art", "description": "My NFT media", "media": "https://bafkreiabag3ztnhe5pg7js4bj6sxuvkz3sdf76cjvcuqjoidvnfjz7vwrq.ipfs.dweb.link/", "copies": 1}}' --accountId $ID --deposit 0.1
```

<details>
<summary>Ví dụ response nhận được: </summary>
<p>

```json
{
  "token_id": "0",
  "owner_id": "dev-xxxxxx-xxxxxxx",
  "metadata": {
    "title": "Some Art",
    "description": "My NFT media",
    "media": "https://bafkreiabag3ztnhe5pg7js4bj6sxuvkz3sdf76cjvcuqjoidvnfjz7vwrq.ipfs.dweb.link/",
    "media_hash": null,
    "copies": 1,
    "issued_at": null,
    "expires_at": null,
    "starts_at": null,
    "updated_at": null,
    "extra": null,
    "reference": null,
    "reference_hash": null
  },
  "approved_account_ids": {}
}
```

</p>
</details>

Để xem các token được sở hữu bởi một account, bạn có thể call NFT contract với câu lệnh `near-cli` sau:

```bash
near view $ID nft_tokens_for_owner '{"account_id": "'$ID'"}'
```

<details>
<summary>Ví dụ về response nhận được: </summary>
<p>

```json
[
  {
    "token_id": "0",
    "owner_id": "dev-xxxxxx-xxxxxxx",
    "metadata": {
      "title": "Some Art",
      "description": "My NFT media",
      "media": "https://bafkreiabag3ztnhe5pg7js4bj6sxuvkz3sdf76cjvcuqjoidvnfjz7vwrq.ipfs.dweb.link/",
      "media_hash": null,
      "copies": 1,
      "issued_at": null,
      "expires_at": null,
      "starts_at": null,
      "updated_at": null,
      "extra": null,
      "reference": null,
      "reference_hash": null
    },
    "approved_account_ids": {}
  }
]
```

</p>
</details>

> <br/>
> 
> **Tip:** after you mint your first non-fungible token, you can [view it in your Wallet](https://testnet.mynearwallet.com//?tab=collectibles):
> 
> ![Wallet với token](/docs/assets/nfts/nft-wallet-token.png)
> 
> <br/>

**_Chúc mừng! Bạn vừa mới mint NFT token đầu tiên của mình trên NEAR blockchain!_** 🎉

## Các chú thích cuối cùng {#final-remarks}

Ví dụ cơ bản này minh họa tất cả các bước cần thiết để deploy một NFT smart contract, lưu các file media trên IPFS, và bắt đầu mint các non-fungible token của riêng bạn.

Bây giờ bạn đã quen với quy trình này, bạn có thể kiểm tra [Ví dụ NFT](https://examples.near.org/NFT) của chúng tôi và tìm hiểu thêm về code của smart contract và cách bạn có thể chuyển các token đã mint đến các account khác. Finally, if you are new to Rust and want to dive into smart contract development, our [Quick-start guide](../../2.build/2.smart-contracts/quickstart.md) is a great place to start.

**_Chúc bạn mint thành công!_** 🪙

## Blockcraft - Phần mở rộng thực tế

Nếu bạn muốn tìm hiểu làm thế nào để dùng Minecraft để mint NFT và copy/dán các công trình trong các thế giới khác nhau, trong khi tất cả dữ liệu đều được lưu trữ on-chain, hãy xem ngay [hướng dẫn Minecraft](/docs/tutorials/contracts/nfts/minecraft-nfts) của chúng tôi

## Version cho bài viết này {#versioning-for-this-article}

Tại thời điểm viết bài, ví dụ này tương thích với các version dưới đây:

- cargo: `cargo 1.54.0 (5ae8d74b3 2021-06-22)`
- rustc: `rustc 1.54.0 (a178d0322 2021-07-26)`
- near-cli: `2.1.1`

[non-fungible token]: https://nomicon.io/Standards/NonFungibleToken

[non-fungible token]: https://nomicon.io/Standards/NonFungibleToken
[near-contract-standards]: https://github.com/near/near-sdk-rs/tree/master/near-contract-standards
