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
                        <p>Postagens Publicadas: {totalPosts}</p>
                        <p>Inscrições Newsletter: {totalNewsletter}</p>
                    </div>
                    <div className="card card-body my-4">
                        <h3 className='mb-4'>Posts Por Autor</h3>
                        <ul>
                            {postsByAuthor.map((author: any) => (
                                <li key={author.author}>{author.author}: {author.count}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="card card-body my-4">
                        <h3 className='mb-4'>Posts Por Mês</h3>
                        <ul>
                            {postsByMonth.map((month: any) => (
                                <li key={month.month}>{new Date(month.month).toLocaleString('default', { month: 'long' })}-{new Date(month.month).getFullYear()}: {month.count}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="card card-body my-4">
                        <h3 className='mb-4'>Taxas de Acesso Por Post e Mês</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center">Mês/Ano</th>
                                    <th className="text-center">Post</th>
                                    <th className="text-center">Visualizações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {postStats.map((stat, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{stat.month_year}</td>
                                        <td className="text-center">{stat.post_title}</td>
                                        <td className="text-center">{stat.views}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card card-body my-4">
                        <h3 className='mb-4'>Inscrições na Newsletter</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center">Emails</th>
                                    <th className="text-center">Data de inscrição</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptionStats.map((stat, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{stat.email}</td>
                                        {/* format date to dd/mm/yyyy */}
                                        <td className="text-center">{new Date(stat.created_at).toLocaleDateString('pt-BR')}</td>
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