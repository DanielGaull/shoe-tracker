import React from 'react';
import { convertJsWeekdayToIndex, getMonday, weekdays } from '../../util/util';
import { Activity } from '../../types/activity';
import ActivityCard from '../../pages/ActivityList/ActivityCard';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './Calendar.css';

const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month, 0).getDate();
};

type Day = { 
    date: number,
    isToday: boolean,
    exists: true,
    month: number,
    year: number,
} | { 
    exists: false,
};

const constructDays = (month: number, year: number): Day[][] => {
    const today = new Date();
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const trueFirstDay = getMonday(firstDayOfMonth);
    const firstWeekday = convertJsWeekdayToIndex(firstDayOfMonth.getDay());
    const days: Day[][] = [];
    let nextDateToAdd = 1;
    const daysInMonth = getDaysInMonth(month, year);

    const firstWeek: Day[] = [];
    let earlyNextDateToAdd = trueFirstDay.getDate();
    // Add all of the days before the first weekday
    for (let i = 0; i < firstWeekday; i++) {
        firstWeek.push({
            exists: true,
            date: earlyNextDateToAdd,
            isToday: false,
            month: trueFirstDay.getMonth() + 1,
            year: trueFirstDay.getFullYear(),
        });
        earlyNextDateToAdd++;
    }

    // Finish out adding the first week, this time with the actual days in the month
    for (let i = firstWeekday; i < 7; i++) {
        firstWeek.push({
            exists: true,
            date: nextDateToAdd,
            isToday: (nextDateToAdd === today.getDate()) && (month - 1 === today.getMonth()) && (year === today.getFullYear()),
            month,
            year,
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
            date: nextDateToAdd,
            isToday: nextDateToAdd === today.getDate() && month - 1 === today.getMonth() && year === today.getFullYear(),
            month,
            year,
        });
        nextDateToAdd++;
        weekday++;
        if (weekday >= 7) {
            weekday = 0;
            days.push(week);
            week = [];
        }
    }
    // Add the trailing days for the start of the next month
    let currentDate = new Date(year, month - 1, nextDateToAdd);
    nextDateToAdd = 1;
    while (weekday < 7 && week.length > 0) {
        week.push({
            exists: true,
            date: nextDateToAdd,
            isToday: false,
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear(),
        });
        nextDateToAdd++;
        weekday++;
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
    activities: Activity[];
}

const Calendar = ({ month, year, activities }: CalendarProps) => {
    const weeksToDisplay = constructDays(month, year);

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

                                const todayActivities = activities
                                    .filter(a => 
                                        a.date.day === day.date &&
                                        a.date.month === day.month &&
                                        a.date.year === day.year
                                    )
                                    .sort((a, b) => a.ordinal - b.ordinal);

                                return (
                                    <td
                                        key={ix}
                                        className={classNames({
                                            day: true,
                                            today: day.isToday,
                                            'not-this-month': day.month !== month,
                                        })}
                                    >
                                        <Link
                                            to={`/day-summary/${year}/${month}/${day.date}`}
                                            className="white-text-link"
                                        >
                                            <div>
                                                {day.date}
                                                {todayActivities.map(activity => (
                                                    <ActivityCard activity={activity} key={activity.id} />
                                                ))}
                                            </div>
                                        </Link>
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
