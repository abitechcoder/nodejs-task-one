const http = require('http');
const fs = require('fs');
var qs = require('querystring');

const server = http.createServer(function(req, res){
    fs.readFile('index.html', function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        if (req.method == 'POST') {
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
                const POST = qs.parse(body);
                // use POST
                //console.log(POST.message)
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


