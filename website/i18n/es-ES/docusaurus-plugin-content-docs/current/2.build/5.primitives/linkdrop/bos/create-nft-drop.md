```js
const accountId = context.accountId ?? props.accountId;
const keypomContract = "v2.keypom.near";
const nftContract = "nft.primitives.near";
const dropAmount = "10000000000000000000000";

 Near.call([
  {
    contractName: keypomContract,
    methodName: "create_drop",
    args: {
      public_keys: state.publicKeys,
      deposit_per_use: dropAmount,
      nft: {
        // Who will be sending the NFTs to the Keypom contract
        sender_id: accountId,
        // NFT Contract Id that the tokens will come from
        contract_id: nftContract,
      },
    },
    deposit: "23000000000000000000000" // state.publicKeys.length * dropAmount + 3000000000000000000000,
    gas: "100000000000000",
  },
]);
```
