# Building a Node.js API

Start met het initializeren van je NodeJS Application met het commando:

### npm init

Dit commando initieert je NodeJS app, en maakt een package.json bestand aan.

{
  "name": "mytwitter",
  "version": "1.0.0",
  "description": "my twitter application",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [
    "twitter",
    "nodejs"
  ],
  "author": "Tom Peeters",
  "license": "ISC"
}

Het maken van een package.json file is het enigste wat je eigenlijk moet doen,
om van je directory een node project te maken.

Installeer express en bodyparser

npm install express --save
(--save zal een dependency in je package.json bestand bewaren)

npm install body-parser --save

# Maak je Express server

var express = require("express");
var bodyparser = require("body-parser");

var app= express();
app.use(bodyparser.json());

app.get("/api/posts",function(req,res){
	console.log("get posts");
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


## Uitleg
app.get("/api/posts",function(req,res){
	console.log("get posts");
	res.json([
		{
			username:"tom",
			body:"hallo!"
		}]);
});

Je kan browsen naar http://localhost:3000/api/posts en dan zal je een log message 
"get posts" zien.
We sturen ook JSON data terug. Deze manier van werken om een stubbed json bericht
terug te sturen, is ideaal voor development doeleinden. Zo zie je onmiddellijk dat 
je pad wel degelijk werkt.

### Posten van data

app.post("/api/posts",function(req,res){
	console.log("post bericht ontvangen");
	console.log(req.body.username);
	console.log(req.body.body);
	res.send(201);
});

in plaats van in je browser naar http://localhost:3000/api/posts te surfen gaan we
een post method sturen om data naar de server te sturen. Dergelijke methode kan je niet
via de browser testen, daarom installeren we de chrome extensie 'Postman'.
In de body schrijf je een json object:
{
 "username":"tom",
 "body":"test"
}

