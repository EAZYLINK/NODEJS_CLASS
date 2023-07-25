const fs = require('fs');
const cuid = require('cuid');

exports.createAccount = (req, res) => {
const {lastName, firstName, email, password} = req.body;

        const account = {
            userId: cuid(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
            updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        }
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({message: 'Please provide all fields'})
        }
        fs.readFile('accounts.json', 'utf8', (err, acc) => {
            if (err) {
                res.status(500).json({message: 'Internal Server Error'})
            }
        const parsedAccount = JSON.parse(acc.toString());
            parsedAccount.push(account);
            fs.writeFile('accounts.json', JSON.stringify(parsedAccount), err => {
                if (err) {
                    res.status(500).json({message: 'Internal Server Error'})
                }
                res.status(201).json({
                    message: 'Account created successfully',
                    account
            })
        })
})
}

exports.getAccounts = (req, res) => {
    fs.readFile('accounts.json', 'utf8', (err, acc) => {
        if (err) {
            res.status(500).json({message: 'Internal Server Error'})
        }
        res.status(200).json({
            message: 'Accounts retrieved successfully',
            accounts: JSON.parse(acc.toString())
    })
})
}

exports.getAccountById = (req, res, id) => {
    id = req.params.id;
    if (!id) {
        res.status(400).json({message: 'Please provide the User ID'})
    }
    fs.readFile('accounts.json', 'utf8', (err, acc)=>{
        if (err) {
            res.status(500).json({message: 'Internal Server Error'})
        }
        parsedAccount = JSON.parse(acc.toString())
        const findAccount = parsedAccount.find((account) => account.userId === id)
        if (!findAccount) {
            res.status(404).json({message: 'Account not found'})
        }
            res.status(200).json({
                message: 'Account retrieved successfully',
                account: findAccount
    })
})
}

exports.editAccount = (req, res)=>{
    console.log(req.body.firstName)
    const {userId} = req.body;
    if (!userId) {
        res.status(400).json({message: 'Please provide the User ID'})
    }
    fs.readFile('accounts.json', 'utf8', (err, acc)=>{
        if (err) {
            res.status(500).json({message: 'Internal Server Error'})
        }
        parsedAccount = JSON.parse(acc.toString())
        if (!parsedAccount) {
            res.status(404).json({message: 'Account not found'}) 
        }
        const findAccount = parsedAccount.find((account)=> account.userId === userId)
        if (!findAccount) {
           res.status(404).json({message: 'Account not found'})
        }
        const filteredAccount = parsedAccount.filter((account)=> account.userId !== userId)
        req.body.firstName != undefined? findAccount.firstName = req.body.firstName: findAccount.firstName = findAccount.firstName
        req.body.lastName !== undefined? findAccount.lastName = req.body.lastName: findAccount.lastName = findAccount.lastName
        req.body.email !== undefined? findAccount.email = req.body.email: findAccount.email = findAccount.email
        req.body.password !== undefined? findAccount.password = req.body.password: findAccount.password = findAccount.password
        findAccount.updatedAt = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        filteredAccount.push(findAccount)
        fs.writeFile('accounts.json', JSON.stringify(filteredAccount), err => {
            if (err) {
                res.status(500).json({message: 'Internal Server Error'})
            }
            res.status(201).json({
                message: 'Account updated successfully',
                account: findAccount
            })
        })
    })
}

exports.deleteAccount = (req, res, id)=>{
    id = req.params.id;
    if (!id) {
        res.status(400).json({message: 'Please provide the User ID'})
    }
    fs.readFile('accounts.json', 'utf8', (err, acc)=>{
        if (err) {
            res.status(500).json({message: 'Internal Server Error'})
        }
        parsedAccount = JSON.parse(acc.toString())
        if (!parsedAccount) {
            res.status(404).json({message: 'Account not found'})
        }
        const findAccount = parsedAccount.find((account)=> account.userId === id)
        if (!findAccount) {
            res.status(404).json({message: 'Account not found'})
        }
        const filteredAccount = parsedAccount.filter((account)=> account.userId !== id)
        fs.writeFile('accounts.json', JSON.stringify(filteredAccount), err => {
            if (err) {
                res.status(500).json({message: 'Internal Server Error'})
            }
            res.status(201).json({
                message: 'Account deleted successfully'
        })
    })
})
}
