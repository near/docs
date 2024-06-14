---
id: minecraft-nfts
title: Tạo NFT trong Minecraft
sidebar_label: Minecraft NFT
---

> Trong hướng dẫn này, bạn sẽ tìm hiểu cách đưa các tác phẩm tùy chỉnh của bạn trong Minecraft và mint các bản vẽ này thành NFT trên NEAR blockchain!

## Tổng quan

Hướng dẫn này sẽ giúp bạn mint các kiến trúc Minecraft ở bất kỳ kích thước nào trên NEAR blockchain. Nó sẽ cho phép bạn copy và dán các thiết kế này vào trong thế giới của riêng bạn. Với điều này, chúng ta sẽ sử dụng WorldEdit để download và đọc các bản vẽ này, và chúng ta sẽ đưa chúng on-chain thông qua [IPFS](https://ipfs.io/).

## Điều kiện tiên quyết

:::info It is recommended that you first complete the introductory **[minting NFTs tutorial](/tutorials/nfts/minting-nfts)** :::

Để hoàn thành tốt hướng dẫn này, bạn sẽ cần:

- [Một Minecraft account](https://www.minecraft.net/)
- [Cài đặt WorldEdit](https://worldedit.enginehub.org/en/latest/install/)
- [Một NEAR account](#wallet)
- [NEAR command-line interface](/docs/develop/contracts/rust/intro#installing-the-near-cli) (`near-cli`)

## Tạo Bản Vẽ

Trong phần này, chúng ta sẽ tạo bản vẽ Minecraft và đưa nó lên chain.

### Cài đặt

- Một khi bạn đã cài đặt [WorldEdit](https://worldedit.enginehub.org/en/latest/install/) và Minecraft đã load xong, hãy kiểm tra WorldEdit có hoạt động đúng hay không bằng cách chạy:

```bash
//pos1
```

Nếu WorldEdit đã được cài đặt chính xác, sẽ xuất hiện output `First position set to (X, Y, Z).` trong đó X, Y, và Z là các tọa độ.

Trong hướng dẫn này, chúng ta sẽ mint một ngôi nhà nhỏ trong làng. Để làm theo, hãy chọn kiến trúc bất kỳ mà bạn thích để mint như dưới đây:

![Ngôi Nhà Thôn Quê trong Minecraft](/docs/assets/nfts/village-house-minecraft.png)

Sau đó, bạn sẽ muốn chọn các ranh giới của kiến trúc mà bạn định copy. Chúng ta sẽ biến chúng thành những bản vẽ được đưa lên chain để bạn hoặc người khác sẽ download và dán nó vào thế giới của riêng bạn.

- Để làm điều này, chúng ta sẽ cần liệt kê các ranh giới của tòa nhà bằng cách dùng WorldEdit. Đứng ở góc dưới bên trái của tòa nhà và chạy:

```bash
//pos1
```

- Sau đó, bạn có thể di chuyển đến góc trên bên phải và chạy:

```bash
//pos2
```

Bây giờ, nhờ vào việc thiết lập hai vị trí này, bạn đã tạo một khối lập phương bao quanh tòa nhà của bạn.

- Bây giờ chúng ta sẽ copy nội dung của tòa nhà đó bằng cách chạy:

```bash
//copy
```

Output sẽ giống như sau:

![Copy Chat Message](/docs/assets/nfts/copy-chat-message-minecraft.png)

:::info TIP
Hãy nhớ ghi chú lại vị trí của nhân vật của bạn khi tiến hành copy. Nếu bạn copy tòa nhà này và giả sử bạn đang đứng trên mái nhà, thì khi bạn dán tòa nhà, nó sẽ dán tòa nhà theo cách bạn đứng trên mái nhà.
:::

### Kiểm tra sự chính xác

Chúng ta có thể kiểm tra và xem liệu tòa nhà có ổn không bằng cách dán những gì chúng ta vừa copy tại một nơi nào đó trong thế giới.

- Đi tới một vị trí mà bạn thích để dán tòa nhà này và chạy:

```bash
//paste
```

Trong ví dụ dưới đây, chúng tôi đã dán ngôi nhà thôn quê này nổi ngay trên một rặng san hô. Bạn cũng sẽ thấy một response thông báo rằng clipboard đã được dán. (Xem ví dụ dưới đây)

![Dán một ngôi nhà trong Minecraft](/docs/assets/nfts/pasted-minecraft-house.png)

### Tạo file bản vẽ

Khi bạn hài lòng với tòa nhà mà bạn vừa copy và dán, đã đến lúc tạo file bản vẽ mà chúng ta sẽ dùng để mint thành NFT. Để làm điều này, chúng ta sẽ chạy một lệnh của WorldEdit để lưu file bản vẽ này trên máy tính.

- Để làm điều này, chạy lệnh `schematic save FILE_NAME`, thay thế `FILE_NAME` với tên mà bạn chọn.

Điều này sẽ lưu file vào Minecraft folder trong `minecraft/config/worldedit/schematics` với đuôi `.schem`.

- Bây giờ kiểm tra file này bằng cách load bản vẽ mà chúng ta vừa lưu thông qua câu lệnh `schematic load FILE_NAME`.

Điều này sẽ load bản vẽ này vào clipboard và chúng ta thoải mái để dán nó trong thế giới.

## Mint bản vẽ

Trong phần này, chúng ta sẽ mint file bản vẽ vừa tạo và đưa nó lên blockchain sử dụng IPFS và web3.storage. Để tiến hành, bạn cần xác định vị trí của file `FILE_NAME.schem` mà chúng ta đã tạo trong phần trước. File này có thể được tìm thấy trong Minecraft folder tại `minecraft/config/worldedit/schematics`. Vị trí của minecraft folder sẽ khác nhau, tùy thuộc vào OS của bạn.

### Upload bản vẽ

To upload the schematic, we are going to use the free [web3.storage](https://web3.storage/) service built for storing off-chain data. Web3.storage cung cấp dung lượng và băng thông miễn phí trên [IPFS](https://ipfs.io/) và [Filecoin](https://filecoin.io/).

#### Các bước thực hiện

1. Register an account and log in to [web3.storage](https://web3.storage/) either via email or your GitHub.

2. Đi tới phần [Files](https://web3.storage/), và nhấp lên nút [Upload more Files](https://web3.storage/).

   ![web3.storage](/docs/assets/nfts/web3-storage-upload.png)

3. Một khi bạn đã upload file, bạn sẽ nhận được một `CID` duy nhất cho nội dung của bạn, và một URL tương tự như:
   ```
   https://bafybeidadhfilezx23dcdaueo3bjuafqeehokw33vyepkjtppigorrhbpy.ipfs.dweb.link/
   ```

:::info See the [web3.storage docs](https://docs.web3.storage/) for information on uploading multiple files and available API endpoints. :::

### Tương tác với contract

NEAR đã deploy contract cho account `nft.examples.testnet` để cho phép user tự do mint token. Đây là account mà chúng ta sẽ tương tác để mint NFT. Ngoài ra, nếu bạn đã deploy một contract khi làm theo hướng dẫn ban đầu, bạn cũng có thể dùng nó.

:::info Chúng ta sẽ sử dụng link IPFS mà chúng ta đã có ở bước ba của quá trình upload phía trên, như là giá trị media khi call `nft_mint`. :::

- Chạy lệnh sau và thay thế field `receiver_id` và cờ `--accountId` với account ID mà bạn [đã đăng nhập](/docs/tools/near-cli#near-login) trên NEAR CLI:

```bash
near call nft.examples.testnet nft_mint '{"token_id": "my-token-unique-id", "receiver_id": "YOUR_ACCOUNT", "metadata": { "title": "YOUR NFT TITLE", "description": "YOUR NFT DESCRIPTION", "media": "https://bafybeidadhfilezx23dcdaueo3bjuafqeehokw33vyepkjtppigorrhbpy.ipfs.dweb.link/", "copies": 1}}' --accountId YOUR_ACCOUNT --deposit 0.1
```
- Hãy chắc chắn thay thế title, description và media URL bằng của bạn.

<details>
<summary>Ví dụ về response nhận được: </summary>
<p>

```json
{
  "token_id": "0",
  "owner_id": "YOUR_ACCOUNT",
  "metadata": {
    "title": "My awesome Minecraft NFT",
    "description": "Custom log cabin",
    "media": "https://bafybeidadhfilezx23dcdaueo3bjuafqeehokw33vyepkjtppigorrhbpy.ipfs.dweb.link/",
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

- Để xem các token được sở hữu bởi một account trên contract `example-nft`, bạn có thể call contract với lệnh `near-cli` sau:

```bash
near view nft.examples.testnet nft_tokens_for_owner '{"account_id": "YOUR_ACCOUNT"}'
```

<details>
<summary>Ví dụ về response nhận được: </summary>
<p>

```json
[
  {
    "token_id": "0",
    "owner_id": "YOUR_ACCOUNT",
    "metadata": {
      "title": "Some Art",
      "description": "My NFT media",
      "media": "https://bafybeidadhfilezx23dcdaueo3bjuafqeehokw33vyepkjtppigorrhbpy.ipfs.dweb.link/",
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

## Sử dụng bản vẽ ngôi làng

Bây giờ bạn đã upload bản vẽ của mình lên blockchain, tất cả những gì ai đó cần làm là dán nó vào thế giới riêng của họ bằng các download file `*.schem` được liên kết với link IPFS trong NFT chúng ta đã mint, và đưa nó vào folder chứa các bản vẽ của họ.

Để kiểm tra, chúng tôi đã mint NFT chứa bản vẽ ngôi làng mà chúng ta đang làm việc cùng, để bạn có thể download và dán nó vào trong thế giới của bạn.

### Lấy file bản vẽ

Điều đầu tiên bạn cần làm là xem metadata của token mà chúng ta vừa mint, nó có chứa link IPFS tới bản vẽ ngôi làng. Chúng ta vừa mint một token với ID `village-schematic` nằm trong account `village-schematic.testnet`.

- Để lấy link media, chạy câu lệnh sau:

```bash
near view nft.examples.testnet nft_tokens_for_owner '{"account_id": "village-schematic.testnet"}'
```

<details>
<summary>Response mong đợi: </summary>
<p>

```bash
[
  {
    token_id: 'village-schematic',
    owner_id: 'village-schematic.testnet',
    metadata: {
      title: 'Village Schematic',
      description: 'Blockcraft Village Schematic Tutorial NFT',
      media: 'https://bafybeidadhfilezx23dcdaueo3bjuafqeehokw33vyepkjtppigorrhbpy.ipfs.dweb.link/',
      media_hash: null,
      copies: 1,
      issued_at: null,
      expires_at: null,
      starts_at: null,
      updated_at: null,
      extra: null,
      reference: null,
      reference_hash: null
    },
    approved_account_ids: {}
  }
]
```

</p>
</details>

- Bạn có thể lấy link media và dán nó vào trong browser. Nó sẽ đưa bạn tới một trang trông giống như thế này:

![IPFS Village Schem](/docs/assets/nfts/IPFS-village-schem.png)

- Nếu bạn nhấp vào file có tên `village-house.schem`, nó sẽ download file này.
- Sau đó, bạn có thể copy file bản vẽ này và dán nó vào trong folder `minecraft/config/worldedit/schematics` của bạn.

### Load file bản vẽ trong Minecraft

- Sau khi bạn dán file bản vẽ vào trong folder `minecraft/config/worldedit/schematics`, bạn có thể load file bản vẽ này vào trong clipboard bằng cách chạy lệnh sau trong thế giới minecraft của bạn:

```bash
//schematics load village-house
```

- Bây giờ bạn có thể dán file này tại bất kì đâu trong thế giới của bạn, chỉ đơn giản dùng lệnh `//paste` và xong rồi đấy! Bạn sẽ thấy một cái gì đó tương tự như sau:

![Dán ngôi làng lần cuối](/docs/assets/nfts/final-village-pasting.png)

Chúc mừng bạn! Bạn vừa tìm hiểu cách để mint một NFT bản vẽ Minecraft và load nó vào trong thế giới của bạn!

## Version cho bài viết này

Tại thời điểm viết bài, ví dụ này tương thích với các version dưới đây:

- near-cli: `2.1.1`
