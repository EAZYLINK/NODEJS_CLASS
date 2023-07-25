const express = require('express');
const accountRouter = express.Router();
const { createAccount, getAccounts, getAccountById, deleteAccount, editAccount } = require('./accounts');

accountRouter.get('/', getAccounts)
accountRouter.post('/', createAccount)
accountRouter.get('/:id', getAccountById)
accountRouter.put('/', editAccount)
accountRouter.delete('/:id', deleteAccount)

module.exports = accountRouter;