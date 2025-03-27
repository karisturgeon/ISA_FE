import React from 'react';
import MESSAGES from '../lang/en.js'

const STRINGS = MESSAGES.HEADER

const Header = () => {
    return (
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="./index">
                    MoodMelody
                </a>
                <button type="submit" className="btn btn-primary">
                    {STRINGS.logout}
                </button>
            </div>
        </nav>
    );
};

export default Header;
