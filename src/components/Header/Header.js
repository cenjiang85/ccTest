import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header clearfix">
            <nav>
                <ul className="nav nav-pills float-right">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" activeClassName="active" to="/">Deliveries</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName="active" to="/create">New Delivery</NavLink>
                    </li>
                </ul>
            </nav>
            <h3 className="text-muted">CartonCloud</h3>
        </header>
    );
};

export { Header };
