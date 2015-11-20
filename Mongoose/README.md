# Mongoose


Dankzij Node.js en MongoDB en de mogelijkheid om JSON te versturen wordt deze
constructie (MEAN Stack) veel gebruikt in web development.
* MEAN Stack: MongoDB, Express, Node en AngularJS.

In vele applicaties is er nood aan CRUD: informatie creëeren (create), lezen (read)
update en delete.

Om dergelijke crud applicaties te bouwen maken we gebruik van de mongoose Node
package, en maken zo een RESTful API.

## Wat is Mongoose?
Mongoose is een object modeling package te vergelijken met een ORM (vb Linq to SQL,
Entity Framework).

Mongoose laat ons toe om op een simpele manier toegang naar de MongoDB commando's
te hebben.

## Installatie Mongoose

npm install mongoose --save

## Mongoose gebruiken

```html

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/mydb");

```
## Modellen maken

Vooraleer je crud operaties kan uitvoeren moeten er eerst mongoose modellen
aangemaakt worden. Deze modellen stellen documenten voor die bewaard, en opgehaald
kunnen worden.

Hiervoor stel je een mongoose schema op:

```html
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
	{
		naam: String,
		username: {
			type: String,
			required:true
		},
		paswoord: {
			type: String,
			required:true
		},
		created_at: Date


	
	});

	//Maak een model om het schema te kunnen gebruiken
var User = mongoose.model('User', userSchema);

module.exports = User;

```

Op deze manier wordt een schema gedefinieerd. Maak een mongoose variabele en 
mongoose schema aan, om vervolgens de attributen te definiëren op je userSchema.

De types die je kan gebruiken zijn de volgende:
- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array

Tenslotte maak je het model aan door mongoose.model.

## Gebruik maken van je model

### Save User

```html

var User = require('./Models/UserModel');



var tom = new User({
	
	naam: "Tom",

	username: "tom_ptrs",
	paswoord: "tom"

});



tom.save(function (err) {
	

	if (err) throw err;
	
console.log("user saved");

});
```

### Actie voor de save functie

We hebben ook een created_at attribuut gedefinieerd om te weten wanneer de record bewaard geweest is. We kunnen 
hiervoor bijvoorbeeld de pre methode van het schema gebruiken om operaties af te handelen vooraleer het object bewaard 
wordt.

```html
userSchema.pre("save", function (next) {

	var currentDate = new Date();
	this.created_at = currentDate;
	console.log("current date" + currentDate);
	next();
});

```


## Find data

```html

app.get("/api/users",function(req,res){

   
    // get all the users
    User.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        console.log(users);
        res.json(users);
    });
});

```


## Find One

De NodeJS server
```html
app.get('/api/users/:naam', function(req, res) {

   
    console.log(req.params.naam);
   
    User.find({voornaam: req.params.naam}, function(err, users) {
        if (err) throw err;
        // object of all the users
        console.log(users);
        res.json(users);
    });
});

```

Aanroepen in de Angular code:

```html

 $scope.findOneUser = function(){
               
                 $http.get("http://localhost:3000/api/users/" + $scope.naam)
                     .success(function(posts){
                        alert(posts[0].voornaam);
                        console.log(posts);
                    });
            
            };
            
            ```
