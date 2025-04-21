import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../services/api';

interface Post {
    id: number;
    title: string;
    author: string;
    created_at: string;
}

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await api.get('/api/posts/');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleEdit = (id: number) => {
        navigate(`/posts/edit/${id}`);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que quer excluir essa postagem?')) {
            try {
                await api.delete(`/api/posts/${id}/`);
                setPosts(posts.filter((post) => post.id !== id));
                alert('Postagem deletada com sucesso!');
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    return (
        <div className="posts-container">
            <Navbar />
            <div className="content mt-4">
                <h1 className='text-center'>Posts</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>{post.author}</td>
                                <td>{new Date(post.created_at).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => handleEdit(post.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Posts;