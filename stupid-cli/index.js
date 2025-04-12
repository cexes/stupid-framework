#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs-extra');
const { execSync } = require('child_process');
const path = require('path');

const projectName = process.argv[2];
const projectRoot = process.cwd();


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


if (projectName && !projectName.includes(':')) {
  const templateBasePath = path.resolve(__dirname, 'templates/project-base');
  const projectPath = path.resolve(projectRoot, projectName);

  fs.mkdirSync(projectPath);
  process.chdir(projectPath);
  fs.copySync(templateBasePath, projectPath);
  execSync('npm install', { stdio: 'inherit' });

  console.log(`\n✅ Project "${projectName}" created successfully!`);
  console.log(`👉 Get started:`);
  console.log(`   cd ${projectName}`);
  console.log(`   npm run dev`);
  process.exit(0);
}


program
  .command('generate:model <name>')
  .description('Generates a model based on a template')
  .action((name) => {
    const ModelName = capitalize(name);
    const tableName = name.toLowerCase() + 's';
    const replacements = { ModelName, tableName };

    const templatePath = path.join(__dirname, 'templates/models.js');
    const modelContent = renderTemplate(templatePath, replacements);
    const outputPath = path.join(projectRoot, 'app/models', `${ModelName}.js`);

    fs.outputFileSync(outputPath, modelContent);
    console.log(`✅ Model ${ModelName}.js successfully created in app/models`);
  });


program
  .command('generate:controller <name>')
  .description('Generates a controller and adds REST routes to app/routes/routes.js')
  .action((name) => {
    const ControllerName = `${capitalize(name)}Controller`;
    const ModelName = capitalize(name);
    const tableName = name.toLowerCase() + 's';
    const replacements = { ControllerName, ModelName, tableName };


    const controllerTemplatePath = path.join(__dirname, 'templates/controller.js');
    const controllerContent = renderTemplate(controllerTemplatePath, replacements);
    const controllerPath = path.join(projectRoot, 'app/controllers', `${ControllerName}.js`);
    fs.outputFileSync(controllerPath, controllerContent);
    console.log(`✅ Controller ${ControllerName}.js successfully created in app/controllers`);


    const routesPath = path.join(projectRoot, 'app/routes/routes.js');
    let routesContent = '';

    if (fs.existsSync(routesPath)) {
      routesContent = fs.readFileSync(routesPath, 'utf-8');
    } else {
      routesContent = `const express = require('express');\nconst router = express.Router();\n\n`;
    }

    const importStatement = `const ${ControllerName} = require('../controllers/${ControllerName}');`;
    if (!routesContent.includes(importStatement)) {
      routesContent = importStatement + '\n' + routesContent;
    }

    const routesToAdd = `
      router.get('/${tableName}', ${ControllerName}.index);
      router.get('/${tableName}/:id', ${ControllerName}.show);
      router.post('/${tableName}', ${ControllerName}.store);
      router.put('/${tableName}/:id', ${ControllerName}.update);
      router.delete('/${tableName}/:id', ${ControllerName}.destroy);`;

    if (!routesContent.includes(`router.get('/${tableName}'`)) {
      routesContent += routesToAdd;

      if (!routesContent.includes('module.exports = router')) {
        routesContent += `\n\nmodule.exports = router;\n`;
      }

      fs.writeFileSync(routesPath, routesContent);
      console.log(`✅ REST routes for /${tableName} successfully added to app/routes/routes.js`);
    } else {
      console.log(`⚠️ REST routes for /${tableName} already exist in routes.js`);
    }
  });


program
  .command('generate:jwt controller <name>')
  .description('Generate a JWT-protected route')
  .action((name) => {
    const authTemplatePath = path.join(__dirname, 'templates/authJWT.js');
    const generateTemplatePath = path.join(__dirname, 'templates/generateJWT.js');

    const controllerName = name.charAt(0).toUpperCase() + name.slice(1);
    const replacements = {
      ControllerName: controllerName,
      tableName: name.toLowerCase()
    };

    const authContent = renderTemplate(authTemplatePath, replacements);
    const authOutputPath = path.join(projectRoot, 'app/middleware', 'authJWT.js');
    fs.writeFileSync(authOutputPath, authContent);

    // Renderiza generateJWT.js
    const generateContent = renderTemplate(generateTemplatePath, replacements);
    const generateOutputPath = path.join(projectRoot, 'app/middleware', 'generateJWT.js');
    fs.writeFileSync(generateOutputPath, generateContent);

    const routesToAdd = `
      router.get('/${replacements.tableName}', ${controllerName}.index);
      router.get('/${replacements.tableName}/:id', ${controllerName}.show);
      router.post('/${replacements.tableName}', ${controllerName}.store);
      router.put('/${replacements.tableName}/:id', ${controllerName}.update);
      router.delete('/${replacements.tableName}/:id', ${controllerName}.destroy);`;

    console.log('✅ JWT middleware and controller created with successfully!');
  });



program
  .command('generate:migration <name>')
  .description('Generates a migration using Knex')
  .action((name) => {
    const knexfilePath = path.join(projectRoot, 'knexfile.js');
    const cmd = `npx knex migrate:make ${name} --knexfile ${knexfilePath}`;
    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch (error) {
      console.error(`❌ Failed to generate migration: ${error.message}`);
    }
  });

program
  .command('migrate:rollback')
  .description('Generates a rollback migrate using knex')
  .action((name) => {
     const knexfilePath = path.join(projectRoot, 'knexfile.js');
     const cmd = `npx knex migrate:rollback`;
     try {
       execSync(cmd, { stdio: 'inherit'});
     } catch (error) {
       console.log(`Failed to rollback: ${error.message}`); 
     }
  });
program
  .command('migrate:last')
  .description('Runs the latest migration')
  .action(() => {
    const knexfilePath = path.join(projectRoot, 'knexfile.js');
    const cmd = `npx knex migrate:latest --knexfile ${knexfilePath}`;
    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch (error) {
      console.error(`❌ Migration failed: ${error.message}`);
    }
  });

program.parse();
