const fs = require('fs');
const cuid = require('cuid');

exports.createAccount = async(req, res) => {
    try {
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
       const acc = await fs.readFileSync('accounts.json', 'utf8');
        const parsedAccount = JSON.parse(acc.toString());
            parsedAccount.push(account);
        await fs.writeFileSync('accounts.json', JSON.stringify(parsedAccount));
            res.status(201).json({
                    message: 'Account created successfully',
                    account
            }) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
 

exports.getAccounts = async(req, res) => {
try {
    const acc = await fs.readFileSync('accounts.json', 'utf8');
    res.status(200).json({
        message: 'Accounts retrieved successfully',
        accounts: JSON.parse(acc.toString())
})
} catch (error) {
    res.status(500).json({message: error.message})
}
}

exports.getAccountById = async(req, res, id) => {
    try {
        id = req.params.id;
    if (!id) {
        res.status(400).json({message: 'Please provide the User ID'})
    }
    const acc = await fs.readFileSync('accounts.json', 'utf8')
        parsedAccount = JSON.parse(acc.toString())
        const findAccount = parsedAccount.find((account) => account.userId === id)
        if (!findAccount) {
            res.status(404).json({message: 'Account not found'})
        }
        res.status(200).json({
            message: 'Account retrieved successfully',
            account: findAccount
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    } 
}

exports.editAccount = async(req, res)=>{
    try {
        console.log(req.body.firstName)
    const {userId} = req.body;
    if (!userId) {
        res.status(400).json({message: 'Please provide the User ID'})
    }
    const acc = await fs.readFileSync('accounts.json', 'utf8')
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
        await fs.writeFileSync('accounts.json', JSON.stringify(filteredAccount))
            res.status(201).json({
                message: 'Account updated successfully',
                account: findAccount
            })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.deleteAccount = async(req, res, id)=>{
    try {
        id = req.params.id;
    if (!id) {
        res.status(400).json({message: 'Please provide the User ID'})
    }
    const acc = await fs.readFileSync('accounts.json', 'utf8')
        parsedAccount = JSON.parse(acc.toString())
        if (!parsedAccount) {
            res.status(404).json({message: 'Account not found'})
        }
        const findAccount = parsedAccount.find((account)=> account.userId === id)
        if (!findAccount) {
            res.status(404).json({message: 'Account not found'})
        }
        const filteredAccount = parsedAccount.filter((account)=> account.userId !== id)
       await fs.writeFileSync('accounts.json', JSON.stringify(filteredAccount));
            res.status(201).json({
                message: 'Account deleted successfully'
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
