import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { spotify, spotifySearch } from '../api/spotifyData';

function Home() {
  const [formInput, setFormInput] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const album = formInput.albumName;
    const token = await spotify();
    spotifySearch(token, album).then((response) => router.push(`/albumPreview/${response.id}`));
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
        color: 'white',
      }}
    >
      <p>Go ahead and browse our extensive record collection! Enter an album name below and preview your selection!</p>
      <Form onSubmit={handleSubmit}>
        <Form.Control type="text" placeholder="Enter Album Name" name="albumName" value={formInput.albumName} onChange={handleChange} required />
        <Button type="submit">Play Album</Button>
      </Form>
    </div>
  );
}

export default Home;
