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
            <div className="activity-title">
                <span>{activity.name}</span>
                <span>{activity.distance}
                    {distanceUnitToAbbreviation(activity.distanceUnits)} •&nbsp;
                    {timeToString(activity.time)}
                </span>
            </div>
            <i>{activity.shoe?.shoeName}</i>
        </div>
    )
};

export default ActivityCard;
