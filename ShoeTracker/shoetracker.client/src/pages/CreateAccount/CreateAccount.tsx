import React, { useEffect, useState } from 'react';

import './CreateAccount.css';

const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const [pwErr, setPwErr] = useState<string | null>(null);

    const submit = () => {

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
                        <input value={email} onChange={(e) => setEmail(e.target.value)} />
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

            <div className="button-row">
                <button className="mt mr-s fc">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CreateAccount;
