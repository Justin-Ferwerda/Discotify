import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ShowCard({ showObject }) {
  return (
    <div className="showCard-container">
      <Card className="showCard">
        <Card.Body>
          <Card.Title>
            {showObject.starts_at}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{showObject.venue.name}</Card.Subtitle>
          <Card.Text>
            {showObject.venue.location}
          </Card.Text>
          <Card.Link href={showObject.offers[0]?.url} target="_blank">Buy Tickets</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}

ShowCard.propTypes = {
  showObject: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default ShowCard;
