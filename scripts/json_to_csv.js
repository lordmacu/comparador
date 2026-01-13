const fs = require('fs');

const json = JSON.parse(fs.readFileSync('public/metadata_inventory.json', 'utf8'));

const csvHeader = 'Route,Title,Description,Keywords\n';
const csvRows = json.map(row => {
    const title = row.title.replace(/"/g, '""');
    const desc = row.description.replace(/"/g, '""');
    const keywords = row.keywords.join('; ').replace(/"/g, '""'); // Semicolon separate keywords within the CSV cell
    return `"${row.route}","${title}","${desc}","${keywords}"`;
});

fs.writeFileSync('public/metadata_inventory.csv', csvHeader + csvRows.join('\n'));
console.log('CSV created at public/metadata_inventory.csv');
