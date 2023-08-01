import { createAccountService } from "../service/accountService.js";

export const createAccount = async(req, res)=>{
try {
    const {name, address} = req.body
    if (!name || !address) {
        res.status(400).json({Error: "All the fields are required"})
    }

    const newAccount = await createAccountService(req.body)
    res.status(200).json({
        message: "Account created successfully",
        newAccount
    })
} catch (error) {
    res.status(500).json({Error: "Internal server error!"})
}
}
