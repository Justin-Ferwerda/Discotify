import { useEffect, useState } from 'react';
import { getUserAlbums } from '../api/albumData';
import getUsersWishList from '../api/mergedData';
import AlbumCard from '../components/AlbumCard';
import { useAuth } from '../utils/context/authContext';

function WishList() {
  const { user } = useAuth();
  const [albums, setAlbums] = useState();

  const userWishList = () => {
    getUsersWishList(user.uid).then(setAlbums);
  };

  useEffect(() => {
    userWishList();
  });

  return (
    <div className="myAlbums">
      {albums?.map((album) => (
        <AlbumCard src={album.recordImage} albumObj={album} onUpdate={getUserAlbums} />
      ))}
    </div>
  );
}

export default WishList;
