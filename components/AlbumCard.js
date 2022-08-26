import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { useRef } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { deleteSingleAlbum } from '../api/albumData';

function AlbumCard({
  src, albumObj, user, onUpdate, trackList,
}) {
  const deleteThisAlbum = () => {
    if (window.confirm(`Delete ${albumObj.albumTitle}?`)) {
      deleteSingleAlbum(albumObj.firebaseKey).then(() => onUpdate());
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
          <Image src={src} layout="fill" />
        </FrontSide>
        <BackSide className="cardBack" style={{ backgroundColor: '#FFFFFF' }}>
          <h6>{albumObj.artistName}</h6>
          <h6>{albumObj.albumTitle}</h6>
          <h6>{albumObj.releaseDate}</h6>
          <div className="tracklist">{trackList}</div>
          <iframe title="embed" className="embed" src={`https://open.spotify.com/embed/album/${albumObj.spotifyId}?utm_source=generator`} width="100%" height="80" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
          <h6>{user.displayName}</h6>
          <h6>{user.photoURL}</h6>
          {albumObj.uid === user.uid ? (
            <>
              <Link href={`/album/edit/${albumObj.firebaseKey}`} passHref>
                <Button variant="outline-secondary">EDIT</Button>
              </Link>
              <Button variant="outline-danger" onClick={deleteThisAlbum} className="m-2">
                DELETE
              </Button>
            </>
          ) : (
            <Link href={`/album/wishlist/${albumObj.firebaseKey}`} passHref>
              <Button variant="outline-secondary">Add to Wishlist</Button>
            </Link>
          )}
          <Link href={`/album/trade/${albumObj.firebaseKey}`} passHref>
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
  user: PropTypes.shape({
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  albumObj: PropTypes.shape({
    artistName: PropTypes.string,
    albumTitle: PropTypes.string,
    releaseDate: PropTypes.string,
    spotifyId: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  trackList: PropTypes.shape({
    track: PropTypes.string,
  }).isRequired,
};

export default AlbumCard;
