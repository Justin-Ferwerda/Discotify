import PropTypes from 'prop-types';

function SpotifyPlayer({ height, spotifyId }) {
  return (
    <iframe title="embed" className="embed" src={`https://open.spotify.com/embed/album/${spotifyId}?utm_source=generator`} width="100%" height={height} frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
  );
}

SpotifyPlayer.propTypes = {
  height: PropTypes.number.isRequired,
  spotifyId: PropTypes.string.isRequired,
};

export default SpotifyPlayer;
