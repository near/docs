import React, { useEffect } from 'react';
import axios from 'axios';

export function Gas() {

  const [gas, setGas] = React.useState(0);
  // const query = axios.post('https://rpc.near.org', {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     jsonrpc: '2.0',
  //     id: 'dontcare',
  //     method: 'gas_price',
  //     params: [null]
  //   })

  useEffect(() => {
    const fetchGasPrice = async () => {
      const response = await axios.post('https://rpc.near.org', {
        jsonrpc: '2.0',
        id: 'dontcare',
        method: 'gas_price',
        params: [null]
      },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const yocto = response.data.result.gas_price;
      setGas(yocto);
    }
    fetchGasPrice().catch(console.error);
  }, []);

  return Number(gas) / 1e12
}