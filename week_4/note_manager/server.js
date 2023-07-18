const {createServer} = require('http');

const {createAccount, getAccounts} = require('./account');

const server = createServer((req, res) => {
    url = req.url;
    method = req.method;
    headers = req.headers;
    parsedUrl = new URL(url, `http://${headers.host}`);
    pathname = parsedUrl.pathname;
    query = parsedUrl.searchParams;
switch (pathname) {
    case '/':
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({message: 'Welcome to the Note Manager API'}));
    case '/account':
        if (method === 'POST') {
            createAccount(req, res);
        }
        else if (method === 'GET') {
            getAccounts(req, res);
        }
        else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({message: 'Not Found'}));
        }
}
});

port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    }
);