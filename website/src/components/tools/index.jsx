import Tabs from '@theme/Tabs';
import FungibleToken from './FungibleToken';
import NonFungibleToken from './NonFungibleToken';
import TabItem from '@theme/TabItem';
import { useWalletSelector } from '../../hooks/useWalletSelectorMock';
import NearIconSvg from '@site/static/img/near_icon.svg';
import { useCallback, useEffect, useState } from 'react';

// Mock network config since it's not available
const network = {
  apiNearBlocks: 'https://api.nearblocks.io'
};

const NearToken = {
    contract_id: 'near',
    balance: '0',
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
          const balance = (await viewFunction({
            contractId: contract_id,
            method: 'ft_balance_of',
            args: { account_id: signedAccountId },
          }));
          if (balance === '0') return { contract_id, balance, metadata: {}, verified: false };
          const metadata = (await viewFunction({ contractId: contract_id, method: 'ft_metadata' }));
          const verified = whiteList.filter((item) => item.contract_id === contract_id).length > 0;
          return { contract_id, balance, metadata, verified };
        } catch (e) {
          return { contract_id, balance: '0', metadata: {}, verified: false };
        }
      };

      // the first FT is always NEAR
      const balance = await getBalance(signedAccountId);
      NearToken.balance = balance.toString();
      let all_fts = [NearToken];

      let other_fts = await Promise.all(ft_contracts.map((ft) => getFTData(ft)));
      other_fts = other_fts.filter((ft) => ft.balance !== '0');
      all_fts = all_fts.concat(other_fts);
      all_fts = all_fts.sort((a, b) => Number(b.verified) - Number(a.verified));

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
    };
    init();
  }, [fetchTokens, processFT, processNFT, signedAccountId]);

    return <Tabs groupId="code-tabs">
        <TabItem value="FT" label="FT">
            <FungibleToken user_fts={allFT} loading={loadingFT} reload={(d) => reload(d, 'fts')} />
        </TabItem>
        <TabItem value="NFT" label="NFT">
            <NonFungibleToken user_collections={allNFT} loading={loadingNFT} reload={(d) => reload(d, 'nfts')} />
        </TabItem>
    </Tabs>
}

export default Tools;