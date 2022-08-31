import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const addUser = (user) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/users.json`, user)
    .then((firebaseKey) => {
      const update = { firebaseKey: firebaseKey.data.name };
      axios.patch(`${dbUrl}/users/${firebaseKey.data.name}.json`, update)
        .then((response) => resolve(response.data));
    }).catch(reject);
});

const getUser = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => resolve(Object.values(response.data)[0]))
    .catch((reject));
});

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/users.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

export { addUser, getUser, getAllUsers };
