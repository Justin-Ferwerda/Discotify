import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes, { string } from 'prop-types';
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
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title><div className="modalTitle"><i>{obj.albumName}</i> by <u>{obj.artistName}</u> Tracklist</div></Modal.Title>
        </Modal.Header>
        <Modal.Body className="tracklist-modal">{obj.trackList.map((track) => <div className="modalTracks"><strong>{track.track_number}.</strong> {track.name}</div>)}</Modal.Body>
      </Modal>
    </>
  );
}

TracklistModal.propTypes = {
  obj: PropTypes.shape({
    albumName: PropTypes.string,
    trackList: PropTypes.arrayOf(PropTypes.string),
    artistName: string,
  }).isRequired,
};

export default TracklistModal;
