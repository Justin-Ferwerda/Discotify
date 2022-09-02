import { getSingleAlbum, getUserAlbums } from './albumData';
import { getUserWishlist } from './wishListData';

const getUsersWishList = async (uid) => {
  const userWish = await getUserWishlist(uid);
  const wishAlbums = userWish.map((wish) => wish.albumFirebaseKey);
  const albumObjects = await wishAlbums.map((firebaseKey) => getSingleAlbum(firebaseKey));
  const albumObjectArray = await Promise.all(albumObjects);
  return albumObjectArray;
};

const getArtistNames = async (uid) => {
  const userAlbums = await getUserAlbums(uid);
  const artistNames = userAlbums.map((album) => album.artistName);
  return artistNames;
};

const getUserGenres = async (uid) => {
  const userAlbums = await getUserAlbums(uid);
  const genres = userAlbums.map((album) => album.genre);
  return genres;
};

export { getUsersWishList, getArtistNames, getUserGenres };
