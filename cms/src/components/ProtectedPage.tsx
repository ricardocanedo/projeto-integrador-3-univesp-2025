import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProtectedPage: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchProtectedData = async () => {
            setError(''); // Reset error
            try {
                const response = await api.get('protected/');
                setMessage(response.data.message);
            } catch (err) {
                setError('You are not authorized to view this page.');
            }
        };

        fetchProtectedData();
    }, []);

    return (
        <div className="protected-container">
            <h2>Protected Page</h2>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ProtectedPage;