---
id: setup
title: NEAR API REST Server
sidebar_label: Setup
---

> [NEAR REST API Server](https://github.com/near-examples/near-api-rest-server) is a project that allows you create your own simple REST API server that interacts with the NEAR blockchain.

---

## Requirements {#requirements}

- [NEAR Account](https://docs.near.org/docs/develop/basics/create-account) _(with access to private key or seed phrase)_
- [Node.js](https://nodejs.org/en/download/package-manager/)
- [npm](https://www.npmjs.com/get-npm) or [Yarn](https://yarnpkg.com/getting-started/install)
- API request tool such as [Postman](https://www.postman.com/downloads/)

---

## Setup {#setup}

1. Clone repository

```bash
git clone git@github.com:near-examples/near-api-server.git
```

2. Install dependencies

```bash
npm install
```

3. Configure `near-api-server.config.json`

Default settings:

```json
{
  "server_host": "localhost",
  "server_port": 3000,
  "rpc_node": "https://rpc.testnet.near.org",
  "allow_rpc_update": false
}
```

_**Note:** `allow_rpc_update` determines if this param can be changed via `/init` route._

4. Start server

```bash
node app
```

---

## Faker data {#faker-data}

> Use the following tags below to use random data for testing purposes.

- `{username}`
- `{number}`
- `{word}`
- `{words}`
- `{image}`
- `{color}`
