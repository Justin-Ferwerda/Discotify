import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createTrade = (tradeObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/trades.json`, tradeObj)
    .then((response) => {
      const payload = { tradeFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/trades/${response.data.name}.json`, payload)
        .then(resolve);
    }).catch(reject);
});

const getUserTrades = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trades.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const getUserTradeRequests = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trades.json?orderBy="tradeRecipientUid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

const deleteSingleTrade = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/trades/${firebaseKey}.json`)
    .then(resolve)
    .catch((error) => reject(error));
});

const getAllTrades = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trades.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

export {
  createTrade, getUserTrades, deleteSingleTrade, getUserTradeRequests, getAllTrades,
};
