var express = require("express");
var bodyparser = require("body-parser");

var app= express();
app.use(bodyparser.json());

app.get("/api/posts",function(req,res){
	console.log("get posts");
	res.json([
		{
			username:"tom",
			body:"hallo!"
		}]);
});

app.post("/api/posts",function(req,res){
	console.log("post bericht ontvangen");
	console.log(req.body.username);
	console.log(req.body.body);
	res.send(201);
});

app.listen(3000,function(){
	console.log("listening on 3000");
});
