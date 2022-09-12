/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { getUserGenres } from '../api/mergedData';
import { useAuth } from '../utils/context/authContext';

function UserCard({ userObject }) {
  const router = useRouter();
  const [genre, setGenre] = useState('');
  const { user } = useAuth();

  const handleClick = () => {
    router.push(`/collection/${userObject.uid}`);
  };

  const favoriteGenre = (arr) => {
    const favGenre = arr.sort((a, b) => arr.filter((v) => v === a).length
  - arr.filter((v) => v === b).length).pop();
    return favGenre;
  };

  const getFavoriteGenre = async () => {
    const genres = await getUserGenres(userObject.uid);
    return favoriteGenre(genres);
  };

  useEffect(() => {
    getFavoriteGenre().then(setGenre);
  }, [userObject]);

  return (
    <div className="usercard">
      <Card className="userCard">
        <Card.Body>
          <Avatar alt={userObject.userName} src={userObject.userImage} sx={{ width: 75, height: 75 }} />
          <Card.Title>
            {userObject.userName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted"><strong>Member Since: </strong>{userObject.memberSince}</Card.Subtitle>
          <Card.Text>
            <strong>Favorite Genre: {genre} </strong>
          </Card.Text>
          {userObject.uid === user.uid ? (
            <div />
          ) : router.asPath === `/collection/${userObject.uid}` ? (
            <div />
          ) : (
            <div>
              <Button className="view-collection-btn" variant="outline-secondary" onClick={handleClick}>View Collection</Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

UserCard.propTypes = {
  userObject: PropTypes.shape({
    userName: PropTypes.string,
    userImage: PropTypes.string,
    memberSince: PropTypes.string,
    favoriteGenre: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default UserCard;
