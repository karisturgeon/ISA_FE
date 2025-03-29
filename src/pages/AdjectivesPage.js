import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdjectiveGrid from '../components/AdjectiveSelect';
import '../style/adj.css'
import MESSAGES from '../lang/en.js'

///https://oceaan-pendharkar.com/api/v1/isa-be/ISA_BE/adjectives

const STRINGS = MESSAGES.ADJ;


const AdjectivePage = () => {
    const navigate = useNavigate();
    const [adjectives, setAdjectives] = useState([]);

    const [loading, setLoading] = useState(true);
    const { state } = useLocation();
    const activity = state?.activity || '';

    const [primaryAdjective, setPrimaryAdjective] = useState(null);
    const [selectedAdjective, setSelectedAdjective] = useState(null);


    useEffect(() => {
        const fetchAdjectives = async () => {
            try {
                const response = await fetch('https://oceaan-pendharkar.com/api/v1/isa-be/ISA_BE/adjectives')
                if (!response.ok) throw new Error('Failed to fetch adjectives');

                const data = await response.json();
                const adjectivesNames = data.map(item => item.word);
                setAdjectives(adjectivesNames);

            } catch (error) {
                console.error('Error fetching adjectives: ', error);
            } finally {
                setLoading(false);
            }

        };
        fetchAdjectives();
    }, []);

    const handleAdjectiveSelect = (adjective) => {
        // If already selected, deselect
        if (primaryAdjective === adjective) {
            setPrimaryAdjective(null);
        } else if (selectedAdjective === adjective) {
            setSelectedAdjective(null);
        }
        // If primary is empty, set it
        else if (!primaryAdjective) {
            setPrimaryAdjective(adjective);
        }
        // Else if secondary is empty, set it
        else if (!selectedAdjective) {
            setSelectedAdjective(adjective);
        }
        // Replace the oldest (primary) if both are filled
        else {
            setPrimaryAdjective(selectedAdjective);
            setSelectedAdjective(adjective);
        }
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
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Generating your song, please wait...</p>
                </div>
            ) : (
                <>
                    <h2>Select an Adjective for: {activity}</h2>
                    <AdjectiveGrid
                        adjectives={adjectives}
                        selectedAdjectives={[primaryAdjective, selectedAdjective].filter(Boolean)}
                        onSelect={handleAdjectiveSelect}
                    />
                    <div className="btn-group mt-3" role="group">
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

}

export default AdjectivePage;
