var express = require("express");
var bodyparser = require("body-parser");
var model = require("./Model/Message");

var app= express();
app.use(bodyparser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/posts",function(req,res){
	console.log("get posts");
	/*res.json([
		{
			username:"tom",
			body:"hallo!"
		}]);
	*/
		
		model.find(function(err,posts){
			if(err){return next(err);}
			res.json(posts);
		});
	
});

app.post("/api/posts",function(req,res){
	console.log("post bericht ontvangen");
	console.log(req.body.username);
	console.log(req.body.body);
	
	
	var bericht = new model({
		username: req.body.username,
		body: req.body.body
	});
	
	bericht.save(function(err){
		if(err){return next(err);}
		res.json(201,bericht);
		console.log("saved");
	});
});

app.listen(3000,function(){
	console.log("listening on 3000");
});
