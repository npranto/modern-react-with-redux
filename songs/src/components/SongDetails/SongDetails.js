import React from 'react';

const SongDetails = ({ title, artist, duration }) => {
  return (
    <div className="song-details-wrapper">
      <a href="/" className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{title || 'Select a song...'}</h5>
          <small>{duration}</small>
        </div>
        {artist &&
          <p className="mb-1">By {artist}</p>
        }
      </a>
    </div>
  )
}

export default SongDetails;
