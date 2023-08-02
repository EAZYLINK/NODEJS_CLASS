import { AccountModel } from "../model/accountModel.js"
import { generateAccountNo } from "./accountNoGen.js"

// create account service
export const createAccountService = async(data)=>{
    const accountNo = generateAccountNo()
    const newAccount = AccountModel.create({
        name: data.name,
        address: data.address,
        accountNo
    })
    // newAccount.save()

    return newAccount
}

// get all accounts service
export const getAllAccountsService = async()=>{
    const allAccounts = await AccountModel.find()
    return allAccounts
}

// get account by id service
export const getAccountByIdService = async(id)=>{
    const account = await AccountModel.findById(id)
    return account
}

// update account service
export const updateAccountService = async(id, data)=>{
    console.log(id, data)
    const updatedAccount = await AccountModel.findByIdAndUpdate(id, {
        name: data.name,
        address: data.address
    }, {new: true})
    return updatedAccount
}

// delete account service
export const deleteAccountService = async(id)=>{
    const deletedAccount = await AccountModel.findByIdAndDelete(id)
    return deletedAccount
}