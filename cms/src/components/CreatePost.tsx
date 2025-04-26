import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../services/api';
import { toast } from 'react-toastify';

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            await api.post('/api/posts/', { title, content, author });
            toast.success('Postagem criada com sucesso');
            navigate('/posts');
        } catch (err) {
            console.error('Error creating post:', err);
            toast.error('Erro! ' 
                + (err as any)?.message
                || 'Erro ao criar'
            );
        }
    };

    const handleBack = () => {
        navigate('/posts');
    };

    return (
        <div className="create-post-container">
            <Navbar />
            <div className="content">
                <div className="card border-0">
                    <h1 className='text-center m-4'>Criar Postagem</h1>
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
                                    rows={20}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Autor</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                />
                            </div>
                            <div className="d-flex justify-content-between">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={handleBack}
                                    >
                                        Voltar
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleCreate}
                                    >
                                        Salvar
                                    </button>
                                </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;