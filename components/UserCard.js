import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

function UserCard({ userObject }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/collection/${userObject.uid}`);
  };

  return (
    <div className="usercard">
      <Card>
        <Card.Body>
          <Card.Img variant="top" src={userObject.userImage} />
          <Card.Title>
            {userObject.userName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted"><strong>Member Since: </strong>{userObject.memberSince}</Card.Subtitle>
          <Card.Text>
            <strong>Favorite Genre: </strong>{userObject.favoriteGenre}
          </Card.Text>
          <Button onClick={handleClick}>View Collection</Button>
          <Button>Follow</Button>
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
