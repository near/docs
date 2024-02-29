---
sidebar_position: 1
sidebar_label: "Setup"
---

# Setup Alerts & Triggers


## Setting up E-mail alerts

1. Navigate to [console.pagoda.co](https://console.pagoda.co) and log-in 

2. Navigate to the <kbd>Alerts</kbd> tab

   <img width="20%" src="/img/alerts/setup1.png" />

3. Select a target address for the alert to listen to
   <img width="60%" src="/img/alerts/setup2.png" />

4. Select one of the following conditions to listen for
   <img width="60%" src="/img/alerts/setup3.png" />

5. Select email as the destination to send alerts to and enter an email address to send the alert to
   <img width="60%" src="/img/alerts/setup4.png" />

6. This email address will need to be verified before it can be used as a valid alert destination. 
   <img width="60%" src="/img/alerts/setup5.png" />

7. Be sure that the email destination is toggled on as shown below and click "Create Alert" to finish setting up your email alert
   <img width="60%" src="/img/alerts/setup6.png" />

## Setting up Telegram alerts

Follow the steps above to begin setting-up telegram alerts. When selecting the destination select Telegram and follow these steps to authorize Alerts

<img width="60%" src="/img/alerts/setup7.png" />

### Private Message Alerts

1. On the device that is logged into the telegram aclick "Open Telegram" or scan the QR code. 

   <img width="60%" src="/img/alerts/setup8.png" />

2. by Telegram. Hit "Send Message" to continue 

   <img width="40%" src="/img/alerts/setup9.png" />

3. Once inside the chat, hit "Start" to begin receiving alerts at this destination 

   <img width="60%" src="/img/alerts/setup10.png" />

### Group message alerts 

For group chats, add `PagodaDevConsoleBot` and copy the message you see in your on-screen modal and send it in the chat that includes`PagodaDevConsoleBot` to authorize the group chat destination

<img width="70%" src="/img/alerts/setup11.png" />

## Setting up Event Log Alerts

You can listen to on-chain events occurring to contracts that follow NEPs standards like NEP-171 (NFTs), NEP-141 (fungible tokens), or NEP-145 (storage management). All NEAR NEPs can be found on the [Nomicon NEAR site](https://nomicon.io/Standards/). 

To set-up an alert for an event, for example `nft_transfer` from [NEP-171 version 1.1.0](https://nomicon.io/Standards/Tokens/NonFungibleToken/Core): 

1. Follow the steps above to begin setting up an alert.
2. Select the "Event Logged" condition,
3. Type the event name `nft_transfer`,
4. The standard `nep171`, and
5. Add the version `1.1.0` as seen below

<img width="80%" src="/img/alerts/setup12.png" />

> Note that input fields are case sensitive, and the standards field must be written in the format `nep123` not `NEP-123`

## Setting up Function Call Specific Alerts

More generally, Pagoda Console makes it easy to generate alerts based on specific function calls. Simply follow the steps above, select the "Function Called" condition, and type the method name **exactly** as it appears in the contract code or the contract's [ABI](https://github.com/near/abi)

<img width="80%" src="/img/alerts/setup13.png" />
