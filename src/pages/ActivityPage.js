import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MESSAGES from '../lang/en.js'
import ActivityGrid from '../components/ActivitySelection';
import axios from 'axios';
const STRINGS = MESSAGES.ACTIVITY;
//

// const activities = [
//     'Running', 'Eating', 'Cleaning', 'Sleeping',
//     'Gaming', 'Studying', 'Shopping', 'Cooking',
//     'Working', 'Dancing', 'Reading', 'Exercising'
// ];


const ActivityPage = () => {
    const navigate = useNavigate();
    const [activities, setActivites] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchActivities = async () => {
            try {
                const response = await axios.get('https://oceaan-pendharkar.com/api/v1/isa-be/ISA_BE/activities');
                const data = response.data;
                const activityNames = data.map(item => item.name);
                setActivites(activityNames);
            } catch (error) {
                console.error('Error fetching activities: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
    }, []);

    const handleActivitySelect = (activity) => {
        navigate('/adjectives', { state: { activity } });
    };
    return (
        <div>
            <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
                <h2>{STRINGS.selectActivity}</h2>
                {loading ? (
                    <p>{STRINGS.loading}</p>
                ) : (
                    <ActivityGrid items={activities} onSubmit={handleActivitySelect} />
                )}
            </div>
        </div>
    );
};

export default ActivityPage;
