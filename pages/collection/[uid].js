/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { getUserAlbums } from '../../api/albumData';
import { getUser } from '../../api/userData';
import AlbumCard from '../../components/AlbumCard';
import UserCard from '../../components/UserCard';

function MyAlbums() {
  const router = useRouter();
  const [albums, setAlbums] = useState([]);
  const [user, setUser] = useState({});
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

  useEffect(() => {
    getYourAlbums();
    getUserObject();
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filteredData = albums.filter((album) => Object.values(album).join('').toLowerCase().includes(searchInput.toLowerCase()));
      setFilteredResults(filteredData);
    } else { setFilteredResults(albums); }
  };

  return (
    <>
      <div className="collectionUserCard">
        <UserCard userObject={user} />
      </div>
      <div className="search">
        <Form.Control icon="search" placeholder="Search Albums" onChange={(e) => searchItems(e.target.value)} />
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
