const fs = require('fs');
const path = require('path');
const glob = require('glob');

function extractMetadata(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Simplistic regex extraction - might be fragile but good enough for inventory
    const metadataMatch = content.match(/export const metadata: Metadata = ({[\s\S]+?};)/);
    
    if (!metadataMatch) return null;
    
    const metadataBlock = metadataMatch[1];
    
    // Extract fields
    const titleMatch = metadataBlock.match(/title:\s*['"`](.*?)['"`]/) || metadataBlock.match(/title:\s*{[\s\S]*?default:\s*['"`](.*?)['"`]/);
    const descMatch = metadataBlock.match(/description:\s*['"`]([\s\S]*?)['"`]/);
    
    // Keywords are tricky because they are an array
    let keywords = [];
    const keywordsMatch = metadataBlock.match(/keywords:\s*\[([\s\S]*?)\]/);
    if (keywordsMatch) {
         keywords = keywordsMatch[1]
            .split(',')
            .map(k => k.trim().replace(/['"`]/g, ''))
            .filter(k => k.length > 0);
    }

    // Determine route from file path
    let route = filePath.replace('app', '').replace('/page.tsx', '');
    if (route === '') route = '/';

    return {
        route,
        title: titleMatch ? titleMatch[1] : 'N/A',
        description: descMatch ? descMatch[1].replace(/\n/g, ' ').trim() : 'N/A',
        keywords: keywords
    };
}

// Find files
const files = glob.sync('app/**/page.tsx');
const inventory = [];

files.forEach(file => {
    const data = extractMetadata(file);
    if (data) {
        inventory.push(data);
    }
});

console.log(JSON.stringify(inventory, null, 2));
