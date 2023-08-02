import { RentModel } from "../model/rentModel.js";


const interestRate = 0.05

export const createRentService = async (amount, accountId) => {
    const rent = new RentModel({
        amount,
        interest: amount * interestRate,
        accountId,
        Total: amount + (amount * interestRate)
    })
    await rent.save()
    return rent     
}

export const getAllRentsService = async () => {
    const rents = await RentModel.find({})
    return rents
}

export const getRentByIdService = async (id) => {
    const rent = await RentModel.findById(id)
    return rent
}

export const updateRentService = async (id, amount) => {
    const rent = await RentModel.findById(id)
    rent.amount = amount
    rent.interest = amount * interestRate
    rent.Total = amount + (amount * interestRate)
    await rent.save()
    return rent
}

export const deleteRentService = async (id) => {
    const rent = await RentModel.findByIdAndDelete(id)
    return rent
}
