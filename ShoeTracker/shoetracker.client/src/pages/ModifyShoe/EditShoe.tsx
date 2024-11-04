import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router';
import GradientEditor from './GradientEditor';
import { EditShoeDto, GradientSection, Shoe, TextColor } from '../../types/shoes';
import ShoeEntry from '../ShoeList/ShoeEntry';
import NumberInput from '../../components/NumberInput/NumberInput';
import { stringDateToDateModel } from '../../util/util';

import './EditShoe.css';

interface EditShoeProps {
    isNew?: boolean;
}

const textColors: TextColor[] = ['Light', 'Dark'];

const EditShoe = ({ isNew = false }: EditShoeProps) => {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [modelVersion, setModelVersion] = useState('1');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [startingMiles, setStartingMiles] = useState('0');
    const [warnAtMileage, setWarnAtMileage] = useState('0');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [textColor, setTextColor] = useState<TextColor>('Dark');
    const [gradient, setGradient] = useState<GradientSection[]>([{
        color: {
            r: 255,
            g: 255,
            b: 255,
        },
        points: 5,
    }]);

    const [err, setErr] = useState('');
    const { shoeId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        async function load() {
            if (shoeId && !isNew) {
                const shoe: Shoe = (await axios.get(`/api/shoes/${shoeId}`)).data;
                setBrand(shoe.brand);
                setModel(shoe.model);
                setModelVersion(shoe.modelVersion.toString());
                setName(shoe.shoeName);
                setDesc(shoe.description ?? '');
                setStartingMiles(shoe.startingMileage.toString());
                setWarnAtMileage(shoe.warnAtMileage.toString());
                setStartDate(new Date(shoe.startDate.year, shoe.startDate.month - 1, shoe.startDate.day).toISOString().split('T')[0]);
                setTextColor(shoe.textColor);
                setGradient(shoe.gradient);
            }
        }
        load();
    }, [shoeId]);

    const submit = async () => {
        const newShoe: EditShoeDto = {
            brand,
            model,
            modelVersion: parseInt(modelVersion),
            shoeName: name,
            description: desc.length > 0 ? desc : '',
            startingMiles: parseFloat(startingMiles),
            warnAtMileage: parseInt(warnAtMileage),
            startDate: stringDateToDateModel(startDate),
            textColor,
            gradient,
        };

        try {
            if (isNew) {
                await axios.post('/api/shoes', newShoe);
            } else {
                await axios.put(`/api/shoes/${shoeId}`, newShoe);
            }
            setErr('');
            navigate('/shoes');
        } catch (err) {
            const axiosError = err as AxiosError;
            setErr(axiosError.response?.data as string || 'Unknown error occurred');
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
                        <NumberInput 
                            value={modelVersion}
                            onChange={(v) => setModelVersion(v)}
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
                            }}
                        />
                    </div>
                    <div className="label-field">
                        <label>Starting Mileage:</label>
                        <NumberInput 
                            value={startingMiles}
                            onChange={(v) => setStartingMiles(v)}
                            allowFloats
                        />
                    </div>
                    <div className="label-field">
                        <label>Warn at Mileage:</label>
                        <NumberInput 
                            value={warnAtMileage}
                            onChange={(v) => setWarnAtMileage(v)}
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

            <div className="bottom-section">
                <label>Preview:</label>
                <ShoeEntry 
                    shoe={{
                        id: '',
                        brand: brand || '[Missing Brand]',
                        model: model || '[Missing Model]',
                        modelVersion: parseInt(modelVersion),
                        shoeName: name,
                        description: desc.length > 0 ? desc : '',
                        startingMileage: parseInt(startingMiles),
                        warnAtMileage: parseInt(warnAtMileage),
                        startDate: stringDateToDateModel(startDate),
                        textColor,
                        gradient,
                        miles: 100,
                    }}
                    displayOnly
                />

                {err.length > 0 && <pre className="error-text">{err}</pre>}
            </div>

            <div className="button-row">
                <button className="mt mr-s fc" onClick={() => navigate('/shoes')}>Cancel</button>
                <button className="mt fc" onClick={submit}>Submit</button>
            </div>
        </div>
    );
};

export default EditShoe;
