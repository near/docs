---
id: defining-a-token
title: Defining a Fungible Token
sidebar_label: Defining Your Token
---

import {Github} from "@site/src/components/codetabs"

This is the first of many tutorials in a series where you'll be creating a complete FT smart contract from scratch that conforms with all the NEAR [FT standards](https://nomicon.io/Standards/Tokens/FungibleToken/Core). Today you'll learn what a Fungible Token is and how you can define one on the NEAR blockchain. You will be modifying a bare-bones [skeleton smart contract](/tutorials/fts/skeleton) by filling in the necessary code snippets needed to add this functionality.

---

## Giới thiệu

To get started, switch to the `1.skeleton` folder in our repo. Nếu bạn chưa clone repository, hãy tham khảo [Kiến trúc của Contract](/tutorials/fts/skeleton) để bắt đầu.

If you wish to see the finished code for this portion of the tutorial, that can be found on the `2.defining-a-token` folder.

---

## Các sửa đổi đối với skeleton contract {#modifications}

At its very core, a fungible token is an exchangeable asset that **is divisible** but is **not unique**. For example, if Benji had 1 Canadian dollar, it would be worth the exact same as Matt's Canadian dollar. Both their dollars are fungible and exchangeable. In this case, the fungible token is the canadian dollar. All fiat currencies are fungible and exchangeable.

Non-fungible tokens, on the other hand, are **unique** and **indivisible** such as a house or a car. You **cannot** have another asset that is exactly the same. Even if you had a specific car model, such as a Corvette 1963 C2 Stingray, each car would have a separate serial number with a different number of kilometers driven etc...

Now that you understand what a fungible token is, let's look at how you can define one in the contract itself.

<hr className="subsection" />

### Defining a fungible token {#defining-a-fungible-token}

Start by navigating to the `1.skeleton/src/metadata.rs` file. This is where you'll define the metadata for the fungible token itself. There are several ways NEAR allows you to customize your token, all of which are found in the [metadata](https://nomicon.io/Standards/Tokens/FungibleToken/Core#metadata) standard. Let's break them up into the optional and non-optional portions.

