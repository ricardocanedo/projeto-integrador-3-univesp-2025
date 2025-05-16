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
    const [bannerImage, setFile] = useState<File | null>(null);
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
                setSummary(response.data.summary ?? '');

                // Se houver uma imagem, defina o estado para exibi-la
                if (response.data.banner_image) {
                    setFile(response.data.banner_image);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    const handleSave = async () => {
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

            await api.put(`/api/posts/${id}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
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
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            console.error("Nenhum arquivo selecionado.");
            return;
        }

        const file = e.target.files[0];
        setFile(file);
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

                                {bannerImage && typeof bannerImage == 'string' && (
                                    <div className="mb-3">
                                        <label className="form-label">Banner Atual</label>
                                        <div>
                                            <img src={bannerImage} alt="Banner do Post" className="img-thumbnail" />
                                        </div>
                                    </div>
                                )}
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
                                        editor={ClassicEditor}
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