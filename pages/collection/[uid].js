/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserAlbums } from '../../api/albumData';
import AlbumCard from '../../components/AlbumCard';

function MyAlbums() {
  const router = useRouter();
  const [albums, setAlbums] = useState();
  const { uid } = router.query;

  const getYourAlbums = () => {
    getUserAlbums(uid).then(setAlbums);
  };

  useEffect(() => {
    getYourAlbums();
  }, []);

  return (
    <div className="myAlbums">
      {albums?.map((album) => (
        <AlbumCard key={album.albumFirebaseKey} src={album.recordImage} albumObj={album} onUpdate={getYourAlbums} />
      ))}
    </div>
  );
}

export default MyAlbums;
