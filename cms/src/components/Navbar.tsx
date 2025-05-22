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

    const username = localStorage.getItem('username') || 'Not found';

    return (
        <div className="d-flex justify-content-between w-100 bg-light">
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
                                        postagens
                                    </Link>
                                )}
                                {location.pathname === '/posts' && (
                                    <span
                                        className={`nav-link text-capitalize active`}
                                    >
                                        postagens
                                    </span>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="m-3">
                <div className="position-relative bg-light">
                    <span
                        className="navbar-text"
                        role="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#logoutCollapse"
                        aria-expanded="false"
                        aria-controls="logoutCollapse"
                    >
                        {username}
                    </span>
                    <div id="logoutCollapse" className="collapse position-absolute" style={{ top: '100%', right: 0 }}>
                        <button
                            className="btn btn-sm btn-outline-danger text-nowrap mt-3"
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;