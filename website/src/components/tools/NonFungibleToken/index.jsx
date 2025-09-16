import ListToken from './ListToken';
import MintNft from './MintNFT';
import styles from './MintNFT.module.scss';

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
      <button className={`${styles.button}`} href="https://www.mintbase.xyz/" target="_blank" >MintBase</button>
      <button className={`${styles.button}`} href="https://paras.id/" target="_blank" >Paras</button>
    </>
  );
};

export default NonFungibleToken;