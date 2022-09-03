import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import SpotifyPlayer from '../../components/SpotifyPlayer';

function AlbumPreview() {
  const router = useRouter();
  const { spotifyId } = router.query;

  const handleClick = () => {
    router.push(`/album/saveToCollection/${spotifyId}`);
  };

  return (
    <div className="albumPreviewPage">
      <SpotifyPlayer spotifyId={spotifyId} height={360} />
      <Button onClick={handleClick}>Save To Collection</Button>
    </div>

  );
}

export default AlbumPreview;
