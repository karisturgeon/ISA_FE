import React from 'react';
import { useNavigate } from 'react-router-dom';

import ActivityGrid from '../components/ActivitySelection';  // Path may vary
//import './Index.css'; // Optional for additional styles
const activities = [
    'Running', 'Eating', 'Cleaning', 'Sleeping',
    'Gaming', 'Studying', 'Shopping', 'Cooking',
    'Working', 'Dancing', 'Reading', 'Exercising'
];


const Index = () => {
    const navigate = useNavigate();

    const handleActivitySelect = (activity) => {
        navigate('/adjectives', { state: { activity } });
    };
    return (
        <div>
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
                <h2>Select an Activity</h2>
                <ActivityGrid items={activities} onSubmit={handleActivitySelect} />
            </div>
        </div>
    );
};

export default Index;
