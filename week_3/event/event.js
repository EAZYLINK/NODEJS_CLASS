const event = require('events')

const eventEmitter = new event.EventEmitter()

eventEmitter.on('greet', (name) => {
    console.log(`Hello ${name}, welcome to NodeJS class!`)
})

eventEmitter.addListener('add', (a, b) => {
    console.log(`The sum of ${a} and ${b} is ${a + b}`)
})

eventEmitter.emit('add', 5, 10)
eventEmitter.emit('add', 60, 10)
// console.log(eventEmitter.listenerCount())