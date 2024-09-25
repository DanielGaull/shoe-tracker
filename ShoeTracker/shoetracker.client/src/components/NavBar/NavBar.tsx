import React, { useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Outlet, useNavigate } from 'react-router';

import './NavBar.css';

interface NavItem {
    title: string;
    path: string;
}

const navItems: NavItem[] = [
    {
        title: 'Shoes',
        path: '/shoes',
    },
    {
        title: 'Activities',
        path: '/activities',
    },
];

const NavBar = () => {
    // Cannot use useLocation since this isn't inside of the router provider
    const url = window.location.href;
    const navigate = useNavigate();

    const signOut = async () => {
        await axios.post('/api/auth/sign-out');
        navigate('/sign-in');
    };

    // TODO: Maybe move somewhere else that requires calling API less? (Like a use context)
    useEffect(() => {
        async function run() {
            try {
                await axios.get('/api/whoami');
            } catch (err) {
                const axiosErr = err as AxiosError;
                if (axiosErr.response?.status === 401) {
                    navigate('/sign-in');
                }
            }

        }
        run();

    }, []);

    return (
        <>
            <div className="nav-bar-container">
                <div style={{ width: 120 }} />
                <div className="nav-bar">
                    {navItems.map(item => (
                        <span key={item.title} className="navlink">
                            <a href={item.path} className={url.endsWith(item.path) ? 'current' : ''}>
                                {item.title}
                            </a>
                        </span>
                    ))}
                </div>
                <button className="small mb" onClick={signOut}>Sign Out</button>
            </div>

            <Outlet />
        </>
    );
};

export default NavBar;
