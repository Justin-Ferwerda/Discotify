/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
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
      <Head>
        <title>Discotify - Trades</title>
        <meta name="description" content="meta description for Trades Page" />
      </Head>
      <div className="trade-page">
        {trades.length || tradeRequests.length ? (
          <>
            <div className="tradeRequestContainer">
              {trades?.map((trade) => (
                <TradeCard key={trade.tradeFirebaseKey} tradeObj={trade} onUpdate={getTrades} />
              ))}
            </div>
            <div className="tradeOfferContainer">
              {tradeRequests?.map((trade) => (
                <TradeCard key={trade.tradeFirebaseKey} tradeObj={trade} onUpdate={getTrades} />
              ))}
            </div>
          </>
        ) : (<div className="noTradesText"><div className="tText">Looks like you have no trades. Check out the community page to view other people&apos;s collections!</div></div>)}
      </div>

    </>

  );
}

export default Trades;
