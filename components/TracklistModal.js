import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

function TracklistModal({ obj }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button size="sm" variant="outline-info" onClick={handleShow}>
        view Tracklist
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{obj.albumName} Tracklist</Modal.Title>
        </Modal.Header>
        <Modal.Body>{obj.trackList.map((track) => track.track_number + track.name)}</Modal.Body>
      </Modal>
    </>
  );
}

TracklistModal.propTypes = {
  obj: PropTypes.shape({
    albumName: PropTypes.string,
    trackList: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default TracklistModal;
