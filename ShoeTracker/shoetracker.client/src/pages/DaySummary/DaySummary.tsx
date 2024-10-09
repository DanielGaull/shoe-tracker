import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Activity, Time } from "../../types/activity";
import Spinner from "../../components/Spinner/Spinner";
import { addTimes, distanceAsMiles, roundTo, timeToString } from "../../util/util";
import SummaryStat from "./SummaryStat";
import { Link } from "react-router-dom";
import ActivityCard from "./ActivityCard";
import Modal from "../../components/Modal/Modal";

import './DaySummary.css';

const DaySummary = () => {
    const { year, month, day } = useParams();
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [activityToDelete, setActivityToDelete] = useState<Activity | undefined>();
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

    const dailyMileage = roundTo(activities.reduce(
        (prev, cur) => {
            let sum = prev + distanceAsMiles(cur.distance, cur.distanceUnits);
            if (cur.warmup) {
                sum += distanceAsMiles(cur.warmup.distance, cur.warmup.distanceUnits);
            }
            if (cur.cooldown) {
                sum += distanceAsMiles(cur.cooldown.distance, cur.cooldown.distanceUnits);
            }
            if (cur.strides) {
                sum += distanceAsMiles(cur.strides.distance, cur.strides.distanceUnits);
            }
            return sum;
        }, 0),
    2);

    const dailyTime = timeToString(activities.reduce(
        (prev, cur) => {
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
        }, { hours: 0, minutes: 0, seconds: 0 }),
    );

    const subActivities = activities.reduce(
        (prev, cur) => {
            let count = prev;
            if (cur.warmup) count++;
            if (cur.cooldown) count++;
            if (cur.strides) count++;
            return count;
        }, 
    0);

    const deleteActivity = useCallback((activity: Activity) => {
        async function doDelete() {
            await axios.delete(`/api/activities/${activity.id}`);
            await load();
            setDeleteModalOpen(false);
            setActivityToDelete(undefined);
        }

        doDelete();
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
                            value={`${activities.length} (+${subActivities})`}
                            className="summary-stat-yellow"
                        />
                        <SummaryStat
                            title="Total Daily Mileage"
                            value={dailyMileage}
                            units="mi."
                            className="summary-stat-green"
                        />
                        <SummaryStat
                            title="Total Time"
                            value={dailyTime}
                            className="summary-stat-red"
                        />
                    </div>
                    <h3>Activities</h3>
                    {activities
                        .sort((a, b) => a.ordinal - b.ordinal)
                        .map((a) => (
                            <ActivityCard
                                activity={a}
                                onDeleteClicked={() => {
                                    setActivityToDelete(a);
                                    setDeleteModalOpen(true);
                                }}
                            />
                        ))}

                    <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                        <h3>Are you sure?</h3>
                        Are you sure you want to delete "{activityToDelete?.name ?? '[Missing name]'}"?
                        <div className="button-row mt">
                            <button
                                className="mr-s"
                                onClick={() => setDeleteModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => deleteActivity(activityToDelete!)}
                            >
                                Confirm
                            </button>
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default DaySummary;
