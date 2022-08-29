import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getGenres = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/genres.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export default getGenres;
