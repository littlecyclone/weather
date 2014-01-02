var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {
  switch(req.method){
  	case 'GET':
  	  if(req.url == '/'){
  	  	fs.readFile('index.html', 'UTF-8', function(err, data){
			  	if(err) {
			  		console.log(err);
			  	} else {
			  		res.writeHead(200, {'Content-Type': 'text/html'});
			  		res.end(data);
			  	}
  	    });
  	  } else {
				switch(path.extname(req.url)){
					case '.css' : 
					  fs.readFile(req.url.slice(1), 'UTF-8', function(err, data){
					  	res.writeHead(200, {'Content-Type': 'text/css'});
					  	res.end(data);
					  if(err) {
					  	console.log(err);
					  };
					  });
					break;
					case '.js' :
					  fs.readFile(req.url.slice(1), 'UTF-8', function(err, data){
					  	res.writeHead(200, {'Content-Type': 'application/javascript'});
					  	res.end(data);
					  });
					break;
					default:
					break;
				};
			};
		break;
	  default:
		  break;
  };
}).listen(8000);