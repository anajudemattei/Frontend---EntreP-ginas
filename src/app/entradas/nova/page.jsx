'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../../components/Layout';
import { Card, Button, Input, Textarea, Select, Badge } from '../../../components/ui';
import apiService from '../../../services/api';

export default function NovaEntradaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    entryDate: new Date().toISOString().split('T')[0],
    mood: '',
    tags: '',
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Título e conteúdo são obrigatórios.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const tagsArray = formData.tags 
        ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        : [];

      if (photo) {
        const formDataWithPhoto = new FormData();
        formDataWithPhoto.append('title', formData.title);
        formDataWithPhoto.append('content', formData.content);
        formDataWithPhoto.append('entryDate', formData.entryDate);
        formDataWithPhoto.append('mood', formData.mood);
        formDataWithPhoto.append('tags', JSON.stringify(tagsArray));
        formDataWithPhoto.append('photo', photo);

        await apiService.createDiaryEntryWithPhoto(formDataWithPhoto);
      } else {
        await apiService.createDiaryEntry({
          ...formData,
          tags: tagsArray
        });
      }

      router.push('/entradas');
    } catch (err) {
      console.error('Erro ao criar entrada:', err);
      setError('Erro ao criar entrada. Tente novamente.');
    } finally {
      setLoading(false);
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

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Nova Entrada
          </h1>
          <p className="text-muted">
            Registre seus pensamentos e memórias
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
                  Foto (opcional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                />
                {photo && (
                  <p className="text-sm text-muted">
                    Arquivo selecionado: {photo.name}
                  </p>
                )}
              </div>
            </div>

            <Input
              label="Tags (separadas por vírgula)"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              placeholder="família, trabalho, viagem, reflexão..."
            />

            {/* Preview das tags */}
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

            {/* Preview do humor */}
            {formData.mood && (
              <div className="p-4 bg-secondary/10 rounded-lg">
                <p className="text-sm text-secondary">
                  Humor selecionado: {getMoodEmoji(formData.mood)} {formData.mood}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center pt-6 border-t border-primary/10">
              <Button
                type="button"
                onClick={() => router.push('/entradas')}
                disabled={loading}
              >
                Cancelar
              </Button>
              
              <Button
                type="submit"
                disabled={loading || !formData.title.trim() || !formData.content.trim()}
              >
                {loading ? 'Salvando...' : 'Salvar Entrada'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
