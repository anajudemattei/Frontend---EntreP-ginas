// Configuração simples do Jest para Next.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Caminho para o app Next.js
  dir: './',
})

// Configurações personalizadas do Jest
const customJestConfig = {
  // Arquivo de setup
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Ambiente de teste (jsdom para simular o navegador)
  testEnvironment: 'jest-environment-jsdom',
  
  // Mapear os caminhos (para usar @ nos imports)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // Pasta dos testes
  testMatch: [
    '**/__tests__/**/*.test.js',
    '**/__tests__/**/*.test.jsx'
  ],
}

// Exporta a configuração
module.exports = createJestConfig(customJestConfig)
