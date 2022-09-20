import axios from 'axios';
import youTubeAuth from '../utils/youTubeAuth';

const getVideo = (artistAndAlbum) => new Promise((resolve, reject) => {
  axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${artistAndAlbum}&key=${youTubeAuth.apiKey}`)
    .then((response) => resolve(response.data.items.filter((video) => video.snippet.title.toLowerCase().includes('live')).shift()))
    .catch((error) => reject(error));
});

export default getVideo;
