import express from 'express';
import { rentMoney, getAllRents, getRentById, updateRent, deleteRent } from '../controller/rentMoneyController.js';

export const rentRouter = express.Router();

rentRouter.route('/').post(rentMoney).get(getAllRents);
rentRouter.route('/:id').get(getRentById).patch(updateRent).delete(deleteRent);