---
id: integrate
title: ⭐ Integrate to a React App 
---

import {WidgetEditor} from "@site/components/social-widget"

Near Components can be easily integrated into any React application. For this, you first need to add the `near-social-vm` package to your application.

```bash
npm i near-social-vm
```

Then, you can import the `Widget` component and use it to render any component.

```js
import { Widget } from "near-social-vm";

const App = () => {
  return (
    <div>
      <Widget src="gagdiez.near/widget/Greetings" />
    </div>
  );
};
```

:::warning
This section is a work in progress, we recommend you to instead follow our [quickstart](./quickstart.md) guide to get a general idea on how NEAR is integrated to that app.
:::

---

## Adding Interactions

In order for your users to interact with the component you will need to make them login with their NEAR wallet. For this, you will need the wallet selector.

Add the following dependencies to your application:

```json
    "@near-wallet-selector/core": "^8.5.1",
    "@near-wallet-selector/here-wallet": "^8.5.1",
    "@near-wallet-selector/modal-ui": "^8.5.1",
    "@near-wallet-selector/my-near-wallet": "^8.5.1",
```

Then, you will need to setup the wallet selector and the NEAR connection. To see how to do this, we recommend you look at our [app from `create-near-app`](../2.develop/integrate/quickstart).