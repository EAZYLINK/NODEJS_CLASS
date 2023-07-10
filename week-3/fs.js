const fs = require('fs');

const writeFile = (file, data) => {
    fs.writeFile(file, data, (err) => {
          if (err) throw err;
          else console.log('Success!');
     })
    }

const appendFile = (file, data) => {
    fs.appendFile(file, data, (err) => {
        if (err) throw err;
        else console.log('Success!');
    })
}
appendFile('test.txt', 'appending next line!');