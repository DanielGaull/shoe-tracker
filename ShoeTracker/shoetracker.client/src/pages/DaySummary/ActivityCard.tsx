import React from 'react';
import { Activity } from '../../types/activity';
import { calculateBackground, calculatePace, calculateTextColor, distanceAsMiles, distanceUnitToAbbreviation, timeToString } from '../../util/util';

interface ActivityCardProps {
    activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
    const background = activity.shoe ? calculateBackground(activity.shoe.gradient) : 'white';
    const color = calculateTextColor(activity.shoe ? activity.shoe.textColor : 'Dark');
    const pace = calculatePace(distanceAsMiles(activity.distance, activity.distanceUnits), activity.time);

    // TODO: Edit/delete

    return (
        <div
            style={{
                background,
                color,
            }}
            className="day-activity-card"
        >
            <div>{activity.name}</div>
            <div className="day-activity-details">
                {activity.distance}
                {distanceUnitToAbbreviation(activity.distanceUnits)} •&nbsp;
                {timeToString(activity.time)}&nbsp;
                ({timeToString(pace)})
            </div>
            <div className="day-activity-details i">
                {activity.shoe?.shoeName}&nbsp;
                ({activity.shoe?.brand} {activity.shoe?.model} {activity.shoe?.modelVersion})
            </div>
            <div className="day-activity-desc">
                {activity.description}
            </div>
        </div>
    );
};

export default ActivityCard;
