const fs = require('fs');
const path = require('path');

const dirs = [
  'src/assets',
  'src/components/layout',
  'src/components/common',
  'src/components/booking',
  'src/components/services',
  'src/components/dashboard',
  'src/pages/customer',
  'src/pages/admin',
  'src/data',
  'src/context',
  'src/hooks',
  'src/utils'
];

dirs.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});
console.log("Directories created.");
