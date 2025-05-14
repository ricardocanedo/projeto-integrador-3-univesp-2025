import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import api from '../services/api';

interface PostStats {
    post_title: string;
    month_year: string;
    views: number;
}

interface SubscriptionStats {
    email: string;
    created_at: string;
}

const Dashboard: React.FC = () => {
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalNewsletter, setTotalNewsletter] = useState(0);
    const [postsByAuthor, setPostsByAuthor] = useState<any[]>([]);
    const [postsByMonth, setPostsByMonth] = useState<any[]>([]);
    const [postStats, setPostStats] = useState<PostStats[]>([]);
    const [subscriptionStats, setSubscriptionStats] = useState<SubscriptionStats[]>([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await api.get('/api/analytics/');
                setTotalPosts(response.data.total_posts);
                setTotalNewsletter(response.data.total_newsletter);
                setPostsByAuthor(response.data.posts_by_author);
                setPostsByMonth(response.data.posts_by_month);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            }
        };

        const fetchPostStats = async () => {
            try {
                const response = await api.get('/api/analytics/popular-posts/');
                const sortedStats = response.data.sort((a: PostStats, b: PostStats) => {
                    if (a.month_year === b.month_year) {
                        return b.views - a.views; // Ordenar por visualizações dentro do mesmo mês
                    }
                    return b.month_year.localeCompare(a.month_year); // Ordenar por mês de forma decrescente
                });
                setPostStats(sortedStats);
            } catch (error) {
                console.error('Error fetching post stats:', error);
            }
        };

        const fetchSubscriptions = async () => {
            try {
                const response = await api.get('/api/analytics/subscriptions/');
                setSubscriptionStats(response.data.subscriptions);
            } catch (error) {
                console.error('Error fetching subscriptions:', error);
            }
        }

        fetchAnalytics();
        fetchPostStats();
        fetchSubscriptions();
    }, []);

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="content m-4">
                <h1 className="text-center">Dashboard</h1>
                <div className="analytics">
                    <div className="card card-body my-4">
                        <h3 className='mb-4'>Geral</h3>
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td className='text-center col-6'>Postagens Publicadas</td>
                                    <td className='text-center col-6'>{totalPosts}</td>
                                </tr>
                                <tr>
                                    <td className='text-center col-6'>Inscrições Newsletter</td>
                                    <td className='text-center col-6'>{totalNewsletter}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="card card-body my-4">
                        <h3 className='mb-4'>Posts Por Autor</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center col-6">Autor</th>
                                    <th className="text-center col-6">Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postsByAuthor.map((author: any) => (
                                    <tr key={author.author}>
                                        <td className="text-center col-6">{author.author}</td>
                                        <td className="text-center col-6">{author.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card card-body my-4">
                        <h3 className='mb-4'>Posts Por Mês E Ano</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center">Ano - Mês</th>
                                    <th className="text-center">Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postsByMonth.map((month: any) => (
                                    <tr key={month.month}>
                                        <td className="text-center">{new Date(month.month).getFullYear()} - {new Date(month.month).toLocaleString('default', { month: 'long' })}</td>
                                        <td className="text-center">{month.count}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card card-body my-4">
                        <h3 className='mb-4'>Taxas de Acesso Por Post, Mês E Ano</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center">Ano - Mês</th>
                                    <th className="text-center">Post</th>
                                    <th className="text-center">Visualizações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postStats.map((stat, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{new Date(stat.month_year).getFullYear()} - {new Date(stat.month_year).toLocaleString('default', { month: 'long' })}</td>
                                        <td className="text-center">{stat.post_title}</td>
                                        <td className="text-center">{stat.views}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card card-body my-4">
                        <h3 className='mb-4'>Inscrições Na Newsletter</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center col-6">Emails</th>
                                    <th className="text-center col-6">Data da Inscrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptionStats.map((stat, index) => (
                                    <tr key={index}>
                                        <td className="text-center col-6">{stat.email}</td>
                                        {/* format date to dd/mm/yyyy */}
                                        <td className="text-center col-6">{new Date(stat.created_at).toLocaleDateString('pt-BR')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>&nbsp;</div>
        </div>
    );
};

export default Dashboard;