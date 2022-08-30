import { getSingleAlbum } from './albumData';
import { getUserWishlist } from './wishListData';

const getUsersWishList = async (uid) => {
  const userWish = await getUserWishlist(uid);
  const wishAlbums = userWish.map((wish) => wish.albumFirebaseKey);
  const albumObjects = await wishAlbums.map((firebaseKey) => getSingleAlbum(firebaseKey));
  const albumObjectArray = await Promise.all(albumObjects);
  return albumObjectArray;
};

export default getUsersWishList;
