import React from 'react';
import Navbar from './Navbar';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="content text-center mt-4">
                <h1>Dashboard</h1>
                <p>Welcome to the CMS Dashboard. Here you can manage your content and view statistics.</p>
            </div>
        </div>
    );
};

export default Dashboard;