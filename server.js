const http = require('http')
const path = require('path')
const url = require('url')
const fs = require("fs")
const port = process.env.PORT || 1339
const mime = {
		".html": "text/html",
		".css": "text/css"
}

const server = http.createServer()

server.on('request', (request, response) => {


	var uri = url.parse(request.url).pathname
	var filename = path.join(process.cwd(), uri)

	fs.exists(filename, function(exists){
		if (!exists) { console.log("404: " + filename); return ; }
		if (fs.statSync(filename).isDirectory()) { filename += '/index.html'; }

		fs.readFile(filename, "utf-8", function(err, file){

			// これがないと css が読みなかったりする
			const extname = path.extname(filename);

			response.writeHead(200, {'Content-Type': mime[extname]});
			response.write(file);
			response.end();
		});

	});

})
server.listen(port, 'localhost')
