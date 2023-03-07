const http = require('http');

const reqListener = (req, res) => {

}

const server =  http.createServer(reqListener);
server.listen(8000)
