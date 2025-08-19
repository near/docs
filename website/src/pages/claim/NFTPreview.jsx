import React, { useEffect, useState } from 'react';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import NftImage from './shared/NftImage';

const NFTPreview = ({ nft }) => {
  const [infoNft, setInfoNft] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { viewFunction } = useWalletSelector();
  
  useEffect(() => {
    const fetchNftInfo = async () => {
      try {
        setIsLoading(true);
        const nftData = await viewFunction({
          contractId: nft.contract_id,
          method: 'nft_token',
          args: { token_id: nft.token_id },
        });
        setInfoNft(nftData);
      } catch (error) {
        console.error('Error fetching NFT info:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (nft?.contract_id && nft?.token_id) {
      fetchNftInfo();
    }
  }, [nft, viewFunction]);

  if (isLoading) {
    return (
      <div className="preview-container nft-preview">
        <div className="nft-loading">
          <div className="loading-spinner">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading NFT...</span>
            </div>
          </div>
          <p>Loading NFT details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-container nft-preview">
      <h3 className="preview-title">
        {infoNft?.metadata?.title || 'NFT Token'}
      </h3>
      <div className="nft-image-container">
        <NftImage nft={infoNft} width={120} height={120} />
      </div>
      <div className="nft-details">
        <div className="nft-id">
          <span className="nft-label">Token ID:</span>
          <span className="nft-value">{nft.token_id}</span>
        </div>
        <div className="nft-contract">
          <span className="nft-label">Contract:</span>
          <span className="nft-value">{nft.contract_id}</span>
        </div>
      </div>
      {infoNft?.metadata?.description && (
        <p className="preview-description">{infoNft.metadata.description}</p>
      )}
    </div>
  );
};

export default NFTPreview;
