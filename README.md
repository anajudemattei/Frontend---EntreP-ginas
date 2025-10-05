# Entre Páginas - Frontend

Frontend da aplicação Entre Páginas, um diário digital desenvolvido com Next.js, Tailwind CSS e integração com API backend em Node.js.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React para produção
- **React 19** - Biblioteca JavaScript para interfaces
- **Tailwind CSS 4** - Framework CSS utilitário
- **JavaScript/JSX** - Linguagem de programação

## 🎨 Design e Cores

O projeto utiliza um tema inspirado em diários tradicionais com paleta de cores terrosas:

- **Primário**: #8B5A3C (Marrom terroso)
- **Secundário**: #5D8B5A (Verde suave)  
- **Background**: #FDF6F0 (Bege claro)
- **Texto**: #3C2817 (Marrom escuro)

## 📋 Funcionalidades Implementadas

### ✅ Páginas Principais
- **Dashboard/Home** - Estatísticas e entradas recentes
- **Lista de Entradas** - Visualização de todas as entradas com filtros
- **Nova Entrada** - Criação de entradas com upload de fotos
- **Visualizar Entrada** - Detalhes completos de uma entrada
- **Editar Entrada** - Modificação de entradas existentes
- **Favoritos** - Lista de entradas marcadas como favoritas
- **Relatórios** - Geração e download de relatórios em PDF

### ✅ Funcionalidades
- **CRUD Completo** - Criar, ler, atualizar e deletar entradas
- **Upload de Imagens** - Anexar fotos às entradas
- **Sistema de Tags** - Organização por tags personalizadas
- **Controle de Humor** - Registro do estado emocional
- **Favoritos** - Marcar entradas importantes
- **Filtros Avançados** - Por data, humor, tags e favoritos
- **Relatórios PDF** - Exportação com filtros personalizados
- **Design Responsivo** - Compatível com dispositivos móveis

### ✅ Componentes
- **Layout Responsivo** - Header, Footer e navegação
- **Componentes UI** - Cards, Buttons, Inputs, etc.
- **Sistema de Cores** - Tema consistente do diário
- **Animações** - Transições suaves e feedback visual

## 🔧 Configuração e Instalação

1. **Clone o repositório e navegue para a pasta:**
   ```bash
   cd entrepaginas-frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   NEXT_PUBLIC_API_KEY=your-api-key-here
   ```

