import React from 'react';
import NearIconSvg from '@site/static/assets/site/near_icon.svg';

const NearPreview = ({ amount }) => {
  return (
    <div className="preview-container near-preview">
      <h3 className="preview-title">NEAR Token</h3>
      <div className="near-icon-container">
        <NearIconSvg width="80" height="80" className="preview-image token-image" />
      </div>
      <div className="preview-amount">
        <span className="amount-value">{amount}</span>
        <span className="amount-symbol">NEAR</span>
      </div>
      <p className="preview-description">
        Native cryptocurrency of the NEAR Protocol blockchain
      </p>
    </div>
  );
};

export default NearPreview;
