---
id: web-app
title: Web Application
hide_table_of_contents: false
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section describes how to interact with NFT contracts from a web app.

:::info
All the examples are using a `Wallet` object, which comes from our [basic template](https://github.com/near-examples/hello-near-js/blob/master/frontend/near-wallet.js)
:::

:::tip
In order to interact with NFT from your Web App you can request data from various APIs from your app (for example, [Marketplaces API](/primitives/nft/querying/marketplaces)).
:::

---

## Mint a NFT

<Tabs>
<TabItem value="NFT Primitive" label="NFT Primitive" default>

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "nft.primitives.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'nft_mint',
  args: {
    token_id: "1",
    receiver_id: "bob.near", 
    token_metadata: {
      title: "NFT Primitive Token",
      description: "Awesome NFT Primitive Token",
      media: "string", // URL to associated media, preferably to decentralized, content-addressed storage
    }
  },
  contractId: CONTRACT_ADDRESS
});
```

</TabItem>

<TabItem value="Paras" label="Paras">

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "x.paras.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'nft_mint',
  args: {
    token_series_id: "490641",
    receiver_id: "bob.near",
  },
  contractId: CONTRACT_ADDRESS
});
```

:::note
In order to use `nft_mint` method of the `x.paras.near` contract you have to be a creator of a particular token series.
:::

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

By using [`near-api-js`](https://docs.near.org/tools/near-api-js/quick-reference)

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "thomasettorreiv.mintbase1.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'nft_batch_mint',
  args: {
    num_to_mint: 1,
    owner_id: "bob.near",
    metadata: {},
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 1
});
```

:::note
In order to use `nft_batch_mint` method of Mintbase store contract your account have to be a in the contract minters list.
:::

By using [`Mintbase JS`](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/sdk/mint)

```js
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, mint, MintArgs } from '@mintbase-js/sdk';


export const MintComponent = ({ media, reference, contractAddress, owner }: MintArgs): JSX.Element => {

  const { selector } = useWallet();

  const handleMint = async (): Promise<void> => {

    const wallet = await selector.wallet();

    await execute(
      mint({ contractAddress: contractAddress, metadata: { media, reference }, ownerId: owner })
    );

  }

  return (
    <div>
      <button onClick={handleMint}>
        Mint
      </button>
    </div>
  );
};
```

</TabItem>
</Tabs>

---

## Buy a NFT

<Tabs>
<TabItem value="Paras" label="Paras" default>

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "x.paras.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'nft_buy',
  args: {
    token_series_id: "299102",
    receiver_id: "bob.near",
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 205740000000000000000000 // attached deposit in yoctoNEAR, covers NFT price + storage cost
});
```

**Example response:**

```json
"299102:1"
```


</TabItem>

<TabItem value="Mintbase" label="Mintbase">

By using [`near-api-js`](https://docs.near.org/tools/near-api-js/quick-reference)

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "simple.market.mintbase1.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'buy',
  args: {
    nft_contract_id: "rubennnnnnnn.mintbase1.near",
    token_id: "38"
  },
  contractId: CONTRACT_ADDRESS,
  deposit: 1000000000000000000000 // attached deposit in yoctoNEAR, covers NFT price + storage cost (optional)
});
```

**Example response:**

```json
{
  "payout": {
    "rub3n.near": "889200000000000000000",
    "rubenm4rcus.near": "85800000000000000000"
  }
}
```


By using [`Mintbase JS`](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/sdk/buy)

```js
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, burn, BuyArgs } from '@mintbase-js/sdk';


export const BuyComponent = ({ contractAddress, price, tokenId, affiliateAccount, marketId }:BuyArgs): JSX.Element => {

  const { selector } = useWallet();

  const handleBuy = async (): Promise<void> => {

    const wallet = await selector.wallet();

    const buyArgs = {contractAddress: contractAddress, tokenId: tokenId, affiliateAccount: affiliateAccount , marketId:marketId, price:price }

    await execute(
      {wallet},
      buy(buyArgs)
    );

  }

  return (
    <div>
      <button onClick={handleBuy}>
        Burn provided token array from {contractAddress}
      </button>
    </div>
  );
};
```

</TabItem>
</Tabs>

---

## Query NFT data

<Tabs>
<TabItem value="NFT Primitive" label="NFT Primitive" default>

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "nft.primitives.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
const response = await wallet.viewMethod({
  method: 'nft_token',
  args: {
    token_id: "1"
  }
});
```

