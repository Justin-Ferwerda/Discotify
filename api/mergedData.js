import { deleteSingleAlbum, getSingleAlbum, getUserAlbums } from './albumData';
import { deleteSingleTrade, getAllTrades } from './tradeData';
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

const deleteAlbumTrades = (albumFirebaseKey) => new Promise((resolve, reject) => {
  getAllTrades().then((tradesArray) => {
    const albumTrades = tradesArray.filter((trade) => trade.traderAlbumFBKey === albumFirebaseKey || trade.tradeRecipientAlbumFBKey === albumFirebaseKey);
    console.warn(albumTrades);
    const deletedTrades = albumTrades.map((trade) => deleteSingleTrade(trade.tradeFirebaseKey));
    Promise.all(deletedTrades).then(() => {
      deleteSingleAlbum(albumFirebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

const deleteAlbumAndWish = (albumFirebaseKey) => new Promise((resolve, reject) => {
  getWishByFirebaseKey(albumFirebaseKey).then((wishArray) => {
    const deletedWishes = wishArray.map((wish) => deleteWish(wish.firebaseKey));
    Promise.all(deletedWishes).then(() => {
      deleteAlbumTrades(albumFirebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  getUsersWishList, getArtistNames, getUserGenres, deleteAlbumAndWish,
};
