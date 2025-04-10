#!/usr/bin/env node
const fs = require('fs-extra');
const { execSync } = require('child_process');
const path = require('path');

const projectName = process.argv[2];

if (!projectName) {
  console.error('❌ Please specify a project name.\nExample: create-stupid minha-api');
  process.exit(1);
}

const projectPath = path.resolve(process.cwd(), projectName);

// Cria a pasta do projeto
fs.mkdirSync(projectPath);
process.chdir(projectPath);

// Copia todos os arquivos do projeto base (inclusive config/database.js)
fs.copySync(path.resolve(__dirname, 'templates/project-base'), projectPath);

// Instala dependências
execSync('npm install', { stdio: 'inherit' });

// Mensagem final
console.log(`\n✅ Project "${projectName}" created successfully!`);
console.log(`👉 Get started:`);
console.log(`   cd ${projectName}`);
console.log(`   npm run dev`);