4. **Execute o projeto em desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação:**
   Abra [http://localhost:3001](http://localhost:3001) no seu navegador

## 🌐 Integração com Backend

Este frontend se integra com o backend Entre Páginas disponível em:
**https://github.com/anajudemattei/Backend---EntreP-ginas**

### Configuração da API

Certifique-se de que o backend esteja rodando antes de iniciar o frontend. Por padrão:
- **Backend**: http://localhost:4002
- **Frontend**: http://localhost:3001

### 📡 Endpoints da API

#### **1. Listar Entradas**
```http
GET /api/diary-entries?API_KEY=entre-linhas-2024
```

**Parâmetros de Query (opcionais):**
- `mood` - Filtrar por humor (feliz, triste, ansioso, etc.)
- `tag` - Filtrar por tag
- `isFavorite` - Filtrar favoritos (true/false)
- `startDate` - Data inicial (YYYY-MM-DD)
- `endDate` - Data final (YYYY-MM-DD)

**Exemplo de Request:**
```bash
curl -X GET "http://localhost:4002/api/diary-entries?API_KEY=entre-linhas-2024&mood=feliz" \
  -H "x-api-key: entre-linhas-2024"
```

**Exemplo de Response (200 OK):**
```json
[
  {
    "id": "1",
    "title": "Meu primeiro dia de aula",
    "content": "Hoje foi incrível! Aprendi muito sobre React...",
    "mood": "feliz",
    "tags": ["estudos", "programação"],
    "isFavorite": false,
    "photo": "/uploads/foto1.jpg",
    "createdAt": "2025-10-01T10:00:00.000Z",
    "updatedAt": "2025-10-01T10:00:00.000Z"
  }
]
```

#### **2. Criar Nova Entrada**
```http
POST /api/diary-entries?API_KEY=entre-linhas-2024
```

**Headers:**
```
Content-Type: application/json
x-api-key: entre-linhas-2024
```

**Exemplo de Request:**
```json
{
  "title": "Meu dia incrível",
  "content": "Hoje foi um dia maravilhoso. Aprendi muitas coisas novas...",
  "mood": "feliz",
  "tags": ["estudos", "tecnologia"],
  "photo": "base64_string_or_url"
}
```

**Exemplo de Response (201 Created):**
```json
{
  "id": "123",
  "title": "Meu dia incrível",
  "content": "Hoje foi um dia maravilhoso...",
  "mood": "feliz",
  "tags": ["estudos", "tecnologia"],
  "isFavorite": false,
  "createdAt": "2025-10-04T15:30:00.000Z"
}
```

#### **3. Buscar Entrada Específica**
```http
GET /api/diary-entries/:id?API_KEY=entre-linhas-2024
```

**Exemplo de Response (200 OK):**
```json
{
  "id": "123",
  "title": "Meu dia incrível",
  "content": "Hoje foi um dia maravilhoso...",
  "mood": "feliz",
  "tags": ["estudos", "tecnologia"],
  "isFavorite": false,
  "photo": "/uploads/photo123.jpg",
  "createdAt": "2025-10-04T15:30:00.000Z",
  "updatedAt": "2025-10-04T15:30:00.000Z"
}
```

#### **4. Atualizar Entrada**
```http
PUT /api/diary-entries/:id?API_KEY=entre-linhas-2024
```

**Exemplo de Request:**
```json
{
  "title": "Título atualizado",
  "content": "Conteúdo modificado...",
  "mood": "animado",
  "tags": ["estudos", "progresso"]
}
```

**Exemplo de Response (200 OK):**
```json
{
  "message": "Entrada atualizada com sucesso",
  "entry": {
    "id": "123",
    "title": "Título atualizado",
    "updatedAt": "2025-10-04T16:00:00.000Z"
  }
}
```

#### **5. Deletar Entrada**
```http
DELETE /api/diary-entries/:id?API_KEY=entre-linhas-2024
```

**Exemplo de Response (200 OK):**
```json
{
  "message": "Entrada deletada com sucesso",
  "id": "123"
}
```

#### **6. Marcar/Desmarcar Favorito**
```http
PATCH /api/diary-entries/:id/favorite?API_KEY=entre-linhas-2024
```

**Exemplo de Response (200 OK):**
```json
{
  "message": "Favorito atualizado",
  "isFavorite": true
}
```

#### **7. Obter Estatísticas**
```http
GET /api/diary-entries/stats?API_KEY=entre-linhas-2024
```

**Exemplo de Response (200 OK):**
```json
{
  "totalEntries": 45,
  "totalFavorites": 12,
  "totalWords": 15847,
  "entriesByMood": {
    "feliz": 20,
    "triste": 5,
    "ansioso": 10,
    "calmo": 10
  },
  "recentEntries": 7
}
```

#### **8. Gerar Relatório PDF**
```http
GET /api/report/pdf?API_KEY=entre-linhas-2024&startDate=2025-01-01&endDate=2025-12-31
```

**Parâmetros de Query:**
- `startDate` - Data inicial (obrigatório)
- `endDate` - Data final (obrigatório)
- `mood` - Filtrar por humor (opcional)
- `tag` - Filtrar por tag (opcional)

**Response:** Arquivo PDF com as entradas filtradas

### ⚠️ Tratamento de Erros da API

**400 - Bad Request:**
```json
{
  "error": "Dados inválidos",
  "message": "O campo 'title' é obrigatório"
}
```

**401 - Unauthorized:**
```json
{
  "error": "Não autorizado",
  "message": "API Key inválida ou ausente"
}
```

**404 - Not Found:**
```json
{
  "error": "Não encontrado",
  "message": "Entrada com ID '123' não encontrada"
}
```

**500 - Internal Server Error:**
```json
{
  "error": "Erro interno",
  "message": "Erro ao processar solicitação"
}
```

## 📁 Estrutura do Projeto

```
Frontend---EntreP-ginas/
├── public/                 # Arquivos estáticos
│   ├── logo.png           # Logo da aplicação
│   ├── anajulia.jfif      # Foto de perfil
│   └── *.jfif             # Outras imagens
├── src/
│   ├── app/               # App Router do Next.js
│   │   ├── entradas/      # Páginas das entradas
│   │   │   ├── [id]/      # Entrada específica
│   │   │   │   ├── page.jsx        # Visualizar entrada
│   │   │   │   └── editar/
│   │   │   │       └── page.jsx    # Editar entrada
│   │   │   ├── nova/
│   │   │   │   └── page.jsx        # Nova entrada
│   │   │   ├── entradas.module.css
│   │   │   └── page.jsx            # Lista de entradas
│   │   ├── favoritos/
│   │   │   ├── favoritos.module.css
│   │   │   └── page.jsx            # Página de favoritos
│   │   ├── perfil/
│   │   │   ├── perfil.module.css
│   │   │   └── page.jsx            # Perfil do usuário
│   │   ├── relatorios/
│   │   │   ├── relatorios.module.css
│   │   │   └── page.jsx            # Relatórios e PDFs
│   │   ├── sobre/
│   │   │   ├── sobre.module.css
│   │   │   └── page.jsx            # Página Sobre Mim
│   │   ├── api/
│   │   │   └── mockData.js         # Dados mock (fallback)
│   │   ├── dashboard.module.css
│   │   ├── globals.css             # Estilos globais
│   │   ├── layout.js               # Layout raiz
│   │   ├── loading.jsx             # Loading global
│   │   ├── not-found.jsx           # Página 404
│   │   └── page.jsx                # Página inicial (Dashboard)
│   ├── components/        # Componentes reutilizáveis
│   │   ├── ui/
│   │   │   └── index.jsx           # Card, Button, Input, etc.
│   │   ├── Footer.jsx              # Rodapé
│   │   ├── Header.jsx              # Cabeçalho/Navegação
│   │   ├── Layout.jsx              # Layout principal
│   │   └── Watermark.jsx           # Marca d'água
│   └── services/          # Serviços de integração
│       └── api.js                  # Cliente da API REST
├── .env                   # Variáveis de ambiente (local)
├── .gitignore
├── eslint.config.mjs      # Configuração ESLint
├── jsconfig.json          # Configuração JavaScript
├── next.config.mjs        # Configuração Next.js
├── package.json           # Dependências do projeto
└── README.md              # Documentação
```

## 🧪 Testes

Este projeto inclui testes automatizados para garantir a qualidade e funcionamento correto da aplicação.

### 📁 Arquivos de Teste

O projeto possui dois tipos principais de testes na pasta `__tests__/`:

#### **1. Teste Unitário** - `__tests__/components/ui.test.jsx`
Testa os componentes básicos da interface:
- **Button**: Verifica se o botão renderiza e responde a cliques
- **Card**: Testa se o card mostra o conteúdo corretamente
- **Input**: Verifica se o input aceita texto digitado
- **Badge**: Testa a renderização de badges
- **LoadingSpinner**: Verifica o componente de loading

#### **2. Teste de Integração** - `__tests__/services/api.test.js`
Testa a comunicação com a API:
- Buscar lista de entradas do diário
- Criar nova entrada com validação
- Buscar entrada específica por ID
- Filtrar entradas por humor e tags
- Tratamento de erros da API
- Fallback para dados mock quando necessário

### 🚀 Como Executar os Testes

```bash
npm test              # Executar todos os testes
npm test -- --watch   # Modo watch (observa mudanças)
npm test -- --coverage # Com cobertura de código
```

### ⚙️ Configuração de Testes

O projeto está preparado para testes com Jest e React Testing Library. Para adicionar testes:

1. **Instale as dependências de teste:**
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

2. **Configure o Jest** criando `jest.config.js`:
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

### 📊 O que os Testes Verificam

#### ✅ Testes Unitários (Componentes UI):
- Botões aparecem na tela com o texto correto
- Cliques nos botões executam as funções esperadas
- Cards renderizam e mostram o conteúdo adequadamente
- Inputs permitem digitação e atualização de valor
- Labels aparecem corretamente vinculados aos campos
- Estados de loading são exibidos apropriadamente

#### ✅ Testes de Integração (API Service):
- API retorna lista de entradas corretamente
- Sistema consegue criar novas entradas com sucesso
- Busca de entradas específicas por ID funciona
- Filtros funcionam corretamente (humor, tags, favoritos)
- Sistema usa dados mock quando API está indisponível
- Erros são tratados e retornados adequadamente

### 📝 Exemplos de Testes

#### **Teste Unitário - Componente Button**
```javascript
// __tests__/components/ui/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui';

describe('Button Component', () => {
  test('renderiza o botão com texto', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('chama onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('desabilita o botão quando disabled é true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});
```

#### **Teste de Integração - API Service**
```javascript
// __tests__/services/api.test.js
import ApiService from '@/services/api';

describe('API Service - Diary Entries', () => {
  test('busca entradas do diário com sucesso', async () => {
    const api = new ApiService();
    const entries = await api.getDiaryEntries();
    
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
  });

  test('cria nova entrada com dados válidos', async () => {
    const api = new ApiService();
    const newEntry = {
      title: 'Teste de Entrada',
      content: 'Conteúdo de teste para verificar criação',
      mood: 'feliz',
      tags: ['teste', 'automação']
    };
    
    const result = await api.createDiaryEntry(newEntry);
    
    expect(result).toHaveProperty('id');
    expect(result.title).toBe('Teste de Entrada');
    expect(result.mood).toBe('feliz');
  });

  test('filtra entradas por humor', async () => {
    const api = new ApiService();
    const entries = await api.getDiaryEntries({ mood: 'feliz' });
    
    entries.forEach(entry => {
      expect(entry.mood).toBe('feliz');
    });
  });

  test('trata erro quando entrada não é encontrada', async () => {
    const api = new ApiService();
    
    await expect(
      api.getDiaryEntry('id-inexistente')
    ).rejects.toThrow('Entrada não encontrada');
  });
});
```

### 🎯 Resultado Esperado dos Testes

Quando você executar `npm test`, verá algo assim:

```
PASS  __tests__/components/ui.test.jsx
  Button Component
    ✓ renderiza o botão com texto (25ms)
    ✓ chama onClick quando clicado (15ms)
    ✓ desabilita o botão quando disabled é true (10ms)
  Card Component
    ✓ renderiza card com conteúdo (18ms)
  Input Component
    ✓ aceita texto digitado (22ms)

PASS  __tests__/services/api.test.js
  API Service - Diary Entries
    ✓ busca entradas do diário com sucesso (45ms)
    ✓ cria nova entrada com dados válidos (38ms)
    ✓ filtra entradas por humor (42ms)
    ✓ trata erro quando entrada não é encontrada (20ms)

Test Suites: 2 passed, 2 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        2.345s
```

### 📈 Cobertura de Testes

O projeto deve manter cobertura mínima de:
- **Componentes UI**: 80%
- **Services (API)**: 70%
- **Pages críticas**: 60%
- **Utilitários**: 75%

### 🔧 Tecnologias de Teste

- **Jest** - Framework de testes JavaScript
- **React Testing Library** - Biblioteca para testar componentes React
- **@testing-library/jest-dom** - Matchers customizados para testes de DOM
- **jest-environment-jsdom** - Ambiente DOM para testes

### 💡 Boas Práticas de Teste

1. **Sempre rode os testes antes de fazer commit**
2. **Escreva testes para novas funcionalidades**
3. **Mantenha os testes simples e legíveis**
4. **Teste comportamentos, não implementações**
5. **Use nomes descritivos para os testes**
6. **Mantenha a cobertura acima dos níveis mínimos**
7. **Teste casos de sucesso E casos de erro**

### 🐛 Depuração de Testes

Se um teste falhar:
1. Leia a mensagem de erro com atenção
2. Verifique se a API está rodando (para testes de integração)
3. Use `console.log()` dentro dos testes para debug
4. Execute apenas o teste que falhou: `npm test -- nome-do-teste`
5. Verifique se as dependências estão atualizadas

## 🎯 Comandos Disponíveis

```bash
npm run dev      # Executar em desenvolvimento
npm run build    # Build para produção
npm run start    # Executar versão de produção
npm run lint     # Verificar código
```

## 🔐 Autenticação

O frontend utiliza um sistema de API Key configurado no arquivo `.env.local`. Certifique-se de que a chave corresponda à configurada no backend.

## 📱 Responsividade

O projeto foi desenvolvido com design responsivo usando Tailwind CSS:
- **Mobile First** - Design otimizado para dispositivos móveis
- **Breakpoints** - sm, md, lg, xl para diferentes tamanhos
- **Grid Responsivo** - Layouts adaptativos
- **Menu Mobile** - Navegação otimizada para touch

## 🎨 Customização

### Cores
As cores podem ser personalizadas no arquivo `tailwind.config.js` e `globals.css`.

### Componentes
Todos os componentes UI estão em `src/components/ui/index.jsx` e podem ser facilmente modificados.

### Layout
O layout principal está em `src/components/Layout.jsx` e inclui Header e Footer.

## 🐛 Tratamento de Erros

- **Loading States** - Spinners durante carregamentos
- **Error Boundaries** - Tratamento de erros da API
- **Validação** - Validação de formulários no frontend
- **Feedback Visual** - Mensagens de sucesso/erro

## 🔄 Estados da Aplicação

- **Loading** - Durante requisições à API
- **Error** - Quando há falhas de comunicação
- **Empty** - Quando não há dados para exibir
- **Success** - Após operações bem-sucedidas

## 🚀 Deploy

### Preparando para Produção

1. **Build do projeto:**
```bash
npm run build
```

2. **Testar build localmente:**
```bash
npm run start
```

3. **Variáveis de ambiente em produção:**
Configure as seguintes variáveis no seu serviço de hospedagem:
```env
NEXT_PUBLIC_API_URL=https://seu-backend.com/api
NEXT_PUBLIC_API_KEY=sua-api-key-producao
```

### Opções de Deploy

- **Vercel** (Recomendado para Next.js)
- **Netlify**
- **AWS Amplify**
- **Digital Ocean**
- **Heroku**

## 📊 Requisitos do Projeto Final

### ✅ Checklist de Entrega

- [x] **Front-end funcional** com Next.js
- [x] **Back-end funcional** com Node.js ([Repositório](https://github.com/anajudemattei/Backend---EntreP-ginas))
- [x] **5 Páginas obrigatórias:**
  - [x] Home (Dashboard)
  - [x] Listagem (Entradas)
  - [x] Detalhes (Entrada individual)
  - [x] Sobre Mim
  - [x] Quinta página (Favoritos + Relatórios)
- [ ] **2 arquivos de teste** (unitário e integração)
- [x] **README.md completo** com:
  - [x] Descrição do projeto
  - [x] Tecnologias utilizadas
  - [x] Instruções de instalação
  - [x] Estrutura do projeto
  - [x] Exemplos de uso da API
  - [x] Documentação de testes

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📞 Contato

- **Desenvolvedora**: Ana Julia Pinheiro Demattei
- **Email**: ana.demattei@aluno.senai.br
- **GitHub**: [@anajudemattei](https://github.com/anajudemattei)
- **Instituição**: SENAI Valinhos - Desenvolvimento de Sistemas

## 🎓 Sobre o Projeto

Este projeto foi desenvolvido como Trabalho Final do curso de **Desenvolvimento de Sistemas** no SENAI Valinhos. O objetivo era criar uma aplicação Full Stack completa, integrando front-end e back-end, demonstrando os conhecimentos adquiridos durante o curso.

O **Entre Páginas** é um diário digital que permite aos usuários registrar suas memórias, pensamentos e experiências de forma organizada e visualmente agradável, com funcionalidades como upload de fotos, tags, controle de humor e geração de relatórios.

## 📄 Licença

Este projeto faz parte do trabalho final da disciplina e está disponível para fins educacionais.

---

**Desenvolvido com ❤️ para preservar suas memórias**
