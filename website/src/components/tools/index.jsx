import Tabs from '@theme/Tabs';
import FungibleToken from './FungibleToken';
import NonFungibleToken from './NonFungibleToken';
import DecentralizedOrganization from './DecentralizedOrganization';
import TabItem from '@theme/TabItem';
import NearIconSvg from '@site/static/img/near_icon.svg';
import { useCallback, useEffect, useState } from 'react';
import { useWalletSelector } from '@near-wallet-selector/react-hook';
import Linkdrops from './Linkdrops';
import useLinkdrops from './hooks/useLinkdrops';
import whiteList from './white-list.json';
import { NEAR } from '@near-js/tokens';

const network = {
  apiNearBlocks: 'https://api-testnet.nearblocks.io'
};

const NearToken = {
  contract_id: 'near',
  balance: NEAR.toUnits(10),
  verified: true,
  metadata: {
    decimals: 24,
    name: 'NEAR',
    symbol: 'NEAR',
    icon: NearIconSvg,
  },
};

const Tools = () => {
  const { getBalance, viewFunction, signedAccountId } = useWalletSelector();
  const [allFT, setAllFT] = useState([NearToken]);
  const [loadingFT, setLoadingFT] = useState(false);
  const [allNFT, setAllNFT] = useState([]);

  const [loadingNFT, setLoadingNFT] = useState(false);
  const { drops, reloadLinkdrops } = useLinkdrops();

  const [allDAO, setAllDAO] = useState([]);
  const [loadingDAO, setLoadingDAO] = useState(false);


  const fetchTokens = useCallback(async () => {
    if (!signedAccountId) return { fts: [], nfts: [] };

    const response = await fetch(`${network.apiNearBlocks}/v1/account/${signedAccountId}/tokens`);
    if (!response.ok) return { fts: [], nfts: [] };

    const data = await response.json();
    return data.tokens;
  }, [signedAccountId]);

  const processFT = useCallback(
    async (ft_contracts) => {
      if (!signedAccountId) return [];
      if (!ft_contracts.length) return [];

      setLoadingFT(true);

      const getFTData = async (contract_id) => {
        try {
          const balance = await viewFunction({
            contractId: contract_id,
            method: 'ft_balance_of',
            args: { account_id: signedAccountId },
          });
          console.log(`FT balance for ${contract_id}:`, balance);
          
          if (balance === '0') return { contract_id, balance, metadata: {}, verified: false };
          const metadata = (await viewFunction({ contractId: contract_id, method: 'ft_metadata' }));
          const verified = whiteList.filter((item) => item.contract_id === contract_id).length > 0;
          return { contract_id, balance, metadata, verified };
        } catch (e) {
          return { contract_id, balance: '0', metadata: {}, verified: false };
        }
      };

      const balance = await getBalance(signedAccountId);
      NearToken.balance = balance.toString();

      let other_fts = await Promise.all(ft_contracts.map((ft) => getFTData(ft)));
      
      other_fts = other_fts.filter((ft) => ft.balance !== '0');
      const all_fts = [NearToken, ...other_fts.sort((a, b) => Number(b.verified) - Number(a.verified))];
      
      setAllFT(all_fts);
      setLoadingFT(false);
    },
    [getBalance, signedAccountId, viewFunction],
  );

  const processNFT = useCallback(
    async (nft_contracts) => {
      if (!nft_contracts.length) return [];
      setLoadingNFT(true);

      const getNFTsForContract = async (contract_id) => {
        try {
          let nfts = (await viewFunction({
            contractId: contract_id,
            method: 'nft_tokens_for_owner',
            args: { account_id: signedAccountId },
          }));
          nfts = nfts.map((nft) => ({ ...nft, contract_id }));
          return { [contract_id]: nfts };
        } catch (e) {
          return { [contract_id]: [] };
        }
      };

      let nfts = [];
      nfts = await Promise.all(nft_contracts.map((contract_id) => getNFTsForContract(contract_id)));
      nfts = nfts.filter((nft) => nft[Object.keys(nft)[0]].length > 0);

      setAllNFT(nfts);
      setLoadingNFT(false);
    },
    [viewFunction, signedAccountId],
  );

  const fetchDaos = useCallback(async () => {
    if (!signedAccountId) return [];

    const url = new URL(`/v1/account/${signedAccountId}/txns-only`, network.apiNearBlocks);
    url.searchParams.set('page', '1');
    url.searchParams.set('page', '10');
    url.searchParams.set('order', 'desc');
    url.searchParams.set('method', 'create');
    url.searchParams.set('to', network.daoContract);

    const response = await fetch(url);
    if (!response.ok) return [];

    const data = await response.json();

    const daos = (data?.txns || [])
      .map((tx) => {
        if (!tx.outcomes?.status) return;

        const action = tx.actions?.[0];

        if (!action) return;

        try {
          const args = JSON.parse(action.args);

          return [args.name, network.daoContract].join('.');
        } catch (error) {
          console.error(`Error while parsing create DAO tx: ${error}`);
          return;
        }
      })
      .filter(Boolean);

    return Array.from(new Set(daos));
  }, [signedAccountId]);

  const processDAO = useCallback(
    async (daos) => {
      if (!daos.length) return [];
      setLoadingDAO(true);

      const getDAOData = async (contract_id) => {
        try {
          const config = await viewFunction({
            contractId: contract_id,
            method: 'get_config',
            args: {},
          });

          const metadata = JSON.parse(Buffer.from(config.metadata, 'base64').toString());

          let logo_data;
          if (metadata.flagLogo) {
            const logo_response = await fetch(metadata.flagLogo);
            const logo_blob = await logo_response.blob();
            logo_data = URL.createObjectURL(logo_blob);
          }

          return {
            contract_id: contract_id,
            public_name: metadata.displayName,
            description: config.purpose,
            metadata: {
              logo_url: metadata.flagLogo,
              cover_url: metadata.flagCover,
              logo_data: logo_data,
            },
          };
        } catch (error) {
          console.error(`Error happened while fetching DAO config: ${error}`);
          return {
            contract_id,
            public_name: '',
            description: '',
            metadata: { logo_url: undefined, cover_url: undefined, logo_data: undefined },
          };
        }
      };

      const promises = daos.map((dao) => getDAOData(dao));
      const all_daos = await Promise.all(promises);

      setAllDAO(all_daos);
      setLoadingDAO(false);
    },
    [viewFunction],
  );

  const reloadDao = useCallback(
    async (delay) => {
      await new Promise((resolve) => setTimeout(resolve, delay));

      const daos = await fetchDaos();
      await processDAO(daos);
    },
    [fetchDaos, processDAO],
  );

  const reload = useCallback(
    async (delay, type) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      const tokens = await fetchTokens();
      if (type === 'fts') processFT(tokens.fts);
      if (type === 'nfts') processNFT(tokens.nfts);
    },
    [fetchTokens, processFT, processNFT],
  );

  useEffect(() => {
    const init = async () => {
      // load Fungible & Non-Fungible tokens
      const tokens = await fetchTokens();
      processFT(tokens.fts);
      processNFT(tokens.nfts);

      // load Decentralized Organizations
      const daos = await fetchDaos();
      processDAO(daos);
    };
    init();
  }, [fetchDaos, fetchTokens, processDAO, processFT, processNFT, signedAccountId]);

  
  return <Tabs groupId="code-tabs">
    <TabItem value="FT" label="FT">
      <FungibleToken user_fts={allFT} loading={loadingFT} reload={(d) => reload(d, 'fts')} />
    </TabItem>
    <TabItem value="NFT" label="NFT">
      <NonFungibleToken user_collections={allNFT} loading={loadingNFT} reload={(d) => reload(d, 'nfts')} />
    </TabItem>
    <TabItem value="Linkdrops" label="Linkdrops">
      <Linkdrops
        user_fts={allFT}
        user_collections={allNFT}
        drops={drops}
        reloadFT={(d) => reload(d, 'fts')}
        reloadNFT={(d) => reload(d, 'nfts')}
        reloadDrops={reloadLinkdrops}
      />
    </TabItem>
    <TabItem value="dao" label="DAO">
      <DecentralizedOrganization loading={loadingDAO} user_daos={allDAO} reload={(d) => reloadDao(d)} />
    </TabItem>
  </Tabs>
}

export default Tools;