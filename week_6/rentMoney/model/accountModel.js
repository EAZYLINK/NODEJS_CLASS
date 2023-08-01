import { Schema, model } from "mongoose"


const accountSchema = new Schema({
    name: {
        type: String, 
        required: 
        true
    },
    address: {
        type: String, 
        required: true},
    accountNo: {
        type: Number, 
        required: true, 
        unique: true, 
        index: true}
}, {timestamps: true})


export const AccountModel = model('account', accountSchema)