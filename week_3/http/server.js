const http = require('http');

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' })
//     res.write('<h1>Hello World!</h1>')
//     res.end()
// })

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/json' })
    res.write(JSON.stringify({ message: 'Hello World!' }))
    res.end()
})

server.listen(3000, () => {
    console.log('Server is running on port 3000')
})