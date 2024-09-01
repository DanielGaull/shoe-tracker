import React, { useState } from 'react';

import './EditShoe.css';

interface EditShoeProps {
    isNew: boolean;
}

const EditShoe = ({ isNew }: EditShoeProps) => {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [modelVersion, setModelVersion] = useState('1');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [startingMiles, setStartingMiles] = useState('0');
    const [warnAtMileage, setWarnAtMileage] = useState('0');

    return (
        <div className="form">
            <h1>{isNew ? 'Add Shoe' : 'Edit Shoe'}</h1>
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
                    pattern="[0-9]*"
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

            <div className="spacer" />

            <div className="label-field">
                <label>Starting Mileage:</label>
                <input
                    className="thin-input"
                    value={startingMiles}
                    pattern="[0-9]*"
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
                    pattern="[0-9]*"
                    onChange={(e) => {
                        setWarnAtMileage(e.target.value.replace(/\D/,''));
                    }}
                />
            </div>

            <button className="mt fc">Submit</button>
        </div>
    );
};

export default EditShoe;
