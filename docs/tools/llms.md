---
id: using-llms
title: Improving your AI Coding Agents
sidebar_label: Improving AI Agents
description: "Using llms.txt to improve your workflow when using AI coding agents."
---

NEAR Docs hosts a [`llms.txt`](https://docs.near.org/llms.txt) file to provide information to help LLMs use the complete NEAR documentation at inference time.

While websites serve both human readers and LLMs, LLMs benefit from concise information gathered in a single, accessible location. This is critical for use cases like development environments, where LLMs need quick access to programming documentation and APIs.

:::info

If you want to learn more about the `llms.txt` standard, check [this website](https://llmstxt.org/).

:::

## Visual Studio Code

To use NEAR Documentation as reference when working with Copilot Chat, follow these steps.

1. Open the Copilot Chat sidebar on VS Code.
2. Ask your question, and use the `#fetch` keyword to add `https://docs.near.org/llms.txt` as reference.
   For example:
   ```
   How can I upgrade a contract state?
   #fetch https://docs.near.org/llms.txt
   ```

   ![VS Code](/assets/docs/tools/llm-vscode1.png)

3. Get your AI-generated answer, along with direct reference links from the NEAR documentation site.

   ![VS Code](/assets/docs/tools/llm-vscode2.png)

## Cursor

When using Cursor, you can add [NEAR Docs llms.txt](https://docs.near.org/llms.txt) as documentation reference following these steps, so it will be available when asking questions to the AI agent.

1. Open Cursor Chat window.
2. Click on `@`, select `Docs`, and `+ Add new doc`. On the text box, enter:
   ```
   https://docs.near.org/llms.txt
   ```

   ![VS Code](/assets/docs/tools/llm-cursor1.png)

2. You can now select `NEAR Protocol` as documentation reference when asking your questions.

   ![VS Code](/assets/docs/tools/llm-cursor2.png)

3. Get your AI-generated answer based on NEAR documentation.

   ![VS Code](/assets/docs/tools/llm-cursor3.png)
