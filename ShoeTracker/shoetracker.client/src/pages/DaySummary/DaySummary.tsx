import React from "react";
import { useParams } from "react-router";

import './DaySummary.css';

const DaySummary = () => {
    const { year, month, day } = useParams();

    // TODO:
    // No. of activities
    // Total daily mileage
    // Total daily minutes
    // List each activity

    return (
        <div className="day-summary">
            <h2>Day Summary ({month}/{day}/{year})</h2>

            <h3>Activities</h3>
        </div>
    );
};

export default DaySummary;
