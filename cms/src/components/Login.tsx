import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/authentication/login/', {
                username,
                password,
            });
            alert(response.data.message);
            // Save token or handle successful login
        } catch (err) {
            setError('Invalid credentials');
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