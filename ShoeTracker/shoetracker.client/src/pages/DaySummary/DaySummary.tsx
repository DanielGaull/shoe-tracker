import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Activity } from "../../types/activity";

import './DaySummary.css';
import Spinner from "../../components/Spinner/Spinner";
import { addTimes, distanceAsMiles, roundTo, timeToString } from "../../util/util";
import SummaryStat from "./SummaryStat";
import { Link } from "react-router-dom";
import ActivityCard from "./ActivityCard";

const DaySummary = () => {
    const { year, month, day } = useParams();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function load() {
        setLoading(true);
        const response = await axios.get(`/api/activities/${month}/${day}/${year}`, {
            params: {
                includeShoes: true,
            },
        });
        setActivities(response.data);
        setLoading(false);
    }

    useEffect(() => {
        load();
    }, []);

    // TODO: Ability to add new activity for today

    return (
        <div className="day-summary">
            <Link to={`/activities/${year}/${month}`}>
                <button className="small">← Back</button>
            </Link>
            <h2>Day Summary ({month}/{day}/{year})</h2>

            {loading && <Spinner />}

            {!loading && (
                <>
                    <div className="summary">
                        <SummaryStat
                            title="Daily Activities"
                            value={activities.length}
                            className="summary-stat-yellow"
                        />
                        <SummaryStat
                            title="Total Daily Mileage"
                            value={roundTo(activities.reduce((prev, cur) => 
                                    prev + distanceAsMiles(cur.distance, cur.distanceUnits), 0), 2)}
                            units="mi."
                            className="summary-stat-green"
                        />
                        <SummaryStat
                            title="Total Time"
                            value={timeToString(
                                activities.reduce((prev, cur) => 
                                    addTimes(prev, cur.time), { hours: 0, minutes: 0, seconds: 0 })
                            )}
                            className="summary-stat-red"
                        />
                    </div>
                    <h3>Activities</h3>
                    {activities
                        .sort((a, b) => a.ordinal - b.ordinal)
                        .map((a) => <ActivityCard activity={a} />)}
                </>
            )}
        </div>
    );
};

export default DaySummary;
