import React, { useState } from 'react';
import styles from './Linkdrops.module.scss';
import Card from '../../UI/Card';
import Button from '../../UI/Button';

const ListTokenDrop = ({ drops }) => {
  const [copiedKey, setCopiedKey] = useState(null);
  
  const copyToClipboard = (text, keyId) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(keyId);
      setTimeout(() => setCopiedKey(null), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      alert('Failed to copy link');
    });
  };

  const generateClaimUrl = (privateKey) => {
    if (typeof window !== 'undefined') {
      const currentOrigin = window.location.origin;
      return `${currentOrigin}/claim/linkdrop?id=${privateKey}`;
    }
    return '#';
  };

  if (!drops || drops.length === 0) {
    return (
      <Card style={{ marginTop: 'var(--space-4)' }}>
        <h3>Your Drops</h3>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📦</div>
          <p className={styles.emptyTitle}>No drops created yet</p>
          <p className={styles.emptySubtitle}>
            Create your first drop to get started
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card style={{ marginTop: 'var(--space-4)' }}>
      <h3 className={styles.dropsList}>Your Drops</h3>
      <div className={styles.dropsGrid}>
        {drops.map((drop, index) => {

          let dropName;
          try {
            const metadata = JSON.parse(drop.metadata || '{}');
            dropName = metadata.dropName || `Drop #${index + 1}`;
          } catch (e) {
            dropName = `Drop #${index + 1}`;
          }

          const isNFT = drop.nft && drop.nft.contract_id;
          const dropType = isNFT ? 'NFT' : 'Token';

          return (
            <div key={drop.drop_id || index} className={styles.dropCard}>
              <div className={styles.dropHeader}>
                <h5 className={styles.dropTitle}>
                  <span className={styles.dropIcon}>{isNFT ? '🖼️' : '💰'}</span>
                  {dropName}
                </h5>
                
                <div className={`${styles.dropBadge} ${isNFT ? styles.nft : styles.token}`}>
                  {dropType}
                </div>
              </div>

              <div className={styles.dropInfo}>
                <div className={styles.infoItem}>
                  <strong>Drop ID:</strong> {drop.drop_id}
                </div>
                <div className={styles.infoItem}>
                  <strong>Owner:</strong> {drop.owner_id}
                </div>
                {isNFT && (
                  <div className={styles.infoItem}>
                    <strong>Contract:</strong> {drop.nft.contract_id}
                  </div>
                )}
                <div className={styles.infoItem}>
                  <strong>Keys Available:</strong> {drop.keys ? drop.keys.length : 0}
                </div>
              </div>

              {drop.keys && drop.keys.length > 0 && (
                <div className={styles.claimSection}>
                  <div className={styles.claimLabel}>Claim Links:</div>
                  <div className={styles.claimButtons}>
                    {drop.keys.map((key, keyIndex) => {
                      const keyId = `${drop.drop_id}-${keyIndex}`;
                      const isCopied = copiedKey === keyId;
                      
                      return (
                        <Button
                          key={keyIndex}
                          variant={isCopied ? 'secondary' : 'primary'}
                          size="small"
                          onClick={() => {
                            const url = generateClaimUrl(key.private);
                            copyToClipboard(url, keyId);
                          }}
                          leftIcon={<span>{isCopied ? '✓' : '📋'}</span>}
                        >
                          {isCopied ? 'Copied!' : `Copy Link ${drop.keys.length > 1 ? `#${keyIndex + 1}` : ''}`}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ListTokenDrop;