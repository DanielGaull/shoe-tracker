import React, { useState } from 'react';
import axios from 'axios';
import GradientEditor from './GradientEditor';
import { EditShoeDto, GradientSection, TextColor } from '../../types/shoes';

import './EditShoe.css';

interface EditShoeProps {
    isNew: boolean;
}

const textColors: TextColor[] = ['Light', 'Dark'];

const EditShoe = ({ isNew }: EditShoeProps) => {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [modelVersion, setModelVersion] = useState('1');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [startingMiles, setStartingMiles] = useState('0');
    const [warnAtMileage, setWarnAtMileage] = useState('0');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [textColor, setTextColor] = useState<TextColor>('Light');
    const [gradient, setGradient] = useState<GradientSection[]>([{
        color: {
            r: 255,
            g: 255,
            b: 255,
        },
        points: 5,
    }]);

    const [err, setErr] = useState('');

    const submit = async () => {
        const newShoe: EditShoeDto = {
            brand,
            model,
            modelVersion: parseInt(modelVersion),
            shoeName: name,
            description: desc.length > 0 ? desc : '',
            startingMileage: parseInt(startingMiles),
            warnAtMileage: parseInt(warnAtMileage),
            startDate,
            textColor,
            gradient,
        };

        const response = await axios.post('/api/shoes', newShoe);
        if (response.status > 300) {
            setErr(response.data);
        } else {
            setErr('');
        }
    };

    return (
        <div className="edit-shoe">
            <h1>{isNew ? 'Add Shoe' : 'Edit Shoe'}</h1>
            <div className="form">
                <div className="form-column">
                    <div className="label-field">
                        <label>Brand:</label>
                        <input value={brand} onChange={(e) => setBrand(e.target.value)} />
                    </div>
                    <div className="label-field">
                        <label>Model:</label>
                        <input value={model} onChange={(e) => setModel(e.target.value)} />
                    </div>
                    <div className="label-field">
                        <label>Version:</label>
                        <input
                            className="thin-input"
                            value={modelVersion}
                            onChange={(e) => {
                                setModelVersion(e.target.value.replace(/\D/,''));
                            }}
                        />
                    </div>

                    <div className="spacer" />

                    <div className="label-field">
                        <label>Name:</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="label-field">
                        <label>Description:</label>
                        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
                    </div>
                </div>
                
                <div className="form-column">
                    <div className="label-field">
                        <label>Start Date:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                console.log(e.target.value);
                            }}
                        />
                    </div>
                    <div className="label-field">
                        <label>Starting Mileage:</label>
                        <input
                            className="thin-input"
                            value={startingMiles}
                            onChange={(e) => {
                                setStartingMiles(e.target.value.replace(/\D/,''));
                            }}
                        />
                    </div>
                    <div className="label-field">
                        <label>Warn at Mileage:</label>
                        <input
                            className="thin-input"
                            value={warnAtMileage}
                            onChange={(e) => {
                                setWarnAtMileage(e.target.value.replace(/\D/,''));
                            }}
                        />
                    </div>

                    <div className="spacer" />
                    
                    <div className="label-field">
                        <label>Display Text Color:</label>
                        <select onChange={(e) => setTextColor(e.target.value as TextColor)} value={textColor}>
                            {textColors.map(c => <option value={c} key={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="label-field">
                        <label>Display Gradient:</label>
                        <GradientEditor value={gradient} onChange={setGradient} />
                    </div>
                </div>
            </div>

            {err.length > 0 && <div className="error-text">{err}</div>}

            <button className="mt fc" onClick={submit}>Submit</button>
        </div>
    );
};

export default EditShoe;
