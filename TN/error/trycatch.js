const fs = require('fs')
try {
    const data = fs.readFile('text.txt')
    console.log(data)
} catch (error) {
    console.log({Error: error.message})
}