---
id: frontend
title: Frontend Integration
sidebar_label: Frontend Integration
description: "Build a React app that makes creating and claiming drops as easy as a few clicks."
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
<Tabs groupId="code-tabs">
  <TabItem value="js" label="🌐 JavaScript">
   <TabItem value="rust" label="🦀 Rust">
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

Create `src/services/near.js`:
  <TabItem value="js" label="🌐 JavaScript">
```javascript
import { connect, keyStores } from 'near-api-js';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';

const config = {
  networkId: process.env.NEXT_PUBLIC_NETWORK_ID,
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
  contractName: process.env.NEXT_PUBLIC_CONTRACT_ID,
};

class NearService {
  async initialize() {
    this.near = await connect(config);
    this.walletSelector = await setupWalletSelector({
      network: config.networkId,
      modules: [setupMyNearWallet()],
    });
  }

  isSignedIn() {
    return this.walletSelector?.isSignedIn() || false;
  }

  async signIn() {
    const modal = setupModal(this.walletSelector);
    modal.show();
  }

  async getContract() {
    if (!this.isSignedIn()) return null;
    
    const wallet = await this.walletSelector.wallet();
    return new Contract(
      wallet.account(),
      config.contractName,
      {
        viewMethods: ['get_drop', 'estimate_near_drop_cost'],
        changeMethods: ['create_near_drop', 'claim_for', 'create_account_and_claim'],
      }
    );
  }
}

export const nearService = new NearService();
```
</TabItem>

---

## Key Generation Utility

Create `src/utils/crypto.js`:

  <TabItem value="js" label="🌐 JavaScript">
```javascript
import { KeyPair } from 'near-api-js';

export function generateKeys(count) {
  const keys = [];
  
  for (let i = 0; i < count; i++) {
    const keyPair = KeyPair.fromRandom('ed25519');
    keys.push({
      publicKey: keyPair.publicKey.toString(),
      privateKey: keyPair.secretKey,
    });
  }
  
  return keys;
}

export function generateClaimUrl(privateKey) {
  return `${window.location.origin}/claim?key=${encodeURIComponent(privateKey)}`;
}
```
</TabItem>

---

## Drop Creation Component

Create `src/components/CreateDrop.js`:

  <TabItem value="js" label="🌐 JavaScript">
```jsx
import { useState } from 'react';
import { nearService } from '../services/near';
import { generateKeys } from '../utils/crypto';

export default function CreateDrop({ onDropCreated }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    dropType: 'near',
    amount: '1',
    keyCount: 5,
    ftContract: '',
    ftAmount: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const contract = await nearService.getContract();
      const keys = generateKeys(formData.keyCount);
      const publicKeys = keys.map(k => k.publicKey);

      let dropId;
      
      if (formData.dropType === 'near') {
        // Calculate cost first
        const cost = await contract.estimate_near_drop_cost({
          num_keys: formData.keyCount,
          amount_per_drop: (parseFloat(formData.amount) * 1e24).toString(),
        });

        dropId = await contract.create_near_drop({
          public_keys: publicKeys,
          amount_per_drop: (parseFloat(formData.amount) * 1e24).toString(),
        }, {
          gas: '100000000000000',
          attachedDeposit: cost,
        });
      }
      // Add FT and NFT cases here...

      onDropCreated({ dropId, keys, dropType: formData.dropType });
    } catch (error) {
      alert('Failed to create drop: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Create Token Drop</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Drop Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Drop Type</label>
          <select 
            value={formData.dropType}
            onChange={(e) => setFormData({...formData, dropType: e.target.value})}
            className="w-full border rounded px-3 py-2"
          >
            <option value="near">NEAR Tokens</option>
            <option value="ft">Fungible Tokens</option>
            <option value="nft">NFT</option>
          </select>
        </div>

        {/* NEAR Amount */}
        {formData.dropType === 'near' && (
          <div>
            <label className="block text-sm font-medium mb-1">NEAR per Drop</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        )}

        {/* Key Count */}
        <div>
          <label className="block text-sm font-medium mb-1">Number of Keys</label>
          <input
            type="number"
            min="1"
            max="100"
            value={formData.keyCount}
            onChange={(e) => setFormData({...formData, keyCount: parseInt(e.target.value)})}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Drop'}
        </button>
      </form>
    </div>
  );
}
```
</TabItem>

---

## Drop Results Component

Create `src/components/DropResults.js`:
  <TabItem value="js" label="🌐 JavaScript">
