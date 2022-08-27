/* import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { updateAlbum } from '../../api/albumData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {

};

function AlbumForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [genres, setGenres] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGenres().then(setGenres);
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAlbum(formInput, formInput.firebaseKey)
        .then(() => router.push(`/collection/${user.uid}`));
    } else {
      const payload = {
        ...formInput, uid: user.uid, artistName: obj.artists[0].name, spotifyId: obj.id,
      };
    }
  };
}

export default AlbumForm;
 */
