---
id: frontend  
title: Building a Frontend Interface
sidebar_label:  Build Frontend
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {Github} from '@site/src/components/codetabs';

Now let's build a web interface for users to interact with our donation contract. The frontend example uses Next.js with NEAR Wallet Selector to create a complete donation experience.

## Project Structure

The frontend directory contains a complete Next.js application:

<Github fname="package.json"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/package.json"
        start="6" end="18" />

## Configuration

Configure your contract address and network settings:

<Github fname="config.js"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/config.js"
        start="1" end="20" />

## Wallet Integration

The app supports multiple wallet types through NEAR Wallet Selector:

<Github fname="_app.js"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/pages/_app.js"
        start="6" end="27" />

Complete wallet configuration with all supported wallet types:

<Github fname="_app.js"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/pages/_app.js"
        start="28" end="42" />

## Donation Form Component

The donation form allows users to select preset amounts or enter custom donations:

<Github fname="DonationForm.jsx"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/components/DonationForm.jsx"
        start="47" end="73" />

The form includes USD-to-NEAR conversion using CoinGecko API:

<Github fname="DonationForm.jsx"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/components/DonationForm.jsx"
        start="14" end="22" />

## Handling Donation Transactions

The submit handler processes donations and updates the UI:

<Github fname="DonationForm.jsx"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/components/DonationForm.jsx"
        start="24" end="42" />

## Displaying Donation History

The donations table shows all contributions with pagination:

<Github fname="DonationsTable.jsx"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/components/DonationsTable.jsx"
        start="11" end="30" />

The component handles pagination and fetches donation data:

<Github fname="DonationsTable.jsx"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/components/DonationsTable.jsx"
        start="32" end="51" />

## User's Personal Donations

Track and display the current user's total donations:

<Github fname="MyDonation.jsx"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/components/MyDonation.jsx"
        start="18" end="35" />

## Navigation Component

Provide wallet connection functionality:

<Github fname="Navigation.jsx"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/components/Navigation.jsx"
        start="9" end="26" />

## Main Page Layout

The home page combines all components:

<Github fname="index.js"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/pages/index.js"
        start="4" end="21" />

## Donation Box Component

The donation box handles wallet connection states:

<Github fname="DonationBox.jsx"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/components/DonationBox.jsx"
        start="4" end="21" />

## Running the Frontend

Start the development server:

```bash
cd frontend
yarn install
yarn dev
```

Visit `http://localhost:3000` to see your donation interface.

## Key Frontend Features

**Multi-Wallet Support**: Supports NEAR native wallets and Ethereum wallets through Chain Abstraction.

**Real-time Price Conversion**: Converts USD amounts to NEAR using live price feeds.

**Transaction Handling**: Graceful error handling and transaction state management.

**Responsive Design**: Mobile-friendly interface using Bootstrap.

**Pagination**: Efficient handling of large donation lists.

## Production Deployment

The frontend is configured for GitHub Pages deployment:

<Github fname="next.config.js"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/next.config.js"
        start="1" end="11" />

Deploy with GitHub Actions:

<Github fname="nextjs.yml"
        url="https://github.com/near-examples/donation-examples/blob/main/.github/workflows/nextjs.yml"
        start="30" end="45" />

## Styling

The application uses Bootstrap for consistent styling:

<Github fname="globals.css"
        url="https://github.com/near-examples/donation-examples/blob/main/frontend/src/styles/globals.css"
        start="1" end="2" />

## Testing the Interface

Test the complete user flow:

1. **Wallet Connection**: Try different wallet types from the selector
2. **Donation Flow**: Test preset amounts and custom donations
3. **Price Conversion**: Verify USD-to-NEAR conversion accuracy
4. **Transaction States**: Test loading, success, and error states
5. **Data Updates**: Confirm donation tables update after transactions
6. **Mobile Experience**: Test responsive design on various devices

## Live Demo

The frontend is deployed and available at:
- **Live Demo**: https://near-examples.github.io/donation-examples/
- **Contract**: `donation.near-examples.testnet`

## Next Steps

With your complete donation application, you can extend it with:

- **Donation Goals**: Set funding targets and progress tracking
- **Donor Recognition**: Leaderboards and achievement systems  
- **Recurring Donations**: Subscription-based giving
- **Multi-Currency**: Support for NEAR fungible tokens
- **Analytics Dashboard**: Detailed donation metrics and insights
- **Mobile App**: React Native version for mobile users

This donation pattern serves as a foundation for crowdfunding platforms, tip jars, charity applications, and many other token-handling use cases on NEAR.