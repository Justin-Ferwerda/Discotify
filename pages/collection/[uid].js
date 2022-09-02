/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUserAlbums } from '../../api/albumData';
import { getUser } from '../../api/userData';
import AlbumCard from '../../components/AlbumCard';
import UserCard from '../../components/UserCard';

function MyAlbums() {
  const router = useRouter();
  const [albums, setAlbums] = useState();
  const [user, setUser] = useState({});
  const { uid } = router.query;

  const getYourAlbums = () => {
    getUserAlbums(uid).then(setAlbums);
  };

  const getUserObject = async () => {
    const Object = await getUser(uid);
    setUser(Object);
  };

  useEffect(() => {
    getYourAlbums();
    getUserObject();
  }, []);

  return (
    <>
      <div className="collectionUserCard">
        <UserCard userObject={user} />
      </div>
      <div className="myAlbums">
        {albums?.map((album) => (
          <AlbumCard key={album.albumFirebaseKey} src={album.recordImage} albumObj={album} onUpdate={getYourAlbums} />
        ))}
      </div>
    </>

  );
}

export default MyAlbums;
