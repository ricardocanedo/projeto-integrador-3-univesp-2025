import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import api from '../services/api';

interface PostStats {
    post_title: string;
    month_year: string;
    views: number;
}

const Dashboard: React.FC = () => {
    const [totalPosts, setTotalPosts] = useState(0);
    const [postsByAuthor, setPostsByAuthor] = useState<any[]>([]);
    const [postsByMonth, setPostsByMonth] = useState<any[]>([]);
    const [postStats, setPostStats] = useState<PostStats[]>([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await api.get('/api/analytics/');
                setTotalPosts(response.data.total_posts);
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

        fetchAnalytics();
        fetchPostStats();
    }, []);

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="content m-4">
                <h1 className="text-center">Dashboard</h1>
                <div className="analytics">
                    <div className="card card-body my-4">
                        <h3>Total de Posts</h3>
                        <p>{totalPosts}</p>
                    </div>
                    <div className="card card-body my-4">
                        <h3>Posts por Autor</h3>
                        <ul>
                            {postsByAuthor.map((author: any) => (
                                <li key={author.author}>{author.author}: {author.count}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="card card-body my-4">
                        <h3>Posts por Mês</h3>
                        <ul>
                            {postsByMonth.map((month: any) => (
                                // get month / year from month
                                <li key={month.month}>{new Date(month.month).toLocaleString('default', { month: 'long' })}-{new Date(month.month).getFullYear()}: {month.count}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="card card-body my-4">
                        <h3>Taxas de Acesso por Post e Mês</h3>
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
                </div>
            </div>
            <div>&nbsp;</div>
        </div>
    );
};

export default Dashboard;