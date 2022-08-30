import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const createWishlist = (wishListObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/wishlist.json`, wishListObj)
    .then((response) => {
      const payload = { albumFirebaseKey: response.data.name };
      axios.patch(`${dbUrl}/albums/${response.data.name}.json`, payload)
        .then((patchResponse) => resolve(patchResponse.data));
    }).catch(reject);
});

export default createWishlist;