**Example response:**

```json
{
  "token_id": "1",
  "owner_id": "bob.near",
  "metadata": {
    "title": "string", // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
    "description": "string", // free-form description
    "media": "string", // URL to associated media, preferably to decentralized, content-addressed storage
    "media_hash": "string", // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
    "copies": 1, // number of copies of this set of metadata in existence when token was minted.
    "issued_at": 1642053411068358156, // When token was issued or minted, Unix epoch in milliseconds
    "expires_at": 1642053411168358156, // When token expires, Unix epoch in milliseconds
    "starts_at": 1642053411068358156, // When token starts being valid, Unix epoch in milliseconds
    "updated_at": 1642053411068358156, // When token was last updated, Unix epoch in milliseconds
    "extra": "string", // anything extra the NFT wants to store on-chain. Can be stringified JSON.
    "reference": "string", // URL to an off-chain JSON file with more info.
    "reference_hash": "string" // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
  }
}
```


</TabItem>

<TabItem value="Paras" label="Paras">

By using [`near-api-js`](https://docs.near.org/tools/near-api-js/quick-reference)

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "x.paras.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
const response = await wallet.viewMethod({
  method: 'nft_token',
  args: {
    token_id: "84686:1154"
  }
});
```

**Example response:**

```json
{
  "token_id": "84686:1154",
  "owner_id": "bob.near",
  "metadata": {
    "title": "Tokenfox Silver Coin #1154",
    "description": null,
    "media": "bafkreihpapfu7rzsmejjgl2twllge6pbrfmqaahj2wkz6nq55c6trhhtrq",
    "media_hash": null,
    "copies": 4063,
    "issued_at": "1642053411068358156",
    "expires_at": null,
    "starts_at": null,
    "updated_at": null,
    "extra": null,
    "reference": "bafkreib6uj5kxbadfvf6qes5flema7jx6u5dj5zyqcneaoyqqzlm6kpu5a",
    "reference_hash": null
  },
  "approved_account_ids": {}
}
```


By calling a Paras API method

```js
const tokenData = fetch("https://api-v2-mainnet.paras.id/token?token_id=84686:1154");
```

**Example response:**

```json
{
  "status": 1,
  "data": {
    "results": [
      {
        "_id": "61dfbf27284abc1cc0b87c9d",
        "contract_id": "x.paras.near",
        "token_id": "84686:1154",
        "owner_id": "bob.near",
        "token_series_id": "84686",
        "edition_id": "1154",
        "metadata": {
          "title": "Tokenfox Silver Coin #1154",
          "description": "Holding this silver coin in your wallet will bring you health and happiness \uD83D\uDE0A",
          "media": "bafkreihpapfu7rzsmejjgl2twllge6pbrfmqaahj2wkz6nq55c6trhhtrq",
          "media_hash": null,
          "copies": 4063,
          "issued_at": null,
          "expires_at": null,
          "starts_at": null,
          "updated_at": null,
          "extra": null,
          "reference": "bafkreib6uj5kxbadfvf6qes5flema7jx6u5dj5zyqcneaoyqqzlm6kpu5a",
          "reference_hash": null,
          "collection": "Tokenfox Collection Cards",
          "collection_id": "tokenfox-collection-cards-by-tokenfoxnear",
          "creator_id": "tokenfox.near",
          "blurhash": "U7F~gc00_3D%00~q4n%M_39F-;RjM{xuWBRj",
          "score": 0,
          "mime_type": "image/png"
        },
        "royalty": {
          "tokenfox.near": 1000
        },
        "price": null,
        "approval_id": null,
        "ft_token_id": null,
        "has_price": null,
        "is_creator": true,
        "total_likes": 8,
        "likes": null,
        "categories": [],
        "view": 4
      }
    ],
    "count": 1,
    "skip": 0,
    "limit": 10
  }
}
```


:::info
See the [Paras API documentation](https://parashq.github.io/) for the full list of methods.
:::

:::note
When you call Paras smart contract method it returns data that are stored in the Paras NFT smart contract. It means a response contains only data about NFTs which were minted via Paras NFT contract. 

When you call Paras API methods it returns data from other NFT contracts as well, due to the work of the indexer. It means you might want to pass more parameters like `contract_id` or `owner_id` to make the response more accurate.
:::

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

By using [`near-api-js`](https://docs.near.org/tools/near-api-js/quick-reference)

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "anthropocene.mintbase1.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
const response = await wallet.viewMethod({
  method: 'nft_token',
  args: {
    token_id: "17960"
  }
});
```

**Example response:**

```json
{
  "token_id": "17960",
  "owner_id": "876f40299dd919f39252863e2136c4e1922cd5f78759215474cbc8f1fc361e14",
  "approved_account_ids": {},
  "metadata": {
    "title": null,
    "description": null,
    "media": null,
    "media_hash": null,
    "copies": 1,
    "issued_at": null,
    "expires_at": null,
    "starts_at": null,
    "updated_at": null,
    "extra": null,
    "reference": "F-30s_uQ3ZdAHZClY4DYatDPapaIRNLju41RxfMXC24",
    "reference_hash": null
  },
  "royalty": {
    "split_between": {
      "seventhage.near": {
        "numerator": 10000
      }
    },
    "percentage": {
      "numerator": 100
    }
  },
  "split_owners": null,
  "minter": "anthropocene.seventhage.near",
  "loan": null,
  "composeable_stats": { "local_depth": 0, "cross_contract_children": 0 },
  "origin_key": null
}
```


:::note
When someone creates a NFT on Mintbase they need to deploy their own NFT contract using Mintbase factory. Those smart contract are subaccounts of mintbase1.near, e.g. `anthropocene.mintbase1.near`.
:::

By calling a Mintbase GraphQL API method

```js
const tokenData = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "anon",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
      query getToken{
        tokens: nft_tokens(
          where: {
            token_id: { _eq: "84686:1154" }
          }
        ) {
          tokenId: token_id
          ownerId: owner
          contractId: nft_contract_id
          reference
          issuedAt: issued_at
          copies
          metadataId: metadata_id
        }
      }
    `,
  }),
});
```

**Example response:**

```json
{
  "ok": true,
  "status": 200,
  "contentType": "application/json",
  "body": {
    "data": {
      "tokens": [
        {
          "tokenId": "84686:1154",
          "ownerId": "bob.near",
          "contractId": "x.paras.near",
          "reference": "bafkreib6uj5kxbadfvf6qes5flema7jx6u5dj5zyqcneaoyqqzlm6kpu5a",
          "issuedAt": "2022-01-13T05:56:51.068358",
          "copies": 4063,
          "metadataId": "x.paras.near:5210047642790498956c9669d6a37b98"
        }
      ]
    }
  }
}
```


:::note
In the future, users may be required to register using an api key. For now, simply passing the valueanon for `mb-api-key` will work.
:::

By using [`Mintbase JS`](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/data/api/tokenbyid)

```js
import { tokenById } from  '@mintbase-js/data'

