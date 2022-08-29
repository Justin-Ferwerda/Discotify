import { useRouter } from 'next/router';
import SpotifyPlayer from '../../components/SpotifyPlayer';

function AlbumPreview() {
  const router = useRouter();
  const { spotifyId } = router.query;

  return (
    <SpotifyPlayer spotifyId={spotifyId} height={360} />
  );
}

export default AlbumPreview;
