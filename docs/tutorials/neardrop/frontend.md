---
id: frontend
title: Frontend Integration
sidebar_label: Frontend Integration
description: "Build a React app that makes creating and claiming drops as easy as a few clicks."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Github} from "@site/src/components/codetabs"

Time to build a user-friendly interface! Let's create a React app that makes your NEAR Drop system accessible to everyone.

---

## Quick Setup

```bash
npx create-next-app@latest near-drop-frontend
cd near-drop-frontend

# Install NEAR dependencies
npm install near-api-js @near-wallet-selector/core @near-wallet-selector/my-near-wallet
npm install @near-wallet-selector/modal-ui qrcode react-qr-code
```

Create `.env.local`:
```bash
NEXT_PUBLIC_NETWORK_ID=testnet
NEXT_PUBLIC_CONTRACT_ID=your-drop-contract.testnet
NEXT_PUBLIC_RPC_URL=https://rpc.testnet.near.org
```

---

## NEAR Connection Service

Create `src/utils/near.js`:

<Github fname="near.js" language="javascript" 
        url="https://github.com/Festivemena/Drop/blob/main/src/services/near.js"
        start="1" end="50" />

---

## Key Generation Utility

Create `src/utils/crypto.js`:

<Github fname="crypto.js" language="javascript" 
        url="https://github.com/Festivemena/Drop/blob/main/src/utils/crypto.js"
        start="1" end="25" />

---

## Drop Creation Component

Create `src/components/CreateDrop.js`:

<Github fname="CreateDrop.js" language="javascript" 
        url="https://github.com/Festivemena/Drop/blob/main/src/components/CreateDrop.js"
        start="1" end="120" />

---

## Drop Results Component

Create `src/components/DropResults.js`:

<Github fname="DropResults.js" language="javascript" 
        url="https://github.com/Festivemena/Drop/blob/main/src/components/DropResults.js"
        start="1" end="150" />

---

## Claiming Component

Create `src/components/ClaimDrop.js`:

<Github fname="ClaimDrop.js" language="javascript" 
        url="https://github.com/Festivemena/Drop/blob/main/src/components/ClaimDrop.js"
        start="1" end="180" />

---

## Main App Layout

Create `src/pages/index.js`:

<Github fname="index.js" language="javascript" 
        url="https://github.com/Festivemena/Drop/blob/main/src/pages/index.js"
        start="1" end="80" />

---

## QR Code Generation

Add QR code generation for easy sharing:

<Github fname="QRGenerator.js" language="javascript" 
        url="https://github.com/Festivemena/Drop/blob/main/src/components/QRGenerator.js"
        start="1" end="50" />

---

## Mobile-First Design

Ensure your CSS is mobile-responsive:

<Github fname="globals.css" language="css" 
        url="https://github.com/Festivemena/Drop/blob/main/src/styles/globals.css"
        start="1" end="100" />

---

## Deploy Your Frontend

```bash
# Build for production
npm run build

# Deploy to Vercel
npm i -g vercel
vercel --prod

# Or deploy to Netlify
# Just connect your GitHub repo and it'll auto-deploy
```

Add environment variables in your deployment platform:
- `NEXT_PUBLIC_NETWORK_ID=testnet`
- `NEXT_PUBLIC_CONTRACT_ID=your-contract.testnet`
- `NEXT_PUBLIC_RPC_URL=https://rpc.testnet.near.org`

---

## Advanced Features

### Batch Key Generation

For large drops, add batch processing:

<Github fname="BatchGenerator.js" language="javascript" 
        url="https://github.com/Festivemena/Drop/blob/main/src/components/BatchGenerator.js"
        start="1" end="80" />

### Drop Analytics

Track drop performance:

<Github fname="Analytics.js" language="javascript" 
        url="https://github.com/Festivemena/Drop/blob/main/src/components/Analytics.js"
        start="1" end="60" />

---

## What You've Built

Awesome! You now have a complete web application with:

✅ **Wallet integration** for NEAR accounts
✅ **Drop creation interface** with cost calculation  
✅ **Key generation and distribution** tools
✅ **QR code support** for easy sharing
✅ **Claiming interface** for both new and existing users
✅ **Mobile-responsive design** that works everywhere
✅ **Batch processing** for large drops
✅ **Analytics dashboard** for tracking performance

Your users can now create and claim token drops with just a few clicks - no technical knowledge required!

---

## Testing Your Frontend

1. **Local Development**:
   ```bash
   npm run dev
   ```

2. **Connect Wallet**: Test wallet connection with testnet
3. **Create Small Drop**: Try creating a 1-key NEAR drop
4. **Test Claiming**: Use the generated private key to claim
5. **Mobile Testing**: Verify responsive design on mobile devices

---

## Production Considerations

**Security**:
- Never log private keys in production
- Validate all user inputs
- Use HTTPS for all requests

**Performance**:
- Implement proper loading states
- Cache contract calls where possible
- Optimize images and assets

**User Experience**:
- Add helpful error messages
- Provide clear instructions
- Support keyboard navigation

---

## Next Steps

Your NEAR Drop system is complete! Consider adding:

- **Social sharing** for claim links
- **Email notifications** for drop creators
- **Advanced analytics** with charts
- **Multi-language support**
- **Custom themes** and branding

---

:::tip User Experience
The frontend makes your powerful token distribution system accessible to everyone. Non-technical users can now create airdrops as easily as sending an email!
:::
