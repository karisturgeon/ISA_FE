import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdjectiveGrid from '../components/AdjectiveSelect';

const adjectives = [
    'Happy', 'Sad', 'Energetic', 'Calm',
    'Focused', 'Relaxed', 'Excited', 'Bored'
];

const AdjectivePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { activity } = location.state || {};
    const [selectedAdjectives, setSelectedAdjectives] = useState([]);

    const handleAdjectiveSelect = (adjective) => {
        if (selectedAdjectives.includes(adjective)) {
            setSelectedAdjectives(selectedAdjectives.filter(item => item !== adjective));
        } else if (selectedAdjectives.length < 2) {
            setSelectedAdjectives([...selectedAdjectives, adjective]);
        }
    };

    const handleSubmit = async () => {
        if (selectedAdjectives.length !== 2) {
            alert("Please select exactly two adjectives.");
            return;
        }

        const [adjective1, adjective2] = selectedAdjectives;

        try {
            const response = await axios.get(`https://oceaan-pendharkar.com/isa-be/ISA_BE/create-song`, {
                params: {
                    activity,
                    adjective1,
                    adjective2
                },
                withCredentials: true
            });

            const songData = response.data;
            navigate('/song', { state: { songData } });
        } catch (error) {
            console.error('Error fetching song:', error);
            alert('Failed to fetch song. Please try again.');
        }
    };

    return (
        <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
            <h2>Select 2 Adjectives for: {activity}</h2>
            <AdjectiveGrid
                adjectives={adjectives}
                selectedAdjectives={selectedAdjectives}
                onSelect={handleAdjectiveSelect}
            />
            <div class="btn-group" role="group" aria-label="Basic example">

            <button
                className="btn btn-primary mt-3"
                onClick={() => navigate('/index')}
            >
                Back
            </button>

            <button
                className="btn btn-primary mt-3"
                onClick={handleSubmit}
            >
                Submit
            </button>
            </div>
        </div>
    );
};

export default AdjectivePage;
