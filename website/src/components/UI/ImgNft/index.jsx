import { useEffect, useState } from 'react';

import RoundedImage from './RoundedImage';

export const ImgNft = ({ nft }) => {
  //   const { wallet } = useWalletSelector();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchNftData = async () => {
      if (!nft || !nft.token_id) return;

      const tokenMedia = nft.metadata?.media || '';

      if (tokenMedia.startsWith('https://') || tokenMedia.startsWith('http://')) {
        setImageUrl(tokenMedia);
      } else if (tokenMedia.startsWith('data:image')) {
        setImageUrl(tokenMedia);
      } else if (nft.metadata?.base_uri) {
        setImageUrl(`${nft.metadata.base_uri}/${tokenMedia}`);
      } else if (tokenMedia.startsWith('Qm') || tokenMedia.startsWith('ba')) {
        setImageUrl(`https://ipfs.near.social/ipfs/${tokenMedia}`);
      }
    };

    fetchNftData();
  }, [nft, imageUrl]);

  return <RoundedImage src={imageUrl} alt={nft?.metadata?.title || ''} />;
};

export const NftImage = ImgNft;
