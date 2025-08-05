import { useState } from 'react';
import styles from './Linkdrops.module.scss';

import CreateNFTDrop from './CreateNFTDrop';
import CreateTokenDrop from './CreateTokenDrop';
import ListTokenDrop from './ListTokenDrop';

const Linkdrops = ({
  user_fts,
  user_collections,
  drops,
  reloadFT,
  reloadNFT,
  reloadDrops,
}) => {
  
  const [selector, setSelector] = useState(false);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.mainTitle}>
            🔗 LinkDrop Creator
          </h1>
          <p className={styles.subtitle}>
            Create shareable drops that can be claimed by anyone through a simple web link
          </p>
        </div>
        
        <div className={styles.switchSection}>
          <div className={styles.switchContainer}>
            <span className={`${styles.switchLabel} ${!selector ? styles.active : ''}`}>
              💰 Token
            </span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                className={styles.switchInput}
                checked={selector}
                onChange={(e) => setSelector(e.target.checked)}
              />
              <span className={styles.slider}>
                <span className={styles.switchKnob}></span>
              </span>
            </label>
            <span className={`${styles.switchLabel} ${selector ? styles.active : ''}`}>
              🖼️ NFT
            </span>
          </div>
        </div>
      </div>

      <div className={styles.container}>
         

          {!selector && (
            <CreateTokenDrop
              user_fts={user_fts}
              reload={(delay) => {
                reloadFT(delay);
                reloadDrops(delay);
              }}
            />
          )}

          {selector && (
            <CreateNFTDrop
              user_collections={user_collections}
              reload={(delay) => {
                reloadNFT(delay);
                reloadDrops(delay);
              }}
            />
          )}

          <div className={styles.poweredBy}>
            Powered by <a href="https://keypom.xyz" target="_blank" rel="noopener noreferrer">Keypom</a>
          </div>

        <ListTokenDrop drops={drops} />
      </div>
    </>
  );
};

export default Linkdrops;