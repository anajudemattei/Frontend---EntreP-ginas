'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../../../components/Layout';
import { Card, Button, Input, Textarea, Select, Badge, LoadingSpinner } from '../../../../components/ui';
import axios from 'axios';

export default function EditarEntradaPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    entryDate: '',
    mood: '',
    tags: '',
    isFavorite: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [originalEntry, setOriginalEntry] = useState(null);

  useEffect(() => {
    if (resolvedParams.id) {
      loadEntry();
    }
  }, [resolvedParams.id]);

  const loadEntry = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4002';
      const API_KEY = 'entre-linhas-2024';
      const entryUrl = `${API_URL}/api/diary-entries/${resolvedParams.id}?API_KEY=${API_KEY}`;
      let entryData;
      try {
        const { data } = await axios.get(entryUrl, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${API_KEY}`
          }
        });
        entryData = data.data || data;
      } catch (err1) {
        const { data } = await axios.get(`${API_URL}/api/diary-entries/${resolvedParams.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY
          }
        });
        entryData = data.data || data;
      }
      setOriginalEntry(entryData);
      setFormData({
        title: entryData.title || '',
        content: entryData.content || '',
        entryDate: entryData.entry_date ? entryData.entry_date.split('T')[0] : '',
        mood: entryData.mood || '',
        tags: entryData.tags ? entryData.tags.join(', ') : '',
        isFavorite: entryData.is_favorite || false
      });
    } catch (err) {
      console.error('Erro ao carregar entrada:', err);
      setError('Entrada não encontrada.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Título e conteúdo são obrigatórios.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const tagsArray = formData.tags 
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4002';
      const API_KEY = 'entre-linhas-2024';
      const updateUrl = `${API_URL}/api/diary-entries/${resolvedParams.id}?API_KEY=${API_KEY}`;
      try {
        await axios.put(updateUrl, {
          title: formData.title,
          content: formData.content,
          entryDate: formData.entryDate,
          mood: formData.mood,
          tags: tagsArray,
          isFavorite: formData.isFavorite
        }, {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${API_KEY}`
          }
        });
      } catch (err1) {
        await axios.put(`${API_URL}/api/diary-entries/${resolvedParams.id}`, {
          title: formData.title,
          content: formData.content,
          entryDate: formData.entryDate,
          mood: formData.mood,
          tags: tagsArray,
          isFavorite: formData.isFavorite
        }, {
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY
          }
        });
      }

      router.push(`/entradas/${params.id}`);
    } catch (err) {
      console.error('Erro ao atualizar entrada:', err);
      setError('Erro ao atualizar entrada. Tente novamente.');
    } finally {
      setSaving(false);
    }
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
    };
    return moodEmojis[mood] || '';
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

  if (error && !originalEntry) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center py-12">
            <div className="text-error text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Entrada não encontrada</h3>
            <p className="text-muted mb-4">{error}</p>
            <Button onClick={() => router.push('/entradas')}>
              Voltar para entradas
            </Button>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Editar Entrada
          </h1>
          <p className="text-muted">
            Modifique os detalhes da sua entrada
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
                <p className="text-error">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Título *"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Dê um título para sua entrada"
                required
              />

              <Input
                label="Data"
                name="entryDate"
                type="date"
                value={formData.entryDate}
                onChange={handleInputChange}
              />
            </div>

            <Textarea
              label="Conteúdo *"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Escreva sobre seu dia, seus pensamentos, sentimentos..."
              rows={8}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Como você está se sentindo?"
                name="mood"
                value={formData.mood}
                onChange={handleInputChange}
              >
                <option value="">Selecione um humor</option>
                <option value="feliz">😊 Feliz</option>
                <option value="triste">😢 Triste</option>
                <option value="ansioso">😰 Ansioso</option>
                <option value="calmo">😌 Calmo</option>
                <option value="animado">🤩 Animado</option>
                <option value="nostálgico">🥺 Nostálgico</option>
                <option value="reflexivo">🤔 Reflexivo</option>
              </Select>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-foreground">
                  Configurações
                </label>
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="isFavorite"
                    name="isFavorite"
                    checked={formData.isFavorite}
                    onChange={handleInputChange}
                    className="rounded border-primary/20 text-primary focus:ring-primary"
                  />
                  <label htmlFor="isFavorite" className="text-sm text-foreground">
                    ⭐ Marcar como favorito
                  </label>
                </div>
              </div>
            </div>

            <Input
              label="Tags (separadas por vírgula)"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="família, trabalho, viagem, reflexão..."
            />

            {formData.tags && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Preview das tags:
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.split(',').map((tag, index) => {
                    const cleanTag = tag.trim();
                    if (!cleanTag) return null;
                    return (
                      <Badge key={index} variant="default">
                        #{cleanTag}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}

            {formData.mood && (
              <div className="p-4 bg-secondary/10 rounded-lg">
                <p className="text-sm text-secondary">
                  Humor selecionado: {getMoodEmoji(formData.mood)} {formData.mood}
                </p>
              </div>
            )}

            {originalEntry?.photo && (
              <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
                <h4 className="font-medium text-info mb-2">📷 Foto atual</h4>
                <p className="text-sm text-muted">
                  Esta entrada possui uma foto anexada: {originalEntry.photo}
                </p>
                <p className="text-xs text-muted mt-1">
                  Para alterar a foto, você precisará criar uma nova entrada.
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-primary/10">
              <Button
                type="button"
                onClick={() => router.push(`/entradas/${params.id}`)}
                disabled={saving}
              >
                Cancelar
              </Button>
              
              <Button
                type="submit"
                disabled={saving || !formData.title.trim() || !formData.content.trim()}
              >
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
