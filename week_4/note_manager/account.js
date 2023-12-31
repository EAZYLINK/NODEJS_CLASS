const fs = require('fs');

exports.createAccount = (req, res) => {
    let data = ''
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        data = JSON.parse(data);
        const account = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
        }
        if (!account.firstName || !account.lastName || !account.email || !account.password) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({message: 'Please provide all fields'}));
        }
        fs.readFile('accounts.json', 'utf8', (err, acc) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({message: 'Internal Server Error'}));
            }
            parsedAccount = JSON.parse(acc.toString());
            parsedAccount.push(account);
            fs.writeFile('accounts.json', JSON.stringify(parsedAccount), err => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    return res.end(JSON.stringify({message: 'Internal Server Error'}));
                }
                res.writeHead(201, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({
                    message: 'Account created successfully',
                    account
                }));
            })
        })
})
}

exports.getAccounts = (req, res) => {
    fs.readFile('accounts.json', 'utf8', (err, acc) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({message: 'Internal Server Error'}));
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
    if (!email) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({error: "email param is required"}))
    }
    fs.readFile('accounts.json', 'utf8', (err, acc)=>{
        if (err) {
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({error: "unable to read file"})) 
        }
        parsedAccount = JSON.parse(acc.toString())
        const findAccount = parsedAccount.find((account) => account.email === email)
        if (!findAccount) {
            res.writeHead(404, {'Content-Type': 'application/json'})
           return res.end(JSON.stringify({error: "account with this email not found"}))
        }
            res.end(JSON.stringify({
            statusCode: 200,
            message: "Account retrieved successfully",
            account: findAccount
        }))
    })
}

exports.editAccount = (req, res)=>{
    data = ''
    req.on('data', (chunk)=>{
        data += chunk
    })
    req.on('end', ()=>{
        data = JSON.parse(data.toString())
        if (!data.firstName || !data.lastName || !data.email || !data.password) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({message: 'Please provide all fields'}));
        }
        fs.readFile('accounts.json', 'utf8', (err, acc)=>{
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({error: "unable to read file"})) 
            }
            parsedAccount = JSON.parse(acc.toString())
            if (!parsedAccount) {
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({error: "No account found"})) 
            }
            const findAccount = parsedAccount.find((account)=> account.email === data.email && account.password === data.password)
            if (!findAccount) {
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({error: "No account found"}))
            }
            const filteredAccount = parsedAccount.filter((account)=> account.email !== data.email || account.password !== data.password)
            filteredAccount.push(data)
            fs.writeFile('accounts.json', JSON.stringify(filteredAccount), err => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    return res.end(JSON.stringify({message: 'Internal Server Error'}));
                }
                res.writeHead(201, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({
                    message: 'Account updated successfully',
                    account: data
                }));
            })
        })
    })
}

exports.deleteAccount = (req, res, query)=>{
    const   email = query.toString().split('&')[0].split('=')[1].replace('%40', '@')
    const  password = query.toString().split('&')[1].split('=')[1]

    if (!email || !password) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({message: 'Email and password are required as query params'}));
    }
    fs.readFile('accounts.json', 'utf8', (err, acc)=>{
        if (err) {
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({error: "unable to read file"})) 
        }
        parsedAccount = JSON.parse(acc.toString())
        if (!parsedAccount) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({error: "No account found"})) 
        }
        const findAccount = parsedAccount.find((account)=> account.email === email && account.password === password)
        if (!findAccount) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({error: "No account found"}))
        }
        const filteredAccount = parsedAccount.filter((account)=> account.email !== email || account.password !== password)
        fs.writeFile('accounts.json', JSON.stringify(filteredAccount), err => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({message: 'Internal Server Error'}));
            }
            res.writeHead(201, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({
                message: 'Account deleted successfully'
            }));
        })
    })
}

