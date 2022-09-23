import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

function ShowCard({ showObject }) {
  const dateFormat = () => {
    const date = new Date(showObject.starts_at);
    const dateToFormat = date.toISOString().substring(0, 10);
    const [year, month, day] = dateToFormat.split('-');
    const formattedDate = [month, day, year].join('/');
    return formattedDate;
  };

  return (
    <div className="showCard-container">
      <Card className="showCard">
        <Card.Body>
          <Card.Title>
            {dateFormat()}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted text-wrap">{showObject.venue.name}</Card.Subtitle>
          <Card.Text>
            {showObject.venue.location}
          </Card.Text>
          <Card.Link href={showObject.offers[0]?.url} target="_blank"><LocalActivityIcon className="ticket-icon" />Buy Tickets</Card.Link>
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
