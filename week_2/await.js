const fs = require('fs');
// Description: A simple async/await example.
// const writeFile = (file, data) => new Promise((resolve, reject) => {
//     fs.writeFile(file, data, (err) => {
//         if (err) reject(err);
//         else resolve(console.log('Success!'));
//     });
//     }
// );

// const readFile = (file) => new Promise((resolve, reject) => {
//     fs.readFile(file, (err, data) => {
//         if (err) reject(console.log('An error occurred.'));
//         else resolve(console.log(data.toString()));
//     });
//     }
// );

// readFile('tes.txt')

const writeFile = (file, data) => {
   fs.writeFile(file, data, (err) => {
        if (err) throw err;
        else console.log('Success!');
    })
};

writeFile('tes.txt', 'New async!');