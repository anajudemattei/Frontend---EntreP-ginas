'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../../components/Layout';
import { Card, Button, Input, Textarea, Select, Badge } from '../../../components/ui';

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

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4002';
  const API_KEY = 'entre-linhas-2024';

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

      // Se tem foto, usa FormData, senão usa JSON
      if (photo) {
        const formDataWithPhoto = new FormData();
        formDataWithPhoto.append('title', formData.title);
        formDataWithPhoto.append('content', formData.content);
        formDataWithPhoto.append('entry_date', formData.entryDate);
        formDataWithPhoto.append('mood', formData.mood);
        formDataWithPhoto.append('tags', JSON.stringify(tagsArray));
        formDataWithPhoto.append('photo', photo);

        console.log('Enviando entrada com foto...');
        
        // Tentar múltiplas URLs e variações
        const urls = [
          `${API_URL}/api/diary-entries`,
          `${API_URL}/diary-entries`,
          `${API_URL}/api/entries`,
          `${API_URL}/entries`,
          'http://localhost:4002/api/diary-entries',
          'http://localhost:4002/diary-entries'
        ];

        let success = false;
        let lastError = null;

        for (const url of urls) {
          try {
            console.log(`Tentando URL: ${url}`);
            
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'x-api-key': API_KEY,
                'Authorization': `Bearer ${API_KEY}`
              },
              body: formDataWithPhoto
            });

            console.log(`Resposta status: ${response.status}`);

            if (response.ok) {
              success = true;
              console.log('✅ Entrada criada com sucesso!');
              break;
            } else {
              const errorText = await response.text();
              console.error(`❌ Erro na resposta: ${errorText}`);
              lastError = errorText;
            }
          } catch (err) {
            console.error(`❌ Erro ao tentar ${url}:`, err.message);
            lastError = err.message;
          }
        }

        if (!success) {
          throw new Error(`Back-end não disponível. Erro: ${lastError || 'Verifique se está rodando na porta 4002'}`);
        }

      } else {
        // Sem foto, envia JSON
        const entryData = {
          title: formData.title,
          content: formData.content,
          entry_date: formData.entryDate,
          mood: formData.mood,
          tags: tagsArray
        };

        console.log('Enviando entrada sem foto...', entryData);
        
        // Tentar múltiplas URLs e variações
        const urls = [
          `${API_URL}/api/diary-entries`,
          `${API_URL}/diary-entries`,
          `${API_URL}/api/entries`,
          `${API_URL}/entries`,
          'http://localhost:4002/api/diary-entries',
          'http://localhost:4002/diary-entries'
        ];

        let success = false;
        let lastError = null;

        for (const url of urls) {
          try {
            console.log(`Tentando URL: ${url}`);
            
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
                'Authorization': `Bearer ${API_KEY}`
              },
              body: JSON.stringify(entryData)
            });

            console.log(`Resposta status: ${response.status}`);

            if (response.ok) {
              success = true;
              console.log('✅ Entrada criada com sucesso!');
              break;
            } else {
              const errorText = await response.text();
              console.error(`❌ Erro na resposta: ${errorText}`);
              lastError = errorText;
            }
          } catch (err) {
            console.error(`❌ Erro ao tentar ${url}:`, err.message);
            lastError = err.message;
          }
        }

        if (!success) {
          throw new Error(`Back-end não disponível. Erro: ${lastError || 'Verifique se está rodando na porta 4002'}`);
        }
      }

      router.push('/entradas');
    } catch (err) {
      console.error('Erro ao criar entrada:', err);
      setError(`Erro ao criar entrada: ${err.message}`);
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
