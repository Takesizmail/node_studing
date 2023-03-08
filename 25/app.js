const http = require('http');
const fs = require('fs');

const reqListener = (req, res) => {
	const url = req.url;
	const method = req.method;

	if (url === '/') {
		res.write(' <html>')
		res.write(' <head><title> Form </title></head>')
		res.write(' <body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button></form> </body>')
		res.write(' </html>');
		return res.end();
	}
	if (url === '/message' && method === "POST") {
		const body = [];
		req.on('data', (chunk) => {
			console.log('chunk', chunk)
			body.push(chunk);
		})
		req.on('end', () => {
			const parsedData = Buffer.concat(body).toString();
			const message = parsedData.split('=')[1];
			fs.writeFileSync('message.txt', message);
		})
		res.statusCode = 302;
		res.setHeader("Location", '/');
		return res.end();
	}
	res.setHeader('Content-Type', 'text/html');
	res.write(' <html>')
	res.write(' <head><title> Hello title </title></head>')
	res.write(' <body> <h1>Hello world</h1> </body>')
	res.write(' </html>');
	res.end()
}

const server =  http.createServer(reqListener);
server.listen(8000)
