import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../services/api';

interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
}

const EditPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/api/posts/${id}/`);
                setPost(response.data);
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    const handleSave = async () => {
        try {
            await api.put(`/api/posts/${id}/`, { title, content });
            alert('Post updated successfully!');
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div className="edit-post-container">
            <Navbar />
            <div className="content">
                {post ? (
                    <div className="card border-0">
                        <h1 className='text-center m-4'>Editar Post</h1>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Título</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Conteúdo</label>
                                    <textarea
                                        className="form-control"
                                        rows={5}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-primary float-end"
                                        onClick={handleSave}
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <p>Loading post...</p>
                )}
            </div>
        </div>
    );
};

export default EditPost;