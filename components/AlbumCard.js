/* eslint-disable no-nested-ternary */
/* eslint-disable @next/next/no-img-element */
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { deleteAlbumAndWish } from '../api/mergedData';
import TracklistModal from './TracklistModal';
import { useAuth } from '../utils/context/authContext';
import { createWishlist, deleteWish, getWishByFirebaseKey } from '../api/wishListData';

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

  const addToWishlist = () => {
    const payload = {
      albumFirebaseKey: albumObj.albumFirebaseKey,
      uid: user.uid,
    };

    createWishlist(payload);
    window.confirm(`added ${albumObj.albumName} by ${albumObj.artistName} to your wishlist!`);
  };

  const removeFromWishlist = async () => {
    const wishObject = await getWishByFirebaseKey(albumObj.albumFirebaseKey, user);
    deleteWish(wishObject.firebaseKey).then(() => onUpdate());
  };

  return (
    <div className="albumCard">
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
          {/* <div className="tracklist">{trackList}</div> */}
          <iframe title="embed" className="embed" src={`https://open.spotify.com/embed/album/${albumObj?.spotifyId}?utm_source=generator`} width="100%" height="80" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
          <h6>{albumObj?.creatorName}</h6>
          <img className="albumCardUserImage" src={albumObj?.creatorImage} alt="headshot" />
          <div className="cardButtons">
            {albumObj?.uid === user.uid ? (
              <>
                <Link href={`/album/edit/${albumObj?.albumFirebaseKey}`} passHref>
                  <Button size="sm" variant="outline-secondary">EDIT</Button>
                </Link>
                <Button size="sm" variant="outline-danger" onClick={deleteThisAlbum} className="m-2">
                  DELETE
                </Button>
              </>
            ) : router === '/wishlist' ? (
              <>
                <Button size="sm" variant="outline-secondary" onClick={removeFromWishlist}>Remove From Wishlist</Button>
                <Link href={`/trade/${albumObj?.albumFirebaseKey}`} passHref>
                  <Button size="sm" variant="outline-secondary">TRADE</Button>
                </Link>
              </>
            ) : (
              <Button size="sm" variant="outline-secondary" onClick={addToWishlist}>Add to Wishlist</Button>
            )}
          </div>

        </BackSide>
      </Flippy>
    </div>
  );
}

AlbumCard.propTypes = {
  src: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
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
};

export default AlbumCard;
