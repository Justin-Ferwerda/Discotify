/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUsersWishList } from '../api/mergedData';
import AlbumCard from '../components/AlbumCard';
import { useAuth } from '../utils/context/authContext';

function WishList() {
  const { user } = useAuth();
  const [albums, setAlbums] = useState();
  const router = useRouter();

  const userWishList = () => {
    getUsersWishList(user.uid).then(setAlbums);
  };

  useEffect(() => {
    userWishList();
  }, []);

  return (
    <>
      {albums?.length ? (
        <div className="myAlbums" id="wishListContainer">
          {albums.map((album) => (
            <AlbumCard key={album.albumFirebaseKey} src={album.recordImage} albumObj={album} router={router.asPath} onUpdate={userWishList} />
          ))}
        </div>
      ) : (
        <div className="noTradesText"><div className="tText">Go to the Community Page to add Albums to Your Wishlist!</div></div>
      )}
    </>

  );
}

export default WishList;
