/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import Head from 'next/head';
import { getUserAlbums, getSingleAlbum } from '../../api/albumData';
import { createTrade } from '../../api/tradeData';
import AlbumCard from '../../components/AlbumCard';
import { useAuth } from '../../utils/context/authContext';

function Trade() {
  const { user } = useAuth();
  const router = useRouter();
  const [albums, setAlbums] = useState([]);
  const [tradeObject, setTradeObject] = useState([]);
  const [formInput, setFormInput] = useState();
  const { albumFirebaseKey } = router.query;

  const getMyAlbums = () => {
    getUserAlbums(user.uid).then(setAlbums);
    getSingleAlbum(albumFirebaseKey).then(setTradeObject);
  };

  useEffect(() => {
    getMyAlbums();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      tradeRecipientUid: tradeObject.uid,
      uid: user.uid,
      traderAlbumFBKey: formInput.albumName,
      tradeRecipientAlbumFBKey: tradeObject.albumFirebaseKey,
    };
    createTrade(payload).then(() => {
      router.push(`/trade/trades/${user.uid}`);
    });
  };

  return (
    <>
      <Head>
        <title>Discotify - Create Trade</title>
        <meta name="description" content="meta description for Create Trade Page" />
      </Head>
      <div className="tradeContainer">
        <AlbumCard src={tradeObject.recordImage} albumObj={tradeObject} />
      </div>
      <div className="my albums">
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingSelect" label="album">
            <Form.Select aria-label="album" name="albumName" onChange={handleChange} className="mb-3" value={formInput?.albumFirebaseKey} required>
              <option value="">Select an Album From Your Collection to Trade</option>
              {albums?.map((album) => (
                <option key={album.albumFirebaseKey} value={album.albumFirebaseKey}>
                  {album.albumName} - {album.artistName}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <Button type="submit">Request Trade</Button>
        </Form>
      </div>
    </>

  );
}

export default Trade;
