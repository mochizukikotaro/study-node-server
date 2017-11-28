const http = require('http')
const path = require('path')
const url = require('url')
const fs = require("fs")
const port = process.env.PORT || 1339

const server = http.createServer()

server.on('request', (request, response) => {

	var uri = url.parse(request.url).pathname
	var filename = path.join(process.cwd(), uri)

	fs.exists(filename, function(exists){
		if (!exists) { console.log("404: " + filename); return ; }
		if (fs.statSync(filename).isDirectory()) { filename += '/index.html'; }

		fs.readFile(filename, "utf-8", function(err, file){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(file);
			response.end();
		});

	});

})
server.listen(port, 'localhost')
