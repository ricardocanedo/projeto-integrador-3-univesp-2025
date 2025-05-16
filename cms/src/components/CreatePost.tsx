import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import api from '../services/api';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [bannerImage, setFile] = useState<File | null>(null);
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [slug, setSlug] = useState('');
    const [summary, setSummary] = useState('');
    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("author", author);
            formData.append("slug", slug);
            formData.append("summary", summary);

            if (bannerImage && typeof bannerImage !== "string") {
                formData.append("banner_image", bannerImage);
            }

            await api.post('/api/posts/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            console.error("Nenhum arquivo selecionado.");
            return;
        }

        const file = e.target.files[0];
        setFile(file);
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
                                <label className="form-label">Banner do Post</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Conteúdo</label>
                                <CKEditor
                                    editor={ClassicEditor as any}
                                    data={content}
                                    onChange={(_event, editor) => {
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
                                <label className="form-label">Referencial da URL</label>
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