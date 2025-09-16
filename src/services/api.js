const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'your-api-key-here';

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

    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.headers,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      // Ativa modo mock para próximas chamadas
      this.useMockData = true;
      throw error;
    }
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
      return await this.request('/diary-entries', {
        method: 'POST',
        headers: {
          'x-api-key': API_KEY, // Only API key, no Content-Type for FormData
        },
        body: formData,
      });
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

    const queryString = queryParams.toString();
    const endpoint = `/report/pdf${queryString ? `?${queryString}` : ''}`;
    
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'x-api-key': API_KEY,
        },
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
}

const apiService = new ApiService();
export default apiService;
