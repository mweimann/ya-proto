import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.join(__dirname, 'site');
const exts = ['.js', '.html', '.json', '.css'];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Patch all /1/bundle/ not already prefixed with /ya-proto/
    content = content.replace(/(["'`])\/1\/bundle\//g, '$1/ya-proto/1/bundle/');
    content = content.replace(/([^/])\/1\/bundle\//g, '$1/ya-proto/1/bundle/');
    // Patch all /public/ not already prefixed
    content = content.replace(/(["'`])\/public\//g, '$1/ya-proto/public/');
    content = content.replace(/([^/])\/public\//g, '$1/ya-proto/public/');
    // Patch all /assets/ not already prefixed
    content = content.replace(/(["'`])\/assets\//g, '$1/ya-proto/assets/');
    content = content.replace(/([^/])\/assets\//g, '$1/ya-proto/assets/');
    // Patch favicon.ico
    content = content.replace(/(["'`])\/favicon\.ico/g, '$1/ya-proto/favicon.ico');
    // Patch all /slds/ not already prefixed
    content = content.replace(/(["'`])\/slds\//g, '$1/ya-proto/slds/');
    content = content.replace(/([^/])\/slds\//g, '$1/ya-proto/slds/');
    // Patch all /products.json not already prefixed
    content = content.replace(/(["'`])\/products\.json/g, '$1/ya-proto/products.json');
    // Patch config: object keys and values
    content = content.replace(/(\{\s*|,\s*)"\/(?!ya-proto)([\w@\-./%]+)"/g, '$1"/ya-proto/$2"');
    content = content.replace(/(["'`])\/(?!ya-proto)([\w@\-./%]+)(["'`])/g, '$1/ya-proto/$2$3');
    // Patch LWR environment variables to set base paths to '/ya-proto'
    content = content.replace(/("basePath"\s*:\s*")""/g, '$1/ya-proto"');
    content = content.replace(/("assetBasePath"\s*:\s*")""/g, '$1/ya-proto"');
    content = content.replace(/("uiBasePath"\s*:\s*")""/g, '$1/ya-proto"');
    content = content.replace(/basePath"\s*:\s*""/g, 'basePath":"/ya-proto"');
    content = content.replace(/assetBasePath"\s*:\s*""/g, 'assetBasePath":"/ya-proto"');
    content = content.replace(/uiBasePath"\s*:\s*""/g, 'uiBasePath":"/ya-proto"');
    fs.writeFileSync(filePath, content);
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (exts.includes(path.extname(file))) {
            processFile(filePath);
        }
    });
}

walkDir(buildDir);
console.log('Post-processing complete.'); 