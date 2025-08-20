import { Account } from '@near-js/accounts';
import { JsonRpcProvider } from '@near-js/providers';
import { KeyPairSigner } from '@near-js/signers';
import { useState } from 'react';
import './faucet.scss';

import Layout from '@theme/Layout'

async function createAndDeleteTmpAcc(beneficiary) {
  const tmpAccount = `${beneficiary.slice(0, 32).replace('.', '-')}-${Date.now()}.testnet`;
  const signer = KeyPairSigner.fromSecretKey(
    'ed25519:5mixhRL3GcXL9sXx9B4juv6cp3Js4Qo7qY9gWs8bzcQGeSbefXMkCJh5UpmwZYriitMjsppqV4W8zb5bREkYRxLh',
  );
  const publicKey = await signer.getPublicKey();
  await fetch('https://helper.testnet.near.org/account', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      newAccountId: tmpAccount,
      newAccountPublicKey: publicKey.toString(),
    }),
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const provider = new JsonRpcProvider({ url: 'https://rpc.testnet.fastnear.com' });
  const account = new Account(tmpAccount, provider, signer);
  await account.transfer({ receiverId: beneficiary, amount: '10000000000000000000000' });
  return account.deleteAccount(beneficiary);
}

const ToolsPage = () => {
  const [error, setError] = useState();
  const [label, setLabel] = useState('Request');

  const requestFaucet = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const accountId = formData.get('accountId');

    if (!accountId) {
      setError('Please enter a valid account ID');
      return;
    }

    setLabel('Requesting');
    setError(undefined);

    createAndDeleteTmpAcc(accountId)
      .then(() => setLabel('Funded!'))
      .catch((err) => {
        setError(err.message || 'An error occurred while requesting the faucet');
        setLabel('Request');
      });
  };

  return (
    <Layout>
      <div className="faucet-section">
        <div className="faucet-container">
          <h1>NEAR Testnet Faucet</h1>
          <p>Request testnet NEAR tokens to test your applications</p>
          <div className="faucet-card">
            <form onSubmit={requestFaucet}>
              <div className="field-group">
                <label htmlFor="accountId">
                  <span className="field-label">Testnet Account ID</span>
                  <input
                    id="accountId"
                    name="accountId"
                    required
                    placeholder="account.testnet | 0x123... | implicit address"
                    className={
                      error ? 'error' : label === 'Funded!' ? 'success' : ''
                    }
                  />
                </label>
                {error && <div className="input-msg error">{error}</div>}
                {label === 'Funded!' && (
                  <div className="input-msg success">Account funded!</div>
                )}
              </div>
              <button
                type="submit"
                className={label === 'Funded!' ? 'affirmative' : ''}
                disabled={label !== 'Request'}
              >
                {label === 'Requesting' && '🕔 '}
                {label}
              </button>
            </form>
          </div>
          <p className="help-text">
            Not working? Please report at <a href="https://t.me/neardev">https://t.me/neardev</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ToolsPage;
