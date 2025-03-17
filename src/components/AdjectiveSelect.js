import React from 'react';

const AdjectiveGrid = ({ adjectives, selectedAdjectives, onSelect }) => {
    return (
        <div className="container mt-4">
            <div className="row g-3 justify-content-center">
                {adjectives.map((adj, index) => (
                    <div key={index} className="col-6 col-md-4 col-lg-3">
                        <button
                            className={`btn w-100 ${
                                selectedAdjectives.includes(adj) ? 'btn-success' : 'btn-outline-primary'
                            }`}
                            onClick={() => onSelect(adj)}
                        >
                            {adj}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdjectiveGrid;
