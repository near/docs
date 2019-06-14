---
description: >-
  If you don't want to use the deployed TestNet and instead point your DAPP to a
  local node, learn how to do so here.
---

# Pointing to a Local Node

## Running a local node

To run NEAR locally you would need docker, see [installation instructions](https://www.docker.com/get-started).

Clone the nearcore repo from here: [https://github.com/nearprotocol/nearcore/](https://github.com/nearprotocol/nearcore/)

you can use:

```bash
git clone https://github.com/nearprotocol/nearcore.git
cd nearcore
```

Then run the following:

```bash
./ops/deploy_local.sh
```

After it starts you can open studio at [http://localhost](http://localhost).

To tear it down run:

```bash
./ops/teardown_local.sh
```

## Running remotely

Similarly you deploy the network to the GCloud. You'll need to setup GCloud [here](https://cloud.google.com/deployment-manager/docs/step-by-step-guide/installation-and-setup).

```bash
./ops/deploy_remote.sh
```

When the network is deployed it will print the address of the studio.

## Pointing your project to your local node

There are two ways to deploy a project to the node you've just set up using [`near-shell`](https://github.com/ckshei/nearprotocol_docs/tree/59f614d5a227ca76af9f894f10dadfd112f696fa/docs/quick-start/local-development/developing-locally.md). From the project directory, you can change the environment flag to `local` like this:

```bash
NODE_ENV=local near deploy
```

Alternatively, you can set the specific url that the node is running on like this:

```bash
near deploy --nodeUrl="http://localhost:3030"
```

If you change the NODE\_ENV variable, then all future times you run deploy will default to the settings for that environment. If you run the command with the `--nodeUrl` flag, it will only use that url the time you run it and continue using whatever you've got NODE\_ENV set to on future runs.

