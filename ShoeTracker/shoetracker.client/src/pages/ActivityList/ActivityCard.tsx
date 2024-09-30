import React from "react";
import { Activity } from "../../types/activity";
import { calculateBackground, calculateTextColor, distanceUnitToAbbreviation, timeToString } from "../../util/util";

interface ActivityCardProps {
    activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
    return (
        <div
            style={{
                background: calculateBackground(activity.shoe?.gradient!),
                color: calculateTextColor(activity.shoe?.textColor!),
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
