// src/components/Loading.js
import React from 'react';
import MESSAGES from '../lang/en';

const STRINGS = MESSAGES.COMPONENTS;

const Loading = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">{STRINGS.loading}</span>
      </div>
      <p>{STRINGS.loading}</p>
    </div>
  );
};

export default Loading;
// (
//     <div className="text-center">
//         <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">{STRINGS.loading}</span>
//         </div>
//         <p className="mt-3">{STRINGS.generating}</p>
//     </div>
// )