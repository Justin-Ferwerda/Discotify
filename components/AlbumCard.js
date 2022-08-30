/* eslint-disable @next/next/no-img-element */
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { deleteSingleAlbum } from '../api/albumData';

function AlbumCard({
  // eslint-disable-next-line no-unused-vars
  src, albumObj, uid, onUpdate, trackList,
}) {
  const deleteThisAlbum = () => {
    if (window.confirm(`Delete ${albumObj.albumName}?`)) {
      deleteSingleAlbum(albumObj.albumFirebaseKey).then(() => onUpdate());
    }
  };

  const ref = useRef();
  return (
    <div className="albumCard">
      <Flippy
        flipOnHover={false}
        flipOnClick
        flipDirection="horizontal"
        ref={ref}
        style={{ width: '300px', height: '300px', margin: '10px' }}
      >
        <FrontSide className="cardFront" style={{ }}>
          <img src={src} alt="album cover" />
        </FrontSide>
        <BackSide className="cardBack" style={{ backgroundColor: '#FFFFFF' }}>
          <h6>{albumObj.artistName}</h6>
          <h6>{albumObj.albumName}</h6>
          <h6>{albumObj.releaseDate}</h6>
          {/* <div className="tracklist">{trackList}</div> */}
          <iframe title="embed" className="embed" src={`https://open.spotify.com/embed/album/${albumObj.spotifyId}?utm_source=generator`} width="100%" height="80" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
          <h6>{albumObj.creatorName}</h6>
          <img src={albumObj.creatorImage} alt="headshot" />
          {albumObj.uid === uid ? (
            <>
              <Link href={`/album/edit/${albumObj.albumFirebaseKey}`} passHref>
                <Button variant="outline-secondary">EDIT</Button>
              </Link>
              <Button variant="outline-danger" onClick={deleteThisAlbum} className="m-2">
                DELETE
              </Button>
            </>
          ) : (
            <Link href={`/album/wishlist/${albumObj.albumFirebaseKey}`} passHref>
              <Button variant="outline-secondary">Add to Wishlist</Button>
            </Link>
          )}
          <Link href={`/album/trade/${albumObj.albumFirebaseKey}`} passHref>
            <Button variant="outline-secondary">TRADE</Button>
          </Link>
        </BackSide>
      </Flippy>;
    </div>
  );
}

AlbumCard.propTypes = {
  src: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
  albumObj: PropTypes.shape({
    artistName: PropTypes.string,
    albumName: PropTypes.string,
    releaseDate: PropTypes.string,
    spotifyId: PropTypes.string,
    uid: PropTypes.string,
    albumFirebaseKey: PropTypes.string,
    creatorName: PropTypes.string,
    creatorImage: PropTypes.string,
  }).isRequired,
  trackList: PropTypes.shape({
    track: PropTypes.string,
  }).isRequired,
};

export default AlbumCard;
