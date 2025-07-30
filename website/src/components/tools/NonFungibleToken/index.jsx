// import CommunityTools from './CommunityTools';
// import ListToken from './ListToken';
import MintNft from './MintNft';

const NonFungibleToken = ({
  user_collections,
  loading,
  reload,
}) => {
  return (
    <>
      <MintNft reload={reload} />
      {/* <ListToken loading={loading} collections={user_collections} />
      <hr />
      <CommunityTools /> */}
    </>
  );
};

export default NonFungibleToken;
