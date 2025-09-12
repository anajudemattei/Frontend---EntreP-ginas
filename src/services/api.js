const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'your-api-key-here';

class ApiService {
  constructor() {
    this.baseURL = API_URL;
    this.headers = {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    };
  }

  async request(endpoint, options = {}) {
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
      throw error;
    }
  }

  // Entradas do diário
  async getDiaryEntries(filters = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== null && filters[key] !== undefined && filters[key] !== '') {
        queryParams.append(key, filters[key]);
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/diary-entries${queryString ? `?${queryString}` : ''}`;
    
    return this.request(endpoint);
  }

  async getDiaryEntry(id) {
    return this.request(`/diary-entries/${id}`);
  }

  async createDiaryEntry(data) {
    return this.request('/diary-entries', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createDiaryEntryWithPhoto(formData) {
    return this.request('/diary-entries', {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY, // Only API key, no Content-Type for FormData
      },
      body: formData,
    });
  }

  async updateDiaryEntry(id, data) {
    return this.request(`/diary-entries/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDiaryEntry(id) {
    return this.request(`/diary-entries/${id}`, {
      method: 'DELETE',
    });
  }

  async getDiaryEntriesByMood(mood) {
    return this.request(`/diary-entries/mood/${mood}`);
  }

  async getFavoriteDiaryEntries() {
    return this.request('/diary-entries/favorites');
  }

  async toggleFavorite(id) {
    return this.request(`/diary-entries/${id}/favorite`, {
      method: 'PATCH',
    });
  }

  async getDiaryStats() {
    return this.request('/diary-entries/stats');
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
