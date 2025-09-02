import CreateDaoForm from './CreateDaoForm';

const DAO = ({ loading, user_daos, reload }) => {
  return (
    <>
      <CreateDaoForm reload={reload} />
    </>
  );
};
export default DAO;