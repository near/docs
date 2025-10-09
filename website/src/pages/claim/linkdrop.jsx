import React, { useEffect, useState } from 'react';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { KeyPair } from '@near-js/crypto';
import { NEAR } from '@near-js/tokens';
import FTPreview from './FTPreview';
import NFTPreview from './NFTPreview';
import NearPreview from './NearPreview';
import Layout from '@theme/Layout';
import './styles/claim.scss';
import Meteor from '@site/static/assets/docs/tools/meteor.svg';

const Claim = () => {
  const [key, setKey] = useState(null);
  const [dropData, setDropData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log('Claim component rendered with key:', key);

  const contract_id = 'v2.keypom.testnet';
  const { signedAccountId, signIn, viewFunction } = useWalletSelector();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const linkId = params.get('id');
    setKey(linkId);
  }, []);

  useEffect(() => {
    const fetchDropData = async () => {
      if (!signedAccountId || !contract_id || !key) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const pk = KeyPair.fromString(key);
        console.log('Fetching drop data for key:', pk.getPublicKey().toString());
        
        const dropInformation = (await viewFunction({
          contractId: contract_id,
          method: 'get_drop_information',
          args: { key: pk.getPublicKey().toString() },
        }));
        console.log(dropInformation,pk);
        
        if (dropInformation.ft) {
          const metadata = (await viewFunction({
            contractId: dropInformation.ft.contract_id,
            method: 'ft_metadata',
          }));
          setDropData({
            token: {
              ...metadata,
              total_supply: dropInformation.ft.balance_per_use,
            },
          });
        } else if (dropInformation.nft) {
          const nftId = (await viewFunction({
            contractId: contract_id,
            method: 'get_nft_token_ids_for_drop',
            args: { drop_id: dropInformation.drop_id },
          }));
          setDropData({
            nft: {
              contract_id: dropInformation.nft.contract_id,
              token_id: nftId[0],
            },
          });
        } else {
          const balance = (await viewFunction({
            contractId: contract_id,
            method: 'get_key_balance',
            args: { key: pk.getPublicKey().toString() },
          }));
          setDropData({ amount: NEAR.toDecimal(balance) });
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch drop data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDropData();
  }, [viewFunction, signedAccountId, contract_id, key]);

  const renderDropContent = () => {
    const { token, nft, amount } = dropData;

    if (token) {
      return <FTPreview token={token} />;
    }

    if (nft) {
      return <NFTPreview nft={nft} />;
    }

    if (amount) {
      return <NearPreview amount={amount} />;
    }

    return null;
  };

  return (
    <Layout title="Claim Your Drop">
      <div className="claim-container">
        <div className="claim-card">
          <h1 className="claim-title">Claim Your Drop</h1>
          
          {isLoading ? (
            <div className="claim-loading">
              <div className="loading-spinner">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              <div className="loading-text">Loading your drop...</div>
            </div>
          ) : error ? (
            <div className="claim-error">
              <div className="error-icon">⚠️</div>
              <div className="error-message">{error}</div>
              <button 
                className="retry-button" 
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : signedAccountId ? (
            <div className="claim-content">
              <div className="drop-preview">
                {renderDropContent()}
              </div>
              
              <div className="wallet-actions">
                <h3 className="wallet-actions-title">Open in Wallet</h3>
                <div className="wallet-links">
                  <a
                    href={`https://wallet.meteorwallet.app/linkdrop/${contract_id}/${key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="wallet-link"
                  >
                    <div className="wallet-icon">
                      <Meteor style={{ width: '24px', height: '24px' }} />
                    </div>
                    <span>Meteor Wallet</span>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="claim-sign-in">
              <div className="sign-in-icon">🔐</div>
              <h2 className="sign-in-title">Connect Your Wallet</h2>
              <p className="sign-in-text">
                Please connect your wallet to view and claim your drop
              </p>
              <button className="btn-sign-in" onClick={signIn}>
                <span className="btn-icon">🚀</span>
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Claim;