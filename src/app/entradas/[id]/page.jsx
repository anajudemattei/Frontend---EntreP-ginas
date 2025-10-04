'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../../components/Layout';
import { Card, Button, Badge, LoadingSpinner } from '../../../components/ui';
import Link from 'next/link';
import Image from 'next/image';

export default function EntradaPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4002';
  const API_KEY = 'entre-linhas-2024';

  useEffect(() => {
    if (resolvedParams.id) {
      loadEntry();
    }
  }, [resolvedParams.id]);

  const loadEntry = async () => {
    setLoading(true);
    setError(null);

    try {
      // Buscar entrada específica
      const entryUrl = `${API_URL}/api/diary-entries/${resolvedParams.id}?API_KEY=${API_KEY}`;
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
        const alternativeResponse = await fetch(`${API_URL}/api/diary-entries/${resolvedParams.id}`, {
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
      const favoriteUrl = `${API_URL}/api/diary-entries/${params.id}/favorite?API_KEY=${API_KEY}`;
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
        const alternativeResponse = await fetch(`${API_URL}/api/diary-entries/${params.id}/favorite`, {
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
      setEntry(prev => ({
        ...prev,
        is_favorite: !prev.is_favorite
      }));
      
      console.log('Favorito alterado com sucesso!');
    } catch (err) {
      console.error('Erro ao alterar favorito:', err);
      alert('Erro ao alterar favorito. Verifique se o back-end está rodando.');
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
        <div className="mb-12">
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

        {/* Conteúdo */}
        <Card className="mb-10 p-8">

          {/* Foto */}
          {entry.photo && (() => {
            // Construir URL da imagem de forma segura
            let photoUrl = entry.photo;
            
            // Se já é uma URL completa, usar diretamente
            if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
              return (
                <div className="float-left mr-8 mb-6">
                  <div className="relative" style={{ width: '150px' }}>
                    <Image
                      src={photoUrl}
                      alt="Foto da entrada"
                      width={150}
                      height={150}
                      className="rounded-2xl shadow-sm object-cover aspect-square"
                    />
                  </div>
                </div>
              );
            }
            
            // Construir URL relativa
            const baseUrl = 'http://localhost:4002';
            
            // Remover /uploads/ duplicado se existir
            if (photoUrl.includes('/uploads/')) {
              photoUrl = photoUrl.substring(photoUrl.indexOf('/uploads/'));
            } else if (!photoUrl.startsWith('/')) {
              photoUrl = `/uploads/${photoUrl}`;
            }
            
            const fullUrl = `${baseUrl}${photoUrl}`;
            
            return (
              <div className="float-left mr-8 mb-6">
                <div className="relative" style={{ width: '150px' }}>
                  <Image
                    src={fullUrl}
                    alt="Foto da entrada"
                    width={150}
                    height={150}
                    className="rounded-2xl shadow-sm object-cover aspect-square"
                  />
                </div>
              </div>
            );
          })()}

          {/* Conteúdo */}
          <div className="prose prose-xl max-w-none mb-8">
            <div className="whitespace-pre-wrap text-foreground leading-relaxed text-lg">
              {entry.content}
            </div>
          </div>

          {/* Tags e Metadados */}
          <div className="flex flex-wrap gap-3 pt-8 mt-4 border-t border-border clear-both">
            {entry.mood && (
              <Badge variant="secondary">
                {getMoodEmoji(entry.mood)} {entry.mood}
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
        </Card>

        {/* Ações */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-4">
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
          
          <div>
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
