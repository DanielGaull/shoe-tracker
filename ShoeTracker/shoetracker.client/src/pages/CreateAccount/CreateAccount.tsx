import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { CreateAccountDto } from '../../types/account';
import { useNavigate } from 'react-router';

import './CreateAccount.css';

const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const [pwErr, setPwErr] = useState<string | null>(null);
    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const submit = async () => {
        const newAccount: CreateAccountDto = {
            firstName: first,
            lastName: last,
            email,
            password
        };

        try {
            await axios.post('/api/create-account', newAccount);
            setErr('');
            navigate('/account-created');

        } catch (err) {
            const axiosError = err as AxiosError;
            setErr(axiosError.response?.data as string ?? 'Unknown error occurred');
        }
    };

    useEffect(() => {
        if (password.length > 0 && confirmedPassword.length > 0 && password !== confirmedPassword) {
            setPwErr('Passwords do not match');
            return;
        }
        if (password.length < 8) {
            setPwErr('Password must be at least 8 characters long');
        }
        setPwErr(null);

    }, [password, confirmedPassword]);

    return (
        <div className="create-account">
            <h1>Create Account</h1>
            <div className="form">
                <div className="form-column">
                    <div className="label-field">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="label-field">
                        <label>First Name</label>
                        <input value={first} onChange={(e) => setFirst(e.target.value)} />
                    </div>
                    <div className="label-field">
                        <label>Last Name</label>
                        <input value={last} onChange={(e) => setLast(e.target.value)} />
                    </div>
                </div>
                <div className="form-column">
                    <div className="label-field">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="label-field">
                        <label>Confirm Password</label>
                        <input type="password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} />
                    </div>
                </div>
            </div>

            {pwErr && <div className="error-text">{pwErr}</div>}
            {err.length > 0 && <pre className="error-text">{err}</pre>}

            <div className="button-row">
                <button className="mt mr-s fc" onClick={submit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CreateAccount;
