import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Activity } from "../../types/activity";

import './DaySummary.css';
import Spinner from "../../components/Spinner/Spinner";
import { distanceAsMiles } from "../../util/util";
import SummaryStat from "./SummaryStat";
import { Link } from "react-router-dom";

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

    const goBack = () => {
        // TODO: Pass params to calendar to go back to proper month/year
        navigate('/activities');
    };

    // TODO:
    // No. of activities
    // Total daily mileage
    // Total daily minutes
    // List each activity

    return (
        <div className="day-summary">
            <Link to="/activities">
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
                            value={activities.reduce((prev, cur) => 
                                prev + distanceAsMiles(cur.distance, cur.distanceUnits), 0)}
                            units="mi."
                            className="summary-stat-green"
                        />
                    </div>
                    <h3>Activities</h3>
                </>
            )}
        </div>
    );
};

export default DaySummary;
