import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

import './NavBar.css';

interface NavItem {
    title: string;
    path: string;
}

const navItems: NavItem[] = [
    {
        title: 'Shoes',
        path: '/',
    },
    {
        title: 'Activities',
        path: '/activities',
    },
];

const NavBar = () => {
    // Cannot use useLocation since this isn't inside of the router provider
    const url = window.location.href;

    const signOut = async () => {
        await axios.post('/api/auth/sign-out');
        window.location.href = '/sign-in';
    };

    return (
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
    );
};

export default NavBar;
