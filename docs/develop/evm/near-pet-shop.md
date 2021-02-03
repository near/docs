---
id: near-pet-shop
title: The NEAR Pet Shop example
sidebar_label: Pet Shop
---

Before you can interact with this dApp, please make sure you have a NEAR betanet account. (Note that after the NEAR mainnet launch, betanet underwent a hard fork to "start fresh" so accounts created earlier in 2020 will need to be recreated.) Please create an account following the instructions at:

<a href="http://wallet.betanet.near.org" target="_blank">https://wallet.betanet.near.org</a>

Then visit the NEAR Pet Shop live on betanet here:

<a href="https://near-examples.github.io/near-pet-shop" target="_blank">https://near-examples.github.io/near-pet-shop</a>

You'll see this on the webpage:

<img loading="lazy" src="/docs/assets/evm/pet-shop-1024x591.jpg" alt="At the top of the NEAR Pet Shop there are three dogs open for adoption and one that's already adopted. The user has not logged in yet" width="1024" height="591" srcset="/docs/assets/evm/pet-shop-1024x591.jpg 1024w, /docs/assets/evm/pet-shop-300x173.jpg 300w, /docs/assets/evm/pet-shop-768x443.jpg 768w, /docs/assets/evm/pet-shop-1536x887.jpg 1536w, /docs/assets/evm/pet-shop-2048x1182.jpg 2048w" sizes="(max-width: 1024px) 100vw, 1024px">

There are a total of 16 pets in a grid, associated with the 16 Ethereum addresses returned from `getAdopters`. In this screenshot, the rightmost dog named Melissa has been adopted. The button under Melissa says "Success" while the other dogs in that row say "Adopt." Note that the buttons are disabled. This is because the user hasn't logged in yet. We won't be able to click the buttons to adopt until we're logged in and can sign transactions, but we're able to tell which dogs are adopted by instantiating `NearProvider` as "read-only" to fetch the state. (More on this in the [documentation for NEAR Web3 Provider](/docs/evm/near-web3-provider#instantiating-read-only).)

Clicking the **Login** button in the upper right hand corner will redirect to the NEAR Wallet (for betanet) and ask you to approve creating a function-call access key. Follow the directions, approving the creation of this key, and you'll be redirected back to the NEAR Pet Shop page. This time, however, you're logged in using a special private key which now lives in the browser's local storage. Using your browser's developer tools, you can see the key:

<img loading="lazy" src="/docs/assets/evm/dev-tools-improved.jpg" alt="Screenshot from the developer tools of a chrome browser showing the function-call access private key" width="2554" height="808" srcset="/docs/assets/evm/dev-tools-improved.jpg 2554w, /docs/assets/evm/dev-tools-improved-300x95.jpg 300w, /docs/assets/evm/dev-tools-improved-1024x324.jpg 1024w, /docs/assets/evm/dev-tools-improved-768x243.jpg 768w, /docs/assets/evm/dev-tools-improved-1536x486.jpg 1536w, /docs/assets/evm/dev-tools-improved-2048x648.jpg 2048w" sizes="(max-width: 2554px) 100vw, 2554px">

Access keys are beyond the scope of this article, but are [covered in the documentation](/docs/concepts/account#access-keys) and are a powerful feature of NEAR.

When the page reloaded after being redirected from NEAR Wallet, the `NearProvider` was instantiated with the betanet account as the `masterAccountId`, allowing the read/write of state using signed transactions. Once logged in, the "Adopt" buttons are enabled and the dogs open for adoption can be adopted.

The <a href="https://github.com/near-examples/near-pet-shop/blob/54beaf2fe8a8200d85a0b51f8df516f2eabe2573/src/js/app.js" target="_blank">`app.js` file</a> connects the web frontend to the contract in the NEAR EVM via NEAR Web3 Provider. It's a rather short file and worth a look. The calls to access and mutate state are the same as the code from the `evm-simple` example. The only code snippet we'll cover is the instantiation, as that differs from the previous example:

<a href="https://github.com/near-examples/near-pet-shop/blob/54beaf2fe8a8200d85a0b51f8df516f2eabe2573/src/js/app.js#L62-L75" target="_blank"><img loading="lazy" src="/docs/assets/evm/pet-shop-nearprovider-sma11er-1024x527.jpg" alt="Snippet from NEAR Pet Shop showing the instantiation of the NearProvider in read-only mode, also using browser's local storage as the key store" width="1024" height="527" srcset="/docs/assets/evm/pet-shop-nearprovider-sma11er-1024x527.jpg 1024w, /docs/assets/evm/pet-shop-nearprovider-sma11er-300x154.jpg 300w, /docs/assets/evm/pet-shop-nearprovider-sma11er-768x395.jpg 768w, /docs/assets/evm/pet-shop-nearprovider-sma11er.jpg 1071w" sizes="(max-width: 1024px) 100vw, 1024px"></a>

✋ **Quick note**: the code screenshot above links to GitHub projects at the latest commit when this was written.

Note the read-only and signed modes for NEAR Web3 Provider. This also highlights the key store type of `BrowserLocalStorageKeyStore`, which is how we ended up saving that key in local storage.

Compile and deploy the contract with the following command, replacing `you.betanet` with your betanet account:

    export NEAR_MASTER_ACCOUNT=you.betanet
    truffle migrate --network near_betanet

This section has covered using NEAR Web3 Provider on the frontend, using read-only and signed instantiations, and deploying the contract. Finally, for the most up-to-date instructions, please visit the <a href="https://github.com/near-examples/near-pet-shop" target="_blank">repository's README</a>.

