import axios from 'axios';
import spotifyAuth from '../utils/spotifyAuth';

const capitalizeAlbum = (albumName) => {
  const words = albumName.split(' ');
  return words.map((word) => word[0].toUpperCase() + word.substring(1)).join(' ');
};

const spotify = () => new Promise((resolve, reject) => {
  axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${spotifyAuth.clientId}:${spotifyAuth.clientSecret}`)}`,
    },
    data: 'grant_type=client_credentials',
    method: 'POST',
  }).then((response) => resolve(response.data.access_token))
    .catch((error) => reject(error));
});

const spotifySearch = (token, albumTitle) => new Promise((resolve, reject) => {
  const albumName = capitalizeAlbum(albumTitle);
  axios.get(`https://api.spotify.com/v1/search?q=${albumName}&type=album`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    const albumObject = response.data.albums.items.filter((album) => album.name === `${albumTitle}` && album.album_type === 'album');
    resolve(albumObject.shift());
  }).catch((error) => reject(error));
});

const getAlbum = (token, spotifyId) => new Promise((resolve, reject) => {
  axios.get(`https://api.spotify.com/v1/albums/${spotifyId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export { spotify, spotifySearch, getAlbum };
