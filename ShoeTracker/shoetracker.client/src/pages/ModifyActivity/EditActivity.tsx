import React, { useEffect, useState } from 'react';
import { DistanceUnit, EditActivityDto } from '../../types/activity';
import NumberInput from '../../components/NumberInput/NumberInput';
import { useNavigate, useParams } from 'react-router';
import { Shoe } from '../../types/shoes';
import axios, { AxiosError } from 'axios';
import { stringDateToDateModel } from '../../util/util';

import './EditActivity.css';

const units: DistanceUnit[] = ['Miles', 'Kilometers', 'Meters'];

interface EditActivityProps {
    isNew?: boolean;
}

const EditActivity = ({ isNew }: EditActivityProps) => {
    const navigate = useNavigate();

    const [shoes, setShoes] = useState<Shoe[]>([]);
    const [shoeId, setShoeId] = useState<string>('none');
    const [distance, setDistance] = useState('0');
    const [distanceUnits, setDistanceUnits] = useState<DistanceUnit>('Miles');
    const [hours, setHours] = useState('0');
    const [minutes, setMinutes] = useState('0');
    const [seconds, setSeconds] = useState('0');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [ordinal, setOrdinal] = useState('0');

    const [err, setErr] = useState('');
    const { activityId } = useParams();

    async function load() {
        const response = await axios.get('/api/shoes');
        setShoes(response.data);
    }

    useEffect(() => {
        load();
    }, []);

    const submit = async () => {
        const newActivity: EditActivityDto = {
            name: name,
            description: desc.length > 0 ? desc : '',
            distance: parseFloat(distance),
            distanceUnits,
            date: stringDateToDateModel(date),
            ordinal: parseInt(ordinal),
            time: {
                hours: parseInt(hours),
                minutes: parseInt(minutes),
                seconds: parseInt(seconds),
            },
            shoeId,
        };

        try {
            if (isNew) {
                await axios.post('/api/activities', newActivity);
            } else {
                await axios.put(`/api/activities/${activityId}`, newActivity);
            }
            setErr('');
            navigate('/activities');
        } catch (err) {
            const axiosError = err as AxiosError;
            setErr(axiosError.response?.data as string || 'Unknown error occurred');
        }
    };

    return (
        <div className="edit-activity">
            <h1>{isNew ? 'Add Activity' : 'Edit Activity'}</h1>
            <div className="form">
                <div className="form-column">
                    <div className="label-field">
                        <label>Title:</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="label-field">
                        <label>Distance:</label>
                        <div>
                            <NumberInput
                                value={distance}
                                onChange={(v) => setDistance(v)}
                                allowFloats
                            />
                            <select
                                className="thin-select"
                                value={distanceUnits}
                                onChange={(e) => setDistanceUnits(e.target.value as DistanceUnit)}
                            >
                                {units.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="label-field">
                        <label>Time:</label>
                        <div>
                            <NumberInput
                                value={hours}
                                onChange={(v) => setHours(v)}
                            />
                            &nbsp;:&nbsp;
                            <NumberInput
                                value={minutes}
                                onChange={(v) => setMinutes(v)}
                            />
                            &nbsp;:&nbsp;
                            <NumberInput
                                value={seconds}
                                onChange={(v) => setSeconds(v)}
                            />
                        </div>
                    </div>
                    <div className="label-field">
                        <label>Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                            }}
                        />
                    </div>
                    <div className="label-field">
                        <label>Ordinal:</label>
                        <NumberInput
                            value={ordinal}
                            onChange={(v) => setOrdinal(v)}
                        />
                    </div>
                </div>
                <div className="form-column">
                    <div className="label-field">
                        <label>Description:</label>
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            className="tall"
                        />
                    </div>
                    <div className="label-field">
                        <label>Shoe:</label>
                        <select value={shoeId} onChange={e => setShoeId(e.target.value)}>
                            <option value="none">None</option>
                            {shoes.map(shoe => (
                                <option
                                    value={shoe.id}
                                    key={shoe.id}
                                >
                                    {shoe.shoeName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {err.length > 0 && <pre className="error-text">{err}</pre>}

            <div className="button-row">
                <button className="mt mr-s fc" onClick={() => navigate('/activities')}>Cancel</button>
                <button className="mt fc" onClick={submit}>Submit</button>
            </div>
        </div>
    );
};

export default EditActivity;
