import React from "react";
import { Activity, SubRun } from "../../types/activity";
import { calculateBackground, calculateTextColor, distanceUnitToAbbreviation, timeToString } from "../../util/util";

interface SubrunCardProps {
    subrun?: SubRun;
    title: string;
}

const SubrunCard = ({ subrun, title }: SubrunCardProps) => {
    if (!subrun) return null;

    return (
        <>
            <div>
                {title}:&nbsp;
                {subrun.distance}
                {distanceUnitToAbbreviation(subrun.distanceUnits)} •&nbsp;
                {timeToString(subrun.time)}
            </div>
        </>
    );
};

interface ActivityCardProps {
    activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
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
            <SubrunCard subrun={activity.warmup} title="Warmup" />
            <SubrunCard subrun={activity.cooldown} title="Cooldown" />
            <SubrunCard subrun={activity.strides} title="Strides" />
        </div>
    )
};

export default ActivityCard;
