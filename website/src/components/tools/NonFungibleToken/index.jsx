import ListToken from './ListToken';
import MintNft from './MintNft';
import styles from './MintNft.module.scss';

const NonFungibleToken = ({
  user_collections,
  loading,
  reload,
}) => {
  return (
    <>
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