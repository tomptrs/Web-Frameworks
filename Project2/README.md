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

 


