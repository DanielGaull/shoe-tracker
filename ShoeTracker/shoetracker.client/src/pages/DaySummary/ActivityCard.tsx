import React from 'react';
import { Activity, SubRun } from '../../types/activity';
import { calculateBackground, calculatePace, calculateTextColor, distanceAsMiles, distanceUnitToAbbreviation, timeToString } from '../../util/util';
import { useNavigate } from 'react-router';

interface SubrunDisplayProps {
    subrun?: SubRun;
    title: string;
}

const SubrunDisplay = ({ subrun, title }: SubrunDisplayProps) => {
    const background = subrun ? 
        (subrun.shoe ? calculateBackground(subrun.shoe.gradient) : 'white') : 
        undefined;
    const color = subrun ? 
        calculateTextColor(subrun.shoe ? subrun.shoe.textColor : 'Dark') :
        undefined;
    const pace = subrun ? 
        calculatePace(distanceAsMiles(subrun.distance, subrun.distanceUnits), subrun.time) : 
        { hours: 0, minutes: 0, seconds: 0 };

    return (
        <div 
            style={{
                background,
                color,
            }}
            className="day-activity-subrun"
        >
            <div>{title}</div>
            {!subrun && <div>{`No ${title}`}</div>}
            {subrun && (
                <>
                    <div>
                        {subrun.distance}
                        {distanceUnitToAbbreviation(subrun.distanceUnits)} •&nbsp;
                        {timeToString(subrun.time)}
                    </div>
                    <div>({timeToString(pace)})</div>
                </>
            )}
        </div>
    );
};

interface ActivityCardProps {
    activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
    const background = activity.shoe ? calculateBackground(activity.shoe.gradient) : 'white';
    const color = calculateTextColor(activity.shoe ? activity.shoe.textColor : 'Dark');
    const pace = calculatePace(distanceAsMiles(activity.distance, activity.distanceUnits), activity.time);
    const navigate = useNavigate();

    return (
        <div
            style={{
                background,
                color,
            }}
            className="day-activity-card"
        >
            <div className="activity-action-icons">
                <button
                    className="i-button"
                    onClick={() => navigate(`/edit-activity/${activity.id}`)}
                >
                    E
                </button>
                <button
                    className="i-button"
                    onClick={() => alert('TODO: on delete clicked')}
                >
                    X
                </button>
            </div>

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

            <div className="day-activity-subrun-container">
                <SubrunDisplay subrun={activity.warmup} title="Warmup" />
                <SubrunDisplay subrun={activity.cooldown} title="Cooldown" />
                <SubrunDisplay subrun={activity.strides} title="Strides" />
            </div>
        </div>
    );
};

export default ActivityCard;
