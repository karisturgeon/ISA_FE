//ChatGPT was used to assist with this file
import React from 'react';

const ActivityGrid = ({ items, selectedActivity, onSelect }) => {
  return (
    <div className="container mt-4">
      <div style={{ maxHeight: '300px', overflowY: 'auto' }} className="row g-3">
        {items.map((item, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3">
            <button
              className={`btn w-100 ${selectedActivity === item ? 'btn-success' : 'btn-outline-primary'}`}
              onClick={() => onSelect(item)}
            >
              {item}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityGrid;
