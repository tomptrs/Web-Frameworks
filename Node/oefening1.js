

var http = require("http");
var fs = require('fs');

http.createServer(function(req,res){	
	var responseData={};
	fs.readFile('data.csv', function (err, data) {  		  	
  		  	if (err) throw err;  		  	
  		  	var array = data.toString().split("\n");
    		for(i in array) {
    			var parts = array[i].split(',');
        		responseData[parts[0]] = parts[1];
    		}    		
	res.writeHead({
		"Content-Type":"application/json"
	});
		res.end(JSON.stringify(responseData));
	});
	
	
}).listen(3000);
