import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.join(__dirname, 'site');
const exts = ['.js', '.html', '.json', '.css'];

function safePrefix(content, pattern) {
    // Only add /ya-proto/ if not already present after the initial /
    return content.replace(pattern, (match, p1, p2, offset, string) => {
        // offset is the index where the match starts in the string
        // p1 is the quote, p2 is the path (e.g. public/)
        // Check if the next characters are already 'ya-proto/'
        const afterSlash = string.substr(offset + p1.length + 1, 8);
        if (afterSlash === 'ya-proto') return match;
        return `${p1}/ya-proto/${p2}`;
    });
}

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Patch /1/bundle/ references
    content = safePrefix(content, /(["'`])\/(1\/bundle\/)/g);
    // Patch /public/ references
    content = safePrefix(content, /(["'`])\/(public\/)/g);
    // Patch /assets/ references
    content = safePrefix(content, /(["'`])\/(assets\/)/g);
    // Patch /slds/ references
    content = safePrefix(content, /(["'`])\/(slds\/)/g);
    // Patch /favicon.ico
    content = safePrefix(content, /(["'`])\/(favicon\.ico)/g);
    // Patch /products.json
    content = safePrefix(content, /(["'`])\/(products\.json)/g);
    // Patch config: object keys and values (avoid double prefix)
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