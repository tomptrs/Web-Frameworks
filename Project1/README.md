# Project 1: Guess the number

## Model View Controller (MVC)

### Beschrijving componenten

- Model		: bewaren van de business data
- View 		: Voorstelling van de user interface
- Controller	: Verantwoordelijk voor de coordinatie tussen model en view

Elke verandering in het model wordt zichtbaar in de view en visa versa. De controller zorgt er 
eigenlijk voor dat beide in sync blijven. Ter verduidelijking bouwen we een "Raad het getal" applicatie.
We trachten het model eerst op te bouwen door naar de UI en het gedrag van de UI (button click,..) te kijken. Dit 
encapsuleren we in de controller.

### Requirements & Model
 * [Aanmaak van het random getal: bewaren we in de variabele "origineel"]
 * [Mogelijkheid om een getal te raden: bewaren we in de variabele "guess"]
 * [Bijhouden hoeveel keer je gegokt hebt: bewaren we in de variabele "aantalPogingen"]
 * [De gebruiker hints geven op basis van de inut: bewaren we in de variabele "afwijking"]
 * [Laten weten dat het getal: zit mee in de variabele afwijking]

### opbouw controller

Het gedrag van de View zit eigenlijk in de controller vervat. In AngularJS is de controller een klasse 
(een constructor functie) die het model bevat en heeft een constructie om de view aan zich te binden (dit wil zeggen 
als er iets verandert (bijvoorbeeld een click, of een wijziging in een input veld) de controller er automatisch weet 
van heeft. Dit noemen we databinding.

var app = angular.module("app", []);

app.controller("GuessTheNumberCtrl", function ($scope)
{
    $scope.verifyGuess = function ()
    {
        $scope.afwijking = $scope.origineel - $scope.guess;
        $scope.aantalPogingen = $scope.aantalPogingen + 1;
    }

    $scope.initialize = function ()
    {
        $scope.aantalPogingen = 0;
        $scope.origineel = Math.floor(Math.random() * 1000) + 1;
        $scope.guess = null;
        $scope.afwijking = null;
    }

    $scope.initialize();
});

Je merkt op dat de model data vervat zitten in de controller. Het $scope object wordt meegegeven met de controller 
als parameter en alle functies en parameters worden aan dit $scope object gebonden. Dit object zorgt voor de syncronisatie 
met de View.

<body ng-app="app">
    <div ng-controller="GuessTheNumberCtrl">
        <h1>Guess the number</h1>
        your guess: <input type="number" ng-model="guess" />
        <br />
        <button ng-click="verifyGuess()">Verify</button>
        <button ng-click="initialize()">Restart</button>


        <p ng-show="afwijking <0">Te hoog</p>
        <p ng-show="afwijking ==0">Juist!!!</p>
        <p ng-show="afwijking >0">Te laag!!</p>

        <p>Aantal gokken: {{aantalPogingen}}</p>
    </div>

</body>

Om Angular te "activeren" in je HTML View, zet je het attribuut (of directive) ng-app in de body. Dit attribuut zorgt 
ervoor dat alle html tags binnen de angular app kunnen fungeren. De "app" zorgt ervoor dat angular kijkt naar een module 
die "app" noemt.
We linken de controller aan de view door in de div-tag het attribuut ng-controller te gebruiken.
Dankzij angular kunnen we onze HTML-tags uitbreiden met bijvoorbeeld: ng-app, ng-controller, ng-model, ng-click, ng-show
, {{ }} , ...
{{ }} : noemen we ook interpolatie symbolen en de ng-* noemen we directives. Alle model eigenschappen en functies worden
toegewezen aan de interpolaties of directives.
Dus {{ aantalPogingen }} zit tussen de interpolatie en is zo gebonden aan de $scope.
Directives zijn speciale constructies (attributen) die de standaard HTML uitbreiden. Ze geven extra gedrag aan deze tags.
(Het is zelfs mogelijk om eigen directives te maken). In ons voorbeeld:
* ng-model: zorgt voor