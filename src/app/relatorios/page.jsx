'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import { Card, Button, Input, Select, LoadingSpinner } from '../../components/ui';
import apiService from '../../services/api';
import styles from './relatorios.module.css';

export default function RelatoriosPage() {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    mood: '',
    favorites: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      favorites: ''
    });
  };

  const generatePDF = async () => {
    try {
      setLoading(true);
      setError(null);

      const blob = await apiService.exportDiaryToPDF(filters);
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const today = new Date().toISOString().split('T')[0];
      link.download = `diario-entrepaginas-${today}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      setError('Erro ao gerar relatório PDF. Verifique se há entradas no período selecionado.');
    } finally {
      setLoading(false);
    }
  };

  const formatFiltersSummary = () => {
    const summary = [];
    
    if (filters.startDate && filters.endDate) {
      summary.push(`Período: ${new Date(filters.startDate).toLocaleDateString('pt-BR')} a ${new Date(filters.endDate).toLocaleDateString('pt-BR')}`);
    } else if (filters.startDate) {
      summary.push(`A partir de: ${new Date(filters.startDate).toLocaleDateString('pt-BR')}`);
    } else if (filters.endDate) {
      summary.push(`Até: ${new Date(filters.endDate).toLocaleDateString('pt-BR')}`);
    }
    
    if (filters.mood) {
      summary.push(`Humor: ${filters.mood}`);
    }
    
    if (filters.favorites === 'true') {
      summary.push('Apenas favoritos');
    }
    
    return summary.length > 0 ? summary.join(' • ') : 'Todas as entradas';
  };

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            📊 Relatórios
          </h1>
          <p className={styles.subtitle}>
            Gere relatórios em PDF das suas entradas do diário
          </p>
        </div>

        {/* Filtros */}
        <Card className={styles.filtersCard}>
          <h3 className={styles.filtersTitle}>Filtros do Relatório</h3>
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
            <Select
              label="Favoritos"
              value={filters.favorites}
              onChange={(e) => handleFilterChange('favorites', e.target.value)}
            >
              <option value="">Todos</option>
              <option value="true">Apenas favoritos</option>
            </Select>
          </div>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Limpar filtros
          </Button>
        </Card>

        {/* Preview do Relatório */}
        <Card className={styles.previewCard}>
          <h3 className={styles.previewTitle}>Preview do Relatório</h3>
          <div className={styles.previewContent}>
            <h4 className={styles.previewHeader}>
              📄 EntrePages - Relatório do Diário
            </h4>
            <p className={styles.previewMeta}>
              <strong>Filtros aplicados:</strong> {formatFiltersSummary()}
            </p>
            <p className={styles.previewMeta}>
              <strong>Data de geração:</strong> {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
          
          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>ℹ️ O que será incluído no relatório:</h4>
            <ul className={styles.infoList}>
              <li>• Estatísticas gerais das entradas</li>
              <li>• Distribuição de humores</li>
              <li>• Lista completa das entradas (baseada nos filtros)</li>
              <li>• Conteúdo, tags e informações de cada entrada</li>
              <li>• Referências a fotos anexadas</li>
            </ul>
          </div>
        </Card>

        {/* Ações */}
        <Card className={styles.actionsCard}>
          <div className={styles.actionsContent}>
            <div>
              <h3 className={styles.actionsTitle}>Gerar Relatório PDF</h3>
              <p className={styles.actionsSubtitle}>
                O relatório será baixado automaticamente após a geração
              </p>
            </div>
            <Button 
              onClick={generatePDF} 
              disabled={loading}
              className={styles.generateButton}
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Gerando...</span>
                </>
              ) : (
                <>
                  <span>📥</span>
                  <span>Baixar PDF</span>
                </>
              )}
            </Button>
          </div>
        </Card>

        {error && (
          <Card className={styles.errorCard}>
            <div className={styles.errorContent}>
              <span className={styles.errorIcon}>❌</span>
              <div>
                <h4 className={styles.errorTitle}>Erro ao gerar relatório</h4>
                <p className={styles.errorMessage}>{error}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Informações adicionais */}
        <Card className={styles.tipsCard}>
          <h3 className={styles.tipsTitle}>💡 Dicas</h3>
          <ul className={styles.tipsList}>
            <li>• Use os filtros para personalizar seu relatório</li>
            <li>• Relatórios incluem estatísticas e todas as entradas do período</li>
            <li>• O arquivo PDF será baixado automaticamente</li>
            <li>• Você pode gerar relatórios de períodos específicos ou de todas as entradas</li>
          </ul>
        </Card>
      </div>
    </Layout>
  );
}
