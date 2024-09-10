import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Calendar from '../../components/Calendar/Calendar';
import { months } from '../../util/util';
import { Activity } from '../../types/activity';
import axios from 'axios';

import './ActivityList.css';

const ActivityList = () => {
    const navigate = useNavigate();

    const today = new Date();
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [year, setYear] = useState(today.getFullYear());
    const [isLoading, setIsLoading] = useState(false);
    const [activities, setActivities] = useState<Activity[]>([]);

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

    async function load() {
        setIsLoading(true);
        const response = await axios.get(`/api/activities/${month}/${year}`, {
            params: {
                includeShoes: true,
            },
        });
        setActivities(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        load();
    }, [month, year]);

    return (
        <>
            <div className="header">
                <h1>Activities</h1>
                <button
                    onClick={() => {
                        navigate('/create-activity');
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

            {!isLoading && (
                <Calendar
                    month={month}
                    year={year}
                    activities={activities}
                />
            )}
        </>
    );
};

export default ActivityList;
