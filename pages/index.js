import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { spotify, spotifySearch } from '../api/spotifyData';

function Home() {
  const [formInput, setFormInput] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const token = await spotify();
    spotifySearch(token, formInput.album).then((response) => (
      <iframe title="embed" className="embed" src={`https://open.spotify.com/embed/album/${response.id}?utm_source=generator`} width="100%" height="360" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />

    ));
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <p>Go ahead and browse our extensive record collection! Enter an album name below and preview your selection!</p>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="floatingInput1" label="Title" className="mb-3">
          <Form.Control type="text" placeholder="Enter Title" name="title" value={formInput.title} onChange={handleChange} required />
        </FloatingLabel>
        <Button type="submit">Play Record</Button>
      </Form>
    </div>
  );
}

export default Home;
