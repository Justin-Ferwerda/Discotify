import { useEffect, useState } from 'react';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { getSingleAlbum, updateAlbum } from '../api/albumData';
import AlbumCard from './AlbumCard';
import { useAuth } from '../utils/context/authContext';
import { deleteSingleTrade } from '../api/tradeData';

function TradeCard({ tradeObj, onUpdate }) {
  const [offer, setOffer] = useState();
  const [request, setRequest] = useState();
  const { user } = useAuth();

  const getTradeAlbums = () => {
    getSingleAlbum(tradeObj?.traderAlbumFBKey).then(setOffer);
    getSingleAlbum(tradeObj?.tradeRecipientAlbumFBKey).then(setRequest);
    console.warn(offer);
  };

  const deleteThisTrade = () => {
    deleteSingleTrade(tradeObj?.tradeFirebaseKey).then(() => onUpdate());
  };

  const swapAlbums = () => {
    const offerAlbum = {
      uid: offer.uid,
    };
    const requestAlbum = {
      uid: request.uid,
    };
    updateAlbum(offerAlbum, request.albumFirebaseKey);
    updateAlbum(requestAlbum, offer.albumFirebaseKey);
  };

  const approveThisTrade = () => {
    swapAlbums();
    deleteThisTrade();
  };

  useEffect(() => {
    getTradeAlbums();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="tradeCard">
      <AlbumCard key={request?.albumFirebaseKey} src={request?.recordImage} albumObj={request} />
      <SyncAltIcon />
      <AlbumCard key={offer?.albumFirebaseKey} src={offer?.recordImage} albumObj={offer} />
      {tradeObj.uid === user.uid ? (
        <div>
          <Button onClick={deleteThisTrade}>Rescind Trade</Button>
        </div>
      ) : (
        <div>
          <Button onClick={approveThisTrade}>Approve Trade</Button>
          <Button onClick={deleteThisTrade}>Deny Trade</Button>
        </div>
      )}
    </div>
  );
}

TradeCard.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  tradeObj: PropTypes.shape({
    traderAlbumFBKey: PropTypes.string,
    tradeRecipientAlbumFBKey: PropTypes.string,
    uid: PropTypes.string,
    tradeFirebaseKey: PropTypes.string,
  }).isRequired,
};

export default TradeCard;
