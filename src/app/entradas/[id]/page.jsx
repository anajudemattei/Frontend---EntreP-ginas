'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../../components/Layout';
import { Card, Button, Badge, LoadingSpinner } from '../../../components/ui';
import Link from 'next/link';
import Image from 'next/image';

export default function EntradaPage({ params }) {
  const router = useRouter();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4002';
  const API_KEY = 'entre-linhas-2024';

  useEffect(() => {
    if (params.id) {
      loadEntry();
    }
  }, [params.id]);

  const loadEntry = async () => {
    setLoading(true);
    setError(null);

    try {
      // Buscar entrada específica
      const entryUrl = `${API_URL}/api/diary-entries/${params.id}?API_KEY=${API_KEY}`;
      console.log('Fazendo requisição para entrada:', entryUrl);
      
      const entryResponse = await fetch(entryUrl, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      console.log('Status da resposta entrada:', entryResponse.status);
      
      if (!entryResponse.ok) {
        // Tentar formato alternativo se o primeiro falhar
        console.log('Tentando formato alternativo...');
        const alternativeResponse = await fetch(`${API_URL}/api/diary-entries/${params.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY
          }
        });
        
        if (!alternativeResponse.ok) {
          throw new Error(`Entrada não encontrada: ${entryResponse.status} - ${alternativeResponse.status}`);
        }
        
        const entryData = await alternativeResponse.json();
        console.log('Resposta da API (alternativa):', entryData);
        setEntry(entryData.data || entryData);
      } else {
        const entryData = await entryResponse.json();
        console.log('Resposta da API:', entryData);
        
        // A API retorna os dados no campo 'data'
        setEntry(entryData.data || entryData);
      }
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar entrada:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja deletar esta entrada?')) {
      return;
    }

    try {
      const deleteUrl = `${API_URL}/api/diary-entries/${params.id}?API_KEY=${API_KEY}`;
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
        const alternativeResponse = await fetch(`${API_URL}/api/diary-entries/${params.id}`, {
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

      router.push('/entradas');
    } catch (err) {
      console.error('Erro ao deletar entrada:', err);
      alert('Erro ao deletar entrada.');
    }
  };

  const handleToggleFavorite = async () => {
    try {
      await apiService.toggleFavorite(params.id);
      setEntry(prev => ({
        ...prev,
        is_favorite: !prev.is_favorite
      }));
    } catch (err) {
      console.error('Erro ao alterar favorito:', err);
      alert('Erro ao alterar favorito.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR');
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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-muted">Carregando entrada...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !entry) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center py-12">
            <div className="text-error text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Entrada não encontrada</h3>
            <p className="text-muted mb-4">{error}</p>
            <Link href="/entradas">
              <Button>Voltar para entradas</Button>
            </Link>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Link href="/entradas">
                <Button size="sm">
                  ← Voltar
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {entry.title}
            </h1>
            <div className="flex items-center space-x-4 text-muted">
              <span>{formatDate(entry.entry_date)}</span>
              {entry.created_at && (
                <span className="text-sm">
                  Criado em {formatDateTime(entry.created_at)}
                </span>
              )}
              {entry.updated_at && entry.updated_at !== entry.created_at && (
                <span className="text-sm">
                  Atualizado em {formatDateTime(entry.updated_at)}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleToggleFavorite}
              className="text-warning hover:scale-110 transition-transform text-2xl"
            >
              {entry.is_favorite ? '⭐' : '☆'}
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <Card className="mb-6">
          {/* Metadados */}
          <div className="flex flex-wrap gap-2 mb-6">
            {entry.mood && (
              <Badge variant="secondary">
                {getMoodEmoji(entry.mood)} {entry.mood}
              </Badge>
            )}
            {entry.is_favorite && (
              <Badge variant="warning">
                ⭐ Favorito
              </Badge>
            )}
            {entry.tags && entry.tags.length > 0 && (
              entry.tags.map((tag, index) => (
                <Badge key={index} variant="default">
                  #{tag}
                </Badge>
              ))
            )}
          </div>

          {/* Foto */}
          {entry.photo && (
            <div className="mb-6">
              <div className="relative w-full max-w-2xl mx-auto">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3000'}/uploads/${entry.photo}`}
                  alt="Foto da entrada"
                  width={800}
                  height={600}
                  className="rounded-lg shadow-diary object-cover"
                />
              </div>
            </div>
          )}

          {/* Conteúdo */}
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {entry.content}
            </div>
          </div>
        </Card>

        {/* Ações */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Link href={`/entradas/${entry.id}/editar`}>
              <Button>
                ✏️ Editar
              </Button>
            </Link>
            <Button 
              className="text-error hover:bg-error/10"
              onClick={handleDelete}
            >
              🗑️ Deletar
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button
              onClick={handleToggleFavorite}
            >
              {entry.is_favorite ? '☆ Remover dos favoritos' : '⭐ Adicionar aos favoritos'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
