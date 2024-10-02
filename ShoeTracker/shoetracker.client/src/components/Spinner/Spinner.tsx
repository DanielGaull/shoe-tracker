import React from 'react';

import './Spinner.css';

interface SpinnerProps {
    small?: boolean;
}

const Spinner  = ({ small = false }: SpinnerProps) => {
    return <div className={`spinner ${small ? 'small' : ''}`} />;
};

export default Spinner;
