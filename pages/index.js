import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
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
    spotifySearch(token, album).then((response) => {
      if (response) {
        router.push(`/albumPreview/${response.id}`);
      } else {
        alert('This record does not appear to be in our collection. Please try a different album!');
      }
    });
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '700px',
        margin: '0 auto',
        color: 'white',
      }}
    >
      <Head>
        <title>Discotify - Home</title>
        <meta name="description" content="meta description for Home Page" />
      </Head>
      <h4 className="welcome-message">Go ahead and browse our extensive record collection! Enter an album name below and preview your selection!</h4>
      <Form onSubmit={handleSubmit} className="enter-album-name">
        <Form.Control type="text" placeholder="Enter Album Name" name="albumName" value={formInput.albumName} onChange={handleChange} required />
        <Button className="play-album-btn" type="submit">Play Album</Button>
      </Form>
    </div>
  );
}

export default Home;
