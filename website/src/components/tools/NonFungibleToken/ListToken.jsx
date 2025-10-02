import Accordion from '../../UI/Accordion';
import Carousel from '../../UI/CarouselNft';
import styles from './ListToken.module.scss';

const ListToken = ({ loading, collections }) => {
  const content = loading ? (
    <div className={styles.loadingText}>Loading your tokens...</div>
  ) : !collections || collections.length === 0 ? (
    <div className={styles.emptyText}>You have no tokens</div>
  ) : (
    collections.map((collection, collectionIndex) =>
      Object.entries(collection).map(([name, nfts], entryIndex) => (
        <div key={`collection-${collectionIndex}-${entryIndex}`} className={styles.collectionGroup}>
          <Carousel nfts={nfts} />
          <p className={styles.collectionName}>{name}</p>
        </div>
      ))
    )
  );

  return (
    <Accordion 
      title="All Your Non-Fungible Tokens" 
      detail={content}
    />
  );
};

export default ListToken;