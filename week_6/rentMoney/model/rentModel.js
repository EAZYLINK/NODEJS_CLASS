import { Schema, model } from "mongoose"


const rentSchema = new Schema({
    accountNumber: {
        type: Number,
        required: true,
    },
    interest: {
        type: Number, 
        required: true
    },
    paid: {
        type: Boolean,
        default: false,
        required: true
    },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'account',
        required: true
    }
}, {timestamps: true})


export const RentModel = model('rent', rentSchema)