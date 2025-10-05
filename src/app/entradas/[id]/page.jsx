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
      const entryUrl = `${API_URL}/api/diary-entries/${resolvedParams.id}?API_KEY=${API_KEY}`;
      
      const entryResponse = await fetch(entryUrl, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'Authorization': `Bearer ${API_KEY}`
        }
      });
      
      if (!entryResponse.ok) {
        const alternativeResponse = await fetch(`${API_URL}/api/diary-entries/${resolvedParams.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY
          }
        });
        
        if (!alternativeResponse.ok) {
          throw new Error(`Entrada não encontrada: ${entryResponse.status}`);
        }
        
        const entryData = await alternativeResponse.json();
        setEntry(entryData.data || entryData);
      } else {
        const entryData = await entryResponse.json();
        setEntry(entryData.data || entryData);
      }
    } catch (err) {
      setError(err.message);
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
      
      const deleteResponse = await fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      if (!deleteResponse.ok) {
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
      alert('Erro ao deletar entrada.');
    }
  };

  const handleToggleFavorite = async () => {
    try {
      const favoriteUrl = `${API_URL}/api/diary-entries/${params.id}/favorite?API_KEY=${API_KEY}`;
      
      const favoriteResponse = await fetch(favoriteUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
          'Authorization': `Bearer ${API_KEY}`
        }
      });

      if (!favoriteResponse.ok) {
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

      setEntry(prev => ({
        ...prev,
        is_favorite: !prev.is_favorite
      }));
    } catch (err) {
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
        {/* Botão Voltar */}
        <div className="mb-8" style={{ marginTop: '24px' }}>
          <Link href="/entradas">
            <button 
              style={{
                backgroundColor: '#FFF2CC',
                color: '#2D1B2E',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              ← Voltar
            </button>
          </Link>
        </div>

        <div className="mb-20">
          <h1 className="text-3xl font-bold text-foreground mb-3">
            {entry.title}
          </h1>
          <div className="flex flex-col gap-1 text-muted text-sm">
            <span>{formatDate(entry.entry_date)}</span>
            {entry.created_at && (
              <span>Criado em {formatDateTime(entry.created_at)}</span>
            )}
          </div>
        </div>

        <Card className="mb-8 p-8">
          {entry.photo && (() => {
            let photoUrl = entry.photo;
            
            if (photoUrl.startsWith('http://') || photoUrl.startsWith('https://')) {
              return (
                <div className="float-left mr-8 mb-6">
                  <Image
                    src={photoUrl}
                    alt="Foto da entrada"
                    width={150}
                    height={150}
                    className="rounded-2xl shadow-sm object-cover"
                    style={{ width: '150px', height: '150px' }}
                  />
                </div>
              );
            }
            
            const baseUrl = 'http://localhost:4002';
            
            if (photoUrl.includes('/uploads/')) {
              photoUrl = photoUrl.substring(photoUrl.indexOf('/uploads/'));
            } else if (!photoUrl.startsWith('/')) {
              photoUrl = `/uploads/${photoUrl}`;
            }
            
            const fullUrl = `${baseUrl}${photoUrl}`;
            
            return (
              <div className="float-left mr-8 mb-6">
                <Image
                  src={fullUrl}
                  alt="Foto da entrada"
                  width={150}
                  height={150}
                  className="rounded-2xl shadow-sm object-cover"
                  style={{ width: '150px', height: '150px' }}
                />
              </div>
            );
          })()}

          <div className="prose prose-lg max-w-none mb-6">
            <p className="whitespace-pre-wrap text-foreground leading-relaxed">
              {entry.content}
            </p>
          </div>

          <div className="clear-both pt-6 mt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
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
          </div>
        </Card>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <Link href={`/entradas/${entry.id}/editar`}>
            <button 
              style={{
                backgroundColor: '#FFF2CC',
                color: '#2D1B2E',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '15px'
              }}
            >
              ✏️ Editar
            </button>
          </Link>
          
          <button 
            onClick={handleDelete}
            style={{
              backgroundColor: '#FFF2CC',
              color: '#2D1B2E',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '15px'
            }}
          >
            🗑️ Deletar
          </button>
          
          <button
            onClick={handleToggleFavorite}
            style={{
              backgroundColor: '#FFF2CC',
              color: '#2D1B2E',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '15px'
            }}
          >
            {entry.is_favorite ? '⭐ Remover dos favoritos' : '⭐ Adicionar aos favoritos'}
          </button>
        </div>

        <div style={{ height: '20px' }}></div>
      </div>
    </Layout>
  );
}
