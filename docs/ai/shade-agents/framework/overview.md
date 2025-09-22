---
id: overview
title: Framework Overview
sidebar_label: Framework Overview
description: "Learn about the core components of the Shade Agent Framework with a high-level overview of each of its parts."
---

import { SigsSupport } from '@site/src/components/sigsSupport';

The Shade Agent Framework provides a suite of tools designed to simplify the development and deployment of Shade Agents. The framework abstracts away the complexities of the underlying infrastructure, allowing developers to focus on building their agent logic. In this section, we'll explore the tooling provided by the framework and examine the key components you need when building an agent.

---

## Templates, Languages, and Architecture 

### Templates

When starting to build with the Shade Agent Framework, we recommend forking the [Quickstart Shade Agent Template](https://github.com/NearDeFi/shade-agent-template). This template contains all the necessary files to build a Shade Agent and provides the fastest starting path.

Additional templates can be found in our [Examples and Templates](../examples/overview.md) section.

### Supported Languages

**TypeScript/JavaScript (Recommended)**
Agents are primarily written in TypeScript/JavaScript using `shade-agent-js`, which integrates seamlessly with [chainsig.js](../../../chain-abstraction/chain-signatures/implementation.md) for building multichain transactions and deriving multichain accounts.

**Python**
We also maintain `shade-agent-py`, which allows you to develop agents in Python. Here is an [example](https://github.com/NearDeFi/shade-python-example/tree/main). However, note that we don't currently maintain tooling for building multichain transactions and deriving multichain accounts in Python, so additional development work will be required.

**Other Languages**
Agents can be written in any language, provided you can create a Docker image for the agent. To build a Shade Agent in other languages you can use the API directly. Learn more about this approach on the [API page](./api.md).

### Architecture Overview

A Shade Agent is essentially a `backend service` that uses the Shade Agent API and runs inside a Trusted Execution Environment (TEE) instead of on a centralized server. You can develop using any backend framework you prefer, expose API routes, run cron jobs, or index events and respond to them with actions. 

---

## Shade Agent API

The Shade Agent API abstracts away the complexity of TEE operations and agent contract interactions. For detailed information on how the API works and how to use it across different languages, please refer to the [API page](./api.md).

---

## Shade Agent CLI

The Shade Agent CLI makes it simplifies deploying a Shade Agent. To learn more about how the CLI works and how to use it, please refer to the [CLI page](./cli.md).

---

## Environment Variables

Environment variables are a crucial component of the Shade Agent Framework. They configure your Shade Agent and are passed encrypted into your agent when it goes live. To learn more about configuring environment variables in your project, please refer to the [Environment Variables page](./environment-variables.md).

---

## Agent Contract

By default, the Shade Agent CLI will deploy a generic agent contract that implements the three core functions, `approve_codehash`, `register_agent`, and `request_signature`, discussed in the introduction. This generic agent contract works for many use cases since you can register any arbitrary agent and have it request signatures for any chain - it's very flexible. 

There are also cases when you should develop your own `custom agent contract`. These include, but are not limited to:
1) You want to implement strict `guard rails` that prevent malicious actions, even if the TEE is somehow compromised
2) You want to implement a custom agent registration or code hash upgradability mechanism
3) You want to build an agent that just interacts with the NEAR blockchain

Further documentation can be found in the [custom contract section](../custom-agent-contract.md).

---

## Phala Cloud

Phala Cloud is a cloud solution that simplifies hosting applications and agents inside Trusted Execution Environments. The Shade Agent Framework uses Phala Cloud for agent deployment. You can deploy any standard Docker application to Phala. To learn more about Phala, visit their [documentation](https://docs.phala.network/phala-cloud/what-is/what-is-phala-cloud).

Once your agent is deployed, you can manage the deployment from the [dashboard](https://cloud.phala.network/dashboard).

To deploy an agent to production, you'll need a Phala Cloud account. You can create one [here](https://cloud.phala.network/register). 

After deploying to Phala Cloud, monitor your deployments and delete unused ones to avoid unnecessary costs.

---

## Docker

Docker is a platform that allows you to package an application into a self-contained environment. By creating a Docker image, you can run your agent in the TEE. An agent typically consists of two Docker images (the application and the Shade Agent API), but it can include more. When building Shade Agents, it's helpful to understand how Docker works. If you're interested in learning more about Docker, please visit the [documentation](https://docs.docker.com/get-started/docker-overview/). 

You'll need to set up Docker on your machine if you do not have it already, and create an account:
- Install Docker for [Mac](https://docs.docker.com/desktop/setup/install/mac-install/) or [Linux](https://docs.docker.com/desktop/setup/install/linux/) and create an account.
- Log in to Docker, using `docker login` for Mac or `sudo docker login` for Linux.

There are two Docker-related files included in our project: the `Dockerfile` and the `Docker Compose` file. 

### Dockerfile

The Dockerfile tells Docker how to build and run your image. The Shade Agent CLI automatically builds your Docker image using the Dockerfile and pushes it to Docker Hub, making it accessible over the internet.

A standard Dockerfile will:
1. Start with a `base image`, which serves as the starting point for your application (e.g., Ubuntu, Alpine, Node.js, Python pre-installed)
2. Set the working directory
3. Install system dependencies
4. Add relevant files from the project to the image (in our examples, everything within the `source folder` is included, along with the `manifest file` that lists your dependencies like the package.json or pyproject.toml)
5. Install project dependencies
6. Build the project
7. Set the environment (production, development)
8. Tell Docker how to start the application

In most cases, you can use the Dockerfile already supplied in the template without modification.

Here are example Dockerfiles for a [Typescript](https://github.com/NearDeFi/shade-agent-template/blob/main/Dockerfile) and [Python](https://github.com/NearDeFi/shade-python-example/blob/main/Dockerfile) agent.

You can learn more about the Dockerfile [here](https://docs.docker.com/reference/dockerfile/)

### Docker Compose

The Docker Compose file (docker-compose.yaml) defines which Docker images will be included within your agent. This file is what is actually uploaded to Phala Cloud to run your agent, which pulls the specified images on boot. The compose file also specifies which environment variables are passed to the images, whether images are exposed on ports, and other configuration details.

The images used are automatically configured when you run the Shade Agent CLI. In most cases, you can use the Docker Compose file already supplied [in the template](https://github.com/NearDeFi/shade-agent-template/blob/main/docker-compose.yaml). However, if you want to include additional Docker images in your agent or use additional environment variables for your application, you'll need to edit the Docker Compose file.

You can learn more about the Docker Compose file [here](https://docs.docker.com/reference/compose-file/)

---

## Next Steps

Now that you have an overview of the framework, we recommend exploring these sections next:
1. Framework components: [API](./api.md), [CLI](./cli.md), and [Environment Variables](./environment-variables.md)
2. [Custom Contracts](../custom-agent-contract.md) - build specialized agent contracts
3. [Plugins](../plugins.md) - extend your agent's capabilities
4. [Templates and Examples](../examples/overview.md) - get up and running with different Shade Agent architectures and use cases as quickly as possible and learn the how to build apps in full
4. [Security Considerations](../security.md) - check your agent abides by best practices


<SigsSupport />