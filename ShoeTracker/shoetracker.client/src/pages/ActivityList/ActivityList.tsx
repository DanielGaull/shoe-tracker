import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import Calendar from '../../components/Calendar/Calendar';
import { months } from '../../util/util';

import './ActivityList.css';

const ActivityList = () => {
    const navigate = useNavigate();

    const today = new Date();
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());

    const years = [...Array(20).keys()].map(i => today.getFullYear() - i);

    const nextMonth = () => {
        if (month >= months.length) {
            setMonth(1);
            if (year >= years[0]) {
                setYear(years[years.length - 1]);
            } else {
                setYear(y => y + 1);
            }
        } else {
            setMonth(m => m + 1);
        }
    };

    const prevMonth = () => {
        if (month <= 1) {
            setMonth(months.length);
            if (year <= years[years.length - 1]) {
                setYear(years[0]);
            } else {
                setYear(y => y - 1);
            }
        } else {
            setMonth(m => m - 1);
        }
    };

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
                <button onClick={prevMonth}>&lt;</button>
                <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
                    {months.map((m, ix) => <option key={m} value={ix + 1}>{m}</option>)}
                </select>
                <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <button onClick={nextMonth}>&gt;</button>
            </div>

            <Calendar
                month={month}
                year={year}
            />
        </>
    );
};

export default ActivityList;
