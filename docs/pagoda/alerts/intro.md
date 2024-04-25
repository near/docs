---
sidebar_position: 1
sidebar_label: "Introduction"
---

# Pagoda Alerts & Triggers

:::warning

Please be advised that these tools and services will be discontinued soon.

:::

## What are Alerts & Triggers?

Pagoda Alerts & Triggers are designed to notify, and automated responses to important events that occur on the NEAR blockchain. Behind the scenes, Alerts are powered by  many mini-indexers, “Alertexers”, that stream blockchain data in real-time, enabling developers to know what’s happening to their dApp before their users do.

Alerts are broken into three parts: 
1. The NEAR address the alert should listen to (account or contract)
2. The event condition (success & failed actions, account drains, and more)
3. The alert destination ([e-mail](setup.md#setting-up-e-mail-alerts), [Telegram](setup.md#setting-up-telegram-alerts), [webhooks](webhooks.md))

Alerts can be set-up to listen for the following five conditions: 
1. Successful Actions
2. Failed Actions
3. [Event Logged](https://nomicon.io/Standards/EventsFormat)
4. Function Called
5. Account Balance Change

## Setup

- [E-mail alerts](setup.md#setting-up-e-mail-alerts)
- [Telegram alerts](setup.md#setting-up-telegram-alerts)
- [Event Log Alerts](setup.md#setting-up-event-log-alerts)
- [Function Call Specific Alerts](setup.md#setting-up-function-call-specific-alerts)

## Using Webhooks with Alerts & Triggers

See an example on how to [set up alerts using webhooks](webhooks.md).
