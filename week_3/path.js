const path = require('path');

const base = path.basename('module.js'); // module.js
const dir = path.dirname('module.js'); // .
const ext = path.extname('module.js'); // .js
const abs = path.resolve('module.js'); // C:\Users\user\Documents\GitHub\NodeJS\week_3\module.js
const isAbs = path.isAbsolute(abs); // true

const newPath = path.join(dir, 'file/', 'module.js'); // .\file\module.js
console.log(newPath);