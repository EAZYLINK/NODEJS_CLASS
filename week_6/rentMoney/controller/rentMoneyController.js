import { 
    createRentService, 
    getAllRentsService, 
    getRentByIdService, 
    updateRentService, 
    deleteRentService 
} from "../service/rentMoneyService.js";
import { getAccountByIdService } from "../service/accountService.js";


export const rentMoney = async (req, res) => {
    try {
        const { amount, accountId } = req.body
        if (!amount || !accountId) {
            return res.status(400).json({ error: 'Missing required fields: amount and accountId' })
        }
        const findAccount = await getAccountByIdService(accountId)
        if (!findAccount) {
            return res.status(404).json({ error: 'Account not found' })
        }
        const rent = await createRentService(amount, accountId)
        res.status(201).json({
            message: 'Rent created successfully',
            rent
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getAllRents = async (req, res) => {
    try {
        const rents = await getAllRentsService()
        res.status(200).json({
            message: 'Rents fetched successfully',
            rents
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getRentById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ Error: 'Please provide the rent ID as param'})
        }
        const rent = await getRentByIdService(id)
        if (!rent) {
            return res.status(404).json({ error: 'Rent not found' })
        }
        res.status(200).json({
            message: 'Rent fetched successfully',
            rent
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateRent = async (req, res) => {
    try {
        const { id } = req.params
        const { amount } = req.body
        if (!id) {
            return res.status(400).json({ error: 'Please provide the rent ID as param' })
        }
        if (!amount) {
            return res.status(400).json({ error: 'Please provide the amount as body' })
        }
        const findrent = await getRentByIdService(id)
        if (!findrent) {
            return res.status(404).json({ error: 'Rent with the given does not exit!' })
        }
        const rent = await updateRentService(id, amount)
        res.status(200).json({
            message: 'Rent updated successfully',
            rent
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
        
    }

export const deleteRent = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: 'Please provide the rent ID as param' })
        }
        const findrent = await getRentByIdService(id)
        if (!findrent) {
            return res.status(404).json({ error: 'Rent with the given does not exit!' })
        }
        const rent = await deleteRentService(id)
        res.status(200).json({
            message: 'Rent deleted successfully',
            rent
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}