# Angular routing

Single Pages zijn populair tegenwoordig omdat ze een gevoel van phone of tablet
applicaties geven. Met Angular kunnen we makkelijk single page apps ontwikkelen.

## Eerste Project

We maken een site met een home, about en contact pagina, met als doel
- Single Page App
- Geen page refresh wanneer we van home naar about of contact,.. navigeren
- Verschillende data per pagina

We zetten eerst een simpele AngularJS app op met view en controller.
Maak een script.js bestand aan met volgende code:

var app = angular.module('app');

app.controller('mainController', function ($scope) {

    // create a message to display in our view
    $scope.message = 'Hello View!';
});

En in je index.html bestand codeer je:

<!DOCTYPE html>
<html>
<head>
    <title></title>
	<meta charset="utf-8" />

    <script type="text/javascript" src="Scripts/angular.min.js"></script>
   
  <script type="text/javascript" src="script.js"></script>

</head>
<body ng-app="app">

    <div>
    <ul>
        <li><a href="#"> Home</a></li>
        <li><a href="#about"> About</a></li>
        <li><a href="#contact"> Contact</a></li>
    </ul>
     </div>   


    <div id="main" ng-controller="mainController">

        {{message}}

    </div>
</body>
</html>

Test je applicatie uit!

## Single Page App

Bij Single Page applications willen we geen page refreshes en daarom gebruiken we Angular's routing functionaliteit.

We gebruiken $routingProvider om onze routes te beschrijven, en deze service injecteert onze html bestanden in de layout

De code in onze script.js wordt nu:

var app = angular.module('app', ['ngRoute']);

/*
Bij Single Page applications willen we geen page refreshes en daarom gebruiken we Angular's routing functionaliteit.

We gebruiken $routingProvider om onze routes te beschrijven, en deze service injecteert onze html bestanden in de layout

*/
app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'Pages/home.html',
            controller: 'mainController'
        })

        // route for the about page
        .when('/about', {
            templateUrl: 'Pages/about.html',
            controller: 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl: 'Pages/contact.html',
            controller: 'contactController'
        });
});
// create the controller and inject Angular's $scope
app.controller('mainController', function ($scope) {

    // create a message to display in our view
    $scope.message = 'Hello View!';
});

app.controller('aboutController', function ($scope) {
    $scope.message = 'Look! I am an about page.';
});

app.controller('contactController', function ($scope) {
    $scope.message = 'Contact us!';
});

Bemerk dat bij het aanmaken van de app module de ng-Route injecteren!

De index.html file:

<!DOCTYPE html>
<html>
<head>
    <title></title>
	<meta charset="utf-8" />

    <script type="text/javascript" src="Scripts/angular.min.js"></script>
    <script type="text/javascript" src="Scripts/angular-route.min.js"></script>
    <script type="text/javascript" src="script.js"></script>

</head>
<body ng-app="app">

    <div>
    <ul>
        <li><a href="#"> Home</a></li>
        <li><a href="#about"> About</a></li>
        <li><a href="#contact"> Contact</a></li>
    </ul>
     </div>   


    <!-- MAIN CONTENT AND INJECTED VIEWS -->
    <div id="main">

        <!-- angular templating -->
        <!-- this is where content will be injected -->
        <div ng-view></div>
        {{message}}

    </div>
</body>
</html>

En de Pages in de Pages folder:
about.html:

<div>
    <h1>About</h1>

    <p>{{ message }}</p>
</div>

contact.html:

<div>
    <h1>Contact</h1>

    <p>{{ message }}</p>
</div>

home.html

<div >
    <h1>Home</h1>

    <p>{{ message }}</p>
</div>

Test je eerste SinglePage app uit!






