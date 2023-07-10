const os = require('os');

const homeDir = os.homedir();
const cpu = os.cpus();

console.log(cpu);