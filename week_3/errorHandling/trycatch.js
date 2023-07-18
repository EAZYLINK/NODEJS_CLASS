const fs = require('fs')
const data = {
    name: "Joshua",
    message: 'Welcome to Node.js'
}

const asyncFunc = async(name, message)=>{
    try{
        const data = await fs.writeFile('data.json', JSON.stringify({name, message}))
        return data
    }
    catch(err){
        console.log(err.message)
    }
}

asyncFunc(data.name, data.message)