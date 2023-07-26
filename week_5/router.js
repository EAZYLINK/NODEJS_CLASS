const express = require('express');
const accountRouter = express.Router();
const noteRouter = express.Router();
const { createAccount, getAccounts, getAccountById, deleteAccount, editAccount } = require('./accounts');
const { createNote, getNotes, getNoteById, deleteNoteById, editNote } = require('./note');

accountRouter.get('/', getAccounts)
accountRouter.post('/', createAccount)
accountRouter.get('/:id', getAccountById)
accountRouter.put('/', editAccount)
accountRouter.delete('/:id', deleteAccount)

noteRouter.get('/', getNotes)
noteRouter.post('/', createNote)
noteRouter.get('/:id', getNoteById)
noteRouter.put('/', editNote)
noteRouter.delete('/:id', deleteNoteById)

module.exports = {
    accountRouter,
    noteRouter
};