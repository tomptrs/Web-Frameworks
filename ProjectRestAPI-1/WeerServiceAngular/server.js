var express = require("express");
var body = require("body-parser");
var app = express();

var path = require('path');
app.use(express.static(__dirname + '/public'));  
 
app.use(body.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 /*app.get('*', function(req, res) {
      // res.sendFile('./public/weerbericht.html');// load the single view file (angular will handle the page changes on the front-end)
         res.sendFile( __dirname + "/public/" + "test.html" );
    });
*/

app.get("/api/vandaag",function(req,res)
{
	console.log("get weerbericht vandaag");
	res.json([
		{
			Beschrijving:"zonnige dag",
			Temperatuur:30
		}
	]);
});

app.get("/api/voorspelling",function(req,res)
{
	console.log("get voorspelling weerbericht ");
	res.json([
		{
			Beschrijving:"zonnige dag",
			Temperatuur:30
		},
		{
			Beschrijving:"regenachtige dag",
			Temperatuur:23
		},
		{
			Beschrijving:"storm",
			Temperatuur:10
		}
	]);
});

//PASS A VARIABLE
app.get('/api/voorspelling/:dagen', function(req,res)
{
	var queryBy = req.params.dagen;
    console.log("Get the data for " + queryBy);
});


app.listen(2222);
