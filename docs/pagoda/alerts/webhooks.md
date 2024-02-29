---
sidebar_position: 2
sidebar_label: "Webhooks Example"
---

# Turn on the (Hue) lights with NEAR NFTs and Pagoda Alerts & Triggers

## Overview 

How cool would it be to have your lights turn on or your favorite song on spotify to play when someone bought your NFT on NEAR? 

With the Pagoda Console and IFTTT you can do both in minutes with zero code!

## What will we be doing? 

Using a combination of the [Pagoda Console](https://console.pagoda.co) and [IFTTT](https://ifttt.com) we will turn on our lights when a successful transaction has been processed. 

We will be using the webhook trigger to allow the pagoda console to call an endpoint on IFTTT which will then turn on our HUE Lights 


### What is IFTTT? 

IFTTT stands for "If This Then That". It's a platform (at ifttt.com) that provides a variety of services each with their own collection of applets within it that provide some unique functionality. 

<img width="60%" src="/img/alerts/webhook1.png" />


#### If This

It starts with the "If This" Trigger. For example time could be your trigger, so if it's 10pm you can write your own script to turn off your lights. Or something more random like, liking a song on spotify could add the music video to a youtube playlist. 

There are a lot of triggers on this service, but just to name some examples 

- Time
- Temperature 
- Webhooks (what we'll be using)


#### Then That 

Next comes the "Then That" action. An action is what happens when your trigger has been tripped. For example, turning out the lights at 10pm OR turning them on when you mint an NFT on NEAR. 


## Step 1: Getting the webhook address

We will be setting up a webhook trigger so after you make an account on ifttt.com You will see this page.... 

<img width="70%" src="/img/alerts/webhook2.png" />

Go to the **Services** Tab and search for "webhook"

<img width="20%" src="/img/alerts/webhook3.png" />

Click on the webhooks icon and then you'll be sent to this page...

<img width="50%" src="/img/alerts/webhook4.png" />

Click on the "Documentation Button". This should open up a new tab....

<img width="70%" src="/img/alerts/webhook5.png" />

Leave that page alone for now we'll come back to it. This is essentially where we get the webhook address we will call for our "IF". 

## Step 2: Setting up your Trigger 

Hit the **Create** Button on the upper right corner of the screen..

<img width="20%" src="/img/alerts/webhook6.png" />

Next click on the "If This" Button...

<img width="40%" src="/img/alerts/webhook7.png" />

Again search for **webhooks** ...

<img width="60%" src="/img/alerts/webhook8.png" />

Select the **Receive a Web Request** trigger...

<img width="30%" src="/img/alerts/webhook9.png" />

let's call this "**on_transaction**" then select create trigger 

<img width="50%" src="/img/alerts/webhook10.png" />

## Step 3: Select your Action 
You for this tutorial you will need to have:
- Hue Account
- Hue Lights

Next click on **Then That** ...

<img width="50%" src="/img/alerts/webhook11.png" />

Search for **Hue**

<img width="60%" src="/img/alerts/webhook12.png" />

Select Turn On Lights 

<img width="30%" src="/img/alerts/webhook13.png" />

Select the lights of your choosing but I will simply do all lights. 

If you haven't already create and connect your Hue Account

<img width="40%" src="/img/alerts/webhook14.png" />

After you do this simply hit **Create Action** Then you'll be redirected here... 

<img width="50%" src="/img/alerts/webhook15.png" />

As you can see you can add more than one trigger or action if you'd like. But for now we'll stick to the one. Hit **Continue**

## Step 4: Setting up your endpoint

Once you hit **Continue** you'll be redirected here...

<img width="40%" src="/img/alerts/webhook16.png" />

take note of the name "on_transaction" and copy it.. then hit the **Finish** button...

Next go back to the documentation tab we opened up earlier

Where it says "{event}" replace everything even the curly braces with "on_transaction"

<img width="90%" src="/img/alerts/webhook17.png" />

to 

<img width="90%" src="/img/alerts/webhook18.png" />

copy that entire line and head on over to console.pagoda.co 

## Step 5: Integrating Webhook into Pagoda Console

Once at console.pagoda.co, you should be greeted by the log-in page. Select the Non-funcable Token (NFT) project to start exploring the NFT contract

<img width="60%" src="/img/alerts/webhook19.png" />

Hit the "Deploy and Explore Contract" Button. This will create a dev account for you and deploy the pre written NFT smart contract onto that account for you. 


<img width="40%" src="/img/alerts/webhook20.png" />

Head to the <kbd>Alerts</kbd> section 

<img width="20%" src="/img/alerts/webhook21.png" />

And select <kbd>+ New Alert</kbd>

<img width="70%" src="/img/alerts/webhook22.png" />

You should see this page...


<img width="80%" src="/img/alerts/webhook23.png" />

Select the suggested contract which should be dev account that was created. 

<img width="80%" src="/img/alerts/webhook24.png" />

:::info
You can use any contract running on mainnet or testnet for an alert. We'll just use this NFT testnet example for this guide.  
:::

Under "Select Condition" hit "Successful Transaction". This means that for any successful transaction an alert will be sent. In this case for any successful method call the lights will turn on. If you want to, you can select "function call" for a specific method to be the trigger. 

But for now, we'll keep it easy and select any Successful Action. 


<img width="60%" src="/img/alerts/webhook25.png" />


We're almost done! Under destination select webhooks. Now that webhook we created earlier go ahead and copy and paste it into here. Then hit "Create"

:::tip
Don't forget to remove the `{}` around the name of your event! `ifttt.com/trigger/...`, not `ifftt.com/{trigger}/...`
:::

<img width="60%" src="/img/alerts/webhook26.png" />

Remember to hit the "+ Create Alert" button on this page... 

<img width="60%" src="/img/alerts/webhook27.png" />


Now head on over to the "Contracts" Section.

<img width="60%" src="/img/alerts/webhook28.png" />

Select the contract we just created and navigate to the "Interact" tab to connect your wallet. 

<img width="60%" src="/img/alerts/webhook29.png" />


Now here is the part we've all been waiting for... **Turn on the (hue) lights!** 

Select the `new_default_metadata` function (we are choosing this one because we have to initialize our contract, this is still a transaction which will trigger our new webhook). Fill in the `owner_id` field with your wallet account name and hit send transaction 

<img width="60%" src="/img/alerts/webhook30.png" />

## Wrapping up 

And that's it! You've just triggered something in the real world with an event that happened on the NEAR Blockchain. Hopefully this inspires you to create your own webhook using IFTTT and the Pagoda Console. 

We'd love to see what you create! Tag [@PagodaPlatform](https://twitter.com/PagodaPlatform) on Twitter with a novel implementation of a webhhook and trigger and we might retweet it. 

Happy hacking!
