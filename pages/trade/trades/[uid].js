/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserTradeRequests, getUserTrades } from '../../../api/tradeData';
import TradeCard from '../../../components/TradeCard';

function Trades() {
  const router = useRouter();
  const { uid } = router.query;
  const [trades, setTrades] = useState([]);
  const [tradeRequests, setTradeRequests] = useState([]);

  const getTrades = () => {
    getUserTrades(uid).then(setTrades);
    getUserTradeRequests(uid).then(setTradeRequests);
  };

  useEffect(() => {
    getTrades();
  }, []);

  return (
    <>
      <div className="tradeRequestContainer">
        {trades?.map((trade) => (
          <TradeCard tradeObj={trade} onUpdate={getTrades} />
        ))}ß
      </div>
      <div className="tradeOfferContainer">
        {tradeRequests?.map((trade) => (
          <TradeCard tradeObj={trade} onUpdate={getTrades} />
        ))}
      </div>
    </>

  );
}

export default Trades;
