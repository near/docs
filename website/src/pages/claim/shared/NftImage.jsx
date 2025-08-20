import React, { useEffect, useState, useCallback } from 'react';

const DEFAULT_IMAGE = 'https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm';

const NftImage = ({ 
  nft, 
  className = '', 
  width = 80, 
  height = 80,
  loading = 'lazy',
  showFallback = true,
  onImageLoad,
  onImageError 
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageState, setImageState] = useState('loading'); // 'loading', 'loaded', 'error'
  const [retryCount, setRetryCount] = useState(0);
  
  const MAX_RETRIES = 2;

  const processImageUrl = useCallback((mediaUrl, baseUri) => {
    if (!mediaUrl) return null;

    // Handle direct URLs
    if (mediaUrl.startsWith('https://') || mediaUrl.startsWith('http://')) {
      return mediaUrl;
    }
    
    // Handle base64 data URLs
    if (mediaUrl.startsWith('data:image')) {
      return mediaUrl;
    }
    
    // Handle base URI concatenation
    if (baseUri) {
      const cleanBaseUri = baseUri.endsWith('/') ? baseUri.slice(0, -1) : baseUri;
      const cleanMediaUrl = mediaUrl.startsWith('/') ? mediaUrl.slice(1) : mediaUrl;
      return `${cleanBaseUri}/${cleanMediaUrl}`;
    }
    
    // Handle IPFS hashes
    if (mediaUrl.startsWith('Qm') || mediaUrl.startsWith('ba') || mediaUrl.startsWith('baf')) {
      return `https://ipfs.near.social/ipfs/${mediaUrl}`;
    }
    
    // Handle ipfs:// protocol
    if (mediaUrl.startsWith('ipfs://')) {
      return `https://ipfs.near.social/ipfs/${mediaUrl.replace('ipfs://', '')}`;
    }
    
    return null;
  }, []);

  useEffect(() => {
    const fetchNftImageUrl = async () => {
      if (!nft?.token_id) {
        setImageState('error');
        return;
      }

      setImageState('loading');
      const tokenMedia = nft.metadata?.media || '';
      const baseUri = nft.metadata?.base_uri;
      
      const processedUrl = processImageUrl(tokenMedia, baseUri);
      
      if (processedUrl) {
        setImageUrl(processedUrl);
      } else if (showFallback) {
        setImageUrl(DEFAULT_IMAGE);
        setImageState('loaded');
      } else {
        setImageState('error');
      }
    };

    fetchNftImageUrl();
  }, [nft, processImageUrl, showFallback]);

  const handleImageLoad = useCallback(() => {
    setImageState('loaded');
    setRetryCount(0);
    onImageLoad?.();
  }, [onImageLoad]);

  const handleImageError = useCallback(() => {
    if (retryCount < MAX_RETRIES && imageUrl !== DEFAULT_IMAGE) {
      setRetryCount(prev => prev + 1);
      // Try with default image on final retry
      if (retryCount === MAX_RETRIES - 1) {
        setImageUrl(DEFAULT_IMAGE);
      }
    } else {
      setImageState('error');
      onImageError?.();
    }
  }, [retryCount, imageUrl, onImageError]);

  const getAltText = () => {
    return nft?.metadata?.title || 
           nft?.metadata?.name || 
           `NFT ${nft?.token_id}` || 
           'NFT Image';
  };

  // Show loading state
  if (imageState === 'loading') {
    return (
      <div 
        className={`nft-image-placeholder ${className}`}
        style={{ width, height }}
        role="img"
        aria-label="Loading NFT image"
      >
        <div className="nft-image-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  // Show error state if no fallback
  if (imageState === 'error' && !showFallback) {
    return (
      <div 
        className={`nft-image-error ${className}`}
        style={{ width, height }}
        role="img"
        aria-label="Failed to load NFT image"
      >
        <div className="error-icon">⚠️</div>
        <span className="error-text">Image unavailable</span>
      </div>
    );
  }

  return (
    <div className={`nft-image-container ${className}`} style={{ width, height }}>
      <img
        src={imageUrl || DEFAULT_IMAGE}
        alt={getAltText()}
        className={`nft-image ${imageState === 'loaded' ? 'loaded' : ''}`}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          objectFit: 'cover',
          borderRadius: '8px',
          transition: 'opacity 0.3s ease',
          opacity: imageState === 'loaded' ? 1 : 0.7
        }}
      />
      {imageState === 'loading' && (
        <div className="image-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default NftImage;