import React, { useEffect, useState } from "react";
import { DistanceUnit, SubRun } from "../../types/activity";
import { Shoe } from "../../types/shoes";
import NumberInput from "../../components/NumberInput/NumberInput";

interface SubRunEditorProps {
    value?: SubRun;
    onChange?: (v?: SubRun) => void;
    title: string;
    shoes: Shoe[];
}

const units: DistanceUnit[] = ['Miles', 'Kilometers', 'Meters'];

const SubRunEditor = ({ value, onChange = () => {}, title, shoes }: SubRunEditorProps) => {
    const [hours, setHours] = useState('0');
    const [minutes, setMinutes] = useState('0');
    const [seconds, setSeconds] = useState('0');
    const [shoeId, setShoeId] = useState('none');
    const [distance, setDistance] = useState('0');
    const [distanceUnits, setDistanceUnits] = useState<DistanceUnit>('Miles');
    const [exists, setExists] = useState(!!value ?? false);
    // Distance when parsed as a float
    const [floatDistance, setFloatDistance] = useState(0);

    useEffect(() => {
        if (value) {
            setExists(true);
            setHours(value.time.hours.toString());
            setMinutes(value.time.minutes.toString());
            setSeconds(value.time.seconds.toString());
            setShoeId(value.shoeId);
            setDistance(value.distance.toString());
            setDistanceUnits(value.distanceUnits);
            setFloatDistance(value.distance);
        } else {
            setExists(false);
        }

    }, [value]);

    useEffect(() => {
        if (exists) {
            const numbers = [
                parseInt(hours),
                parseInt(minutes),
                parseInt(seconds),
                floatDistance,
            ];
            // If invalid number, don't update parent state until valid number entered
            if (numbers.filter(isNaN).length > 0) {
                return;
            }

            const subrun: SubRun = {
                time: {
                    hours: parseInt(hours),
                    minutes: parseInt(minutes),
                    seconds: parseInt(seconds),
                },
                distance: floatDistance,
                distanceUnits,
                shoeId,
            };
            onChange(subrun);
        } else {
            onChange(undefined);
        }

    }, [hours, minutes, seconds, shoeId, floatDistance, distanceUnits, exists]);

    return (
        <div className="sub-run-editor">
            <div>{title}</div>

            <label className="c-pointer us-none">
                <input type="checkbox" checked={exists} onChange={() => setExists(c => !c)} />
                Has {title}
            </label>

            <div style={exists ? {} : { visibility: 'hidden' }}>
                <div className="label-field">
                    <label>Distance:</label>
                    <div>
                        <NumberInput
                            value={distance}
                            onChange={(v) => {
                                setDistance(v);
                                setFloatDistance(parseFloat(v));
                            }}
                            allowFloats
                            small
                        />
                        <select
                            className="small-select"
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
                            small
                        />
                        &nbsp;:&nbsp;
                        <NumberInput
                            value={minutes}
                            onChange={(v) => setMinutes(v)}
                            small
                        />
                        &nbsp;:&nbsp;
                        <NumberInput
                            value={seconds}
                            onChange={(v) => setSeconds(v)}
                            small
                        />
                    </div>
                </div>

                <div className="label-field">
                    <label>Shoe:</label>
                    <select
                        value={shoeId}
                        onChange={e => setShoeId(e.target.value)}
                        className="small-select"
                    >
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
    );
};

export default SubRunEditor;
