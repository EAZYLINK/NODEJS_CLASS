import { AccountModel } from "../model/accountModel.js"
import { generateAccountNo } from "./accountNoGen.js"

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