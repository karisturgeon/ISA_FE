import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MESSAGES from '../lang/en.js';

const STRINGS = MESSAGES.SONG;

const SongPlayer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { songUrl, songId } = location.state || {};

  if (!songUrl) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="card shadow p-4 text-center" style={{ maxWidth: '500px' }}>
          <h4 className="text-danger">{STRINGS.noSong}</h4>
          <p>{STRINGS.tryAgain}</p>
          <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>
            {STRINGS.backHome}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow p-4 text-center" style={{ maxWidth: '600px', width: '90%' }}>
        <h2 className="mb-3">{STRINGS.genSong}</h2>
        <p className="mb-4">{STRINGS.playing} <strong>{songId || STRINGS.unknown}</strong></p>
        <audio controls className="w-100 mb-3">
          <source src={songUrl} type="audio/wav" />
          {STRINGS.error}
        </audio>
        <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
          {STRINGS.backHome}
        </button>
      </div>
    </div>
  );
};

export default SongPlayer;
