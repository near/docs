import Layout from '@theme/Layout'
import { Faucet } from '../../components/faucet';

import './faucet.scss';

const FaucetPage = () => {
  return (
    <Layout>
      <div className="faucet-section">
        <div className="faucet-container">
          <h1>NEAR Testnet Faucet</h1>
          <p>Request testnet NEAR tokens to test your applications</p>
          <Faucet />
        </div>
      </div>
    </Layout>
  );
};

export default FaucetPage;
