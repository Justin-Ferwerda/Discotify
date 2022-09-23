/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import bandsInTown from '../api/bandsInTownData';
import { getArtistNames } from '../api/mergedData';
import { getAllUsers } from '../api/userData';
import ShowCard from '../components/ShowCard';
import UserCard from '../components/UserCard';
import { useAuth } from '../utils/context/authContext';

function Community() {
  const [users, setUsers] = useState([]);
  const [artists, setArtists] = useState([]);
  const [formInput, setFormInput] = useState();
  const [shows, setShows] = useState([]);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bandsInTown(formInput.artistName).then(setShows);
  };

  const getUsersandArtists = () => {
    getAllUsers().then((response) => {
      const otherUsers = response.filter((userObj) => userObj.uid !== user.uid);
      setUsers(otherUsers);
    });
    getArtistNames(user.uid).then(setArtists);
  };

  useEffect(() => {
    getUsersandArtists();
  }, []);

  return (
    <>
      <div className="communityPage">
        <Head>
          <title>Discotify - Community</title>
          <meta name="description" content="meta description for Community Page" />
        </Head>
        <div className="userCardContainer">
          {users?.map((userObj) => (
            <UserCard key={userObj.firebaseKey} userObject={userObj} />
          ))}
        </div>
        <div className="showFormContainer">
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingSelect" label="Artist">
              <Form.Select aria-label="Artist" name="artistName" onChange={handleChange} className="mb-3" value={formInput?.artistName} required>
                <option value="">Select an Artist From Your Collection</option>
                {artists?.map((artist) => (
                  <option key={artist} value={artist}>
                    {artist}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <Button className="shows-btn" type="submit">Get Upcoming Shows</Button>
          </Form>

        </div>
        <div className="showCardContainer">
          {shows?.map((show) => (
            <ShowCard key={show.id} showObject={show} />
          ))}
        </div>
      </div>

    </>

  );
}

export default Community;
