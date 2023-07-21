const {createServer} = require('http');

const {createAccount, getAccounts, getAccountByEmail, editAccount, deleteAccount} = require('./account');
const {createNote, getNotes, getNoteById, editNote, deleteNoteById} = require('./note');

const server = createServer((req, res) => {
    url = req.url;
    method = req.method;
    headers = req.headers;
    parsedUrl = new URL(url, `http://${headers.host}`);
    path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    query = parsedUrl.searchParams;
 switch(method) {
    case 'POST':
        switch(path) {
            case 'account':
                createAccount(req, res);
                break;
            case 'note':
                createNote(req, res);
                break;
        };
        break;
    case 'GET':
        switch(path) {
            case 'account':
                if (query =='') {
                    getAccounts(req, res);
                } else
                    getAccountByEmail(req, res, query)
                break;
            case 'note':
                if (query =='') {
                    getNotes(req, res);
                } else
                    getNoteById(req, res, query)
                break;
        };
        break;
        case 'PUT':
            switch(path) {
                case 'account':
                    editAccount(req, res);
                    break;
                case 'note':
                    editNote(req, res);
                    break;
            };
            break;
        case 'DELETE':
            switch(path) {
                case 'account':
                    deleteAccount(req, res, query);
                    break;
                case 'note':
                    deleteNoteById(req, res, query);
            };
            break;
 }
});

port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    }
);