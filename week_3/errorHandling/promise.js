const fs = require('fs');

const readFile = (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (err, data) => {
        if (err) reject(err.message);
        resolve(console.log("reading file"));
        });
    });
    }


    readFile('data.json')
    .then(() => readFile('data2.json'))
    .then(() => readFile('data3.json'))
    .catch((err) => console.log(err.message))
    .finally(() => console.log("All files read"));