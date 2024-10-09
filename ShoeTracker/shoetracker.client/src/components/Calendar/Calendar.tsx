import React from 'react';
import { addTimes, convertJsWeekdayToIndex, distanceAsMiles, getMonday, roundTo, timeToString, weekdays } from '../../util/util';
import { Activity, Time } from '../../types/activity';
import ActivityCard from '../../pages/ActivityList/ActivityCard';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import './Calendar.css';

const getDaysInMonth = (month: number, year: number): number => {
    return new Date(year, month, 0).getDate();
};

interface Day { 
    date: number,
    isToday: boolean,
    month: number,
    year: number,
}

interface WeeklySummary {
    activities: number;
    subActivities: number;
    mileage: number;
    totalTime: Time;
}

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

const getActivitiesInWeek = (days: Day[], allActivities: Activity[]): Activity[] => {
    console.log(days);
    return allActivities.filter(a => 
        days.filter(d => d.date === a.date.day && d.month === a.date.month && d.year === a.date.year)
            .length > 0
    );
};

const getWeeklySummary = (week: Activity[]): WeeklySummary => {
    const activities = week.length;
    const subActivities = week.reduce((prev, cur) => {
        let count = prev;
        if (cur.warmup) {
            count++;
        }
        if (cur.cooldown) {
            count++;
        }
        if (cur.strides) {
            count++;
        }
        return count;
    }, 0);
    const mileage = week.reduce((prev, cur) => {
        let miles = prev + distanceAsMiles(cur.distance, cur.distanceUnits);
        if (cur.warmup) {
            miles += distanceAsMiles(cur.warmup.distance, cur.warmup.distanceUnits);
        }
        if (cur.cooldown) {
            miles += distanceAsMiles(cur.cooldown.distance, cur.cooldown.distanceUnits);
        }
        if (cur.strides) {
            miles += distanceAsMiles(cur.strides.distance, cur.strides.distanceUnits);
        }
        return miles;
    }, 0);
    const totalTime = week.reduce((prev, cur) => {
        let sum: Time = addTimes(prev, cur.time);
        if (cur.warmup) {
            sum = addTimes(sum, cur.warmup.time);
        }
        if (cur.cooldown) {
            sum = addTimes(sum, cur.cooldown.time);
        }
        if (cur.strides) {
            sum = addTimes(sum, cur.strides.time);
        }
        return sum;
    }, { hours: 0, minutes: 0, seconds: 0 });

    return {
        activities,
        subActivities,
        mileage,
        totalTime,
    };
};

interface WeeklySummaryDisplayProps {
    summary: WeeklySummary;
}

const WeeklySummaryDisplay = ({ summary }: WeeklySummaryDisplayProps) => {
    return (
        <>
            <div>Activities: {summary.activities} (+{summary.subActivities})</div>
            <div>Distance: {roundTo(summary.mileage, 2)} mi.</div>
            <div>Time: {timeToString(summary.totalTime)}</div>
        </>
    );
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
                    <th>Summary</th>
                </tr>
                {weeksToDisplay.map((week, ix) => {
                    return (
                        <tr key={ix} className="week">
                            {week.map((day, ix) => {
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
                                            'c-pointer': true,
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
                            <td className="day weekly-summary">
                                <WeeklySummaryDisplay
                                    summary={getWeeklySummary(getActivitiesInWeek(week, activities))}
                                />
                            </td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
};

export default Calendar;
