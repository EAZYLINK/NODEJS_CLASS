const event = require('events')

eventEmitter = new event.EventEmitter()

eventEmitter.addListener('add', (a, b)=>{
    console.log(`The sume of ${a} and ${b} is ${a+b}`)
})

eventEmitter.addListener('mul', (a, b)=>{
    console.log(`The product of ${a} and ${b} is ${a*b}`)
})

eventEmitter.addListener('sub', (a, b)=>{
    difference = a-b>0 ? a-b : b-a
    console.log(`The difference between ${a} and ${b} is ${difference}`)
})

eventEmitter.addListener('div', (a, b)=>{
    console.log(`The result of ${a} divided by ${b} is ${a/b}`)
})

exports.emiiter = (event, a, b)=>{
    eventEmitter.emit(event, a, b)
}