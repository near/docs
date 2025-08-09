import CreateTokenForm from './CreateTokenForm';
import ListToken from './ListToken';
import styles from './FungibleToken.module.scss';

const FungibleToken = ({
  user_fts,
  loading,
  reload,
}) => {
  return (
    <>
      <CreateTokenForm reload={reload} />
      <ListToken loading={loading} tokens={user_fts} />
      <hr />
      <p>For more advanced options please use tools created by the community:</p>
      <button className={`${styles.button} ${styles.primary}`} href="https://tkn.homes/" target="_blank" >Token Homes</button>
    </>
  );
};
export default FungibleToken;