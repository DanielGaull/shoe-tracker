import React from 'react';

import './Calendar.css';
import { weekdays } from '../../util/util';

const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month, 0).getDate();
};

type Day = { date: number, dayOfWeek: number, isToday: boolean, exists: true } | { exists: false };

const constructDays = (month: number, year: number): Day[][] => {
    const today = new Date();
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const firstWeekday = firstDayOfMonth.getDay();
    const days: Day[][] = [];
    let nextDateToAdd = 1;
    const daysInMonth = getDaysInMonth(month, year);

    const firstWeek: Day[] = [];
    // Add all of the days before the first weekday, which don't exist
    for (let i = 0; i < firstWeekday; i++) {
        firstWeek.push({
            exists: false,
        });
    }
    // Finish out adding the first week, this time with the actual existing days
    for (let i = firstWeekday; i < 7; i++) {
        firstWeek.push({
            exists: true,
            date: nextDateToAdd,
            dayOfWeek: i,
            isToday: (nextDateToAdd === today.getDate()) && (month - 1 === today.getMonth()) && (year === today.getFullYear()),
        });
        nextDateToAdd++;
    }
    days.push(firstWeek);

    // Finish out the rest of the month
    let week: Day[] = [];
    let weekday = 0;
    while (nextDateToAdd < daysInMonth + 1) {
        week.push({
            exists: true,
            dayOfWeek: weekday,
            date: nextDateToAdd,
            isToday: nextDateToAdd === today.getDate() && month - 1 === today.getMonth() && year === today.getFullYear(),
        });
        nextDateToAdd++;
        weekday++;
        if (weekday >= 7) {
            weekday = 0;
            days.push(week);
            week = [];
        }
    }
    // Don't leave out the final week
    if (week.length > 0) {
        days.push(week);
    }

    return days;
};

interface CalendarProps {
    month: number;
    year: number;
}

const Calendar = ({ month, year }: CalendarProps) => {
    const weeksToDisplay = constructDays(month, year);

    console.log(weeksToDisplay);

    return (
        <div className="calendar-container">
            <table className="calendar">
                <tr>
                    {weekdays.map(d => <th key={d}>{d}</th>)}
                </tr>
                {weeksToDisplay.map((week, ix) => {
                    return (
                        <tr key={ix} className="week">
                            {week.map((day, ix) => {
                                if (!day.exists) {
                                    return <td />;
                                }
                                return (
                                    <td key={ix} className={`day ${day.isToday ? 'today' : ''}`}>
                                        {day.date}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </table>
        </div>
    );
};

export default Calendar;