const { data, error } = await tokenById( '1','rub3n.testnet');

if (error) {console.log('error', error)}


console.log(data.tokenData[0]) // => token metadata
```

</TabItem>
</Tabs>

---

## Transfer a NFT

<Tabs>
<TabItem value="NFT Primitive" label="NFT Primitive" default>

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "nft.primitives.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'nft_transfer',
  args: {
    token_id: "1",
    receiver_id: "bob.near"
  },
  contractId: CONTRACT_ADDRESS
});
```

</TabItem>

<TabItem value="Paras" label="Paras">

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "x.paras.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'nft_transfer',
  args: {
    token_id: "490641",
    receiver_id: "bob.near"
  },
  contractId: CONTRACT_ADDRESS
});
```

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

By using [`near-api-js`](https://docs.near.org/tools/near-api-js/quick-reference)

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "thomasettorreiv.mintbase1.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'nft_transfer',
  args: {
    token_id: "490641",
    receiver_id: "bob.near"
  },
  contractId: CONTRACT_ADDRESS
});
```

By using [`Mintbase JS`](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/sdk/transfer)

```js
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, transfer, TransferArgs } from '@mintbase-js/sdk';

const TransferComponent = ({ tokenId, contractAddress }: TransferArgs): JSX.Element => {
  const { selector, activeAccountId } = useWallet();

  const handleTransfer = async (): Promise<void> => {
    const wallet = await selector.wallet();

    const transferArgs: TransferArgs = {
        contractAddress: contractAddress,
        transfers: [{
          receiverId: 'mb_carol.testnet',
          tokenId: token.tokenId,
        }],
      }

    await execute(
      { wallet },
      transfer(transferArgs),
    );
  };

  return (
    <div>
      <button onClick={handleTransfer}>
        Transfer {tokenId} of {contractAddress} from {activeAccountId} to Carol
      </button>
    </div>
  );
}
```

