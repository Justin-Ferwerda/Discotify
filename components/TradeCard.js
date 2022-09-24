/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getSingleAlbum, updateAlbum } from '../api/albumData';
import AlbumCard from './AlbumCard';
import { useAuth } from '../utils/context/authContext';
import { deleteSingleTrade } from '../api/tradeData';
import { deleteWish, getWishByFirebaseKey } from '../api/wishListData';

function TradeCard({ tradeObj, onUpdate }) {
  const [offer, setOffer] = useState({});
  const [request, setRequest] = useState({});
  const { user } = useAuth();
  const router = useRouter();

  const getTradeAlbums = () => {
    getSingleAlbum(tradeObj.traderAlbumFBKey).then(setOffer);
    getSingleAlbum(tradeObj.tradeRecipientAlbumFBKey).then(setRequest);
  };

  const deleteThisTrade = () => {
    deleteSingleTrade(tradeObj.tradeFirebaseKey).then(() => {
      onUpdate();
    });
  };

  const swapAlbums = () => {
    const offerAlbum = {
      uid: offer.uid,
      creatorImage: offer.creatorImage,
      creatorName: offer.creatorName,
    };
    const requestAlbum = {
      uid: request.uid,
      creatorImage: request.creatorImage,
      creatorName: request.creatorName,
    };
    updateAlbum(offerAlbum, request.albumFirebaseKey);
    updateAlbum(requestAlbum, offer.albumFirebaseKey);
  };

  const approveThisTrade = () => {
    getWishByFirebaseKey(request.albumFirebaseKey).then((response) => {
      const wishToDelete = response.filter((wish) => wish.uid === offer.uid);
      deleteWish(wishToDelete[0].firebaseKey);
    });
    swapAlbums();
    deleteThisTrade();
  };

  useEffect(() => {
    getTradeAlbums();
  }, [tradeObj]);

  return (
    <div className="tradeCard border border-dark">
      <AlbumCard key={request?.albumFirebaseKey} src={request?.recordImage} albumObj={request} router={router.asPath} />
      <SyncAltIcon />
      <AlbumCard key={offer?.albumFirebaseKey} src={offer?.recordImage} albumObj={offer} router={router.asPath} />
      {tradeObj.uid === user.uid ? (
        <div className="trade-btn-container">
          <Button className="rescind-trade-btn" onClick={deleteThisTrade}>Rescind Trade</Button>
        </div>
      ) : (
        <div className="trade-btn-container">
          <Button className="approve-trade-btn" onClick={approveThisTrade}>Approve Trade</Button>
          <Button className="deny-trade-btn" onClick={deleteThisTrade}>Deny Trade</Button>
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
