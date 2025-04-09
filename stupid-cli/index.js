#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs-extra');
const { execSync } = require('child_process');
const path = require('path');
const knexfilePath = path.resolve(__dirname, '../knexfile.js');

function renderTemplate(templatePath, replacements) {
  let content = fs.readFileSync(templatePath, 'utf-8');
  for (const key in replacements) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    content = content.replace(regex, replacements[key]);
  }
  return content;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ✅ Generate Model Command
program
  .command('generate:model <name>')
  .description('Generates a model based on the template')
  .action((name) => {
    const ModelName = capitalize(name);
    const tableName = name.toLowerCase() + 's';
    const replacements = {
      ModelName,
      tableName,
    };

    const templatePath = path.join(__dirname, 'templates/models.js');
    const modelContent = renderTemplate(templatePath, replacements);

    const outputPath = path.join(__dirname, '../app/models', `${ModelName}.js`);
    fs.outputFileSync(outputPath, modelContent);

    console.log(`✅ Model ${ModelName}.js successfully created in app/models`);
  });

// ✅ Generate Migration Command
program
  .command('generate:migration <name>')
  .description('Generates a migration using Knex')
  .action((name) => {
    const cmd = `npx knex migrate:make ${name} --knexfile ${knexfilePath}`;
    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch (error) {
      console.error(`❌ Failed to generate migration: ${error.message}`);
    }
  });

// ✅ Run Latest Migration Command
program
  .command('migrate:last')
  .description('Runs the latest migration')
  .action(() => {
    const cmd = `npx knex migrate:latest --knexfile ${knexfilePath}`;
    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch (error) {
      console.error(`❌ Migration failed: ${error.message}`);
    }
  });

program.parse();
