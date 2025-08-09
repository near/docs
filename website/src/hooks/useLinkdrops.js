import { useWalletSelector } from '@near-wallet-selector/react-hook';
import { useCallback, useEffect, useState } from 'react';

const KEYPOM_CONTRACT_ADDRESS = "v2.keypom.testnet"

const getKeypomKeys = (dropName) => {
    const keys = localStorage.getItem(`keysPom:${dropName}`);
    if (keys) {
      return JSON.parse(keys);
    }
    return [];
  };
  
  const setKeypomKeys = (dropName, keys) => {
    localStorage.setItem(`keysPom:${dropName}`, JSON.stringify(keys));
  };
  
  const generateAndStore = (dropName, dropsNumber) => {
    const keys = [];
    const keysLocalStorage = getKeypomKeys(dropName);
    for (let index = 0; index < dropsNumber; index++) {
      const newKeyPair = KeyPair.fromRandom('ed25519');
      const publicKey = newKeyPair.getPublicKey().toString();
      keys.push(publicKey);
      keysLocalStorage.push({ private: newKeyPair.toString(), public: publicKey });
    }
    setKeypomKeys(dropName, keysLocalStorage);
  
    return keys;
  };


const useLinkdrops = () => {
  const { signedAccountId, viewFunction } = useWalletSelector();
  const [drops, setDrops] = useState([]);

  const fetchDropData = useCallback(async () => {
    if (!signedAccountId) return;

    const fetchedDrops = (await viewFunction({
      contractId: KEYPOM_CONTRACT_ADDRESS,
      method: 'get_drops_for_owner',
      args: { account_id: signedAccountId },
    }));

    const fetchDropInformation = async () => {
      const fetchedDropsWithKeys = await Promise.all(
        fetchedDrops.map(async (drop) => {
          if (
            !(
              drop.metadata &&
              JSON.parse(drop.metadata).dropName &&
              getKeypomKeys(JSON.parse(drop.metadata).dropName).length > 0
            )
          ) {
            return null;
          }

          const keypomKeys = (await viewFunction({
            contractId: KEYPOM_CONTRACT_ADDRESS,
            method: 'get_keys_for_drop',
            args: { drop_id: drop.drop_id },
          }));

          const localKeys = getKeypomKeys(JSON.parse(drop.metadata).dropName);

          const unclaimedKeys = localKeys.filter((localKey) =>
            keypomKeys.some((keypomKey) => keypomKey.pk === localKey.public),
          );

          if (unclaimedKeys.length > 0) {
            return { ...drop, keys: unclaimedKeys };
          }

          return null;
        }),
      );

      return fetchedDropsWithKeys.filter((item) => item !== null);
    };

    const data = await fetchDropInformation();

    setDrops(data);
  }, [viewFunction, signedAccountId]);

  useEffect(() => {
    fetchDropData();
  }, [fetchDropData]);

  return { drops, reloadLinkdrops: fetchDropData };
};

export default useLinkdrops;
