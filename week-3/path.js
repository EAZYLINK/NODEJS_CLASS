const path = require('path');

const base = path.basename('module.js');
const dir = path.dirname('module.js');
const ext = path.extname('module.js');
const abs = path.resolve('module.js');
const isAbs = path.isAbsolute(abs);

const newPath = path.join(dir, 'file/', 'module.js');
const parse = path.parse(newPath);
console.log(parse);