import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createWishlist = (wishListObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/wishlist.json`, wishListObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/wishlist/${response.data.name}.json`, payload)
        .then((patchResponse) => resolve(patchResponse.data));
    }).catch(reject);
});

const getUserWishlist = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/wishlist.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getWishByFirebaseKey = (albumFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/wishlist.json?orderBy="albumFirebaseKey"&equalTo="${albumFirebaseKey}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteWish = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/wishlist/${firebaseKey}.json`)
    .then(resolve)
    .catch(reject);
});

export {
  createWishlist, getUserWishlist, getWishByFirebaseKey, deleteWish,
};
