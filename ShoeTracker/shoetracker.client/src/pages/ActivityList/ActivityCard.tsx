import React from "react";
import { Activity } from "../../types/activity";
import { calculateBackground, calculateTextColor, distanceUnitToAbbreviation, timeToString } from "../../util/util";

interface ActivityCardProps {
    activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
    console.log(activity);

    const background = activity.shoe ? calculateBackground(activity.shoe.gradient) : 'white';
    const color = calculateTextColor(activity.shoe ? activity.shoe.textColor : 'Dark');

    return (
        <div
            style={{
                background,
                color,
            }}
            className="activity-card"
        >
            <div>{activity.name}</div>
            <div>
                {activity.distance}
                {distanceUnitToAbbreviation(activity.distanceUnits)} •&nbsp;
                {timeToString(activity.time)}
            </div>
            <i>{activity.shoe?.shoeName}</i>
        </div>
    )
};

export default ActivityCard;
