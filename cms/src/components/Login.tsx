import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        // Clear tokens when entering the login page
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('login/', { username, password });
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            navigate('/dashboard');
        } catch (err: any) {
            if (err.response && err.response.data) {
                setError(
                    (err.response.data?.error)
                    ?? (
                        err.response.data?.detail && err.response.data?.messages[0]?.message
                        ? err.response.data.detail + ". " + err.response.data.messages[0]?.message
                        : null
                    )
                    ?? 'An error occurred'
                );
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="login-container">
            <h2 className='m-4'>Login</h2>
            <form onSubmit={handleSubmit} className='form'>
                <div className='form-group row mt-4'>
                    <label className='col-sm-4 col-form-label'>Username: </label>
                    <div className="col-sm-8 my-2">
                        <input
                            type="text"
                            className='form-control'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>
                <div className='form-group row'>
                    <label className='col-sm-4 col-form-label'>Password: </label>
                    <div className="col-sm-8 my-2">
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className="m-2">
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <div className='form-group row my-4'>
                    <div className="col-sm-12">
                        <button type="submit"
                            className='btn btn-warning w-100 mx-auto'>
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;