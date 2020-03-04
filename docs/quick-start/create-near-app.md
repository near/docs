---
id: create-near-app
title: create-near-app
sidebar_label: create-near-app
---

Setup a NEAR Protocol web app template using one command, `npx create-near-app`.

4 steps to success:

```text
npx create-near-app <your-awesome-project>
cd <your-awesome-project>
yarn
yarn dev
```

That's it!

Available via `npm`, `npx` and here: https://github.com/nearprotocol/create-near-app

## Web app architectures

`create-near-app` currently supports several application architectures depending on whether you want to write smart contracts in Rust or AssemblyScript (not recommended for financial applications)

|                |    Rust     |  AssemblyScript |
|---------------:|:-----------:|:---------------:|
| **Vanilla JS** |     Yes     |       Yes       |
| **React**      |     Yes     |       Yes       |
| **others?**    |      **     |       **        |


***We're always open to new contributions!  Check out the [contributor page](https://docs.nearprotocol.com/docs/contribution/technical-contribution).*

![create-near-app variants](/docs/assets/create-near-app--output-variants.png)

### Rust and Vanilla JS

Build a web application with a Rust contract and vanilla JS (no web framework)

```bash
npx create-near-app my-near-project --rust --vanilla
```

### Rust and React

*This configuration is currently not supported*

### AssemblyScript and Vanilla JS

Build a web application with an AssemblyScript contract and vanilla JS (no web framework)

```bash
npx create-near-app my-near-project --vanilla
```

### AssemblyScript and React

Build a web application with an AssemblyScript contract and React 

```bash
npx create-near-app my-near-project
```

## Development

No matter which architecture you choose to use, `create-near-app` includes several convenience scripts in `package.json` to help speed up your workflow:

```json
{
  "scripts": {

    "dev": "nodemon --watch assembly -e ts --exec 'npm run start'",
    
    "test": "npm run build:contract && jest test --env=near-shell/test_environment --runInBand",

    "start": "CONTRACT_NAME=$(cat neardev/dev-account) parcel src/index.html",
    "prestart": "npm run build:contract && npm run dev:deploy:contract",
    
    "build": "npm run build:contract && npm run build:web",
    "build:web": "parcel build src/index.html --public-url ./",
    "build:contract": "mkdir -p out/ && gulp",
    
    "deploy": "npm run build && npm run deploy:contract && npm run deploy:pages",
    "deploy:pages": "gh-pages -d dist/",
    "deploy:contract": "near deploy",
    "dev:deploy:contract": "near dev-deploy"
  },
}
```

## Feedback

Feel free to:

- submit an issue or pull request on the [create-near-app repo](https://github.com/nearprotocol/create-near-app)
- edit this page directly with improvements, tips and tricks
- find us on [Discord](http://near.chat/)
