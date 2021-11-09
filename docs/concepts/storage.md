---
id: storage-solutions
title: Decentralized Storage solutions
sidebar_label: Alternative Solutions
---

In this article, you'll find a brief overview of different decentralized storage solutions.
These solutions can be integrated into your distributed applications (dApps), allowing you to access large amounts of data in a decentralized manner.

#### Solutions

- [Arweave](#arweave)
- [IPFS](#ipfs)
- [Sia](#sia)

## Arweave

[Arweave](https://www.arweave.org/) is a new type of storage that backs data with sustainable and perpetual endowments
(donations to a nonprofit organization). This allows users and developers to store data forever.
Arweave acts as a collectively owned hard drive, and allows their users to preserve valuable information, apps, and history indefinitely.

The Arweave protocol matches people who have hard drive space to spare with those individuals and organizations that need to store data or host content permanently. This is achieved in a decentralized network, and all data stored is backed by a [sustainable endowment](https://arwiki.wiki/#/en/storage-endowment) ensuring it is available in perpetuity.

:::info
To learn more about Arweave, check its [mining mechanism](https://arwiki.wiki/#/en/arweave-mining) and its [bandwidth-sharing system](https://arwiki.wiki/#/en/karma). 
:::

### Example

Let's see how to store some files on Arweave, by running a local Arweave gateway-like server.

#### Using arlocal

[Arlocal](https://github.com/textury/arlocal) essentially creates a simulated version of Arweave. Think of it like a local node that runs on your computer to store information. 

:::info
You can find Arlocal's GitHub repository [here](https://github.com/textury/arlocal).
:::

In this example you'll need to run **two terminals**. 

Open one terminal and run 
```bash
npx arlocal
```

you will see the response: `arlocal started on port 1984`

:::tip
You can specify the port by using `npx arlocal <desired port number>`.
:::

#### NEAR-Arweave Frontend

The [NEAR-Arweave repository](https://github.com/near-examples/NEAR-Arweave-Tutorial) has a simple frontend that allows you to store `.png` files using arlocal.

On the second terminal, clone the frontend by running the following command:
```bash
git clone https://github.com/near-examples/NEAR-Arweave-Tutorial.git
```

Install depenencies by running the following in the project folder:
```bash
cd NEAR-Arweave-Tutorial
yarn
```

Next, start the application by running:

```bash
yarn start 
```

#### Using the Frontend

Now you're ready to upload an image by selecting the <kbd>Choose File</kbd> button:
![Arweave step 1](/docs/assets/arweave-1.png)

You should see the transaction ID window become populated after hitting the <kbd>Submit</kbd> button.

> **Note:** Make sure your arlocal node is running in a separate terminal.

![Arweave step 2](/docs/assets/arweave-2.png)

#### Mine your Transaction

On Arweave your transaction goes through two stages, a pending stage and a confirmed stage. For the transaction to be complete and for you to be able to retrieve your data, your transaction must be confirmed. 

Visit `http://localhost:1984/mine` in your browser to send a mine request to your local node.

> **Note:** you may find that you are still able to retrieve your data without this step, but that's because you are running a local node.
> When dealing with a real Arweave node you will have to wait until your transaction has been mined and confirmed.

#### Retrieve the image

Now you can copy and paste any of your listed arweave transaction IDs in step number 5 on the frontend to retrieve your file from your local node:

![Arweave step 3](/docs/assets/arweave-3.png)

> **Note:** keep in mind that using Arweave's live network will require to purchase artokens to pay for storage. You can find out more [here](https://www.arweave.org/).

:::tip
Using `near-api-js` and `arweavejs` you can automate most of these steps.
:::

## IPFS

The [InterPlanetary File System](https://ipfs.io/) (IPFS) is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devices.

#### Content identifier

When you add a file to IPFS, it is split into smaller chunks, cryptographically hashed, and given a unique fingerprint called a content identifier (CID). 

> **Note:** the CID acts as an permanent record of a file as it exists at that point in time.

#### Look-up

When a node looks up for a file, it ask the peer nodes for the content referenced by the file's CID. When a node views or downloads a file, it caches a copy and become another provider until the cache is cleared. 

#### Pinned content

On the IPFS network, each node stores only content it is interested in.
A node can pin content in order to keep it forever, or discard content it hasn't used to save space.

#### File versions

When you add a new version of your file to IPFS, since the cryptographic hash is different, it will get a new CID.
This means that any changes to a file don't overwrite the original, and common chunks across files can be reused in order to minimize storage costs.

#### Naming system

IPFS offers a decentralized naming system so you don't need to remember a long string of CIDs.
IPFS can find the latest version of your file using the IPNS decentralized naming system, and you can use DNSLink to map CIDs to human-readable DNS names.

#### IPFS providers

- [Web3.Storage](https://web3.storage/): it's a free service that simplifies building on top of IPFS and Filecoin. Web3.Storage is backed by Filecoin and makes content available via IPFS leveraging the unique properties of each network.
- [NFT.Storage](https://nft.storage/): this free service is built specifically for storing off-chain NFT data. Data is stored decentralized on IPFS and Filecoin, and referenced using content-addressed IPFS URIs that can be used in your smart contracts.

### Example

Let's try a simple IPFS integration example using the NFT.Storage API:

1. [Register an account on nft.storage](https://nft.storage/login/) so you can create API access keys.

2. [Create an API access key](https://nft.storage/manage/) and write it down.

3. Submit an `HTTP POST` request to `api.nft.storage/upload`, passing the API key and the file data in the request body:

```
curl -X POST --data-binary @/path/to/file/art.png -H 'Authorization: Bearer YOUR_API_KEY' https://api.nft.storage/upload
```

:::tip
If you want to use a different HTTP client, don't forget to configure and set the Authorization header: `"Authorization": "Bearer YOUR_API_KEY"`
:::

Successful requests will receive a `HTTP 200` status and `application/json` response like:

```json
{
  "ok": true,
  "value": { "cid": "bafy..." }
}
```

4. Using the `cid`, write down the image's URL: `https://<cid>.ipfs.dweb.link/`

```
https://bafyreiabag3ztnhe5pg7js4bj6sxuvkz3sdf76cjvcuqjoidvnfjz7vwrq.ipfs.dweb.link/
```

Now that your file has been uploaded to IPFS, it can be retrieved using the `cid` link.

:::tip
Check the [NFT.Storage Docs](https://nft.storage/api-docs/) for information on uploading multiple files and other available endpoints.
:::

## Sia

[Sia](https://sia.tech/) is a decentralized cloud storage platform that leverages blockchain technology to create a robust data storage marketplace that is more affordable than traditional cloud storage providers.

#### Privacy

Sia encrypts and distributes your files across a decentralized network. With Sia, you control the private encryption keys and you own the data, so no third-party can access or control your files.
Each file segment is encrypted before leaving a renter's computer. This ensures that hosts only store encrypted segments of user data. 

> **Note:** for data encryption Sia uses the open-source [Threefish encryption algorithm](https://en.wikipedia.org/wiki/threefish).

#### Redundancy

Your files are divided into 30 segments before uploading, and Sia stores and distributes redundant segments on nodes across the globe. File segments are created using a technology commonly used in CD/DVD media, called Reed-Solomon erasure coding. This coding technology allows Sia to divide files in a redundant manner, where any 10 of 30 segments can fully recover a user's file.
This process eliminates any single point of failure and ensures higher uptime than traditional cloud storage providers.

> **Note:** this means that if 20 out of 30 hosts go offline, a Sia user is still able to download the files.

#### Marketplace

Sia has a decentralized storage marketplace (created using the Sia blockchain), in which storage providers compete for your business, which leads to lower storage prices. Storage users pay using Siacoin, which can also be mined and traded.

This is the basic Sia marketplace workflow:

- Files are sent to hosts using Smart Contracts
- Renters and hosts pay with Siacoin
- Contracts renew over time
- Hosts submit storage proofs
