import CreateTokenForm from './CreateTokenForm';
import ListToken from './ListToken';
import Button from '../../UI/Button';

const FungibleToken = ({
  user_fts,
  loading,
  reload,
}) => {
  return (
    <>
      <h2>Mint a Fungible Token</h2>
      <p>This tool allows you to deploy your own NEP-141 smart contract (Fungible Tokens)</p>
      <CreateTokenForm reload={reload} />
      <ListToken loading={loading} tokens={user_fts} />
      <hr className='subsection' />
      <p>Tools created by the community:</p>
      <Button 
        variant="primary" 
        href="https://tkn.homes/" 
        target="_blank"
      >
        Token Homes
      </Button>
    </>
  );
};
export default FungibleToken;