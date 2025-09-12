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
https://github.com/anajudemattei/Backend---EntreP-ginas

### Endpoints Utilizados:
- `GET /api/diary-entries` - Listar entradas
- `POST /api/diary-entries` - Criar entrada
- `GET /api/diary-entries/:id` - Buscar entrada
- `PUT /api/diary-entries/:id` - Atualizar entrada
- `DELETE /api/diary-entries/:id` - Deletar entrada
- `PATCH /api/diary-entries/:id/favorite` - Alternar favorito
- `GET /api/diary-entries/stats` - Estatísticas
- `GET /api/report/pdf` - Exportar PDF

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── entradas/          # Páginas das entradas
│   │   ├── [id]/         # Entrada específica e edição
│   │   ├── nova/         # Nova entrada
│   │   └── page.jsx      # Lista de entradas
│   ├── favoritos/        # Página de favoritos
│   ├── relatorios/       # Página de relatórios
│   ├── globals.css       # Estilos globais
│   ├── layout.js         # Layout raiz
│   └── page.jsx          # Página inicial
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes UI básicos
│   ├── Header.jsx       # Cabeçalho
│   ├── Footer.jsx       # Rodapé
│   └── Layout.jsx       # Layout principal
└── services/            # Serviços de API
    └── api.js           # Cliente da API
```

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

## 📄 Licença

Este projeto faz parte do trabalho final da disciplina e está disponível para fins educacionais.

---

**Desenvolvido com ❤️ para preservar suas memórias**
