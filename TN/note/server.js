const {createServer} = require('http');
const {
    createAccount,
    getAccount,
    getAccountByEmail,
    updateAccount,
    deleteAccount
} = require('./account');

const {
    createNote,
    getNote,
    getNoteById
} = require('./note');

const server = createServer((req, res) => {
    url = req.url;
    method = req.method;
    headers = req.headers;
    parsedUrl = new URL(url, `http://${headers.host}`);
    path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    query = parsedUrl.searchParams;
    console.log(`Path: ${path}, Method: ${method}, Query: ${query}`);
    switch(method) {
        case 'POST':
            switch(path) {
                case 'account':
                    createAccount(req, res);
                    break;
                case 'note':
                    createNote(req, res);
                    break;
            }
        case 'GET':
            switch(path) {
                case 'account':
                    getAccount(req, res);
                    break;
                case 'account/:email':
                    getAccountByEmail(req, res, query);
                    break;
                case 'note':
                     getNote(req, res);
                    break;
                case 'note/:id':
                    getNoteById(req, res, query);
                    break;
        }
        case 'PUT':
            switch(path){
                case 'account':
                    updateAccount(req, res);
                    break;
                case 'note':
                    updateNoteById(req, res);
                    break;
            }
        case 'DELETE':
            switch(path){
                case 'account/:email&:password':
                    deleteAccount(req, res, query);
                    break;
                case 'note/:id':
                    deleteNoteById(req, res, query);
                    break;
    }
    
    }
});

const port = 1337;
server.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
}
);

