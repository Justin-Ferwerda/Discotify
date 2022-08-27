import Image, { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

function UserCard({ userObject, src }) {
  const router = useRouter();

  const handleClick = () => {
    /* followUser(userObject.uid); */
  };

  return (
    <div className="usercard">
      <Card>
        <Card.Body>
          <Image src={src} layout="fill" />
          <Card.Title>
            {userObject.displayName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{userObject.memberSince}</Card.Subtitle>
          <Card.Text>
            {userObject.favoriteGenre}
          </Card.Text>
          <Button onClick={router.push(`/userCollection[${userObject.uid}]`)}>View Collection</Button>
          <Button onClick={handleClick}>Follow</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

UserCard.propTypes = {
  src: PropTypes.string.isRequired,
  userObject: PropTypes.shape({
    displayName: PropTypes.string,
    memberSince: PropTypes.string,
    favoriteGenre: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default UserCard;
