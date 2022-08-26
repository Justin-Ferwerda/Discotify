import axios from 'axios';
import bandsInTownAuth from '../utils/bandsInTownAuth';

const bandsInTown = (artist) => new Promise((resolve, reject) => {
  axios.get(`https://rest.bandsintown.com/artists/${artist}/events/?app_id=${bandsInTownAuth.appId}`).then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export default bandsInTown;
