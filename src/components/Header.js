//ChatGPT was used to assist with this file
import React from 'react';
import MESSAGES from '../lang/en.js'
import useLogout from '../hooks/useLogout.js';

const STRINGS = MESSAGES.HEADER

const Header = () => {
    const logout = useLogout();
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="./index">
                    MoodMelody
                </a>
                <button onClick={logout} className="btn btn-outline-danger">
                    {STRINGS.logout}
                </button>
            </div>
        </nav>
    );
};

export default Header;
