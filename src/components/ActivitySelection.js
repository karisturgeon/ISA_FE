import React, { useState } from 'react';

const ActivityGrid = ({ items, onSubmit }) => {
    const [selectedActivity, setSelectedActivity] = useState('');
    const [customInput, setCustomInput] = useState('');

    const handleActivitySelect = (activity) => {
        setSelectedActivity(activity);  // Highlight the selected button
        setCustomInput('');            // Clear the text input when a button is selected
    };

    const handleSubmit = () => {
        const activityToSubmit = customInput.trim() || selectedActivity;

        if (!activityToSubmit) {
            alert('Please select an activity or enter a custom one.');
            return;
        }

        onSubmit(activityToSubmit);  // Send the selected or custom activity
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
                    placeholder="Or enter a custom activity"
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
