const fs = require('fs')

exports.createAccount = (req, res) => {
    let data = ''
    req.on('data', (chunk) => {
        data += chunk
    })
    req.on('end', ()=>{
        data = JSON.parse(data.toString())
        const account = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
        } 
        if(!account.firstName || !account.lastName || !account.email || !account.password) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: 'Missing required fields'}))
        }
            fs.readFile('account.json', (err, acc) => {
                if(err) {
                    res.writeHead(500, {'Content-Type': 'application/json'})
                    return res.end(JSON.stringify({error: err}))
                }
                parsedAccounts = JSON.parse(acc.toString())
                parsedAccounts.push(account)
            fs.writeFile('account.json', JSON.stringify(parsedAccounts), (err) => {
                    if(err) {
                        res.writeHead(500, {'Content-Type': 'application/json'})
                        return res.end(JSON.stringify({error: 'Could not store data'}))
                    }
                })
                    res.end(JSON.stringify({
                    statusCode: 201,
                    message: 'account created successfully'
                }))
            })
           
        })
}

exports.getAccount = (req, res) => {
    fs.readFile('account.json', (err, data) => {
        if(err) {
            res.writeHead(500, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: 'Could not read data'}))
        }
        if(data.toString() === '') {
            res.writeHead(404, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: 'No accounts found'}))
        }
        const accounts = JSON.parse(data.toString())
        res.end(JSON.stringify({
            statusCode: 200,
            message: 'accounts retrieved successfully',
            data: accounts
        }))
    })
}

exports.getAccountByEmail = (req, res, query) => {
    const email = query
    if(!email) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({error: 'Missing required fields'}))
    }
    fs.readFile('account.json', (err, data) => {
        if(err) {
            res.writeHead(500, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: 'Could not read data'}))
        }
        const accounts = JSON.parse(data)
        const account = accounts.find(account => account.email === email)
        if(!account) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: 'Account not found'}))
        }
        return res.end(JSON.stringify({
            statusCode: 200,
            message: 'account retrieved successfully',
            data: account
        }))
    })
}

exports.updateAccount = (req, res)=>{
    let data = ''
        req.on('data', (chunk)=>{
            data += chunk
        })
        req.on('end', ()=>{
        data = JSON.parse(data.toString())
        if (!data.firstName || !data.lastName || !data.email || !data.password){
            res.writeHead(400, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: "Missing fields are required!"}))
        }
        fs.readFile('account.json', (err, accounts)=>{
            if (err){
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({error: "Unable to read file"}))
            }
            if (accounts.toString() === ''){
                res.writeHead(404, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({error: 'No accounts found'}))
            }
        const parsedAccounts = JSON.parse(accounts.toString())
        const account = parsedAccounts.find((account)=> account.email === data.email && account.password === data.password)
        if (!account){
            res.writeHead(404, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: 'Account not found'})) 
        }
        accounts = parsedAccounts.filter(account=> account.email !== data.email || account.password !== data.password)
        accounts.push(data)
        console.log(accounts)
        fs.writeFile('account.json', JSON.stringify(accounts), (err)=>{
            if (err){
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({error: "Unable to write file"}))
            }
    })
    res.end(JSON.stringify(`Account with email ${data.email} updated successfully`))
    })
    })
}

exports.deleteAccount = (req, res, email, password)=>{
    if (!email || !password){
        res.writeHead(400, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({error: "Missing fields are required!"}))
    }
    req.on('end', ()=>{
    fs.readFile('account.json', (err, accounts)=>{
        if (err){
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({error: "Unable to read file"}))
        }
    const account = accounts.find(account=> account.email === data.email || account.password === data.password)
    if (!account){
        res.writeHead(404, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({error: 'Account not found'}))
    }
    updatedAccounts = accounts.filter(account=> account.email === data.email || account.password === data.password)
    fs.writeFile('account.json', JSON.stringify(updatedAccounts), (err)=>{
        if (err){
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({error: "Unable to write file"}))
        }
})
res.end(JSON.stringify(`Account with email ${data.email} deleted successfully`))
})
})
}

