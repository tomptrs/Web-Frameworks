var express = require("express");
var bodyparser = require("body-parser");

var app = express();
app.use(bodyparser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

var User = require('./model/users');




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
    
    // get all the users
    User.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        console.log(users);
        res.json(users);
    });
});

app.get('/api/users/:naam', function(req, res) {

   
    console.log(req.params.naam);
   
    User.find({voornaam: req.params.naam}, function(err, users) {
        if (err) throw err;

        // object of all the users
        console.log(users);
        res.json(users);
    });
    
    
});


app.post("/api/users",function(req,res){

    console.log("Post received");
    console.log(req.body.naam);
    console.log(req.body.voornaam);

    var persoon = {"naam":req.body.naam,"voornaam":req.body.voornaam};
     res.json(persoon);
});


app.delete('/api/users/:voornaam', function(req, res) {
        User.remove({
            voornaam : req.params.voornaam
        }, function(err, todo) {
            if (err)
                res.send(err);
            // get and return all the todos after you create another
            User.find(function(err, users) {
                if (err)
                    res.send(err)
                res.json(users);
            });
        });
    });


app.listen(3000);