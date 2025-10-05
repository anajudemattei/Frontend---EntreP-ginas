'use client';

import { useState } from 'react';
import Layout from '../../components/Layout';
import { Card, Button, Input, Select, LoadingSpinner } from '../../components/ui';
import styles from './relatorios.module.css';

export default function RelatoriosPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4002';
  const API_KEY = 'entre-linhas-2024';

  const generatePDF = async () => {
    try {
      setLoading(true);
      setError(null);
      const queryParams = new URLSearchParams();
      queryParams.append('API_KEY', API_KEY);

      const possibleUrls = [
        `${API_URL}/api/export/pdf?${queryParams.toString()}`,
        `${API_URL}/api/report/pdf?${queryParams.toString()}`,
        `${API_URL}/api/diary-entries/export?${queryParams.toString()}`,
        `${API_URL}/export/pdf?${queryParams.toString()}`
      ];

      let blob = null;
      let success = false;

      for (const url of possibleUrls) {
        try {
          console.log('Tentando exportar PDF de:', url);
          
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'x-api-key': API_KEY,
              'Authorization': `Bearer ${API_KEY}`
            }
          });

          if (response.ok) {
            blob = await response.blob();
            success = true;
            console.log('PDF gerado com sucesso!');
            break;
          }
        } catch (err) {
          console.log(`Falhou em ${url}, tentando próxima...`);
        }
      }

      if (!success) {
        console.log('Tentando sem autenticação...');
        for (const url of possibleUrls) {
          try {
            const response = await fetch(url, {
              method: 'GET'
            });

            if (response.ok) {
              blob = await response.blob();
              success = true;
              console.log('PDF gerado com sucesso (sem auth)!');
              break;
            }
          } catch (err) {
            console.log(`Falhou em ${url}`);
          }
        }
      }

      if (!success || !blob) {
        throw new Error('Nenhuma rota de exportação PDF disponível no back-end. Verifique se o endpoint /api/export/pdf ou /api/report/pdf existe.');
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const today = new Date().toISOString().split('T')[0];
      link.download = `diario-entrepaginas-${today}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log('Download iniciado!');
      
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      setError(`Erro ao gerar relatório: ${err.message}. Verifique se o back-end está rodando e se há entradas no período selecionado.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            📊 Relatórios
          </h1>
          <p className={styles.subtitle}>
            Gere relatórios em PDF de todas as suas entradas do diário
          </p>
        </div>

        <Card className={styles.previewCard}>
          <h3 className={styles.previewTitle}>Preview do Relatório</h3>
          <div className={styles.previewContent}>
            <h4 className={styles.previewHeader}>
              📄 EntrePages - Relatório do Diário
            </h4>
            <p className={styles.previewMeta}>
              <strong>Data de geração:</strong> {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
          
          <div className={styles.infoBox}>
            <h4 className={styles.infoTitle}>ℹ️ O que será incluído no relatório:</h4>
            <ul className={styles.infoList}>
              <li>• Estatísticas gerais das entradas</li>
              <li>• Distribuição de humores</li>
              <li>• Lista completa de todas as entradas</li>
              <li>• Conteúdo, tags e informações de cada entrada</li>
              <li>• Referências a fotos anexadas</li>
            </ul>
          </div>
        </Card>

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

        <Card className={styles.tipsCard}>
          <h3 className={styles.tipsTitle}>💡 Dicas</h3>
          <ul className={styles.tipsList}>
            <li>• O relatório inclui todas as suas entradas do diário</li>
            <li>• Estatísticas e distribuição de humores são incluídas automaticamente</li>
            <li>• O arquivo PDF será baixado automaticamente</li>
            <li>• Certifique-se de que o back-end está rodando para gerar o relatório</li>
          </ul>
        </Card>
      </div>
    </Layout>
  );
}