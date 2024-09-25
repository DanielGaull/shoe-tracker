import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { SignInDto } from '../../types/account';
import { useNavigate } from 'react-router';

import './SignIn.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [err, setErr] = useState('');

    const navigate = useNavigate();

    const submit = async () => {
        const newAccount: SignInDto = {
            email,
            password
        };

        try {
            await axios.post('/api/auth/sign-in', newAccount);
            setErr('');
            navigate('/');

        } catch (err) {
            const axiosError = err as AxiosError;
            setErr(axiosError.response?.data as string || 'Unknown error occurred');
        }
    };

    return (
        <div className="sign-in">
            <h1>Sign In</h1>
            <div>
                <div className="form-column">
                    <div className="label-field">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="label-field">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {/* <label className="c-pointer us-none">
                        <input type="checkbox" checked={remember} onChange={() => setRemember(c => !c)} />
                        Remember Me
                    </label> */}
                </div>
            </div>

            {err.length > 0 && <pre className="error-text">{err}</pre>}

            <div className="button-row">
                <button className="mt fc" onClick={submit}>Submit</button>
            </div>


            <a className="button-row mt" href="/create-account">
                Don't have an account? Create account instead
            </a>
        </div>
    )
};

export default SignIn;
