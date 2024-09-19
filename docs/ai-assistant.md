---
id: ai-assistant
title: AI Assistant
---

Welcome! In this guide, you'll discover an AI project built on Near in the form of a chatbot to discover and interact with the Near ecosystem 🚀

A few key features of this AI agent:
- Answer general questions about Near architecture (powered by realtime search results)
- Call some Near-related APIs, like the testnet faucet to send tokens to a user that requests it
- Mint and send a special NFT though a wallet it controls to a user
- Understand and summarize what happened in a given transaction hash

While this is still a Proof of Concept made during the [ETHGlobal Brussels 2024 hackathon](https://ethglobal.com/events/brussels), this quick tutorial will guide you to run the project locally and discover an example of an AI project built around Near!

---

## Prerequisites

Before starting, make sure you have the following tools installed:

- [Python >= 3.10](https://www.python.org/downloads/)
- [NodeJS >= 20](https://nodejs.org/en)

Then we need to run our AI model locally.
Here we'll be using [llama.cpp](https://github.com/ggerganov/llama.cpp) with [Nous Hermes 2 Pro](https://huggingface.co/NousResearch/Hermes-2-Pro-Llama-3-8B) as the model.

Below are the steps to setup it at the time of writing, but please refer to the [llama.cpp](https://github.com/ggerganov/llama.cpp) repository for up to date instructions:

- Install llama.cpp with [the method of your choice]( https://github.com/ggerganov/llama.cpp?tab=readme-ov-file#basic-usage), we'll use brew here:
```sh
brew install llama.cpp
```
- Clone the [model's repository](https://huggingface.co/NousResearch/Hermes-2-Pro-Llama-3-8B/tree/main) by following the instructions on Hugging Face:
```sh
# Make sure you have git-lfs installed (https://git-lfs.com)
git lfs install
git clone git@hf.co:NousResearch/Hermes-2-Pro-Llama-3-8B
```

- Back to llama.cpp, if you didn't already to it clone the repository and generate the [GGUF](https://huggingface.co/docs/hub/en/gguf) file needed to run the model with llama.cpp:
```sh
git clone git@github.com:ggerganov/llama.cpp.git
cd llama.cpp

# Setup the environment and run the conversion script
python -m venv venv
python -m pip install -r requirements.txt
python convert_hf_to_gguf.py <path_to>/Hermes-2-Pro-Llama-3-8B/
```

- You should end up with a `hermes-2-pro-llama-3-8B-DPO-F16.gguf` file inside the `Hermes-2-Pro-Llama-3-8B` repository. Finally, let's run the llama.cpp server with it:
```sh
llama-server -m <path_to>/hermes-2-pro-llama-3-8B-DPO-F16.gguf
```

Open your browser at http://localhost:8080, if you see an interface similar to this one you are ready to go 🚀
![llama.cpp UI](@site/static/docs/assets/llama-cpp.png)

:::info
Make sure the `model.api_url` in `ai/config/general` is set to http://localhost:8080/completion to use your model running locally 😉
:::

:::tip
You can use a different model with llama.cpp if you wish!
Just make sure:
- It supports [Function calling](https://docs.mistral.ai/capabilities/function_calling)
- Update the `model.max_prompt_tokens` config according to the context length of the new model
- Update the ChatML config variables to match those of the new model
:::

---

## Setup and architecture

Start by cloning the repository of the project:

```sh
git clone git@github.com:RezaRahemtola/near-ai-assistant.git
```

You'll find 2 folders in it, `ai` and `front`.

### AI

Let's start by configuring a virtual environment to install the dependencies:

```sh
cd ai/
python -m venv venv
python -m pip install poetry
poetry install
```

Then you can create a `.env` file and fill it with values inspired from the `.env.example` file:
- `OXYLABS_USERNAME` and `OXYLABS_PASSWORD` are API credential used to access an SERP API to search information on Google
- `NEAR_ACCOUNT_ID` and `NEAR_ACCOUNT_PRIVATE_KEY` are used by the AI to control a wallet and send transactions from it
- `NEAR_RPC_URL` can also be set in case you want to use a different RPC

Once you've done all this, you can activate your virtual environment and launch the code 🚀

```sh
source venv/bin/activate
python src/main.py
```

### Frontend

Now that your AI agent is ready to go, let's quickly launch a basic frontend to interact with it:

Install the dependencies:
```sh
cd front/
yarn
```

And launch it:
```sh
yarn dev
```

## Usage

You can now head to [http://localhost:5173](http://localhost:5173), where you'll find an interface like this one to interact with the AI:
![img](@site/static/docs/assets/ai-assistant.png)

Here are a few example questions you can ask it:
- What is Near?
- What are the different transaction actions on Near?
- Can I please have an ETHGlobal Brussels NFT sent to me at random.testnet? Thanks
- I want to start using Near, can you send me some tokens on my testnet address random.testnet?
- I don't understand what this transaction is doing, can you help me? The transaction hash is `hash` and it was send by someone.testnet.

---

## Moving Forward

That's it for the quickstart tutorial. You have now seen an open-source AI agent interacting with Near and controlling a wallet to make transactions.

To better understand how it works, check the [`agent.py` file](https://github.com/RezaRahemtola/near-ai-assistant/blob/main/ai/src/agent/agent.py) and the [Function Calling explanation on HuggingFace](https://huggingface.co/NousResearch/Hermes-2-Pro-Llama-3-8B#prompt-format-for-function-calling).

A lot of things could be built by leveraging this PoC, some ideas could be:
- A chatbot integrated to the explorer to summarize transactions directly in the page
- Interactive tutorials in the documentation through a chatbot
  - "How to create an NFT?"
  - Multiple chats with explanations and code to complete given by the AI
  - In the end, the AI publish the smart contract, mint an NFT and send it to you on testnet
- An AI trader reacting to on-chain or off-chain events to buy/sell some tokens with its wallet
- The only limit is your imagination!

Happy coding! 🚀
