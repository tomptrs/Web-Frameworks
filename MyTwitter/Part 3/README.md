# MongoDB & Mongoose


Interactie met MongoDB in je nodeJS app gebeurt met Mongoose package. Dit is een layer
bovenop de mongo driver.

npm install mongoose --save

Maak eerst een db.js bestand om de connectie tot stand te brengen:

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mytwitter",function(){
	console.log("connected with MongoDB");
});

module.exports = mongoose;

Je kan nu aan deze mongoose instantie door de require functie:
vb.: var db  = require("../db");

We maken ons Mongoose schema & model aan:

var db  = require("../db");

var Schema = db.Schema;

var berichtSchema = new Schema( {
	 username: String,
	 body: String,
 	created_at: Date

});

//Maak een model om het schema te kunnen gebruiken
var Bericht = db.model('messages', berichtSchema);

module.exports = Bericht;

En we gebruiken dit model in onze GET & POST endpoints, gedefinieerd in onze server.js:

var express = require("express");
var bodyparser = require("body-parser");
var model = require("./Model/Message");

var app= express();
app.use(bodyparser.json());

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
		res.json(201);
		console.log("saved");
	});
});

app.listen(3000,function(){
	console.log("listening on 3000");
});


