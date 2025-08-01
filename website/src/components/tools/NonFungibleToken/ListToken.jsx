import { useState } from 'react';
import Carousel from '../Shared/Carousel';
import styles from './ListToken.module.scss';

const ListToken = ({ loading, collections }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionItem}>
        <button
          className={styles.accordionHeader}
          onClick={toggleAccordion}
          aria-expanded={isExpanded}
          type="button"
        >
          <span>All Your Non-Fungible Tokens</span>
          <span className={`${styles.chevron} ${isExpanded ? styles.expanded : ''}`}>
            ▼
          </span>
        </button>
        
        <div className={`${styles.accordionContent} ${isExpanded ? styles.show : ''}`}>
          {loading ? (
            <div className={styles.loadingText}>Loading your tokens...</div>
          ) : !collections || collections.length === 0 ? (
            <div className={styles.emptyText}>You have no tokens</div>
          ) : (
            collections.map((collection, collectionIndex) =>
              Object.entries(collection).map(([name, nfts], entryIndex) => (
                <div key={`collection-${collectionIndex}-${entryIndex}`} className={`${styles.collectionGroup} mb-4`}>
                  <Carousel nfts={nfts} />
                  <p className={`${styles.collectionName} text-sm text-muted mt-2 mb-0`}>{name}</p>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ListToken;