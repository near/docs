import React from 'react';

const FTPreview = ({ token }) => {
  const formatTokenAmount = (amount, decimals) => {
    return (BigInt(amount) / BigInt(10 ** decimals)).toString();
  };

  return (
    <div className="preview-container ft-preview">
      <h3 className="preview-title">{token.name}</h3>
      <div className="token-icon-container">
        <img 
          src={token.icon} 
          alt={token.name} 
          className="preview-image token-image"
          width={80} 
          height={80} 
        />
      </div>
      <div className="token-info">
        <div className="preview-amount">
          <span className="amount-value">
            {formatTokenAmount(token.total_supply, token.decimals)}
          </span>
          <span className="amount-symbol">{token.symbol}</span>
        </div>
      </div>
      {token.description && (
        <p className="preview-description">{token.description}</p>
      )}
    </div>
  );
};

export default FTPreview;
