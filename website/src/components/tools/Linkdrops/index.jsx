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
      <h2>Create a LinkDrop</h2>
      <p>
        This tool allows you to create drops that can be claimed by anyone through a simple web link
      </p>

      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.header}>

          </div>

          <div className={styles.switchContainer}>
            <span>Token</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                className={styles.switchInput}
                checked={selector}
                onChange={(e) => setSelector(e.target.checked)}
              />
              <span className={styles.slider}>
                <span className={`${styles.switchIcon} ${styles.left}`}>💰</span>
                <span className={`${styles.switchIcon} ${styles.right}`}>🖼️</span>
              </span>
            </label>
            <span>NFT</span>
          </div>

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
        </div>

        <ListTokenDrop drops={drops} />
      </div>
    </>
  );
};

export default Linkdrops;