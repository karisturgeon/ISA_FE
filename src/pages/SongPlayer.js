import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SongPlayer = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const sampleSongUrl = "https://oceaan-pendharkar.com/isa-be/ISA_BE/songs/song_002.wav";

    const {songUrl, songId} = location.state || {};
    console.log("songURL: " + songUrl)

    if (!songUrl) {
        return (
            <div className="song-container">
                <h2>No Song Found</h2>
                <p>Please go back and try again</p>
                <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="song-container">
            <h2>Generated Song</h2>
            <p>Playing: {songId || 'Unknown Song'}</p>
            <audio controls>
                <source src={songUrl} type="audio/wav" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default SongPlayer;
