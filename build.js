const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const cssPath = path.join(__dirname, 'style.css');
const jsPath = path.join(__dirname, 'script.js');
const talksDataPath = path.join(__dirname, 'talks.js');
const outputPath = path.join(__dirname, 'index.html');

// Read files
const templateHtml = fs.readFileSync(templatePath, 'utf8');
const styleCss = fs.readFileSync(cssPath, 'utf8');
const scriptJs = fs.readFileSync(jsPath, 'utf8');
const talksJs = fs.readFileSync(talksDataPath, 'utf8');

// Inject content into the template
let outputHtml = templateHtml
    .replace('<style id="main-css"></style>', `<style>${styleCss}</style>`)
    .replace('<script id="talks-data"></script>', `<script>${talksJs}</script>`)
    .replace('<script id="main-script"></script>', `<script>${scriptJs}</script>`);

// Write the final index.html file
fs.writeFileSync(outputPath, outputHtml, 'utf8');

console.log('Successfully compiled website to index.html');