</TabItem>
</Tabs>

---

## List a NFT for sale

Basic NFT contracts following [the NEP-171 and NEP-177 standards](https://nomicon.io/Standards/Tokens/NonFungibleToken) do not implement marketplace functionality.

For this purpose, there are ecosystem apps such as [Paras](https://paras.id/) or [Mintbase](https://www.mintbase.xyz/), that use dedicated marketplace contracts.

In order to put a NFT for a sale on a marketplace you need to do two actions: 

1. Cover data storage costs in the marketplace contract. 
2. Approve the marketplace to sell the NFT in your NFT contract.

<Tabs>

<TabItem value="Paras" label="Paras">

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "marketplace.paras.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'storage_deposit',
  args: {
    receiver_id: "bob.near"
  },
  contractId: CONTRACT_ADDRESS,
  gas: 300000000000000, // attached GAS (optional)
  deposit: 9390000000000000000 // attached deposit in yoctoNEAR (optional)
});

await wallet.callMethod({
  method: 'nft_approve',
  args: {
    token_id: "1e95238d266e5497d735eb30",
    account_id: "marketplace.paras.near",
    msg: {
      price: "200000000000000000000000",
      market_type: "sale",
      ft_token_id: "near"
    }
  },
  contractId: "nft.primitives.near"
});
```

Method `nft_approve` of a NFT contract also calls the `nft_on_approve` method in `marketplace.paras.near` as a callback.

</TabItem>

<TabItem value="Mintbase" label="Mintbase">

```js
import { Wallet } from './near-wallet';

const CONTRACT_ADDRESS = "simple.market.mintbase1.near";
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });
 
await wallet.callMethod({
  method: 'deposit_storage',
  args: {
      autotransfer: true
    },
  contractId: CONTRACT_ADDRESS,
  gas: 300000000000000, // attached GAS (optional)
  deposit: 9390000000000000000 // attached deposit in yoctoNEAR (optional)
});

await wallet.callMethod({
  method: 'nft_approve',
  args: {
    args: {
      token_id: "3c46b76cbd48e65f2fc88473",
      account_id: "simple.market.mintbase1.near",
      msg: {
        price: "200000000000000000000000"
      }
    },
  },
  contractId: "nft.primitives.near"
});
```

Method `nft_approve` of a NFT contract also calls the `nft_on_approve` method in `simple.market.mintbase1.near` as a callback.

By using [`Mintbase JS`](https://docs.mintbase.xyz/dev/mintbase-sdk-ref/sdk/list)

```js
import { useState } from 'react';
import { useWallet } from '@mintbase-js/react';
import { execute, list, ListArgs } from '@mintbase-js/sdk';


export const ListComponent = ({ contractAddress, marketAddress , tokenId, price }:ListArgs):JSX.Element => {
  
  const { selector } = useWallet();

  const handleList = async (): Promise<void> => {
    const wallet = await selector.wallet();
    
    await execute(
        {wallet},
        list({
         contractAddress: nftContractId, 
         marketAddress: marketId, 
         tokenId: tokenId, 
         price: price
        })
      )
  }

  return (
    <div>
      <button onClick={handleList}>
        DeployContract with name= {name} and owner= {owner}
      </button>
    </div>
  );
};
```

</TabItem>
</Tabs>