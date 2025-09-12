'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Card, Button, Input, Textarea, LoadingSpinner, Badge } from '../../components/ui';
import Image from 'next/image';
import styles from './perfil.module.css';

export default function PerfilPage() {
  const [user, setUser] = useState({
    name: 'Ana Silva',
    email: 'ana@exemplo.com',
    bio: 'Apaixonada por escrever e compartilhar experiências através do meu diário pessoal.',
    avatar: '/placeholder-avatar.jpg',
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
    totalEntries: 12,
    totalFavorites: 4,
    totalWords: 2847,
    longestStreak: 15,
    currentStreak: 7,
    joinDate: '2024-01-15'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

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
                  👤 Meu Perfil
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
              {/* Informações básicas */}
              <Card className={styles.card}>
                <div className={styles.cardHeader}>
                  <h2 className={styles.cardTitle}>Informações Básicas</h2>
                  <Button
                    variant={isEditing ? "outline" : "primary"}
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={loading}
                  >
                    {isEditing ? '✖ Cancelar' : '✏️ Editar'}
                  </Button>
                </div>

                <div className={styles.profileSection}>
                  <div className={styles.profileHeader}>
                    <div className={styles.avatarContainer}>
                      <div className={styles.avatar}>
                        👤
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
                  📊 Suas Estatísticas
                </h2>
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
                      <div className={styles.statGridValue}>{stats.totalWords}</div>
                      <div className={styles.statGridLabel}>Palavras</div>
                    </div>
                  </div>
                  
                  <div className={styles.streakCard}>
                    <div className={styles.streakValue}>{stats.currentStreak}</div>
                    <div className={styles.streakLabel}>Dias consecutivos</div>
                    <div className={styles.streakRecord}>Recorde: {stats.longestStreak} dias</div>
                  </div>
                </div>
              </Card>

              {/* Conquistas */}
              <Card className={styles.card}>
                <h2 className={styles.cardTitle}>
                  🏆 Conquistas
                </h2>
                <div className={styles.achievements}>
                  <div className={`${styles.achievementItem} ${styles.achievementActive}`}>
                    <div className={styles.achievementIcon}>🏃‍♀️</div>
                    <div className={styles.achievementInfo}>
                      <div className={styles.achievementTitle}>Escritor Consistente</div>
                      <div className={styles.achievementDesc}>7 dias consecutivos</div>
                    </div>
                  </div>
                  
                  <div className={`${styles.achievementItem} ${styles.achievementSecondary}`}>
                    <div className={styles.achievementIcon}>📚</div>
                    <div className={styles.achievementInfo}>
                      <div className={styles.achievementTitle}>Primeira Dúzia</div>
                      <div className={styles.achievementDesc}>12 entradas criadas</div>
                    </div>
                  </div>
                  
                  <div className={`${styles.achievementItem} ${styles.achievementInactive}`}>
                    <div className={styles.achievementIcon}>🌟</div>
                    <div className={styles.achievementInfo}>
                      <div className={styles.achievementTitle}>Explorador</div>
                      <div className={styles.achievementDesc}>Use todas as funcionalidades</div>
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
