# 🧪 Testes do Projeto

Este projeto inclui testes automatizados para garantir que tudo funciona corretamente.

## 📁 Arquivos de Teste

### 1. **Teste Unitário** - `__tests__/components/ui.test.jsx`
Testa os componentes básicos da interface:
- **Button**: Verifica se o botão renderiza e responde a cliques
- **Card**: Testa se o card mostra o conteúdo corretamente
- **Input**: Verifica se o input aceita texto digitado

### 2. **Teste de Integração** - `__tests__/services/api.test.js`
Testa a comunicação com a API:
- Buscar lista de entradas
- Criar nova entrada
- Buscar entrada por ID
- Filtrar entradas por humor
- Tratamento de erros

## 🚀 Como Executar os Testes

### Executar todos os testes uma vez:
```bash
npm test
```

### Executar testes em modo watch (fica observando mudanças):
```bash
npm run test:watch
```

## 📊 O que os testes verificam

### Testes Unitários (Componentes):
✅ Botões aparecem na tela com o texto correto  
✅ Cliques nos botões funcionam  
✅ Cards mostram o conteúdo  
✅ Inputs permitem digitação  
✅ Labels aparecem corretamente  

### Testes de Integração (API):
✅ API retorna lista de entradas  
✅ Consegue criar novas entradas  
✅ Busca entradas específicas por ID  
✅ Filtros funcionam (ex: filtrar por humor)  
✅ Sistema usa dados mock quando API falha  

## 🔧 Tecnologias Usadas

- **Jest** - Framework de testes
- **React Testing Library** - Testes de componentes React
- **jest-dom** - Matchers extras para testes

## 📝 Exemplo de Resultado

Quando você rodar `npm test`, verá algo assim:

```
PASS  __tests__/components/ui.test.jsx
  ✓ Componente Button renderiza corretamente
  ✓ Componente Card mostra conteúdo
  ✓ Componente Input aceita texto

PASS  __tests__/services/api.test.js
  ✓ Busca entradas do diário
  ✓ Cria nova entrada
  ✓ Filtra por humor

Testes: 10 passed, 10 total
```

## 💡 Dicas

- Se um teste falhar, leia a mensagem de erro com atenção
- Os testes verificam se o código funciona como esperado
- Sempre rode os testes antes de fazer commit
- Se adicionar novas funcionalidades, crie novos testes!

---

**Desenvolvido como parte do projeto final - Desenvolvimento de Sistemas - SENAI Valinhos**
