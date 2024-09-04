import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import './ActivityList.css';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const ActivityList = () => {
    const navigate = useNavigate();

    const today = new Date();
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());

    const years = [...Array(20).keys()].map(i => today.getFullYear() - i);

    return (
        <>
            <div className="header">
                <h1>Activities</h1>
                <button
                    onClick={() => {
                        navigate('/add-activity');
                    }}
                >
                    + Add Activity
                </button>
            </div>
            <div>
                <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
                    {months.map((m, ix) => <option key={m} value={ix + 1}>{m}</option>)}
                </select>
                <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
        </>
    );
};

export default ActivityList;
