```js
const accountId = context.accountId ?? props.accountId;
const keypomContract = "v2.keypom.near";
const nftContract = "nft.primitives.near";
const nftTokenId = "1";
const dropAmount = "10000000000000000000000";

Near.call([
  {
    contractName: keypomContract,
    methodName: "create_drop",
    args: {
      public_keys: state.publicKeys,
      deposit_per_use: dropAmount,
      fcData: {
        // 2D array of function calls. In this case, there is 1 function call to make for a key use
        // By default, if only one array of methods is present, this array of function calls will be used for all key uses
        methods: [
          // Array of functions for Key use 1. 
            [{
              receiverId: nftContract,
              methodName: "nft_mint",
              args: JSON.stringify({
              // Change this token_id if it already exists -> check explorer transaction
                  token_id: nftTokenId,
                  metadata: {
                    title: "My NFT drop",
                    description: "",
                    media: "",
                  }
              }),
              accountIdField: "receiver_id",
              // Attached deposit for when the receiver makes this function call
              attachedDeposit: "10000000000000000000000"
            }]
        ]
      }
    },
    deposit: "23000000000000000000000", // state.publicKeys.length * dropAmount + 3000000000000000000000,
    gas: "100000000000000",
  },
]);
```