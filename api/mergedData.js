import { deleteSingleAlbum, getSingleAlbum, getUserAlbums } from './albumData';
import { deleteWish, getUserWishlist, getWishByFirebaseKey } from './wishListData';

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

const deleteAlbumAndWish = (albumFirebaseKey) => new Promise((resolve, reject) => {
  getWishByFirebaseKey(albumFirebaseKey).then((wishArray) => {
    const deletedWishes = wishArray.map((wish) => deleteWish(wish.firebaseKey));
    Promise.all(deletedWishes).then(() => {
      deleteSingleAlbum(albumFirebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  getUsersWishList, getArtistNames, getUserGenres, deleteAlbumAndWish,
};
