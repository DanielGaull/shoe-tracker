import React from 'react';

import './ErrorPages.css';

const CouldNotReachServer = () => {
    return (
        <div className="error-page">
            <h1>Error: Could not reach server!</h1>
            Please try again later.
        </div>
    );
};

export default CouldNotReachServer;
