import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdjectiveGrid from '../components/AdjectiveSelect';
import '../style/adj.css'
import MESSAGES from '../lang/en.js'

const STRINGS = MESSAGES.ADJ;

const primaryAdjectives = [
    'Happy', 'Sad', 'Energetic', 'Calm', 
    'Romantic', 'Angry', 'Anxious', 'Confident',
    'Inspired', 'Lonely', 'Motivated', 'Curious'
];

const secondaryAdjectives = {
    'Happy': ['Joyful', 'Cheerful', 'Content', 'Ecstatic', 'Optimistic', 'Delighted'],
    'Sad': ['Melancholy', 'Gloomy', 'Heartbroken', 'Grief-stricken', 'Somber', 'Despondent'],
    'Energetic': ['Active', 'Lively', 'Dynamic', 'Exuberant', 'Vigorous', 'Spirited'],
    'Calm': ['Serene', 'Peaceful', 'Tranquil', 'Composed', 'Relaxed', 'Mellow'],
    'Romantic': ['Affectionate', 'Loving', 'Tender', 'Passionate', 'Charming', 'Intimate'],
    'Angry': ['Irritated', 'Annoyed', 'Furious', 'Frustrated', 'Resentful', 'Enraged'],
    'Anxious': ['Nervous', 'Worried', 'Tense', 'Apprehensive', 'Restless', 'Panicked'],
    'Confident': ['Empowered', 'Assertive', 'Secure', 'Bold', 'Determined', 'Courageous'],
    'Inspired': ['Creative', 'Imaginative', 'Motivated', 'Inventive', 'Visionary', 'Artistic'],
    'Lonely': ['Isolated', 'Abandoned', 'Empty', 'Disconnected', 'Lonesome', 'Forlorn'],
    'Motivated': ['Ambitious', 'Driven', 'Goal-oriented', 'Determined', 'Persistent', 'Focused'],
    'Curious': ['Inquisitive', 'Exploratory', 'Adventurous', 'Eager', 'Intrigued', 'Wondrous']
};

const AdjectivePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { activity } = location.state || {};

    const [primaryAdjective, setPrimaryAdjective] = useState('');
    const [selectedAdjective, setSelectedAdjective] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handlePrimaryAdjectiveSelect = (adjective) => {
        setPrimaryAdjective(adjective);
        setSelectedAdjective(''); // Reset secondary adjective when switching
    };

    const handleSecondaryAdjectiveSelect = (adjective) => {
        setSelectedAdjective(adjective);
    };

    const handleSubmit = async () => {
        if (!activity) {
            alert(STRINGS.missingActivity);
            return;
        }
        if (!primaryAdjective || !selectedAdjective) {
            alert(STRINGS.missingAdjective);
            return;
        }

        setLoading(true); // show the loading screen
      //  console.log("loading set to true");

        try {
            const response = await axios.get(`https://oceaan-pendharkar.com/api/v1/isa-be/ISA_BE/create-song`, {
                params: {
                    activity,
                    adjective1: primaryAdjective,
                    adjective2: selectedAdjective
                },
                responseType: 'blob',
                withCredentials: false
            });

            const blob = new Blob([response.data], { type: 'audio/wav' });
            const songUrl = URL.createObjectURL(blob);

            navigate('/song', {
                state: {
                    songUrl,
                    songId: response.headers['x-song-id'] || 'Unknown Song'
                }
            });
        } catch (error) {
            console.error('Error fetching song:', error);
            alert('Failed to fetch song. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
        {loading ? (
            // Loading Spinner
            <div className="text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Generating your song, please wait...</p>
            </div>
        ) : (

            <>
            <h2>Select an Adjective for: {activity}</h2>

            {/* Primary Adjective Selection */}
            <AdjectiveGrid
                adjectives={primaryAdjectives}
                selectedAdjectives={primaryAdjective ? [primaryAdjective] : []}
                onSelect={handlePrimaryAdjectiveSelect}
            />

            {/* Secondary Adjective Selection (Appears only after Primary selection) */}
            {primaryAdjective && (
                <>

                    <h3>Now select a secondary adjective:</h3>
                    <AdjectiveGrid
                        adjectives={secondaryAdjectives[primaryAdjective]}
                        selectedAdjectives={selectedAdjective ? [selectedAdjective] : []}
                        onSelect={handleSecondaryAdjectiveSelect}
                    />
                </>
            )}

            <div className="btn-group mt-3" role="group" aria-label="Basic example">
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/index')}
                >
                   {STRINGS.back}
                </button>

                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={!primaryAdjective || !selectedAdjective}
                >
                    {STRINGS.submit}
                </button>
            </div>
            </>
        )}
        </div>
    );
};

export default AdjectivePage;
