import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
    };

    const username = "User"; // Replace with actual username if available

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            {location.pathname !== '/dashboard' && (
                                <Link
                                    className={`nav-link text-capitalize ${location.pathname === '/dashboard' ? 'active' : ''}`}
                                    to="/dashboard"
                                >
                                    dashboard
                                </Link>
                            )}
                            {location.pathname === '/dashboard' && (
                                <span
                                    className={`nav-link text-capitalize active`}
                                >
                                    dashboard
                                </span>
                            )}
                        </li>
                        <li className="nav-item">
                            {location.pathname !== '/posts' && (
                                <Link
                                    className={`nav-link text-capitalize ${location.pathname === '/posts' ? 'active' : ''}`}
                                    to="/posts"
                                >
                                    posts
                                </Link>
                            )}
                            {location.pathname === '/posts' && (
                                <span
                                    className={`nav-link text-capitalize active`}
                                >
                                    posts
                                </span>
                            )}
                        </li>
                    </ul>
                    <span className="navbar-text me-3">{username}</span>
                    <button className="btn btn-sm btn-outline-primary" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;