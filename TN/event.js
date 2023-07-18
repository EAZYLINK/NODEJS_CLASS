const event = require('events')

const eventEmitter = new event.EventEmitter()

eventEmitter.on('sayHello', () => {
    console.log('Hello World')
}
)

eventEmitter.on('greeting', (name) => {
    console.log(`Hello ${name}`)
}
)

eventEmitter.emit('greeting', 'James')