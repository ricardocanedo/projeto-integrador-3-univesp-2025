import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../services/api';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
    const [author, setAuthor] = useState('');
    const [slug, setSlug] = useState('');
    const [summary, setSummary] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await api.get(`/api/posts/${id}/`);
                setPost(response.data);
                setTitle(response.data.title);
                setContent(response.data.content);
                setAuthor(response.data.author);
                setSlug(response.data.slug);
                setSummary(response.data.summary);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    const handleSave = async () => {
        // if (!slug) {
        //     toast.error('O campo Slug não pode ser vazio.');
        //     return;
        // }
        try {
            await api.put(`/api/posts/${id}/`, {
                title,
                content,
                author,
                slug,
                summary,
            });
            toast.success('Postagem editada com sucesso');
            navigate('/posts');
        } catch (error) {
            console.error('Error updating post:', error);
            toast.error('Erro ao editar a postagem.');
        }
    };

    const handleBack = () => {
        navigate('/posts');
    };

    return (
        <div className="edit-post-container">
            <Navbar />
            <div className="content">
                {post ? (
                    <div className="card border-0">
                        <h1 className='text-center m-4'>Editar Postagem</h1>
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
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={content}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setContent(data);
                                        }}
                                    />
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
                                <div className="mb-3">
                                    <label className="form-label">Slug</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Resumo</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
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