'use client';

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Card, Button, Badge, LoadingSpinner } from '../components/ui';
import Image from 'next/image';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default function HomePage() {
  const [stats, setStats] = useState(null);
  const [recentEntries, setRecentEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4002';  
  const API_KEY = 'entre-linhas-2024';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const entriesUrl = `${API_URL}/api/diary-entries?API_KEY=${API_KEY}`;
        
        const entriesResponse = await fetch(entriesUrl, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${API_KEY}`
          }
        });
        
        if (!entriesResponse.ok) {
          const alternativeResponse = await fetch(`${API_URL}/diary-entries`, {
            headers: {
              'Content-Type': 'application/json',
              'API-KEY': API_KEY
            }
          });
          
          if (!alternativeResponse.ok) {
            throw new Error(`Erro ao buscar entradas: ${entriesResponse.status}`);
          }
          
          const entriesData = await alternativeResponse.json();
          const allEntries = entriesData.data || [];
          const last5Entries = allEntries.slice(0, 5);
          setRecentEntries(last5Entries);
        } else {
          const entriesData = await entriesResponse.json();
          const allEntries = entriesData.data || [];
          const last5Entries = allEntries.slice(0, 5);
          setRecentEntries(last5Entries);
        }

        try {
          const statsUrl = `${API_URL}/stats?API_KEY=${API_KEY}`;
          const statsResponse = await fetch(statsUrl, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (statsResponse.ok) {
            const statsData = await statsResponse.json();
            setStats(statsData);
          }
        } catch (statsError) {
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
                onClick={() => window.location.reload()}
              >
                Tentar novamente
              </Button>
            </div>
          )}

          {stats && (
            <div className={styles.statsGrid}>
              <Card className={styles.statCard}>
                <div className={styles.statIcon}>Estatísticas</div>
                <div className={styles.statValue}>
                  {stats.totalEntries}
                </div>
                <div className={styles.statLabel}>Total de Entradas</div>
              </Card>
              
              <Card className={styles.statCard}>
                <div className={styles.statIcon}>Favoritos</div>
                <div className={styles.statValue}>
                  {stats.totalFavorites}
                </div>
                <div className={styles.statLabel}>Favoritos</div>
              </Card>
              
              <Card className={styles.statCard}>
                <div className={styles.statIcon}>Sequência</div>
                <div className={styles.statValue}>
                  {stats.currentStreak}
                </div>
                <div className={styles.statLabel}>Dias Consecutivos</div>
              </Card>
              
              <Card className={styles.statCard}>
                <div className={styles.statIcon}>Palavras</div>
                <div className={styles.statValue}>
                  {stats.totalWords}
                </div>
                <div className={styles.statLabel}>Palavras Escritas</div>
              </Card>
            </div>
          )}

          <div className={styles.mainGrid}>
            <div className={styles.recentSection}>
              <h2 className={styles.sectionTitle}>
                Entradas Recentes
              </h2>

              {recentEntries.length === 0 ? (
                <Card className={styles.emptyState}>
                  <div className={styles.emptyIcon}>Vazio</div>
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
                    <Link key={entry.id} href={`/entradas/${entry.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Card className={styles.entryCard}>
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
                              Favorito
                            </div>
                          )}
                        </div>
                      </Card>
                    </Link>
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

            <div className={styles.sidebar}>
              <Card className={styles.quickActionsCard}>
                <h3 className={styles.sectionTitle}>
                  Ações Rápidas
                </h3>
                <div className={styles.quickActionsGrid}>
                  <Link href="/entradas/nova" className={styles.quickActionButton}>
                    <div className={styles.quickActionIcon}>🆕</div>
                    <span>Nova Entrada</span>
                  </Link>
                  <Link href="/favoritos" className={styles.quickActionButton}>
                    <div className={styles.quickActionIcon}>⭐</div>
                    <span>Favoritos</span>
                  </Link>
                  <Link href="/relatorios" className={styles.quickActionButton}>
                    <div className={styles.quickActionIcon}>📈</div>
                    <span>Relatórios</span>
                  </Link>
                  <Link href="/perfil" className={styles.quickActionButton}>
                    <div className={styles.quickActionIcon}>👩🏻</div>
                    <span>Perfil</span>
                  </Link>
                </div>
              </Card>

              <Card className={styles.streakCard}>
                <h3 className={styles.streakTitle}>
                  Sequência
                </h3>
                <div className={styles.streakNumber}>
                  {stats?.currentStreak || 0}
                </div>
                <div className={styles.streakLabel}>
                  dias consecutivos
                </div>
              </Card>

              <Card className={styles.inspirationCard}>
                <h3 className={styles.inspirationTitle}>
                  Inspiração
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
