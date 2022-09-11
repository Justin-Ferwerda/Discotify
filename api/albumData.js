import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createAlbum = (albumObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/albums.json`, albumObj)
    .then((response) => {
      const payload = { albumFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/albums/${response.data.name}.json`, payload)
        .then((patchResponse) => resolve(patchResponse.data));
    }).catch(reject);
});

const getAlbums = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/albums.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const getUserAlbums = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/albums.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const updateAlbum = (albumObject, albumFirebaseKey) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/albums/${albumFirebaseKey}.json`, albumObject)
    .then(() => {
      getUserAlbums(albumObject.uid).then(resolve);
    }).catch(reject);
});

const deleteSingleAlbum = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/albums/${firebaseKey}.json`)
    .then(() => {
      getUserAlbums(firebaseKey).then((albumsArray) => resolve(albumsArray));
    }).catch((error) => reject(error));
});

const getSingleAlbum = (albumFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/albums/${albumFirebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const getAlbumBySpotifyId = (spotifyId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/albums.json?orderBy="spotifyId"&equalTo="${spotifyId}"`)
    .then((response) => resolve(Object.values(response.data).shift()))
    .catch((error) => reject(error));
});

export {
  createAlbum, updateAlbum, getUserAlbums, deleteSingleAlbum, getSingleAlbum, getAlbums, getAlbumBySpotifyId,
};
