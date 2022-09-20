/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import YouTube from 'react-youtube';
import getVideo from '../api/youTubeData';

function VideoModal({ trackName, artistName, trackNumber }) {
  const [show, setShow] = useState(false);
  const [video, setVideo] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getTheVideo = () => {
    getVideo(`${trackName} by ${artistName}`).then(setVideo);
  };

  useEffect(() => {
    getTheVideo();
  }, []);

  return (
    <>
      <div className="tracklist-track" onClick={handleShow}><strong>{trackNumber}. </strong>{trackName}</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title><div className="modalTitle">{trackName} <u>by</u> {artistName} Live!</div></Modal.Title>
        </Modal.Header>
        <Modal.Body className="tracklist-modal"><YouTube videoId={video?.id?.videoId} opts={{ height: '250', width: '444.44', playerVars: { autoplay: 1 } }} /></Modal.Body>
      </Modal>
    </>
  );
}

VideoModal.propTypes = {
  trackName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  trackNumber: PropTypes.number.isRequired,
};

export default VideoModal;
