let mockEntries = [
  {
    id: 1,
    title: "Meu primeiro dia no novo projeto",
    content: "Hoje comecei a trabalhar no projeto Entre Páginas. Estou muito animada com as possibilidades que este diário digital pode oferecer. A ideia de poder registrar meus pensamentos e momentos especiais de forma organizada me empolga muito.",
    mood: "feliz",
    entry_date: "2024-12-15T10:30:00Z",
    is_favorite: true,
    tags: ['trabalho', 'projetos', 'animação'],
    created_at: "2024-12-15T10:30:00Z",
    updated_at: "2024-12-15T10:30:00Z"
  },
  {
    id: 2,
    title: "Reflexões sobre o fim de semana",
    content: "O fim de semana foi relaxante. Passei tempo lendo um livro interessante sobre desenvolvimento pessoal e escrevendo algumas ideias. Preciso fazer isso mais vezes - dedicar tempo para mim mesma e para atividades que nutrem minha alma.",
    mood: "tranquilo",
    entry_date: "2024-12-14T14:15:00Z",
    is_favorite: false,
    tags: ['relaxamento', 'leitura', 'desenvolvimento-pessoal'],
    created_at: "2024-12-14T14:15:00Z",
    updated_at: "2024-12-14T14:15:00Z"
  },
  {
    id: 3,
    title: "Pensamentos aleatórios",
    content: "Às vezes é bom apenas escrever sem pensar muito. Deixar os pensamentos fluírem naturalmente pela mente e pelos dedos. Hoje estou contemplativa, observando as nuvens pela janela e me perguntando sobre o futuro.",
    mood: "contemplativo",
    entry_date: "2024-12-13T20:45:00Z",
    is_favorite: true,
    tags: ['reflexão', 'escrita', 'contemplação'],
    created_at: "2024-12-13T20:45:00Z",
    updated_at: "2024-12-13T20:45:00Z"
  },
  {
    id: 4,
    title: "Descobertas musicais",
    content: "Descobri uma playlist incrível hoje! A música tem o poder de transportar nossa mente para lugares únicos. Cada melodia conta uma história, cada ritmo desperta uma emoção diferente.",
    mood: "animado",
    entry_date: "2024-12-12T16:20:00Z",
    is_favorite: false,
    tags: ['música', 'descobertas', 'emoções'],
    created_at: "2024-12-12T16:20:00Z",
    updated_at: "2024-12-12T16:20:00Z"
  },
  {
    id: 5,
    title: "Caminhada matinal",
    content: "A caminhada matinal de hoje foi especialmente revigorante. O ar fresco, os pássaros cantando e a sensação de gratidão por estar viva preencheram meu coração. Momentos simples como esses são verdadeiros presentes.",
    mood: "grateful",
    entry_date: "2024-12-11T08:00:00Z",
    is_favorite: true,
    tags: ['natureza', 'exercício', 'gratidão', 'manhã'],
    created_at: "2024-12-11T08:00:00Z",
    updated_at: "2024-12-11T08:00:00Z"
  },
  {
    id: 6,
    title: "Desafios e aprendizados",
    content: "Enfrentei alguns desafios técnicos hoje que me fizeram questionar minhas habilidades. Mas depois de algumas horas de pesquisa e tentativas, consegui resolver tudo. Cada obstáculo é uma oportunidade de crescimento.",
    mood: "reflexivo",
    entry_date: "2024-12-10T19:30:00Z",
    is_favorite: false,
    tags: ['desafios', 'aprendizado', 'crescimento', 'tecnologia'],
    created_at: "2024-12-10T19:30:00Z",
    updated_at: "2024-12-10T19:30:00Z"
  },
  {
    id: 7,
    title: "Noite de leitura",
    content: "Passei a noite lendo um romance que me cativou desde a primeira página. A capacidade dos autores de criar mundos inteiros com palavras me fascina. A literatura é realmente uma forma de magia.",
    mood: "contemplativo",
    entry_date: "2024-12-09T22:15:00Z",
    is_favorite: true,
    tags: ['leitura', 'literatura', 'noite', 'imaginação'],
    created_at: "2024-12-09T22:15:00Z",
    updated_at: "2024-12-09T22:15:00Z"
  },
  {
    id: 8,
    title: "Cozinhando com amor",
    content: "Preparei uma receita nova hoje e o resultado foi surpreendente! Cozinhar é uma forma de arte que combina criatividade, paciência e amor. O aroma que tomou conta da cozinha me trouxe memórias da infância.",
    mood: "feliz",
    entry_date: "2024-12-08T18:45:00Z",
    is_favorite: false,
    tags: ['culinária', 'criatividade', 'memórias', 'família'],
    created_at: "2024-12-08T18:45:00Z",
    updated_at: "2024-12-08T18:45:00Z"
  }
];

