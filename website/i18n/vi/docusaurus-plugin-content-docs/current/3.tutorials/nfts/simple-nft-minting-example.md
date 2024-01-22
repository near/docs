---
id: minting-nft-frontend
title: Mint NFT Front-end
sidebar_label: Mint Front-end
---

import {Github} from "@site/src/components/codetabs"

# NFT Mint Front-end

> Trong hướng dẫn này bạn sẽ tìm hiểu cách để tạo ra một NFT front-end đơn giản và mint "Go Team" NFT trên NEAR blockchain ngay từ trình duyệt web của mình.

## Tổng quan về ứng dụng

Ứng dụng này khá đơn giản: user đăng nhập và nhấn vào nút <kbd>Mint NFT</kbd>. Sau khi user nhấn vào nút mint, một "Go Team" NFT sẽ được mint và gửi đến NEAR Wallet của họ.

![Front-end](/docs/assets/nfts/nft-mint-frontend.png)

## Smart Contract code

The code for the NFT smart contract can be found in the [Zero to Hero NFT tutorial](/docs/tutorials/contracts/nfts/introduction)'s  [GitHub repository](https://github.com/near-examples/nft-tutorial/tree/main/nft-contract/src), under the `main` branch.

Các contract method được sử dụng trong ứng dụng này như sau:

- `nft_mint`: function được sử dụng để mint các token.
- `check_token`: function tùy chỉnh được tạo để kiểm tra sự tồn tại của một token. Điều này giúp đảm bảo một token cho mỗi user.

## Front-end

Front-end của contract được triển khai bằng cách sử dụng `create-near-app`. [React Bootstrap](https://react-bootstrap.github.io/) đã được sử dụng để style cho ứng dụng này.

Để khởi động React front-end, chạy lệnh sau trong terminal:

```sh
npx create-near-app --frontend react --contract rust
```

Then, simply import the contract files from the `main` branch, and you'll have the needed structure to run the application.

### Bắt đầu

Khi mount các component của ứng dụng, ứng dụng kiểm tra sự tồn tại của một non-fungible token.

<Github language="js" start="24" end="46" url="https://github.com/near-examples/nft-tutorial-frontend/blob/master/src/App.js" />

If no prior NFT has been minted, the mint button will be available for use.

### Nút mint

Here is the function behind the mint button. The meta data has been filled out for the user already:

- `token_id` được set bởi account id của user,
- và `media` link được hard-code thành `goteam-gif.gif` lưu trữ trên IPFS.

<Github language="js" start="7" end="23" url="https://github.com/near-examples/nft-tutorial-frontend/blob/master/src/Components/MintingTool.js" />

After hitting the <kbd>Mint NFT</kbd> button the user will be able to check out the newly minted NFT at [wallet.testnet.near.org](https://testnet.mynearwallet.com//?tab=collectibles), under the Wallet's `Collectibles` tab.

## Các chú thích cuối cùng

Bạn có thể tìm repository của ứng dụng hoàn chỉnh [trên GitHub](https://github.com/near-examples/nft-tutorial-frontend) để clone và chạy. Trong thư mục cấu hình bạn có thể nhìn thấy rằng smart contract này đã được deploy tới `nft-frontend-simple-mint.blockhead.testnet`:

<Github language="js" start="1" end="2" url="https://github.com/near-examples/nft-tutorial-frontend/blob/master/src/config.js" />

You can also check out the [explorer link here](https://testnet.nearblocks.io/address/nft-frontend-simple-mint.blockhead.testnet) to see how many individuals have been minting their own _Go Team_ NFTs. _**Chúc bạn mint thành công!**_

:::tip
Clone and chạy ví dụ này từ https://github.com/near-examples/nft-tutorial-frontend
:::
