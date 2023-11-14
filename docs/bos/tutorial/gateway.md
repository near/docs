---
id: bos-gateway
title: Gateways
---

The [`Components`](../components.md) you create are stored in the NEAR blockchain. To read and execute their code you will need a `Gateway`.

A `Gateway` is nothing but a [Next.js](https://nextjs.org/) application with the added ability of retrieving components from the blockchain and rendering their code.

This allow you to create the frontend of your application combining classic `Next` components with `Web3` components that interact with your desired blockchain.


---

## Building a Gateway

Building your own `Gateway` is as simple as cloning the [example repository](https://github.com/near-examples/bos-gateway), and running it:

```bash
# Clone gateway
git clone git@github.com:near-examples/bos-gateway.git

# Install dependencies
cd bos-gateway
npm install

# Run the gateway
npm run dev
```

:::tip Configure the Gateway
Make sure to change the `src/data/bos-components.ts` file
:::

---

## Deploying Gateway in Vercel

Launching your own NEAR BOS gateway instance is a quick and simple process. In this example we'll be using [Vercel](https://vercel.com) to build and deploy a new BOS gateway, but you can also use other platforms.

Just follow these easy steps:

1. Clone the [`near/bos-gateway`](https://github.com/near-examples/bos-gateway) repository
2. Sign up on [Vercel](https://vercel.com/) and import the cloned repository
3. Setup the project:
   - Any team name
   - Build command: `npm run build`
   - Output directory: `dist`
4. Press <kbd>Deploy</kbd>

:::tip

Click [on this link](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnear%2Fnear-discovery-alpha&amp;build-command=npm%20run%20build&amp;install-command=npm%20install&amp;output-directory=dist) to try it out.

:::

![vercel setup](/docs/vercel-gateway.png)

Now just wait a few minutes for Vercel to build the website and enjoy your BOS gateway!

:::info Customization
- If you want to host the gateway on a specific domain you can configure it on Vercel.

- If you want to change the home page component, modify `src/data/widgets.js` in your fork to point at different components.
:::
