# Project 2: WorkOut App

## Requirements

Deze workout app is een planning voor fitness oefeningen om binnen de 5 minuten 10 oefeningen achtereenvolgens uit te 
voeren. Dus we moeten 10 oefeningen voorzien waarbij elke oefening 30 seconden duurt, gevolgd door een rust periode. Na
de rust wordt automatisch de volgende oefening gestart.

* De workout starten
* Voorzie step-by-step instructies hoe men de oefening moet uitvoeren
* Een timer om te kijken hoeveel tijd nog rest voor de oefening
* Notificatie aan de gebruiker wanneer de oefening gedaan is, en automatisch naar de volgende oefening overgaan


Om de juiste taal te spreken is een workout een serie oefeningen uitgevoerd in een bepaalde volgorde met een bepaalde 
tijdsduur.

Een oefening heeft:
* Naam
* Titel (aan de gebruiker getoond)
* Beschrijving
* Instructies

## Model

Uit de requirements halen we ons model maken:

function Oefening(args) {
    this.naam = args.naam;
    this.titel = args.titel;
    this.beschrijving = args.beschrijving;
}


function WorkOutPlan(args) {
    this.naam = args.naam;
    this.oefeningen = [];
    this.titel = args.titel;
    this.RustTussenOefeningen = args.RustTussenOefeningen;
}

(Eigenlijk hebben we in deze oefening misschien geen WorkOutPlan nodig, omdat we maar 1 workoutplan implementeren 
met daarin enkele oefeningen, dus hebben we met de klasse Oefening meer dan genoeg. Maar voor de toekomst kunnen we
het met de klasse WorkOutPlan makkelijker uitbreiden met nieuwe plannen en oefeningen.

We starten met onze app.js file als onze hoofdmodule, maar maken hier ook een tweede module aan "workout" om ons 
programma overzichtelijker te maken:

1. angular.module("app", ["workout"]);
2. angular.module("workout", []);

In regel 1 maken we gebruik van de constructie , ["workout"] wat een dependency injection is.

## Bouwen van de workout controller

Welke functionaliteit moet de controller bevatten? Allereerst moeten we een workout kunnen starten. Nadat een oefening
uit het workoutplan gedaan is moet de volgende oefening opgestart kunnen worden (na elke oefening voorzien we een
rust periode!). En dit proces moet herhaald worden zolang er oefeningen in het workout plan zitten. 

Maak een javascript bestand: workout.js

angular.module("workout").controller("WorkOutCtrl",['$scope', function ($scope)
{
    var rustOefening;
    var workoutPlan;

    var init = function ()
    {       
        console.log("init functie");
        startWorkOut();
    }

In de init functie starten we de startWorkOut. Hier gaan we eerst een workoutplan aanmaken en uiteindelijk dit plan
met hierin de oefeningen te starten.

### startWorkOut

 var startWorkOut = function ()
    {
        workoutPlan = CreateWorkOut();
        console.log(workoutPlan is aangemaakt);
        rustOefening =
            {
                details: new Oefening({
                    naam: "Rust",
                    beschrijving: "Rust een beetje",
                    titel: "Rust!"
                }),
                duration: 10
            };

        
        //Start Oefening
        startOefeningen(workoutPlan.oefeningen.shift());
    }

Je merkt dat in de startWorkOut ook een rustOefening object wordt aangemaakt. Meer info hoe dit object wordt
aangemaakt op: https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Operators/Object_initializer.

Op het einde van de functie wordt de functie startOefeningen opgeroepen met als argument:workoutPlan.oefeningen.shift().
De shift methode op een array zal het eerste item uit de array verwijderen en dit item retourneren.

Ter info:
Een object kan als volgt aangemaakt worden:
obj = {} . Dit is een leeg object
obj2 = 
{
 naam: "Peeters",
 voornaam: "Tom"
}

obj3 = 
{
 naam:"peeters",
 adres:{
	straat: "test",
	woonplaats:"test"
	}
}

### CreateWorkOut

 var CreateWorkOut = function ()
    {
        console.log("create workout");
        var workout = new WorkOutPlan(
            {
                naam: "5min workout",
                titel : "5 minute workout",
                RustTussenOefeningen: 10
            });

        workout.oefeningen.push(
            {
                details: new Oefening(
                    {
                        naam: "oef 1 springen",
                        titel: "oef 1: springen",
                        beschrijving: "spring constant"
                    }),
                duration: 10
            },
            
             {
                 details: new Oefening(
                     {
                         naam: "oef 2 pompen",
                         titel: "oef 2: pompen",
                         beschrijving: "pomp constant"
                     }),
                 duration: 10
             });
        console.log(workout);
        return workout;
    }

In de CreateWorkOut instantiëren we een nieuw object van WorkOutPlan: var workout = new WorkOutPlan()
Als we naar de constructor kijken zien we dat we hierin een array van oefeningen inbrengen:

function WorkOutPlan(args) {
    this.naam = args.naam;
    this.oefeningen = [];
    this.titel = args.titel;
    this.RustTussenOefeningen = args.RustTussenOefeningen;
}

Met de push methode brengen we nieuwe oefeningen in.

### startoefening
 var startOefeningen = function (oefening) {
        console.log("start oefeningen")

        $scope.huidigeOefening = oefening;
        $scope.huidigOefeningDuration = 0;      
       
    };

Niet alle properties moeten aan het $scope object gehangen worden, enkel deze die in de View getoond worden.

We kunnen de view aanmaken om te testen of we werkelijk de eerste oefening te zien krijgen:

### de view - part 1.

<body ng-app="app">
    <div >
        <div >
            <div>
                <h1>7 Minute Workout</h1>
            </div>
        </div>
    </div>
    <div>
       

        <div ng-controller="WorkOutCtrl">
            <pre>Huidige Oefening: {{huidigeOefening.details | json}}</pre>
            <pre>Time Left: {{huidigOefeningDuration}}</pre>
        </div>
      
    </div>
</body>
    </div>
    <div>
       

        <div ng-controller="WorkOutCtrl">
            <pre>Huidige Oefening: {{huidigeOefening.details | json}}</pre>
            <pre>Time Left: {{huidigOefeningDuration}}</pre>
        </div>
      
    </div>
</body>
</html>
