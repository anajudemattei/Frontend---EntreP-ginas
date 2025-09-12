'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Card, Button, Badge, LoadingSpinner, Input, Select } from '../../components/ui';
import Image from 'next/image';
import Link from 'next/link';
import apiService from '../../services/api';
import styles from './entradas.module.css';

export default function EntradasPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    mood: '',
    tag: '',
    favorites: ''
  });

  useEffect(() => {
    loadEntries();
  }, [filters]);

  const loadEntries = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getDiaryEntries(filters);
      setEntries(response.data || []);
    } catch (err) {
      console.error('Erro ao carregar entradas:', err);
      setError('Não foi possível carregar as entradas.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      mood: '',
      tag: '',
      favorites: ''
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar esta entrada?')) {
      return;
    }

    try {
      await apiService.deleteDiaryEntry(id);
      setEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (err) {
      console.error('Erro ao deletar entrada:', err);
      alert('Erro ao deletar entrada.');
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      await apiService.toggleFavorite(id);
      setEntries(prev => prev.map(entry => 
        entry.id === id 
          ? { ...entry, is_favorite: !entry.is_favorite }
          : entry
      ));
    } catch (err) {
      console.error('Erro ao alterar favorito:', err);
      alert('Erro ao alterar favorito.');
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
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              Minhas Entradas
            </h1>
            <p className={styles.subtitle}>
              {entries.length} {entries.length === 1 ? 'entrada encontrada' : 'entradas encontradas'}
            </p>
          </div>
        </div>

        {/* Filtros */}
        <Card className={styles.filtersCard}>
          <h3 className={styles.filtersTitle}>Filtros</h3>
          <div className={styles.filtersGrid}>
            <Input
              type="date"
              label="Data início"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
            <Input
              type="date"
              label="Data fim"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
            <Select
              label="Humor"
              value={filters.mood}
              onChange={(e) => handleFilterChange('mood', e.target.value)}
            >
              <option value="">Todos os humores</option>
              <option value="feliz">😊 Feliz</option>
              <option value="triste">😢 Triste</option>
              <option value="ansioso">😰 Ansioso</option>
              <option value="calmo">😌 Calmo</option>
              <option value="animado">🤩 Animado</option>
              <option value="nostálgico">🥺 Nostálgico</option>
              <option value="reflexivo">🤔 Reflexivo</option>
            </Select>
            <Input
              label="Tag"
              placeholder="Digite uma tag"
              value={filters.tag}
              onChange={(e) => handleFilterChange('tag', e.target.value)}
            />
            <Select
              label="Favoritos"
              value={filters.favorites}
              onChange={(e) => handleFilterChange('favorites', e.target.value)}
            >
              <option value="">Todos</option>
              <option value="true">Apenas favoritos</option>
            </Select>
          </div>
          <div className={styles.filtersActions}>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Limpar filtros
            </Button>
          </div>
        </Card>

        {/* Separador */}
        <div className={styles.separator}>
          <div className={styles.separatorLine}></div>
          <span className={styles.separatorText}>Entradas</span>
          <div className={styles.separatorLine}></div>
        </div>

        {/* Lista de entradas */}
        {loading ? (
          <div className={styles.loadingState}>
            <LoadingSpinner size="lg" />
            <p className={styles.loadingText}>Carregando entradas...</p>
          </div>
        ) : error ? (
          <Card className={styles.errorCard}>
            <div className={styles.errorIcon}>❌</div>
            <h3 className={styles.errorTitle}>Erro</h3>
            <p className={styles.errorMessage}>{error}</p>
            <Button onClick={loadEntries}>Tentar novamente</Button>
          </Card>
        ) : entries.length === 0 ? (
          <Card className={styles.emptyCard}>
            <div className={styles.emptyLogo}>
              <Image 
                src="/logo.png" 
                alt="Entre Páginas" 
                width={150} 
                height={48}
                className="h-12 w-auto rounded-lg"
              />
            </div>
            <div className={styles.emptyIcon}>📖</div>
            <h3 className={styles.emptyTitle}>
              Nenhuma entrada encontrada
            </h3>
            <p className={styles.emptyText}>
              {Object.values(filters).some(f => f) 
                ? 'Tente ajustar os filtros ou criar uma nova entrada.'
                : 'Que tal começar escrevendo sua primeira entrada?'
              }
            </p>
            <Link href="/entradas/nova">
              <Button>Criar entrada</Button>
            </Link>
          </Card>
        ) : (
          <div className={styles.entriesGrid}>
            {entries.map((entry) => (
              <Card key={entry.id} className={styles.entryCard}>
                <div className={styles.entryHeader}>
                  <h3 className={styles.entryTitle}>
                    {entry.title}
                  </h3>
                  <button
                    onClick={() => handleToggleFavorite(entry.id)}
                    className={styles.favoriteButton}
                  >
                    {entry.is_favorite ? '⭐' : '☆'}
                  </button>
                </div>
                
                <div className={styles.entryMeta}>
                  <span className={styles.entryDate}>
                    {formatDate(entry.entry_date)}
                  </span>
                  {entry.mood && (
                    <Badge variant="secondary" className="text-xs">
                      {getMoodEmoji(entry.mood)} {entry.mood}
                    </Badge>
                  )}
                </div>
                
                <p className={styles.entryContent}>
                  {entry.content?.substring(0, 120)}
                  {entry.content?.length > 120 && '...'}
                </p>
                
                {entry.tags && entry.tags.length > 0 && (
                  <div className={styles.entryTags}>
                    {entry.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="default" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                    {entry.tags.length > 2 && (
                      <Badge variant="default" className="text-xs">
                        +{entry.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className={styles.entryActions}>
                  <div className={styles.entryActionsLeft}>
                    <Link href={`/entradas/${entry.id}`}>
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </Link>
                    <Link href={`/entradas/${entry.id}/editar`}>
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </Link>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={styles.deleteButton}
                    onClick={() => handleDelete(entry.id)}
                  >
                    Deletar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        {/* Botão Voltar ao Topo */}
        {entries.length > 0 && (
          <div className={styles.backToTop}>
            <Button
              onClick={scrollToTop}
              className="btn-primary"
            >
              ↑ Voltar ao topo
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
