# Opkuis bestanden

We gaan met routes werken in onze server.js Node web server:

		
Maak een directory "Routes" aan, en update je routes naar:
app.use("/berichten", routeBerichten); , 

###Code:
var express = require("express");
var bodyparser = require("body-parser");
var routeBerichten = require("./Routes/Berichten");

var app= express();
app.use(bodyparser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use("/berichten", routeBerichten);


app.listen(3000,function(){
	console.log("listening on 3000");
});


In de folder Routes maak je een bestan berichten.js aan:

var model = require("../Model/Message");
var router = require("express").Router();


router.get("/api/posts",function(req,res){
	console.log("get posts");
			
		model.find(function(err,posts){
			if(err){return next(err);}
			res.json(posts);
		});
	
});

router.post("/api/posts",function(req,res){
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


module.exports = router;