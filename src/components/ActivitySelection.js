import React, { useState } from 'react';
import MESSAGES from '../lang/en';
import axios from 'axios';

const STRINGS = MESSAGES.ACTIVITY

const ActivityGrid = ({ items, onSubmit }) => {
    const [selectedActivity, setSelectedActivity] = useState('');
    const [customInput, setCustomInput] = useState('');

    const handleActivitySelect = (activity) => {
        setSelectedActivity(activity);  // Highlight the selected button
        setCustomInput('');            // Clear the text input when a button is selected
    };

    const handleSubmit = async () => {
        const activityToSubmit = customInput.trim() || selectedActivity;

        if (!activityToSubmit) {
            alert(STRINGS.alertSelect);
            return;
        }
        try {
            // If a custom activity was typed (i.e. not selected from the buttons)
            if (customInput.trim()) {
                // Send POST to backend
                await axios.post('https://oceaan-pendharkar.com/api/v1/isa-be/ISA_BE/activities', {
                    name: customInput.trim()
                });
            }
    
            // Call parent handler
            onSubmit(activityToSubmit);
        } catch (error) {
            console.error('Failed to submit custom activity:', error);
            alert('Failed to save custom activity. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <div className="row g-3">
                {items.map((item, index) => (
                    <div key={index} className="col-6 col-md-4 col-lg-3">
                        <button
                            className={`btn w-100 ${
                                selectedActivity === item ? 'btn-success' : 'btn-outline-primary'
                            }`}
                            onClick={() => handleActivitySelect(item)}
                        >
                            {item}
                        </button>
                    </div>
                ))}
            </div>

            {/* Custom Input Section */}
            <div className="mt-4 text-center">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder={STRINGS.customAct}
                    value={customInput}
                    onChange={(e) => {
                        setCustomInput(e.target.value);
                        setSelectedActivity(''); // Clear selected button if text is entered
                    }}
                />
                <button
                    className="btn btn-primary w-100"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default ActivityGrid;
