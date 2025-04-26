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

    const handleCreatePost = () => {
        navigate('/posts/create');
    };

    return (
        <div className="posts-container">
            <Navbar />
            <div className="content mt-4">
                <div>
                    <h1 className='text-center'>Postagens</h1>
                </div>
                <div className="d-flex justify-content-end mt-0 m-3">
                    <button
                        className="btn btn-success"
                        onClick={handleCreatePost}
                    >
                        Criar Nova Postagem
                    </button>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className='col-1 text-center'>#</th>
                            <th className='col-5 text-center'>Título</th>
                            <th className='col-3 text-center'>Autor</th>
                            <th className='col-2 text-center'>Criado em</th>
                            <th className='col-1 text-center'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td className='text-center'>{post.id}</td>
                                <td className='text-center'>{post.title}</td>
                                <td className='text-center'>{post.author}</td>
                                <td className='text-center'>{new Date(post.created_at).toLocaleDateString()}</td>
                                <td className='text-center'>
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