---
id: ethers-js
title: Basic EthersJS
---

# Hello EthersJS!

This component is designed to display the account ID of the connected Ethereum wallet. In case the user is not signed in, the component will show a message instead. 

#### Source code

```jsx
const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return "Please login first";

return <p>Account: {sender}</p>;

```

#### Fork the component

1. Navigate to [the component](https://near.org/near/widget/ComponentDetailsPage?src=wecare.near/widget/HelloEthersJS)
2. Click on the menu icon in the top-right corner
3. Select `Fork`
4. Feel free to make any changes 
5. Click on "Save" to deploy the component 

:::note
To deploy the component, you'll need to sign in with a NEAR account and to make a deposit of a small amount of NEAR for the storage cost. This is because BOS uses the NEAR blockchain underneath.
:::
