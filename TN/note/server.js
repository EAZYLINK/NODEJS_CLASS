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
    console.log(`url: ${parsedUrl} Query: ${query}`);
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
                    if (query==''){
                    getAccount(req, res);
                } else
                    getAccountByEmail(req, res, query);
                    break;
                case 'note':
                    if (query==''){
                     getNote(req, res);
                    } else
                    getNoteById(req, res, query);
                    break;
        };
        break;
        case 'PUT':
            switch(path){
                case 'account':
                    updateAccount(req, res);
                    break;
                case 'note':
                    updateNoteById(req, res);
                    break;
            };
        break;
        case 'DELETE':
            switch(path){
                case 'account':
                    deleteAccount(req, res, query);
                    break;
                case 'note':
                    deleteNoteById(req, res, query);
                    break;
        };
        break;
    }
});

const port = 1337;
server.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
}
);

