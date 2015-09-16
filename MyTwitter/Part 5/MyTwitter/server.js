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
