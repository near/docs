---
id: frontend-components
title: Integrating Components
---
import {CodeTabs, Language, Github} from "@site/src/components/codetabs"
import {WidgetEditor} from "@site/src/components/widget-editor"
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To integrate [Components](../../bos/tutorial/quickstart.md) to your frontend, you will leverage two tools:
1. `Wallet Selector`: Enables the user to select their preferred NEAR wallet in your dApp.
2. `NEAR VM`: A package that can retrieve the component's code from the blockchain and execute it in the browser. 

<br/>

Using those tools you will implement the following flow:
1. **Setup** the VM.
2. Render components using the `Widget` component in the VM.
3. **Setup** a wallet selector so users can interact with the Menu.

---

## Adding the VM & Wallet Selector
To use the `VM` and the `wallet-selector`, you must add them to your project first.

The wallet selector has multiple wallet packages to select from. [Check their website](https://github.com/near/wallet-selector#installation-and-usage) for more information.

```bash
npm install \
  @near-wallet-selector/core \
  @near-wallet-selector/my-near-wallet \
  @near-wallet-selector/modal-ui
```

Then, manually add the `VM` to your `package.json`:

```js
"dependencies": {
  ...
  "near-social-vm": "github:NearSocial/VM#2.5.5"
  ...
}
```

:::tip
Check the latest released version for the VM [here](https://github.com/NearSocial/VM/releases)
:::

---

## Setup the VM
To render components, you need to import the `useInitNear` hook from the `near-social-vm` package, as well as the `Widget` component.

```js
import { useInitNear, Widget } from 'near-social-vm';
import { useEffect } from 'react';

export default function Component({ src }) {
  const { initNear } = useInitNear();

  useEffect(() => {
    initNear && initNear({ networkId: 'testnet', selector: null });
  }, [initNear]);

  return <Widget src={src} />;
}

return <Component src="influencer.testnet/widget/Greeter" props={{name: "Anna", amount: 2}} />
```

:::tip
Notice that the VM is inherently linked to `React`, so you will need to use a reactive framework to take full advantage of the VM.
:::

---

## Setup the Wallet Selector
While the VM allows you to render components, you need to set up a wallet selector to allow users to interact with the components.

To instantiate a `Wallet Selector`, simply import all the wallets you want your users to have access to, and the setup method from the `near-wallet-selector` package.

```js
import '@near-wallet-selector/modal-ui/styles.css';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';

const selector = setupWalletSelector({
  network: 'testnet,
  modules: [setupMyNearWallet()],
});
```

Then use it during the call to `initNear`:

```js
  useEffect(() => {
    initNear && initNear({ networkId: 'testnet', selector: selector });
  }, [initNear]);
```

:::tip
To learn more about the wallet selector and how it can be used, please see the [integrating NEAR to your WebApp tutorial](./frontend.md)
:::