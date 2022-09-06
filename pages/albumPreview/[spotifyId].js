import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAlbums } from '../../api/albumData';
import SpotifyPlayer from '../../components/SpotifyPlayer';

function AlbumPreview() {
  const router = useRouter();
  const { spotifyId } = router.query;
  const [albums, setAlbums] = useState([]);

  const handleClick = () => {
    router.push(`/album/saveToCollection/${spotifyId}`);
  };

  const setState = () => {
    getAlbums().then(setAlbums);
  };

  useEffect(() => {
    setState();
  }, []);

  return (
    albums.some((album) => album.spotifyId === spotifyId) ? (
      <div>
        <h1>Sorry album is already owned, please pick another!</h1>
      </div>
    ) : (
      <div className="albumPreviewPage">
        <SpotifyPlayer spotifyId={spotifyId} height={360} />
        <Button onClick={handleClick}>Save To Collection</Button>
      </div>
    )

  );
}

export default AlbumPreview;
