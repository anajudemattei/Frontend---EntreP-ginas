'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Card, Button, Input, Textarea, LoadingSpinner, Badge } from '../../components/ui';
import Image from 'next/image';
import styles from './perfil.module.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4002';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'entre-linhas-2024';

export default function PerfilPage() {
  const [user, setUser] = useState({
    name: 'Ana Julia Pinheiro Demattei',
    email: 'ana.demattei@aluno.senai.br',
    bio: 'Estudante de Desenvolvimento de Sistemas no SENAI Valinhos. Apaixonada por tecnologia, leitura e artes. Criadora do projeto Entre Páginas - um diário digital para registrar memórias e momentos especiais.',
    avatar: '/anajulia.jfif',
    notifications: {
      dailyReminder: true,
      weeklyReport: false,
      newFeatures: true
    },
    privacy: {
      publicProfile: false,
      shareStats: true
    }
  });
  
  const [stats, setStats] = useState({
    totalEntries: 0,
    totalFavorites: 0,
    totalWords: 0,
    longestStreak: 0,
    currentStreak: 0,
    joinDate: '2024-01-15'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStats, setLoadingStats] = useState(true);
  const [message, setMessage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    fetchRealStats();
  }, []);

  const fetchRealStats = async () => {
    try {
      setLoadingStats(true);
      
      const possibleUrls = [
        `${API_BASE_URL}/api/diary-entries`,
        `${API_BASE_URL}/diary-entries`,
        `${API_BASE_URL}/api/entries`,
        `${API_BASE_URL}/entries`
      ];

      let entries = [];
      let success = false;

      for (const url of possibleUrls) {
        try {
          const response = await fetch(url, {
            headers: {
              'x-api-key': API_KEY,
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            entries = Array.isArray(data) ? data : (data.entries || data.data || []);
            success = true;
            console.log(`Estatísticas carregadas de ${url}`);
            break;
          }
        } catch (err) {
          console.log(`Falhou em ${url}`);
        }
      }

      if (success && entries.length > 0) {
        calculateStats(entries);
      } else {
        console.log('Nenhuma entrada encontrada ou back-end não disponível');
      }
      
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  const calculateStats = (entries) => {
    const totalEntries = entries.length;

    const totalFavorites = entries.filter(entry => entry.is_favorite || entry.isFavorite).length;

    const totalWords = entries.reduce((sum, entry) => {
      const content = entry.content || '';
      const words = content.trim().split(/\s+/).filter(word => word.length > 0);
      return sum + words.length;
    }, 0);

    const { currentStreak, longestStreak } = calculateStreaks(entries);

    const dates = entries
      .map(entry => new Date(entry.created_at || entry.createdAt || entry.date))
      .filter(date => !isNaN(date.getTime()))
      .sort((a, b) => a - b);
    
    const joinDate = dates.length > 0 
      ? dates[0].toISOString().split('T')[0] 
      : '2024-01-15';

    setStats({
      totalEntries,
      totalFavorites,
      totalWords,
      currentStreak,
      longestStreak,
      joinDate
    });
  };

  const calculateStreaks = (entries) => {
    if (entries.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    const sortedEntries = [...entries]
      .map(entry => ({
        ...entry,
        date: new Date(entry.created_at || entry.createdAt || entry.date)
      }))
      .filter(entry => !isNaN(entry.date.getTime()))
      .sort((a, b) => b.date - a.date);

    if (sortedEntries.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    const uniqueDates = [...new Set(
      sortedEntries.map(entry => entry.date.toISOString().split('T')[0])
    )].sort().reverse();

    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < uniqueDates.length; i++) {
      const entryDate = new Date(uniqueDates[i]);
      entryDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      expectedDate.setHours(0, 0, 0, 0);

      if (entryDate.getTime() === expectedDate.getTime()) {
        currentStreak++;
      } else {
        break;
      }
    }

    let longestStreak = 0;
    let tempStreak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
      const currentDate = new Date(uniqueDates[i]);
      const previousDate = new Date(uniqueDates[i - 1]);
      
      const diffTime = previousDate - currentDate;
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        tempStreak++;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    return { currentStreak, longestStreak };
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Perfil atualizado com sucesso!');
      setIsEditing(false);
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      setMessage('Erro ao salvar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const showFeedback = (message) => {
    setFeedbackMessage(message);
    setTimeout(() => {
      setFeedbackMessage('');
    }, 5000);
  };

  const handleNotificationChange = (setting, value) => {
    setUser(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: value
      }
    }));

    const messages = {
      dailyReminder: value 
        ? '✅ Lembrete diário ativado! Você receberá notificações para escrever no seu diário.'
        : '❌ Lembrete diário desativado.',
      weeklyReport: value
        ? '✅ Relatório semanal ativado! Você receberá um resumo das suas atividades.'
        : '❌ Relatório semanal desativado.',
      newFeatures: value
        ? '✅ Notificações de novos recursos ativadas!'
        : '❌ Notificações de novos recursos desativadas.'
    };

    showFeedback(messages[setting]);
  };

  const handlePrivacyChange = (setting, value) => {
    setUser(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [setting]: value
      }
    }));

    const messages = {
      publicProfile: value
        ? '✅ Perfil público ativado! Outros usuários poderão ver seu perfil.'
        : '🔒 Perfil privado ativado! Seu perfil não será visível para outros usuários.',
      shareStats: value
        ? '✅ Compartilhamento de estatísticas ativado! Suas estatísticas aparecerão no seu perfil.'
        : '🔒 Compartilhamento de estatísticas desativado! Suas estatísticas ficaram privadas.'
    };

    showFeedback(messages[setting]);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerInfo}>
              <div>
                <h1 className={styles.title}>
                  Meu Perfil
                </h1>
                <p className={styles.subtitle}>
                  Gerencie suas informações pessoais e configurações
                </p>
              </div>
            </div>
          </div>
        </div>

        {feedbackMessage && (
          <div className={styles.feedbackMessage}>
            {feedbackMessage}
          </div>
        )}

        <div className={styles.content}>
          {message && (
            <div className={`${styles.message} ${
              message.includes('sucesso') ? styles.messageSuccess : styles.messageError
            }`}>
              {message}
            </div>
          )}

          <div className={styles.grid}>
            <div className={styles.mainColumn}>
              <Card className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Informações Básicas</h2>
                  <Button
                    variant={isEditing ? "outline" : "primary"}
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={loading}
                  >
                    {isEditing ? ' Cancelar' : ' Editar'}
                  </Button>
                </div>

                <div className={styles.profileSection}>
                  <div className={styles.profileHeader}>
                    <div className={styles.avatarContainer}>
                      <div className={styles.avatar}>
                        <Image
                          src="/anajulia.jfif"
                          alt="Ana Julia Pinheiro Demattei"
                          width={120}
                          height={120}
                          style={{ 
                            borderRadius: '50%', 
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%'
                          }}
                          priority
                        />
                      </div>
                      {isEditing && (
                        <Button
                          size="sm"
                          className={styles.avatarButton}
                        >
                          📷
                        </Button>
                      )}
                    </div>
                    <div className={styles.profileInfo}>
                      {isEditing ? (
                        <Input
                          value={user.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Seu nome"
                          className={styles.profileName}
                        />
                      ) : (
                        <h3 className={styles.profileName}>{user.name}</h3>
                      )}
                      <p className={styles.profileMember}>Membro desde {formatDate(stats.joinDate)}</p>
                    </div>
                  </div>

                  <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>
                        Email
                      </label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={user.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="seu@email.com"
                        />
                      ) : (
                        <p className={styles.textMuted}>{user.email}</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.label}>
                      Biografia
                    </label>
                    {isEditing ? (
                      <Textarea
                        value={user.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        placeholder="Conte um pouco sobre você..."
                        rows={3}
                      />
                    ) : (
                      <p className={styles.textMuted}>{user.bio}</p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className={styles.saveSection}>
                    <Button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center gap-2"
                    >
                      {loading && <LoadingSpinner size="sm" />}
                      💾 Salvar Alterações
                    </Button>
                  </div>
                )}
              </Card>

              {/* Configurações de notificação */}
              <Card className={styles.card}>
                <h2 className={styles.cardTitle}>Notificações</h2>
                <div className={styles.settingsSection}>
                  <div className={styles.settingItem}>
                    <div className="settingInfo">
                      <h3>Lembrete diário</h3>
                      <p>Receba um lembrete para escrever no seu diário</p>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={user.notifications.dailyReminder}
                        onChange={(e) => handleNotificationChange('dailyReminder', e.target.checked)}
                        className={styles.toggleInput}
                      />
                      <div className={styles.toggleSlider}></div>
                    </label>
                  </div>

                  <div className={styles.settingItem}>
                    <div className="settingInfo">
                      <h3>Relatório semanal</h3>
                      <p>Receba um resumo das suas atividades da semana</p>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={user.notifications.weeklyReport}
                        onChange={(e) => handleNotificationChange('weeklyReport', e.target.checked)}
                        className={styles.toggleInput}
                      />
                      <div className={styles.toggleSlider}></div>
                    </label>
                  </div>

                  <div className={styles.settingItem}>
                    <div className="settingInfo">
                      <h3>Novos recursos</h3>
                      <p>Seja notificado sobre novas funcionalidades</p>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={user.notifications.newFeatures}
                        onChange={(e) => handleNotificationChange('newFeatures', e.target.checked)}
                        className={styles.toggleInput}
                      />
                      <div className={styles.toggleSlider}></div>
                    </label>
                  </div>
                </div>
              </Card>

              {/* Configurações de privacidade */}
              <Card className={styles.card}>
                <h2 className={styles.cardTitle}>Privacidade</h2>
                <div className={styles.settingsSection}>
                  <div className={styles.settingItem}>
                    <div className="settingInfo">
                      <h3>Perfil público</h3>
                      <p>Permitir que outros usuários vejam seu perfil</p>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={user.privacy.publicProfile}
                        onChange={(e) => handlePrivacyChange('publicProfile', e.target.checked)}
                        className={styles.toggleInput}
                      />
                      <div className={styles.toggleSlider}></div>
                    </label>
                  </div>

                  <div className={styles.settingItem}>
                    <div className="settingInfo">
                      <h3>Compartilhar estatísticas</h3>
                      <p>Mostrar suas estatísticas de escrita no perfil</p>
                    </div>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        checked={user.privacy.shareStats}
                        onChange={(e) => handlePrivacyChange('shareStats', e.target.checked)}
                        className={styles.toggleInput}
                      />
                      <div className={styles.toggleSlider}></div>
                    </label>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar - Estatísticas */}
            <div className={styles.sidebar}>
              {/* Estatísticas do usuário */}
              <Card className={styles.card}>
                <h2 className={styles.cardTitle}>
                  Estatísticas
                </h2>
                {loadingStats ? (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                    <LoadingSpinner />
                  </div>
                ) : (
                  <div className={styles.statsCard}>
                    <div className={styles.statItem}>
                      <div className={styles.statValue}>{stats.totalEntries}</div>
                      <div className={styles.statLabel}>Entradas totais</div>
                    </div>
                    
                    <div className={styles.statGrid}>
                      <div className={styles.statGridItem}>
                        <div className={styles.statGridValue}>{stats.totalFavorites}</div>
                        <div className={styles.statGridLabel}>Favoritas</div>
                      </div>
                      
                      <div className={styles.statGridItem}>
                        <div className={styles.statGridValue}>{stats.totalWords.toLocaleString('pt-BR')}</div>
                        <div className={styles.statGridLabel}>Palavras</div>
                      </div>
                    </div>
                    
                    <div className={styles.streakCard}>
                      <div className={styles.streakValue}>{stats.currentStreak}</div>
                      <div className={styles.streakLabel}>Dias consecutivos</div>
                      <div className={styles.streakRecord}>Recorde: {stats.longestStreak} dias</div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Conquistas */}
              <Card className={styles.card}>
                <h2 className={styles.cardTitle}>
                  Conquistas
                </h2>
                <div className={styles.achievements}>
                  <div className={`${styles.achievementItem} ${stats.currentStreak >= 7 ? styles.achievementActive : styles.achievementInactive}`}>
                    <div className={styles.achievementIcon}>🏃‍♀️</div>
                    <div className={styles.achievementInfo}>
                      <div className={styles.achievementTitle}>Escritor Consistente</div>
                      <div className={styles.achievementDesc}>
                        {stats.currentStreak >= 7 
                          ? `${stats.currentStreak} dias consecutivos` 
                          : `${stats.currentStreak}/7 dias consecutivos`}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${styles.achievementItem} ${stats.totalEntries >= 12 ? styles.achievementSecondary : styles.achievementInactive}`}>
                    <div className={styles.achievementIcon}>📚</div>
                    <div className={styles.achievementInfo}>
                      <div className={styles.achievementTitle}>Primeira Dúzia</div>
                      <div className={styles.achievementDesc}>
                        {stats.totalEntries >= 12 
                          ? `${stats.totalEntries} entradas criadas` 
                          : `${stats.totalEntries}/12 entradas`}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${styles.achievementItem} ${stats.totalFavorites >= 5 ? styles.achievementActive : styles.achievementInactive}`}>
                    <div className={styles.achievementIcon}>⭐</div>
                    <div className={styles.achievementInfo}>
                      <div className={styles.achievementTitle}>Colecionador</div>
                      <div className={styles.achievementDesc}>
                        {stats.totalFavorites >= 5 
                          ? `${stats.totalFavorites} favoritas` 
                          : `${stats.totalFavorites}/5 favoritas`}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
