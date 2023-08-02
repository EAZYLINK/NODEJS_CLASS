import { 
    createAccountService, 
    getAccountByIdService, 
    getAllAccountsService, 
    updateAccountService, 
    deleteAccountService 
} from "../service/accountService.js";

// create account controller
export const createAccount = async(req, res)=>{
try {
    const {name, address} = req.body
    if (!name || !address) {
       return res.status(400).json({Error: "All the fields are required"})
    }

    const newAccount = await createAccountService(req.body)
    res.status(200).json({
        message: "Account created successfully",
        newAccount
    })
} catch (error) {
    res.status(500).json({Error: error.message})
}
}

// get all accounts controller
export const getAllAccounts = async(req, res)=>{
try {
    const allAccounts = await getAllAccountsService()
    res.status(200).json({
        message: "All accounts fetched successfully",
        allAccounts
    })
} catch (error) {
    res.status(500).json({Error: error.message})
}
}

// get account by id controller
export const getAccountById = async(req, res)=>{
try {
    const {id} = req.params
    if(!id) {
      return  res.status(400).json({Error: "Id is required"})
    }
    const account = await getAccountByIdService(id)
    if (!account) {
       return res.status(404).json({Error: "Account not found"})
    }
    res.status(200).json({
        message: "Account fetched successfully",
        account
    })
} catch (error) {
    res.status(500).json({Error: error.message})
}
}

// update account controller
export const updateAccount = async(req, res)=>{
try {
    const {id} = req.params
    if (!id) {
      return  res.status(400).json({Error: "Account ID is required"})
    }
    const account = await getAccountByIdService(id)
    if(!account) {
       return res.status(404).json({Error: "Account not found"})
    }
    const updatedAccount = await updateAccountService(id, req.body)
    res.status(200).json({
        message: "Account updated successfully",
        updatedAccount
    })
} catch (error) {
    res.status(500).json({Error: error.message})
}
}

// delete account controller
export const deleteAccount = async(req, res)=>{
try {
    const {id} = req.params
    if (!id) {
      return  res.status(400).json({Error: "Account ID is required"})
    }
    const account = await getAccountByIdService(id)
    if(!account) {
      return  res.status(404).json({Error: "Account not found"})
    }
    const deletedAccount = await deleteAccountService(id)
    res.status(200).json({
        message: "Account deleted successfully",
        deletedAccount
    })
} catch (error) {
    res.status(500).json({Error: error.message})
}
}
