const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4002/api';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'entre-linhas-2024';

import { mockAPI } from '../app/api/mockData.js';

class ApiService {
  constructor() {
    this.baseURL = API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    };
    this.useMockData = false;
  }

  async request(endpoint, options = {}) {
    // Se já estamos usando mock data, não tente a API real
    if (this.useMockData) {
      throw new Error('Using mock data');
    }

    // Tentar múltiplas URLs
    const possibleBaseUrls = [
      'http://localhost:4002/api',
      'http://localhost:4002',
      'http://localhost:3002/api',
      'http://localhost:3002',
    ];

    let lastError = null;

    for (const baseUrl of possibleBaseUrls) {
      try {
        // Adicionar API_KEY como query parameter
        const url = new URL(`${baseUrl}${endpoint}`);
        url.searchParams.append('API_KEY', API_KEY);
        
        const config = {
          headers: {
            ...this.headers,
            'Authorization': `Bearer ${API_KEY}`,
          },
          ...options,
        };

        const response = await fetch(url.toString(), config);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          lastError = new Error(errorData.message || `HTTP error! status: ${response.status}`);
          continue; // Tentar próxima URL
        }

        // Sucesso! Atualizar baseURL para próximas chamadas
        this.baseURL = baseUrl;
        return await response.json();
      } catch (error) {
        console.log(`Falhou em ${baseUrl}${endpoint}:`, error.message);
        lastError = error;
      }
    }

    // Se todas falharam, usar mock
    console.error('API request failed em todas as URLs:', lastError);
    this.useMockData = true;
    throw lastError || new Error('Todas as URLs falharam');
  }

  // Entradas do diário
  async getDiaryEntries(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      Object.keys(filters).forEach(key => {
        if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
          queryParams.append(key, filters[key]);
        }
      });

      const queryString = queryParams.toString();
      const endpoint = `/diary-entries${queryString ? `?${queryString}` : ''}`;
      
      return await this.request(endpoint);
    } catch (error) {
      console.log('Usando dados simulados para entradas...');
      return mockAPI.getDiaryEntries(filters);
    }
  }

  async getDiaryEntry(id) {
    try {
      return await this.request(`/diary-entries/${id}`);
    } catch (error) {
      console.log('Usando dados simulados para entrada específica...');
      return mockAPI.getDiaryEntry(id);
    }
  }

  async createDiaryEntry(data) {
    try {
      return await this.request('/diary-entries', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log('Usando dados simulados para criar entrada...');
      return mockAPI.createDiaryEntry(data);
    }
  }

  async createDiaryEntryWithPhoto(formData) {
    try {
      // Se já estamos usando mock data, pule para o mock
      if (this.useMockData) {
        throw new Error('Using mock data');
      }

      // Adicionar API_KEY como query parameter
      const url = new URL(`${this.baseURL}/diary-entries`);
      url.searchParams.append('API_KEY', API_KEY);
      
      const response = await fetch(url.toString(), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log('Usando dados simulados para criar entrada com foto...');
      // Converte FormData para objeto para mock
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      return mockAPI.createDiaryEntry(data);
    }
  }

  async updateDiaryEntry(id, data) {
    try {
      return await this.request(`/diary-entries/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log('Usando dados simulados para atualizar entrada...');
      return mockAPI.updateDiaryEntry(id, data);
    }
  }

  async deleteDiaryEntry(id) {
    try {
      return await this.request(`/diary-entries/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.log('Usando dados simulados para deletar entrada...');
      return mockAPI.deleteDiaryEntry(id);
    }
  }

  async getDiaryEntriesByMood(mood) {
    try {
      return await this.request(`/diary-entries/mood/${mood}`);
    } catch (error) {
      console.log('Usando dados simulados para entradas por humor...');
      return mockAPI.getDiaryEntriesByMood(mood);
    }
  }

  async getFavoriteDiaryEntries() {
    try {
      return await this.request('/diary-entries/favorites');
    } catch (error) {
      console.log('Usando dados simulados para favoritos...');
      return mockAPI.getFavoriteDiaryEntries();
    }
  }

  async toggleFavorite(id) {
    try {
      return await this.request(`/diary-entries/${id}/favorite`, {
        method: 'PATCH',
      });
    } catch (error) {
      console.log('Usando dados simulados para alternar favorito...');
      return mockAPI.toggleFavorite(id);
    }
  }

  async getDiaryStats() {
    try {
      return await this.request('/diary-entries/stats');
    } catch (error) {
      console.log('Usando dados simulados para estatísticas...');
      return mockAPI.getDiaryStats();
    }
  }

  // Relatórios
  async exportDiaryToPDF(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });

    // Adicionar API_KEY
    queryParams.append('API_KEY', API_KEY);
    
    const url = new URL(`${this.baseURL}/report/pdf`);
    url.search = queryParams.toString();
    
    try {
      const response = await fetch(url.toString(), {
        headers: this.headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.blob();
    } catch (error) {
      console.error('PDF export failed:', error);
      throw error;
    }
  }

  // Estatísticas
  async getStats() {
    try {
      return await this.request('/stats');
    } catch (error) {
      console.log('Usando dados simulados para estatísticas...');
      return mockAPI.getStats();
    }
  }
}

const apiService = new ApiService();
export default apiService;
export { apiService };
