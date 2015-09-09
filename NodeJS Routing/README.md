# NodeJS Routing


Routing is het vastleggen van eindpunten (URI's) en de verwerking van client
requests.

Een route is een combinatie van een URI, HTTP request method (GET, POST, ...) en 
één of meerdere handlers voor dit eindpunt.

## Structuur

app.METHOD(path,[callback],callback)

app is een instantie van express, method is een HTTP request method, path is
een pad op de server en callback is een functie die wordt uitgevoerd wanneer
de route overeenkomt.

Bijvoorbeeld:

var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
	res.send('hello world');
});

app.listen(3000, function () {
	
	console.log("Listening at 3000");
});

Een route methode is afgeleid van één van de HTTP methodes en opgeroepen op
een instantie van express

Bijvoorbeeld een POST methode:

// POST method route
app.post('/', function (req, res) {
	res.send('POST request to the homepage');
});


## Route paths

Een route path, in combinatie met een request methode definieert de eindpunten van de requests. Deze kunnen bijvoorbeeld strings zijn.

Bijvoorbeeld:

// will match request to the root
app.get('/', function (req, res) {
  res.send('root');
});

// will match requests to /about
app.get('/about', function (req, res) {
  res.send('about');
});

// will match request to /random
app.get('/random', function (req, res) {
  res.send('random');
});


Een route kan meer callback functies afhandelen:


app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});


Een route kan een array van callback functies afhandelen:

var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);



## Response methods

Response methods:


Method		Description
res.download()	Prompt a file to be downloaded.
res.end()	End the response process.
res.json()	Send a JSON response.
res.jsonp()	Send a JSON response with JSONP support.
res.redirect()	Redirect a request.
res.render()	Render a view template.
res.send()	Send a response of various types.
res.sendFile	Send a file as an octet stream.
res.sendStatus()	Set the response status code and send its string representation as the response body.


## Chainable route handlers

Door app.route() kunnen we een ketting van handlers vormen. De path blijft
hetzelfde maar de method is anders:

app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

Via de chrome extensie postman kunnen we de post testen


## express router

Via de Router klasse kunnen een modulair route handler systeem bouwen.

Onderstaand voorbeeld maakt een router aan en definieert enkele routes en 
voegt dit toe aan de main app:

Maak een nieuw javascript bestand gebruikers.js aan met onderstaande code:

var express = require('express');
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});
// define the home page route
router.get('/', function (req, res) {
	res.send('gebruikers home page');
});
// define the about route
router.get('/about', function (req, res) {
	res.send('About gebruikers');
});

router.post('/post', function (req, res) {
	res.send('Post een gebruiker');
});

module.exports = router;

In je main node bestand:

var gebruikers = require('./gebruikers.js');

app.use('/gebruikers', gebruikers);






