/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import Head from 'next/head';
import { getUserAlbums } from '../../api/albumData';
import { getUserAlbumsByGenre, getUserGenres } from '../../api/mergedData';
import { getUser } from '../../api/userData';
import AlbumCard from '../../components/AlbumCard';
import UserCard from '../../components/UserCard';

function MyAlbums() {
  const router = useRouter();
  const [albums, setAlbums] = useState([]);
  const [user, setUser] = useState({});
  const [genres, setGenres] = useState([]);
  const [selected, setSelected] = useState();
  const { uid } = router.query;
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const getYourAlbums = () => {
    getUserAlbums(uid).then(setAlbums);
  };

  const getUserObject = async () => {
    const Object = await getUser(uid);
    setUser(Object);
  };

  const getMyGenres = () => {
    getUserGenres(uid).then(setGenres);
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
    if (e.target.value === 'all-albums') {
      getUserAlbums(uid).then(setAlbums);
    } else {
      getUserAlbumsByGenre(uid, e.target.value).then(setAlbums);
    }
  };

  useEffect(() => {
    getYourAlbums();
    getUserObject();
    getMyGenres();
  }, []);

  const uniqueGenres = (array) => array.filter((v, i, a) => a.indexOf(v) === i);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = albums.filter((album) => Object.values(album).join('').toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredResults(filteredData);
    } else { setFilteredResults(albums); }
  };

  return (
    <>
      <Head>
        <title>Discotify - My Collection</title>
        <meta name="description" content="meta description for Collection Page" />
      </Head>
      <div className="collectionUserCard">
        <UserCard userObject={user} />
      </div>
      <div className="search">
        <Form.Control icon="search" placeholder="Search Albums" onChange={(e) => searchItems(e.target.value)} />
      </div>
      <div className="sort">
        <FloatingLabel controlId="floatingSelect" label="Sort">
          <Form.Select aria-label="Genre" name="genre" onChange={handleChange} className="mb-3" value={selected} required>
            <option value="all-albums">All Albums</option>
            {uniqueGenres(genres)?.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </div>
      <div className="myAlbums">
        {searchInput.length > 1 ? (
          <div>
            {filteredResults?.map((album) => (
              <AlbumCard key={album.albumFirebaseKey} src={album.recordImage} albumObj={album} onUpdate={getYourAlbums} />
            ))}
          </div>
        ) : (
          <div>
            {albums?.map((album) => (
              <AlbumCard key={album.albumFirebaseKey} src={album.recordImage} albumObj={album} onUpdate={getYourAlbums} />
            ))}
          </div>
        )}
      </div>
    </>

  );
}

export default MyAlbums;
