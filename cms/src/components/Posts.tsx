import React from 'react';
import Navbar from './Navbar';

const Posts: React.FC = () => {
    return (
        <div className="posts-container">
            <Navbar />
            <div className="content mt-4">
                <h1>Posts</h1>
                <p>Manage your blog posts here. You can create, edit, and delete posts.</p>
            </div>
        </div>
    );
};

export default Posts;