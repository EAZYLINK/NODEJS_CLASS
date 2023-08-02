import Express from 'express'
import {createAccount, getAllAccounts, getAccountById, updateAccount, deleteAccount} from '../controller/accountController.js';

export const accountRouter = Express.Router()

accountRouter.route('/').post(createAccount).get(getAllAccounts)
accountRouter.route('/:id').get(getAccountById).put(updateAccount).delete(deleteAccount)