---
id: basics
title: "Basic Instructions"
---

# Basic instructions
To compile release version of the smart contract you can run a build script (specified in `package.json` for your project as `{ build: near-sdk-js build, ... }`):

```bash
npm run build
```

:::info
The above `build` command seeks a `index.js` file in `/src` and outputs a `contract.wasm` file in a newly created `/build` folder at the same level as `/src`. For more information, see the [source code for the CLI commands here](https://github.com/near/near-sdk-js/blob/2a51b6c6233c935c7957b91818cfe6f9c3073d71/packages/near-sdk-js/src/cli/cli.ts?_pjax=%23js-repo-pjax-container%2C%20div%5Bitemtype%3D%22http%3A%2F%2Fschema.org%2FSoftwareSourceCode%22%5D%20main%2C%20%5Bdata-pjax-container%5D#L28-L36).
:::

<!-- TODO: custom build commands using CLI -->
