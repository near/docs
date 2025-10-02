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
      <ListToken loading={loading} collections={user_collections} />
      <hr />
      <p>For more advanced options please use tools created by the community:</p>
      <Button fullWidth href="https://www.mintbase.xyz/" target="_blank" className="margin-bottom--md">MintBase</Button>
      <Button fullWidth href="https://paras.id/" target="_blank" className="margin-bottom--md">Paras</Button>
    </>
  );
};

export default NonFungibleToken;