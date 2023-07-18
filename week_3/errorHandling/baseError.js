// const fs = require('fs')
// const data = {
//     name: "Joshua",
//     message: 'Welcome to Node.js'
// }

// const asyncFunc = (name, message)=>{
//         const data = fs.writeFile('data.json', JSON.stringify({name, message}), (err)=>{
//             if(err){
//                 throw new Error("Unable to write data to file")
//             }
//         console.log("Data written to file")
// })
// }


// asyncFunc(data.name, data.message)

const error = new Error("You printed an error")
console.log(error.message)
