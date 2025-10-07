
import axios from 'axios';


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4002/api';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'entre-linhas-2024';

const possibleBaseUrls = [
  'http://localhost:4002/api',
  'http://localhost:4002',
  'http://localhost:3002/api',
  'http://localhost:3002',
];

class ApiService {
  constructor() {
    this.baseURL = API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    };
  // this.useMockData removido
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: this.headers,
    });
  }

  async request(endpoint, options = {}) {
    // mockData removido: sempre tenta API real

    let lastError = null;

    for (const baseUrl of possibleBaseUrls) {
      try {
        const url = `${baseUrl}${endpoint}`;
        const config = {
          url,
          headers: {
            ...this.headers,
            'Authorization': `Bearer ${API_KEY}`,
          },
          ...options,
        };
        // Se for GET, params vai na URL
        if (options.method && options.method.toUpperCase() !== 'GET') {
          config.method = options.method;
          config.data = options.body ? JSON.parse(options.body) : undefined;
        } else {
          config.method = 'GET';
        }
        // Adiciona API_KEY na query
        if (!config.params) config.params = {};
        config.params['API_KEY'] = API_KEY;

        const response = await axios(config);
        this.baseURL = baseUrl;
        return response.data;
      } catch (error) {
        lastError = error;
        continue;
      }
    }
    console.error('API request failed em todas as URLs:', lastError);
  throw lastError || new Error('Todas as URLs falharam');
  }

  async getDiaryEntries(filters = {}) {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });
    const queryString = queryParams.toString();
    const endpoint = `/diary-entries${queryString ? `?${queryString}` : ''}`;
    return await this.request(endpoint);
  }

  async getDiaryEntry(id) {
    return await this.request(`/diary-entries/${id}`);
  }

  async createDiaryEntry(data) {
    return await this.request('/diary-entries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createDiaryEntryWithPhoto(formData) {
    const url = `${this.baseURL}/diary-entries`;
    const response = await axios.post(url, formData, {
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'multipart/form-data',
      },
      params: { API_KEY },
    });
    return response.data;
  }

  async updateDiaryEntry(id, data) {
    return await this.request(`/diary-entries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDiaryEntry(id) {
    return await this.request(`/diary-entries/${id}`, {
      method: 'DELETE',
    });
  }

  async getDiaryEntriesByMood(mood) {
    return await this.request(`/diary-entries/mood/${mood}`);
  }

  async getFavoriteDiaryEntries() {
    return await this.request('/diary-entries/favorites');
  }

  async toggleFavorite(id) {
    return await this.request(`/diary-entries/${id}/favorite`, {
      method: 'PATCH',
    });
  }

  async getDiaryStats() {
    return await this.request('/diary-entries/stats');
  }

  async exportDiaryToPDF(filters = {}) {
    try {
      const params = { ...filters, API_KEY };
      const url = `${this.baseURL}/report/pdf`;
      const response = await axios.get(url, {
        headers: this.headers,
        params,
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('PDF export failed:', error);
      throw error;
    }
  }

  // Estatísticas
  async getStats() {
    return await this.request('/stats');
  }
}

const apiService = new ApiService();
export default apiService;
export { apiService };
