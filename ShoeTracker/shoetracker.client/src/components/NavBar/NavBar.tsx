import React from 'react';

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

    return (
        <div className="nav-bar">
            {navItems.map(item => (
                <span key={item.title} className="navlink">
                    <a href={item.path} className={url.endsWith(item.path) ? 'current' : ''}>
                        {item.title}
                    </a>
                </span>
            ))}
        </div>
    );
};

export default NavBar;
