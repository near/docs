import { useCallback, useEffect, useState } from 'react';

export const DEFAULT_IMAGE =
    'https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm';

const RoundedImage = ({ src, alt }) => {
    const [imageUrl, setImageUrl] = useState(src);

    useEffect(() => {
        setImageUrl(src);
    }, [src]);

    const handleError = useCallback(() => {
        setImageUrl(DEFAULT_IMAGE);
    }, []);

    return <img height={43} width={43} src={imageUrl || DEFAULT_IMAGE} alt={alt} onError={handleError} style={{
        objectFit: 'cover', borderRadius: '50%', overflow: 'hidden'
    }} />;
};

export default RoundedImage;