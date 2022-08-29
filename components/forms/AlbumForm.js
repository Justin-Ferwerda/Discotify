import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createAlbum, updateAlbum } from '../../api/albumData';
import getGenres from '../../api/genreData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  spins: 0,
};

function AlbumForm({ obj }) {
  const [formInput, setFormInput] = useState();
  const [genres, setGenres] = useState();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getGenres().then(setGenres);
    setFormInput(obj);
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
        ...formInput,
      };
      createAlbum(payload).then(() => router.push(`/collection/${user.uid}`));
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-black mt-5">{
          obj.firebaseKey ? 'Update' : 'Add'
} Album
        </h2>
        <FloatingLabel controlId="floatingInput1" label="Artist Name" className="mb-3">
          <Form.Control type="text" placeholder="Artist Name" name="artistName" value={formInput?.artistName} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Album Name" className="mb-3">
          <Form.Control type="text" placeholder="Album Name" name="albumName" value={formInput?.albumName} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Release Date" className="mb-3">
          <Form.Control type="text" placeholder="Release Date" name="release_date" value={formInput?.release_date} onChange={handleChange} required />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="Category">
          <Form.Select aria-label="Genre" name="genre" onChange={handleChange} className="mb-3" value={obj.genre} required>
            <option value="">Select a Genre</option>
            {genres?.map((genre) => (
              <option key={genre.genreName} value={genre.genreName}>
                {genre.genreName}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </Form>
    </div>
  );
}

AlbumForm.propTypes = {
  obj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    genre: PropTypes.string,
  }),
};

AlbumForm.defaultProps = {
  obj: initialState,
};

export default AlbumForm;
