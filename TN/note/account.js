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
            fs.readFile('accounts.json', 'utf8', (err, acc) => {
                if(err) {
                    res.writeHead(500, {'Content-Type': 'application/json'})
                    return res.end(JSON.stringify({error: err}))
                }
                parsedAccounts = JSON.parse(acc.toString())
                parsedAccounts.push(account)
            fs.writeFile('accounts.json', JSON.stringify(parsedAccounts), (err) => {
                    if(err) {
                        res.writeHead(500, {'Content-Type': 'application/json'})
                        return res.end(JSON.stringify({error: 'Could not store data'}))
                    }
                    res.writeHead(201, {'Content-Type': 'application/json'});
                    return res.end(JSON.stringify({
                        message: 'Account created successfully',
                        account
                    }))
                })
            })
           
        })
}

exports.getAccount = (req, res) => {
    fs.readFile('accounts.json', 'utf8', (err, acc) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({message: 'Failed to readfile'}));
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
       res.end(JSON.stringify({
            message: 'Accounts retrieved successfully',
            accounts: JSON.parse(acc.toString())
        }));
    })
}

exports.getAccountByEmail = (req, res, query) => {
    email = query.toString().split('=')[1].replace('%40', '@')
    if(!email) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({error: 'Missing required fields'}))
    }
    fs.readFile('accounts.json', 'utf8', (err, data) => {
        if(err) {
            res.writeHead(500, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: 'Could not read data'}))
        }
        const parsedAccount = JSON.parse(data.toString())
        const account = parsedAccount.find((account) => account.email === email)
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
    fs.readFile('accounts.json', (err, accounts)=>{
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
    fs.writeFile('accounts.json', JSON.stringify(accounts), (err)=>{
        if (err){
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({error: "Unable to write file"}))
        }
    })
    res.end(JSON.stringify(`Account with email ${data.email} updated successfully`))
    })
    })
}

exports.deleteAccount = (req, res, query)=>{
    const email = query.toString().split('&')[0].split('=')[1].replace('%40', '@')
    const password = query.toString().split('&')[0].split('=')[1]
    if (!email || !password){
        res.writeHead(400, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({error: "Missing fields are required!"}))
    }
    fs.readFile('accounts.json', 'utf8', (err, accounts)=>{
        if (err){
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({error: "Unable to read file"}))
        }
        if (accounts.toString() === ''){
            res.writeHead(404, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: 'No accounts found'}))
        } 
        const parsedAccount = JSON.parse(accounts.toString())
        const account = parsedAccount.find((account)=> account.email === email)
        console.log(account)
    if (!account){
        res.writeHead(404, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({error: 'Account not found'}))
    }
    const filteredAccount = parsedAccount.filter((account)=> account.email !== email && account.password !== password)
    if (!filteredAccount) {
        res.writeHead(500, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({error: "Unable to delete account"}))
    }
    fs.writeFile('accounts.json', JSON.stringify(filteredAccount), (err)=>{
        if (err){
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({error: "Unable to write file"}))
        }
    })
    res.end(JSON.stringify(`Account with email ${email} deleted successfully`))
    })
}

