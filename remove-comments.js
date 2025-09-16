#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function removeComments(content, fileExtension) {
  switch (fileExtension) {
    case '.js':
    case '.jsx':
      // Remove comentários de linha única (//)
      content = content.replace(/^\s*\/\/.*$/gm, '');
      // Remove comentários JSX {/* */}
      content = content.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '');
      // Remove comentários de bloco /* */
      content = content.replace(/\/\*[\s\S]*?\*\//g, '');
      break;
    case '.css':
      // Remove comentários CSS /* */
      content = content.replace(/\/\*[\s\S]*?\*\//g, '');
      break;
  }
  
  // Remove linhas vazias extras
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  return content;
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const extension = path.extname(filePath);
  
  if (['.js', '.jsx', '.css'].includes(extension)) {
    const cleanContent = removeComments(content, extension);
    fs.writeFileSync(filePath, cleanContent, 'utf8');
    console.log(`Processado: ${filePath}`);
  }
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && item !== 'node_modules' && !item.startsWith('.')) {
      processDirectory(fullPath);
    } else if (stat.isFile()) {
      processFile(fullPath);
    }
  }
}

// Processar o diretório src
processDirectory('./src');
console.log('Remoção de comentários concluída!');