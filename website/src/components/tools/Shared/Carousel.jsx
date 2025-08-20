import { NftImage } from './NTFImage';
import styles from './Carousel.module.scss';

const empty = (nft) => {
  console.log(nft);
};

const Carousel = ({ nfts, onSelect = empty, nftSelected }) => {
  return (
    <div className={`${styles.carouselContainer} d-flex`}>
      {nfts.map((nft) => (
        <div
          key={`Carousel-${nft.token_id}`}
          className={`${styles.imgCard} ${nftSelected === nft ? styles.selected : ''}`}
          onClick={() => onSelect(nft)}
          data-title={nft?.metadata?.title}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect(nft);
            }
          }}
          aria-label={`Select NFT: ${nft?.metadata?.title || 'Untitled'}`}
        >
            <NftImage nft={nft} />
        </div>
      ))}
    </div>
  );
};

export default Carousel;