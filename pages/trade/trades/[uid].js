import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserTrades } from '../../../api/tradeData';
import TradeCard from '../../../components/TradeCard';

function Trades() {
  const router = useRouter();
  const { uid } = router.query;
  const [trades, setTrades] = useState();

  const getTrades = () => {
    getUserTrades(uid).then(setTrades);
  };

  useEffect(() => {
    getTrades();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tradeContainer">
      {trades?.map((trade) => (
        <TradeCard tradeObj={trade} onUpdate={getTrades} />
      ))}
    </div>
  );
}

export default Trades;
