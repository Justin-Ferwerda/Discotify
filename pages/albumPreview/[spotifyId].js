import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { getAlbumBySpotifyId, getAlbums } from '../../api/albumData';
import SpotifyPlayer from '../../components/SpotifyPlayer';
import { useAuth } from '../../utils/context/authContext';
import { createWishlist } from '../../api/wishListData';

function AlbumPreview() {
  const router = useRouter();
  const { spotifyId } = router.query;
  const [albums, setAlbums] = useState([]);
  const { user } = useAuth();

  const handleClick = () => {
    router.push(`/album/saveToCollection/${spotifyId}`);
  };

  const setState = () => {
    getAlbums().then(setAlbums);
  };

  const addWishlist = () => {
    getAlbumBySpotifyId(spotifyId).then((album) => {
      const payload = {
        albumFirebaseKey: album.albumFirebaseKey,
        uid: user.uid,
      };

      createWishlist(payload);
      window.confirm(`added ${album.albumName} by ${album.artistName} to your wishlist!`);
      router.push('/');
    });
  };

  useEffect(() => {
    setState();
  }, []);

  return (
    <>
      <Head>
        <title>Discotify - Preview</title>
        <meta name="description" content="meta description for Album Preview Page" />
      </Head>
      {albums.some((album) => album.spotifyId === spotifyId) ? (
        <div>
          <h2 className="album-owned">Sorry album is already owned, would you like to add this album to your wishlist?</h2>
          <Button onClick={addWishlist}>Yes</Button>
          <Button onClick={() => router.push('/')}>Maybe Later</Button>
        </div>
      ) : (
        <div className="albumPreviewPage">
          <div className="preview-player">
            <SpotifyPlayer spotifyId={spotifyId} height={360} />
          </div>
          <Button className="save-to-collection-btn" onClick={handleClick}>Save To Collection</Button>
        </div>
      )}
    </>

  );
}

export default AlbumPreview;
