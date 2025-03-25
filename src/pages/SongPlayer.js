import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MESSAGES from '../lang/en.js'

const STRINGS = MESSAGES.SONG;

const SongPlayer = () => {

    const location = useLocation();
    const navigate = useNavigate();

    //const sampleSongUrl = "https://oceaan-pendharkar.com/isa-be/ISA_BE/songs/song_002.wav";

    const {songUrl, songId} = location.state || {};
    console.log("songURL: " + songUrl)

    if (!songUrl) {
        return (
            <div className="song-container">
                <h2>{STRINGS.noSong}</h2>
                <p>{STRINGS.tryAgain}</p>
                <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>
                    {STRINGS.backHome}
                </button>
            </div>
        );
    }

    return (
        <div className="song-container">
            <h2>{STRINGS.genSong}</h2>
            <p>{STRINGS.playing} {songId || STRINGS.unknown}</p>
            <audio controls>
                <source src={songUrl} type="audio/wav" />
                {STRINGS.error}
            </audio>
        </div>
    );
};

export default SongPlayer;
