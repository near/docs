# Hackathon Startup Guide \(10 min\)

### Introduction to NEAR

First thing you need to do is go over some of [The Basics](../the_basics/). You don't need to become an expert, just get acquainted at this point.

Then head over to the [Beginner Quickstart](../quick_start/easy.md). That will get you actually exploring the code.

I recommend getting familiar with how to actually write code in a smart contract in studio, and hitting the `run` button. That will give you a good foundation for local development. 

For the start of the hackathon, it's fine to do development in the studio, but eventually you're going to want to set up a Github repo and share code with your team. That will be easier to do with a local setup. 

This is the quick and dirty way to do that:

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

