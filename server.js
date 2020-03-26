// included the http, filesystem and querystring module
const http = require('http');
const fs = require('fs');
var qs = require('querystring');

// created the server
const server = http.createServer(function(req, res){
    // reading the index.html with the filesystem module fs
    fs.readFile('index.html', function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
    // sending the data to the browser after reading
        res.write(data);
    // checks if the request method is a post method
        if (req.method == 'POST') {
    // creates a body variable to store the string format of the html form
            var body = '';
            req.on('data', function (data) {
                body += data;
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6) { 
                    // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
                    request.connection.destroy();
                }
            });
            req.on('end', function () {
                // using the querystring to parse the body string into the created Post variable
                const POST = qs.parse(body);
                // writing the value of the input named message into the file message.txt
                // using the filesystem method writefile
                fs.writeFile('message.txt', `${POST.message}`, function (err) {
                    if (err) throw err;
                    console.log('File Saved!');
                  });
            });
        }
        res.end();
    })
});

server.listen(8080, function(){
    console.log("\nThe Server is live on: http://localhost:8080");
})


