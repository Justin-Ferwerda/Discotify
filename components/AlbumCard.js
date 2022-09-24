/* eslint-disable no-nested-ternary */
/* eslint-disable @next/next/no-img-element */
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TracklistModal from './TracklistModal';
import { useAuth } from '../utils/context/authContext';
import {
  createWishlist, deleteWish, getUserWishlist,
} from '../api/wishListData';
import { deleteAlbumAndWish } from '../api/mergedData';
import SpotifyPlayer from './SpotifyPlayer';

function AlbumCard({
  // eslint-disable-next-line no-unused-vars
  src, albumObj, onUpdate, router,
}) {
  const { user } = useAuth();
  const ref = useRef();

  const deleteThisAlbum = () => {
    if (window.confirm(`Delete ${albumObj.albumName}?`)) {
      deleteAlbumAndWish(albumObj.albumFirebaseKey).then(() => onUpdate());
    }
  };

  const addToWishlist = async () => {
    const wishes = await getUserWishlist(user.uid);
    if (wishes.filter((wish) => wish.albumFirebaseKey === albumObj?.albumFirebaseKey).length) {
      alert('Album already in Wishlist!');
    } else {
      const payload = {
        albumFirebaseKey: albumObj.albumFirebaseKey,
        uid: user.uid,
      };
      createWishlist(payload);
      window.confirm(`added ${albumObj.albumName} by ${albumObj.artistName} to your wishlist!`);
    }
  };

  const removeFromWishlist = async () => {
    const wishList = await getUserWishlist(user.uid);
    const wishToRemove = wishList.filter((wish) => wish.albumFirebaseKey === albumObj?.albumFirebaseKey);
    deleteWish(wishToRemove[0].firebaseKey).then(() => onUpdate());
  };

  return (
    <div className="albumCard border border-dark">
      <Flippy
        flipOnHover={false}
        flipOnClick
        flipDirection="horizontal"
        ref={ref}
        style={{ width: '300px', height: '300px', margin: '10px' }}
      >
        <FrontSide className="cardFront">
          <img src={src} alt="album cover" />
        </FrontSide>
        <BackSide className="cardBack" style={{ backgroundColor: '#fff6ea' }}>
          <TracklistModal className="modal" obj={albumObj} />
          <h6 className="artistName">{albumObj?.artistName}</h6>
          <h6 className="albumName">{albumObj?.albumName}</h6>
          <h6>released: {albumObj?.release_date}</h6>
          <SpotifyPlayer height={80} spotifyId={albumObj?.spotifyId} />
          <img className="albumCardUserImage" src={albumObj?.creatorImage} alt="headshot" />
          <div className="cardButtons">
            {router === `/trade/trades/${user.uid}` ? (<div />) : albumObj?.uid === user.uid ? (
              <>
                <Link href={`/album/edit/${albumObj?.albumFirebaseKey}`} passHref>
                  <IconButton aria-label="edit" className="edit-btn">
                    <EditIcon style={{ color: 'black' }} />
                  </IconButton>
                </Link>
                <IconButton aria-label="delete" className="delete-btn " onClick={deleteThisAlbum}>
                  <DeleteIcon style={{ color: 'black' }} />
                </IconButton>
              </>
            ) : router === '/wishlist' ? (
              <>
                <Button size="sm" className="remove-wishlist-btn" variant="outline-secondary" onClick={removeFromWishlist}>Remove From Wishlist</Button>
                <Link href={`/trade/${albumObj?.albumFirebaseKey}`} passHref>
                  <Button size="sm" className="trade-btn" variant="outline-secondary">TRADE</Button>
                </Link>
              </>
            ) : router === `/trade/${albumObj?.albumFirebaseKey}` ? (<div />) : (
              <Button className="add-to-wishlist-btn" size="sm" variant="outline-secondary" onClick={addToWishlist}>Add to Wishlist</Button>
            )}
          </div>

        </BackSide>
      </Flippy>
    </div>
  );
}

AlbumCard.propTypes = {
  src: PropTypes.string,
  onUpdate: PropTypes.func,
  albumObj: PropTypes.shape({
    artistName: PropTypes.string,
    albumName: PropTypes.string,
    release_date: PropTypes.string,
    spotifyId: PropTypes.string,
    uid: PropTypes.string,
    albumFirebaseKey: PropTypes.string,
    creatorName: PropTypes.string,
    creatorImage: PropTypes.string,
  }).isRequired,
  trackList: PropTypes.shape({
    track: PropTypes.string,
  }).isRequired,
  router: PropTypes.string,
};

AlbumCard.defaultProps = {
  router: '',
  onUpdate: null,
  src: '',
};

export default AlbumCard;