```jsx
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { generateClaimUrl } from '../utils/crypto';

export default function DropResults({ dropInfo }) {
  const [selectedKey, setSelectedKey] = useState(0);
  
  const claimUrls = dropInfo.keys.map(key => generateClaimUrl(key.privateKey));

  const downloadKeys = () => {
    const data = dropInfo.keys.map((key, index) => ({
      index: index + 1,
      publicKey: key.publicKey,
      privateKey: key.privateKey,
      claimUrl: claimUrls[index],
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `near-drop-${dropInfo.dropId}-keys.json`;
    a.click();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-600">Drop Created! 🎉</h2>
        <p className="text-gray-600">Drop ID: {dropInfo.dropId}</p>
        <p className="text-sm text-gray-500">
          Created {dropInfo.keys.length} keys for {dropInfo.dropType} drop
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Keys List */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Claim Keys</h3>
            <button
              onClick={downloadKeys}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Download All
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {dropInfo.keys.map((key, index) => (
              <div key={index} className="border rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Key {index + 1}</span>
                  <button
                    onClick={() => copyToClipboard(claimUrls[index])}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Copy Link
                  </button>
                </div>
                
                <div className="text-xs font-mono bg-gray-100 p-2 rounded">
                  {claimUrls[index]}
                </div>
                
                <details className="mt-2">
                  <summary className="text-sm text-gray-600 cursor-pointer">
                    Show Private Key
                  </summary>
                  <div className="text-xs font-mono bg-red-50 p-2 rounded mt-1 break-all">
                    {key.privateKey}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>

        {/* QR Codes */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">QR Codes</h3>
            <select 
              value={selectedKey}
              onChange={(e) => setSelectedKey(parseInt(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {dropInfo.keys.map((_, index) => (
                <option key={index} value={index}>Key {index + 1}</option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <div className="bg-white p-4 rounded inline-block">
              <QRCode value={claimUrls[selectedKey]} size={200} />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Scan to claim Key {selectedKey + 1}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4">
            {dropInfo.keys.map((_, index) => (
              <div
                key={index}
                className={`cursor-pointer p-1 border rounded ${
                  selectedKey === index ? 'border-blue-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedKey(index)}
              >
                <QRCode value={claimUrls[index]} size={60} />
                <p className="text-xs text-center mt-1">#{index + 1}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```
</TabItem>

---

## Claiming Component

Create `src/components/ClaimDrop.js`:
  <TabItem value="js" label="🌐 JavaScript">
```jsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { nearService } from '../services/near';
import { KeyPair } from 'near-api-js';

export default function ClaimDrop() {
  const router = useRouter();
  const [privateKey, setPrivateKey] = useState('');
  const [claimType, setClaimType] = useState('existing');
  const [accountName, setAccountName] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (router.query.key) {
      setPrivateKey(router.query.key);
    }
  }, [router.query]);

  const handleClaim = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create temporary wallet with the private key
      const keyPair = KeyPair.fromString(privateKey);
      const tempAccount = {
        accountId: process.env.NEXT_PUBLIC_CONTRACT_ID,
        keyPair: keyPair,
      };

      const contract = await nearService.getContract();

      if (claimType === 'existing') {
        await contract.claim_for({
          account_id: accountName,
        }, {
          gas: '150000000000000',
          signerAccount: tempAccount,
        });
      } else {
        await contract.create_account_and_claim({
          account_id: `${accountName}.testnet`,
        }, {
          gas: '200000000000000',
          signerAccount: tempAccount,
        });
      }

      setSuccess(true);
    } catch (error) {
      alert('Claim failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-green-600 mb-2">Claim Successful!</h2>
        <p className="text-gray-600 mb-4">Your tokens have been transferred.</p>
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Another Drop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Claim Your Drop</h2>
      
      <form onSubmit={handleClaim} className="space-y-4">
        {/* Private Key */}
        <div>
          <label className="block text-sm font-medium mb-1">Private Key</label>
          <input
            type="password"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            placeholder="ed25519:..."
            className="w-full border rounded px-3 py-2 font-mono text-sm"
            required
          />
        </div>

        {/* Claim Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Claim To</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                value="existing"
                checked={claimType === 'existing'}
                onChange={(e) => setClaimType(e.target.value)}
                className="mr-2"
              />
              Existing Account
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="new"
                checked={claimType === 'new'}
                onChange={(e) => setClaimType(e.target.value)}
                className="mr-2"
              />
              Create New Account
            </label>
          </div>
        </div>

        {/* Account Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            {claimType === 'existing' ? 'Account ID' : 'New Account Name'}
          </label>
          <div className="flex">
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder={claimType === 'existing' ? 'alice.testnet' : 'alice'}
              className="flex-1 border rounded-l px-3 py-2"
              required
            />
            {claimType === 'new' && (
              <span className="bg-gray-100 border border-l-0 rounded-r px-3 py-2 text-gray-600">
                .testnet
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Claiming...' : 'Claim Drop'}
        </button>
      </form>
    </div>
  );
}
```
</TabItem>

---

## Main App Layout

Create `src/pages/index.js`:
  <TabItem value="js" label="🌐 JavaScript">
```jsx
import { useState, useEffect } from 'react';
import { nearService } from '../services/near';
import CreateDrop from '../components/CreateDrop';
import DropResults from '../components/DropResults';

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [createdDrop, setCreatedDrop] = useState(null);

  useEffect(() => {
    initNear();
  }, []);

  const initNear = async () => {
    try {
      await nearService.initialize();
      setIsSignedIn(nearService.isSignedIn());
    } catch (error) {
      console.error('Failed to initialize NEAR:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!isSignedIn) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-4xl font-bold mb-4">NEAR Drop</h1>
        <p className="text-xl text-gray-600 mb-8">
          Create gasless token drops that anyone can claim
        </p>
        <button
          onClick={() => nearService.signIn()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {createdDrop ? (
          <div>
            <DropResults dropInfo={createdDrop} />
            <div className="text-center mt-6">
              <button
                onClick={() => setCreatedDrop(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Create Another Drop
              </button>
            </div>
          </div>
        ) : (
          <CreateDrop onDropCreated={setCreatedDrop} />
        )}
      </div>
    </div>
  );
}
```
</TabItem>

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

---

## What You've Built

Awesome! You now have a complete web application with:

✅ **Wallet integration** for NEAR accounts
✅ **Drop creation interface** with cost calculation  
✅ **Key generation and distribution** tools
✅ **QR code support** for easy sharing
✅ **Claiming interface** for both new and existing users
✅ **Mobile-responsive design** that works everywhere

Your users can now create and claim token drops with just a few clicks - no technical knowledge required!

---

## Next Steps

Your NEAR Drop system is nearly complete. The final step is to thoroughly test everything and deploy to production.

---

:::tip User Experience
The frontend makes your powerful token distribution system accessible to everyone. Non-technical users can now create airdrops as easily as sending an email!
:::