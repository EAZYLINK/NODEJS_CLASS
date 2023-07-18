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
        console.log(acc.toString());
       res.end(JSON.stringify({
            message: 'Accounts retrieved successfully',
            accounts: JSON.parse(acc.toString())
        }));
    })
}
