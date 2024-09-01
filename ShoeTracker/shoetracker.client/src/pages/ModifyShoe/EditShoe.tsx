import React, { useState } from 'react';
import { TextColor } from '../../types/shoes';

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
                        <select onChange={(e) => setTextColor(e.target.value as TextColor)}>
                            {textColors.map(c => <option value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <button className="mt fc">Submit</button>
        </div>
    );
};

export default EditShoe;