let nextId = 9;

export const mockData = {
  // Getter para as entradas
  getEntries: () => [...mockEntries],
  
  // Getter para uma entrada específica
  getEntry: (id) => mockEntries.find(entry => entry.id === parseInt(id)),
  
  // Adicionar nova entrada
  addEntry: (entryData) => {
    const newEntry = {
      id: nextId++,
      ...entryData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockEntries.push(newEntry);

    const currentStreak = 7;
    
    // Distribuição de humores
    const moodCount = {};
    mockEntries.forEach(entry => {
      if (entry.mood) {
        moodCount[entry.mood] = (moodCount[entry.mood] || 0) + 1;
      }
    });
    
    const moodDistribution = Object.entries(moodCount).map(([mood, count]) => ({
      mood,
      count
    }));
    
    // Atividade mensal (mock)
    const monthlyActivity = [
      { month: 'Dezembro', entries: totalEntries }
    ];
    
    return {
      totalEntries,
      totalFavorites,
      totalWords,
      currentStreak,
      moodDistribution,
      monthlyActivity
    };
  }
};

// API mock que simula as rotas do backend
export const mockAPI = {
  // GET /diary-entries
  getDiaryEntries: (filters = {}) => {
    let entries = [...mockEntries];
    
    // Aplicar filtros
    if (filters.mood) {
      entries = entries.filter(entry => entry.mood === filters.mood);
    }
    
    if (filters.tag) {
      entries = entries.filter(entry => 
        entry.tags && entry.tags.some(tag => 
          tag.toLowerCase().includes(filters.tag.toLowerCase())
        )
      );
    }
    
    if (filters.startDate) {
      entries = entries.filter(entry => 
        new Date(entry.entry_date) >= new Date(filters.startDate)
      );
    }
    
    if (filters.endDate) {
      entries = entries.filter(entry => 
        new Date(entry.entry_date) <= new Date(filters.endDate)
      );
    }
    
    // Ordenar por data (mais recente primeiro)
    entries.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));
    
    // Aplicar limite
    if (filters.limit) {
      entries = entries.slice(0, parseInt(filters.limit));
    }
    
    return Promise.resolve(entries);
  },

  // GET /diary-entries/:id
  getDiaryEntry: (id) => {
    const entry = mockData.getEntry(id);
    if (entry) {
      return Promise.resolve(entry);
    } else {
      return Promise.reject(new Error('Entry not found'));
    }
  },

  // POST /diary-entries
  createDiaryEntry: (data) => {
    const newEntry = mockData.addEntry(data);
    return Promise.resolve(newEntry);
  },

  // PUT /diary-entries/:id
  updateDiaryEntry: (id, data) => {
    const updatedEntry = mockData.updateEntry(id, data);
    if (updatedEntry) {
      return Promise.resolve(updatedEntry);
    } else {
      return Promise.reject(new Error('Entry not found'));
    }
  },

  // DELETE /diary-entries/:id
  deleteDiaryEntry: (id) => {
    const deletedEntry = mockData.deleteEntry(id);
    if (deletedEntry) {
      return Promise.resolve({ message: 'Entry deleted successfully' });
    } else {
      return Promise.reject(new Error('Entry not found'));
    }
  },

  // GET /diary-entries/mood/:mood
  getDiaryEntriesByMood: (mood) => {
    const entries = mockEntries.filter(entry => entry.mood === mood);
    return Promise.resolve(entries);
  },

  // GET /diary-entries/favorites
  getFavoriteDiaryEntries: () => {
    const favorites = mockEntries.filter(entry => entry.is_favorite);
    return Promise.resolve(favorites);
  },

  // PATCH /diary-entries/:id/favorite
  toggleFavorite: (id) => {
    const updatedEntry = mockData.toggleFavorite(id);
    if (updatedEntry) {
      return Promise.resolve(updatedEntry);
    } else {
      return Promise.reject(new Error('Entry not found'));
    }
  },

  // GET /diary-entries/stats
  getDiaryStats: () => {
    const stats = mockData.getStats();
    return Promise.resolve(stats);
  }
};
