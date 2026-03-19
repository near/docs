
export const GasPrice = () => {
  const [gas, setGas] = useState(null);

  useEffect(() => {
    const fetchGasPrice = async () => {
      const response = await fetch('https://rpc.near.org', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'dontcare',
          method: 'gas_price',
          params: [null]
        })
      });
      const data = await response.json();
      if (data.result?.gas_price) {
        setGas(data.result.gas_price);
      }
    };
    fetchGasPrice().catch(console.error);
  }, []);

  if (gas === null) return null;
  return <>{(Number(gas) / 1e12).toFixed(4)}</>;
};
