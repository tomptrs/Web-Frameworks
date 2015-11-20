var express = require("express");
var bodyparser = require("body-parser");

var app = express();
app.use(bodyparser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/users",function(req,res){

    var personen = [
        {
            "naam":"Peeters",
            "voornaam":"Tom"

        },
        {
            "naam":"Vandeperre",
            "voornaam": "Mieke"
        }
    ];

    res.json(personen);
});

app.post("/api/users",function(req,res){

    console.log("Post received");
    console.log(req.body.naam);
    console.log(req.body.voornaam);

    var persoon = {"naam":req.body.naam,"voornaam":req.body.voornaam};
     res.json(persoon);
});


app.listen(3000);