Required:
- **spec**: Indicates the version of the standard the contract is using. This should be set to `ft-1.0.0`.
- **name**: The human readable name of the token such as "Wrapped NEAR" or "TEAM Tokens".
- **symbol**: The abbreviation of the token such as `wNEAR` or `gtNEAR`.
- **decimals**: used in frontends to show the proper significant digits of a token. This concept is explained well in this [OpenZeppelin post](https://docs.openzeppelin.com/contracts/3.x/erc20#a-note-on-decimals).

Optional:
- **icon**: The image for the token (must be a [data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs)).
- **reference**: A link to any supplementary JSON details for the token stored off-chain.
- **reference_hash**: A hash of the referenced JSON.

With this finished, you can now add these fields to the metadata in the contract.

<Github language="rust" start="8" end="19" url="https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/metadata.rs" />

Now that you've defined what the metadata will look like, you need someway to store it on the contract. Switch to the `1.skeleton/src/lib.rs` file and add the following to the `Contract` struct. You'll want to store the metadata on the contract under the `metadata` field.

<Github language="rust" start="18" end="24" url="https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/lib.rs" />

You've now defined *where* the metadata will live but you'll also need someway to pass in the metadata itself. This is where the initialization function comes into play.

<hr className="subsection" />

#### Các Initialization Function

You'll now create what's called an initialization function; you can name it `new`. This function needs to be invoked when you first deploy the contract. It will initialize all the contract's fields that you've defined with default values. It's important to note that you **cannot** call these methods more than once.

<Github language="rust" start="58" end="74" url="https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/lib.rs" />

More often than not when doing development, you'll need to deploy contracts several times. You can imagine that it might get tedious to have to pass in metadata every single time you want to initialize the contract. For this reason, let's create a function that can initialize the contract with a set of default `metadata`. You can call it `new_default_meta`.

<Github language="rust" start="38" end="54" url="https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/lib.rs" />

This function is simply calling the previous `new` function and passing in some default metadata behind the scenes.

At this point, you've defined the metadata for your fungible tokens and you've created a way to store this information on the contract. The last step is to introduce a getter that will query for and return the metadata. Switch to the `1.skeleton/src/metadata.rs` file and add the following code to the `ft_metadata` function.

<Github language="rust" start="21" end="31" url="https://github.com/near-examples/ft-tutorial/blob/main/2.define-a-token/src/metadata.rs" />

This function will get the `metadata` object from the contract which is of type `FungibleTokenMetadata` and will return it.

---

## Tương tác với on-chain contract

Now that the logic for defining a custom fungible token is complete and you've added a way to query for the metadata, it's time to build and deploy your contract to the blockchain.

### Deploying and initializing the contract {#deploy-the-contract}

You can build a contract using the following command:

```bash
cd 1.skeleton && cargo near build
```

Sẽ có một danh sách các cảnh báo trên console của bạn, nhưng khi hướng dẫn tiếp tục, những cảnh báo này sẽ biến mất.

Để deploy, bạn cần một account NEAR với các key chứa sẵn trong local machine của bạn. Navigate to the [NEAR wallet](https://testnet.mynearwallet.com//) site and create an account.

:::info
Please ensure that you deploy the contract to an account with no pre-existing contracts. Cách đơn giản nhất là chỉ cần tạo một account mới hoặc tạo một account phụ cho hướng dẫn này.
:::

Đăng nhập vào account vừa mới tạo với `near-cli` bằng cách chạy câu lệnh sau trong terminal của bạn.

```bash
near login
```

Để làm cho hướng dẫn này dễ dàng hơn với copy/paste, chúng tôi đã set một biến môi trường cho account ID của bạn. Trong command dưới đây, thay `YOUR_ACCOUNT_NAME` với account name bạn vừa đăng nhập, bao gồm phần `.testnet`:

```bash
export FT_CONTRACT_ID="YOUR_ACCOUNT_NAME"
```

Kiểm tra biến môi trường được cài đặt đúng hay chưa bằng cách chạy:

```bash
echo $FT_CONTRACT_ID
```

Hãy xác nhận rằng account được in ra trong terminal là chính xác. Nếu mọi thứ đều đúng, thì bây giờ bạn có thể deploy contract của bạn. Để đơn giản hơn, hãy gọi hàm init metadata mặc định mà bạn đã viết trước đó, để không cần phải nhập metadata theo cách thủ công trong CLI. In the root of your FT project run the following command to deploy your smart contract.

```bash
cargo near deploy $FT_CONTRACT_ID with-init-call new_default_meta json-args '{"owner_id": "'$FT_CONTRACT_ID'", "total_supply": "0"}' prepaid-gas '100.0 Tgas' attached-deposit '0 NEAR' network-config testnet sign-with-keychain send
```

At this point, the contract should have been deployed to your account and initialized.

<hr className="subsection" />

### Xem metadata của contract

Now that the contract has been initialized, you can query for the metadata by calling the function you wrote earlier.

```bash
near view $FT_CONTRACT_ID ft_metadata
```

Nó sẽ trả về một output trong giống như sau:

```bash
{
  spec: 'ft-1.0.0',
  name: 'Team Token FT Tutorial',
  symbol: 'gtNEAR',
  icon: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/
        /*
        ...lots of base64 data...
        */
        j4Mvhy9H9NlnieJ4iwoo9ZlyLGx4pnrPWeB4CVGRZZcJ7Vohwhi0z5MJY4cVL4MdP/Z',
  reference: null,
  reference_hash: null,
  decimals: 24
}
```

**Go team!** You've now verified that everything works correctly and you've defined your own fungible token!

In the next tutorial, you'll learn about how to create a total supply and view the tokens in the wallet.

---

## Tổng kết

In this tutorial, you went through the basics of setting up and understanding the logic behind creating a fungible token on the blockchain using a skeleton contract.

You first looked at [what a fungible token is](#modifications) and how it differs from a non-fungible token. You then learned how to customize and create your own fungible tokens and how you could modify the skeleton contract to achieve this. Finally you built and deployed the contract and interacted with it using the NEAR CLI.

## Các bước tiếp theo

In the [next tutorial](/tutorials/fts/circulating-supply), you'll find out how to create an initial supply of tokens and have them show up in the NEAR wallet.
