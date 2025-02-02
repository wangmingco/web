const fs = require('fs');
const path = require('path');
console.log("Arguments:", process.argv.slice(2));

const cnameContent = 'www.vc89.online';

const cnamePath = path.resolve(__dirname, '../dist/CNAME');
fs.writeFileSync(cnamePath, cnameContent);