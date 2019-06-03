# Installation Guide

### Running locally

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

### Running remotely

Similarly you deploy the network to the GCloud:

```bash
./ops/deploy_remote.sh
```

When the network is deployed it will print the address of the studio.

