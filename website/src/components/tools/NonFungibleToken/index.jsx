import ListToken from './ListToken';
import MintNft from './MintNFT';
import Button from '../../UI/Button';

const NonFungibleToken = ({
  user_collections,
  loading,
  reload,
}) => {
  return (
    <>
      <h2>Mint a Non-Fungible Token</h2>
      <p>
        This tool allows you to mint Non-Fungible Tokens
      </p>
      <MintNft reload={reload} />
      <div style={{ margin: 'var(--space-4) 0' }} />
      <ListToken loading={loading} collections={user_collections} />
    </>
  );
};

export default NonFungibleToken;