import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MESSAGES from '../lang/en.js'
import ActivityGrid from '../components/ActivitySelection';
import axios from 'axios';
const API = process.env.REACT_APP_API_URL;
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
    const [error, setError] = useState(null);

    console.log("API base:", API); // Should not be undefined

    useEffect(() => {

        const fetchActivities = async () => {
            try {
                const response = await axios.get(`${API}activities`, {
                    withCredentials: true
                  });
                const data = response.data;
                const activityNames = data.map(item => item.name);
                setActivites(activityNames);
                setError(null);
            } catch (error) {
                console.error('Error fetching activities: ', error);
              
                if (error.response) {
                    // Server responded but with an error status
                    setError({
                      code: error.response.status,
                      message: error.response.data?.message || 'An error occurred while fetching activities.',
                    });
                  } else {
                    // No response at all (network error, server down, etc.)
                    setError({
                      code: 'NETWORK',
                      message: 'Could not connect to the server. Please try again later.',
                    });
                  }   
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
    
                {loading && !error ? (
                    <p>{STRINGS.loading}</p>
                ) : error ? (
                    <div className="alert alert-danger text-center w-75" role="alert">
                        <strong>Error {error.code}:</strong> {error.message}
                    </div>
                ) : (
                    <ActivityGrid items={activities} onSubmit={handleActivitySelect} />
                )}
            </div>
        </div>
    );
    
    
};

export default ActivityPage;
