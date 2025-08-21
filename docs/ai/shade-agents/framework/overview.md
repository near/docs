---
id: overview
title: Framework Overview
sidebar_label: Framework Overview
description: "TODO"
---

The Shade Agent Framework provides a suite of tools to make it easy to develop and deploy Shade Agents without needing to thoroughly understand the complexities of the underlying infrastructure. In this section of docs we'll look closer at the tooling provided by the framework and the key components you need when building an agent.

## Languages, Templates and Architecture 

We recommend when starting to build with the Shade Agent Framework you start by forking the quickstart [Shade Agent Template](https://github.com/NearDeFi/shade-agent-template). This template has all the necessary files to build a Shade Agent (which we will go through later in this page). Since the agent is written in TypeScript, and uses `shade-agent-js`, it has great synergies with [chainsig.js](../../../chain-abstraction/chain-signatures/implementation.md) for building multichain transactions and deriving multichain accounts. We also maintain a [python example](https://github.com/NearDeFi/shade-python-example/tree/main) using `shade-agent-py` so you can develop agents in python, however we do not maintain tooling for building multichain transactions and deriving multichain accounts so additional work is required. Agents can actually be written in any language that you can build a docker image by using the API directly, you can see how to do this in the [API page](./api.md).

An Agent is just a backend service (or server) that uses the shade-agent-api and runs inside a TEE instead of on a centralized server. You can develop with whatever backend framework you like, expose API routes, run cron jobs or index events and respond to them with an action. If you're serious about developing Shade Agents we recommend that you are already familiar with creating backend services.

In our quickstart template we deploy everyone a generic agent contract under the hood that can be used to sign transactions on any blockchain. The generic agent contract is sufficient for many use cases, but in some production use cases you may want to develop your own agent contract so you can implement strict guard rails in your contract to stop malicious actions even if the TEE is somehow compromised. Custom agent contracts are very useful if you're developing just on NEAR. To learn more about when to use a custom agent contract and how to build them, please refer to our [custom contract section](../custom-contracts/overview.md). 

---

## Shade Agent API

The Shade Agent API abstracts away the complexity of the TEE and interacting with the agent contract. To learn more about how the API works and how to use it in different languages, please refer to our [API page](./api.md).

---

## Shade Agent CLI

The Shade Agent CLI abstracts away the complexity of deploying a Shade Agent. To learn more about how the CLI works and how to use it, please refer to [CLI page](./cli.md).

---

## Phala Cloud 

Phala Cloud is a cloud solution that makes it easy to host applications and agents inside Trusted Execution Environments. The Shade Agent Framework uses it for deploying agents. You can deploy any standard Docker application to Phala. To learn more about Phala you can visit there [documentation](https://docs.phala.network/phala-cloud/what-is/what-is-phala-cloud).

When your agent is deployed you can manage the deployment from the [dashboard](https://cloud.phala.network/dashboard).

---

## Docker

Docker is a platform that lets you package an application into a self contained environment. By creating a Docker image you can run your agent in the TEE. An agent is usually made up of two docker images (the application and the shade-agent-api) but can be made up of more. When building Shade Agents it can be useful to understand how docker works, if interested please visit Docker's [documentation](https://docs.docker.com/get-started/docker-overview/). 

There are two Docker related files we include in our project, the `Dockerfile` and the `Docker Compose` file. 

### Dockerfile 

The Dockerfile tells Docker how to build your image and run it. The Shade Agent CLI automatically builds your Docker image for you using the Dockerfile and pushes the image to Docker Hub so it is accessible over the internet.

A standard Dockerfile will:
1) Start with a `base image` which is the starting point for your application like Ubuntu, Alpine, whether you want node or python pre-installed, etc.
2) Set the working directory
3) Install system dependencies 
4) Add relevant files from the project to the image. In our examples everything within the `source folder` is included as well as the `manifest file` (the file that lists your dependencies like package.json or python.toml)
5) Install project dependencies 
6) Build the project
7) Set the environment (production, development)
7) Tell docker how to start the application

In most cases you can ignore the Dockerfile and use the one already supplied in the template.

Here are example Dockerfiles for a [Typescript](https://github.com/NearDeFi/shade-agent-template/blob/main/Dockerfile) and [Python](https://github.com/NearDeFi/shade-python-example/blob/main/Dockerfile) agent.

You can learn more about the Dockerfile [here](https://docs.docker.com/reference/dockerfile/)

### Docker Compose 

The Docker compose file (docker-compose.yaml) defines which docker images are going to be included within your agent. This is what is actually uploaded to Phala Cloud to run your agent which pulls the image's specified. The compose file also includes which environment variables are being passed to the image, which port the image is being expose on and more.

The images being used are automatically set when you run the Shade Agent CLI. In most cases you can ignore the Docker Compose file and use the one already supplied [in the template](https://github.com/NearDeFi/shade-agent-template/blob/main/docker-compose.yaml). If you want to include additional Docker images in your agent or use additional environment variables to your application then you will need to edit the Docker compose file.

You can learn more about the Docker compose file [here](https://docs.docker.com/reference/compose-file/)

---

## Environment Variables 