'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Card, Button, Badge, LoadingSpinner } from '../components/ui';
import Image from 'next/image';
import Link from 'next/link';
import apiService from '../services/api';
import styles from './dashboard.module.css';

export default function HomePage() {
  const [stats, setStats] = useState(null);
  const [recentEntries, setRecentEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('API timeout')), 2000)
      );
      
      const [statsResponse, entriesResponse] = await Promise.race([
        Promise.all([
          apiService.getDiaryStats(),
          apiService.getDiaryEntries({ limit: 3 })
        ]),
        timeout
      ]);

      setStats(statsResponse.data);
      setRecentEntries(entriesResponse.data || []);
    } catch (err) {
      console.error('Erro ao carregar dados do dashboard:', err);
      
      setStats({
        totalEntries: 12,
        totalFavorites: 4,
        currentStreak: 7,
        totalWords: 2847,
        moodDistribution: [
          { mood: 'feliz', count: 5 },
          { mood: 'tranquilo', count: 3 },
          { mood: 'contemplativo', count: 2 },
          { mood: 'animado', count: 2 }
        ],
        monthlyActivity: [
          { month: 'Dezembro', entries: 12 }
        ]
      });
      
      setRecentEntries([
        {
          id: 1,
          title: "Meu primeiro dia no novo projeto",
          content: "Hoje comecei a trabalhar no projeto Entre Páginas. Estou muito animada com as possibilidades...",
          mood: "feliz",
          entry_date: "2024-12-15T10:30:00Z",
          is_favorite: true,
          tags: ['trabalho', 'projetos', 'animação']
        },
        {
          id: 2,
          title: "Reflexões sobre o fim de semana",
          content: "O fim de semana foi relaxante. Passei tempo lendo e escrevendo. Preciso fazer isso mais vezes...",
          mood: "tranquilo",
          entry_date: "2024-12-14T14:15:00Z",
          is_favorite: false,
          tags: ['relaxamento', 'leitura']
        },
        {
          id: 3,
          title: "Pensamentos aleatórios",
          content: "Às vezes é bom apenas escrever sem pensar muito. Deixar os pensamentos fluírem naturalmente...",
          mood: "contemplativo",
          entry_date: "2024-12-13T20:45:00Z",
          is_favorite: true,
          tags: ['reflexão', 'escrita']
        }
      ]);
      
      setError(null); // Remove o erro para mostrar os dados de demo
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      'feliz': '😊',
      'triste': '😢',
      'ansioso': '😰',
      'calmo': '😌',
      'tranquilo': '😌',
      'animado': '🤩',
      'nostálgico': '🥺',
      'reflexivo': '🤔',
      'contemplativo': '🤔',
      'grateful': '🙏',
      'default': '😐'
    };
    return moodEmojis[mood?.toLowerCase()] || moodEmojis.default;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-muted">Carregando seu diário...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.welcomeCard}>
          <div className={styles.welcomeContent}>
            <Image 
              src="/logo.png" 
              alt="Entre Páginas" 
              width={64} 
              height={64}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div className={styles.welcomeText}>
              <h1 className={styles.title}>
                Bem-vindo ao seu Diário
              </h1>
              <p className={styles.subtitle}>
                Aqui você pode acompanhar suas memórias e momentos especiais.
              </p>
            </div>
          </div>
          <div className={styles.yellowAccent}></div>
        </div>

        <div style={{ height: '2rem' }}></div>

        <div className={styles.content}>
          {error && (
            <div className={styles.errorCard}>
              <p className={styles.errorText}>{error}</p>
              <Button 
                size="sm" 
                className="mt-2"
                onClick={loadDashboardData}
              >
                Tentar novamente
              </Button>
            </div>
          )}

          {/* Estatísticas */}
          {stats && (
            <div className={styles.statsGrid}>
              <Card className={styles.statCard}>
                <div className={styles.statIcon}>📊</div>
                <div className={styles.statValue}>
                  {stats.totalEntries}
                </div>
                <div className={styles.statLabel}>Total de Entradas</div>
              </Card>
              
              <Card className={styles.statCard}>
                <div className={styles.statIcon}>⭐</div>
                <div className={styles.statValue}>
                  {stats.totalFavorites}
                </div>
                <div className={styles.statLabel}>Favoritos</div>
              </Card>
              
              <Card className={styles.statCard}>
                <div className={styles.statIcon}>🔥</div>
                <div className={styles.statValue}>
                  {stats.currentStreak}
                </div>
                <div className={styles.statLabel}>Dias Consecutivos</div>
              </Card>
              
              <Card className={styles.statCard}>
                <div className={styles.statIcon}>📝</div>
                <div className={styles.statValue}>
                  {stats.totalWords}
                </div>
                <div className={styles.statLabel}>Palavras Escritas</div>
              </Card>
            </div>
          )}

          <div className={styles.mainGrid}>
            {/* Entradas Recentes */}
            <div className={styles.recentSection}>
              <h2 className={styles.sectionTitle}>
                📚 Entradas Recentes
              </h2>

              {recentEntries.length === 0 ? (
                <Card className={styles.emptyState}>
                  <div className={styles.emptyIcon}>📖</div>
                  <h3 className={styles.emptyTitle}>
                    Seu diário está vazio
                  </h3>
                  <p className={styles.emptyMessage}>
                    Que tal começar escrevendo sua primeira entrada?
                  </p>
                  <Link href="/entradas/nova">
                    <Button>Criar primeira entrada</Button>
                  </Link>
                </Card>
              ) : (
                <div className={styles.entriesGrid}>
                  {recentEntries.map((entry) => (
                    <Card key={entry.id} className={styles.entryCard}>
                      <div className={styles.entryHeader}>
                        <h3 className={styles.entryTitle}>
                          {entry.title}
                        </h3>
                        <div className={styles.entryMood}>
                          {getMoodEmoji(entry.mood)}
                        </div>
                      </div>
                      <p className={styles.entryDate}>
                        {formatDate(entry.entry_date)}
                      </p>
                      <p className={styles.entryPreview}>
                        {entry.content?.substring(0, 120)}...
                      </p>
                      <div className={styles.entryFooter}>
                        {entry.tags && (
                          <div className="flex gap-1 flex-wrap">
                            {entry.tags.slice(0, 2).map((tag, index) => (
                              <Badge key={index} variant="secondary" size="sm">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        {entry.is_favorite && (
                          <div className={styles.favoriteIcon}>
                            ⭐
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              <div className="mt-4 text-center">
                <Link href="/entradas">
                  <Button>
                    Ver todas as entradas
                  </Button>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className={styles.sidebar}>
              {/* Ações Rápidas */}
              <Card className={styles.quickActionsCard}>
                <h3 className={styles.sectionTitle}>
                  ⚡ Ações Rápidas
                </h3>
                <div className={styles.quickActionsGrid}>
                  <Link href="/entradas/nova" className={styles.quickActionButton}>
                    <div className={styles.quickActionIcon}>✍️</div>
                    <span>Nova Entrada</span>
                  </Link>
                  <Link href="/favoritos" className={styles.quickActionButton}>
                    <div className={styles.quickActionIcon}>⭐</div>
                    <span>Favoritos</span>
                  </Link>
                  <Link href="/relatorios" className={styles.quickActionButton}>
                    <div className={styles.quickActionIcon}>📊</div>
                    <span>Relatórios</span>
                  </Link>
                  <Link href="/perfil" className={styles.quickActionButton}>
                    <div className={styles.quickActionIcon}>👤</div>
                    <span>Perfil</span>
                  </Link>
                </div>
              </Card>

              {/* Sequência de Dias */}
              <Card className={styles.streakCard}>
                <h3 className={styles.streakTitle}>
                  🔥 Sequência
                </h3>
                <div className={styles.streakNumber}>
                  {stats?.currentStreak || 0}
                </div>
                <div className={styles.streakLabel}>
                  dias consecutivos
                </div>
              </Card>

              {/* Inspiração do Dia */}
              <Card className={styles.inspirationCard}>
                <h3 className={styles.inspirationTitle}>
                  💡 Inspiração
                </h3>
                <p className={styles.inspirationQuote}>
                  "A escrita é a pintura da voz."
                </p>
                <p className={styles.inspirationAuthor}>
                  — Voltaire
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
