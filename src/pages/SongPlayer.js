import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MESSAGES from '../lang/en.js';
const API = process.env.REACT_APP_API_URL;

const STRINGS = MESSAGES.SONG;

const curatedSongs = [
    { id: 'song_001', filename: 'song_001.wav' },
    { id: 'song_002', filename: 'song_002.wav' },
    { id: 'song_003', filename: 'song_003.wav' },
    { id: 'song_004', filename: 'song_004.wav' },
    { id: 'song_005', filename: 'song_005.wav' },
    { id: 'song_006', filename: 'song_006.wav' },
    { id: 'song_007', filename: 'song_007.wav' },
    { id: 'song_008', filename: 'song_008.wav' },
    { id: 'song_009', filename: 'song_009.wav' },
    { id: 'song_010', filename: 'song_010.wav' },
    { id: 'song_011', filename: 'song_011.wav' },
    { id: 'song_012', filename: 'song_012.wav' },
    { id: 'song_013', filename: 'song_013.wav' },
    { id: 'song_014', filename: 'song_014.wav' },
    { id: 'song_015', filename: 'song_015.wav' },
    { id: 'song_016', filename: 'song_016.wav' },
    { id: 'song_017', filename: 'song_017.wav' },
    { id: 'song_018', filename: 'song_018.wav' },
    { id: 'song_019', filename: 'song_019.wav' },
    { id: 'song_020', filename: 'song_020.wav' },
    { id: 'song_021', filename: 'song_021.wav' },
    { id: 'song_022', filename: 'song_022.wav' },
    { id: 'song_023', filename: 'song_023.wav' },
    { id: 'song_024', filename: 'song_024.wav' },
    { id: 'song_025', filename: 'song_025.wav' },
];



const SongPlayer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialUrl = location.state?.songUrl || '';
    const initialId = location.state?.songId || '';
    const [audioError, setAudioError] = useState('');

    const [currentSongUrl, setCurrentSongUrl] = useState(initialUrl);
    const [currentSongId, setCurrentSongId] = useState(initialId);

    const playSong = (song) => {
        const newUrl = `${API}songs/${song.filename}`;
        setCurrentSongUrl(newUrl);
        setCurrentSongId(song.id);
        setAudioError(''); // Clear any previous error
    };


    if (!currentSongUrl) {
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
        <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
            <div className="card shadow p-4 text-center w-100" style={{ maxWidth: '700px' }}>
                <h2 className="mb-3">{STRINGS.genSong}</h2>
                <p className="mb-4">{STRINGS.playing} <strong>{currentSongId || STRINGS.unknown}</strong></p>

                <audio
                    key={currentSongUrl}
                    controls
                    className="w-100 mb-4"
                    onError={() => setAudioError(STRINGS.audioError || 'Failed to play audio. Please try another song.')}
                >
                    <source src={currentSongUrl} type="audio/wav" />
                    {STRINGS.error}
                </audio>

                <button className="btn btn-outline-primary mb-4" onClick={() => navigate('/')}>
                    {STRINGS.backHome}
                </button>

                <h4 className="mt-4">{STRINGS.otherSongs}</h4>
                <div className="list-group text-start" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                    {curatedSongs.map((song) => (
                        <button
                            key={song.id}
                            className="list-group-item list-group-item-action"
                            onClick={() => playSong(song)}
                        >
                            🎵 {song.id}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SongPlayer;