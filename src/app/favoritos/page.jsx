'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Card, Button, Badge, LoadingSpinner } from '../../components/ui';
import Link from 'next/link';
import styles from './favoritos.module.css';

export default function FavoritosPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4002';
  const API_KEY = 'entre-linhas-2024';

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    setError(null);

    try {
      const favoritesUrl = `${API_URL}/api/diary-entries/favorites?API_KEY=${API_KEY}`;
      console.log('Fazendo requisição para favoritos:', favoritesUrl);
      
      try {
        const { data: favoritesData } = await axios.get(favoritesUrl, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${API_KEY}`
          }
        });
        setFavorites(favoritesData.data || favoritesData || []);
      } catch (err1) {
        // Tenta formato alternativo
        try {
          const { data: favoritesData } = await axios.get(`${API_URL}/api/diary-entries/favorites`, {
            headers: {
              'Content-Type': 'application/json',
              'API-KEY': API_KEY
            }
          });
          setFavorites(favoritesData.data || favoritesData || []);
        } catch (err2) {
          throw new Error(`Erro ao buscar favoritos: ${err1?.response?.status || ''} - ${err2?.response?.status || ''}`);
        }
      }
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar favoritos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      const toggleUrl = `${API_URL}/api/diary-entries/${id}/favorite?API_KEY=${API_KEY}`;
      console.log('Removendo favorito:', toggleUrl);
      
      try {
        await axios.patch(toggleUrl, {}, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${API_KEY}`
          }
        });
      } catch (err1) {
        try {
          await axios.patch(`${API_URL}/api/diary-entries/${id}/favorite`, {}, {
            headers: {
              'Content-Type': 'application/json',
              'API-KEY': API_KEY
            }
          });
        } catch (err2) {
          throw new Error('Erro ao remover favorito');
        }
      }
      setFavorites(prev => prev.filter(entry => entry.id !== id));
    } catch (err) {
      console.error('Erro ao remover favorito:', err);
      alert('Erro ao remover favorito.');
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
      'animado': '🤩',
      'nostálgico': '🥺',
      'reflexivo': '🤔',
      'grateful': '🙏',
      'default': '😐'
    };
    return moodEmojis[mood?.toLowerCase()] || moodEmojis.default;
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Entradas Favoritas</h1>
          <p className={styles.subtitle}>Suas memórias mais especiais</p>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            <LoadingSpinner size="lg" />
            <p className={styles.loadingText}>Carregando favoritos...</p>
          </div>
        ) : error ? (
          <Card className={styles.errorCard}>
            <div className={styles.errorIcon}>❌</div>
            <h3 className={styles.errorTitle}>Erro</h3>
            <p className={styles.errorMessage}>{error}</p>
            <Button onClick={loadFavorites}>Tentar novamente</Button>
          </Card>
        ) : favorites.length === 0 ? (
          <Card className={styles.emptyCard}>
            <div className={styles.emptyIcon}>⭐</div>
            <h3 className={styles.emptyTitle}>
              Nenhum favorito ainda
            </h3>
            <p className={styles.emptyText}>
              Marque suas entradas especiais como favoritas para encontrá-las facilmente aqui.
            </p>
            <Link href="/entradas">
              <Button>Ver todas as entradas</Button>
            </Link>
          </Card>
        ) : (
          <div className={styles.favoritesGrid}>
            {favorites.map((entry) => (
              <Card key={entry.id} className={styles.favoriteCard}>
                <div className={styles.favoriteHeader}>
                  <h3 className={styles.favoriteTitle}>
                    {entry.title}
                  </h3>
                  <button
                    onClick={() => handleToggleFavorite(entry.id)}
                    className={styles.favoriteIcon}
                    title="Remover dos favoritos"
                  >
                    ⭐
                  </button>
                </div>
                
                <div className={styles.favoriteMeta}>
                  <span className={styles.favoriteDate}>
                    {formatDate(entry.entry_date)}
                  </span>
                  {entry.mood && (
                    <Badge variant="secondary" className="text-xs">
                      {getMoodEmoji(entry.mood)} {entry.mood}
                    </Badge>
                  )}
                </div>
                
                <p className={styles.favoriteContent}>
                  {entry.content?.substring(0, 120)}
                  {entry.content?.length > 120 && '...'}
                </p>
                
                {entry.tags && entry.tags.length > 0 && (
                  <div className={styles.favoriteTags}>
                    {entry.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="default" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                    {entry.tags.length > 3 && (
                      <Badge variant="default" className="text-xs">
                        +{entry.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className={styles.favoriteActions}>
                  <div className={styles.favoriteActionsLeft}>
                    <Link href={`/entradas/${entry.id}`}>
                      <Button size="sm">
                        Ver
                      </Button>
                    </Link>
                    <Link href={`/entradas/${entry.id}/editar`}>
                      <Button size="sm">
                        Editar
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
