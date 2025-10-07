'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Card, Button, Badge, LoadingSpinner, Input, Select } from '../../components/ui';
import Link from 'next/link';
import styles from './entradas.module.css';

export default function EntradasPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    mood: '',
    tag: '',
    favorites: ''
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4002';
  const API_KEY = 'entre-linhas-2024';

  useEffect(() => {
    loadEntries();
  }, [filters]);

  const loadEntries = async () => {
    setLoading(true);
    setError(null);

    try {
      // Construir query params para filtros
      const queryParams = new URLSearchParams();
      queryParams.append('API_KEY', API_KEY);
      
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      if (filters.mood) queryParams.append('mood', filters.mood);
      if (filters.tag) queryParams.append('tag', filters.tag);
      if (filters.favorites === 'true') queryParams.append('favorites', 'true');

      // Buscar entradas
      const entriesUrl = `${API_URL}/api/diary-entries?${queryParams.toString()}`;
      console.log('Fazendo requisição para entradas:', entriesUrl);
      
      try {
        const { data: entriesData } = await axios.get(entriesUrl, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${API_KEY}`
          }
        });
        setEntries(entriesData.data || entriesData || []);
      } catch (err1) {
        // Tentar formato alternativo se o primeiro falhar
        try {
          const { data: entriesData } = await axios.get(`${API_URL}/api/diary-entries?${queryParams.toString()}`, {
            headers: {
              'Content-Type': 'application/json',
              'API-KEY': API_KEY
            }
          });
          setEntries(entriesData.data || entriesData || []);
        } catch (err2) {
          throw new Error(`Erro ao buscar entradas: ${err1?.response?.status || ''} - ${err2?.response?.status || ''}`);
        }
      }
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar entradas:', err);
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

  const filteredEntries = entries.filter(entry => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Busca apenas pelo título
    return entry.title?.toLowerCase().includes(searchLower);
  });

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
      const deleteUrl = `${API_URL}/api/diary-entries/${id}?API_KEY=${API_KEY}`;
      console.log('Deletando entrada:', deleteUrl);
      
      const deleteResponse = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      if (!deleteResponse.ok) {
        // Tentar formato alternativo
        const alternativeResponse = await fetch(`${API_URL}/api/diary-entries/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY
          }
        });
        
        if (!alternativeResponse.ok) {
          throw new Error('Erro ao deletar entrada');
        }
      }

      // Remove a entrada da lista
      setEntries(prev => prev.filter(entry => entry.id !== id));
      console.log('Entrada deletada com sucesso!');
    } catch (err) {
      console.error('Erro ao deletar entrada:', err);
      alert('Erro ao deletar entrada. Verifique se o back-end está rodando.');
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      const favoriteUrl = `${API_URL}/api/diary-entries/${id}/favorite?API_KEY=${API_KEY}`;
      console.log('Alterando favorito:', favoriteUrl);
      
      const favoriteResponse = await fetch(favoriteUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      if (!favoriteResponse.ok) {
        // Tentar formato alternativo
        const alternativeResponse = await fetch(`${API_URL}/api/diary-entries/${id}/favorite`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY
          }
        });
        
        if (!alternativeResponse.ok) {
          throw new Error('Erro ao alterar favorito');
        }
      }

      // Atualiza o estado local
      setEntries(prev => prev.map(entry => 
        entry.id === id 
          ? { ...entry, is_favorite: !entry.is_favorite }
          : entry
      ));
      
      console.log('Favorito alterado com sucesso!');
    } catch (err) {
      console.error('Erro ao alterar favorito:', err);
      alert('Erro ao alterar favorito. Verifique se o back-end está rodando.');
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
              {filteredEntries.length} {filteredEntries.length === 1 ? 'entrada encontrada' : 'entradas encontradas'}
            </p>
          </div>
        </div>

        {/* Barra de Pesquisa */}
        <div className={styles.searchSection}>
          <Card className={styles.searchCard}>
            <div className={styles.searchContainer}>
              <div className={styles.searchInputWrapper}>
                <span className={styles.searchIcon}>Buscar</span>
                <Input
                  type="text"
                  placeholder="Pesquisar por título..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className={styles.clearSearchButton}
                    aria-label="Limpar pesquisa"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </Card>
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
            <Button size="sm" onClick={clearFilters}>
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
            <div className={styles.errorIcon}>Erro</div>
            <h3 className={styles.errorTitle}>Erro</h3>
            <p className={styles.errorMessage}>{error}</p>
            <Button onClick={loadEntries}>Tentar novamente</Button>
          </Card>
        ) : filteredEntries.length === 0 ? (
          <Card className={styles.emptyCard}>
            <div className={styles.emptyIcon}>Vazio</div>
            <h3 className={styles.emptyTitle}>
              Nenhuma entrada encontrada
            </h3>
            <p className={styles.emptyText}>
              {Object.values(filters).some(f => f) || searchTerm
                ? 'Tente ajustar os filtros/pesquisa ou criar uma nova entrada.'
                : 'Que tal começar escrevendo sua primeira entrada?'
              }
            </p>
            <Link href="/entradas/nova">
              <Button>Criar entrada</Button>
            </Link>
          </Card>
        ) : (
          <div className={styles.entriesGrid}>
            {filteredEntries.map((entry) => (
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
                  <Button 
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
        {filteredEntries.length > 0 && (
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
