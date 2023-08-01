import Express from 'express'
import {createAccount} from '../controller/accountController.js';

export const accountRoute = Express.Router()

accountRoute.post("/", createAccount)