/*
Implementatie van de controller:
1. Start workout
2. show progress voor een oefening
3. Na einde van tijdsduur toon volgende oefening
4. Herhaal dit voor alle oefeningen
*/

/*
    Deze klassen stellen het Model voor
 */
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

//We betrekken de workout module uit app.js en registreren onze controller
angular.module("workout").controller("WorkOutCtrl",['$scope', '$interval', function ($scope,$interval)
{
    var rustOefening;
    var workoutPlan;
   
    var init = function ()
    {
       
        console.log("init functie");
        startWorkOut();
    }

    var startWorkOut = function ()
    {
        workoutPlan = CreateWorkOut();
        console.log(workoutPlan);
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
        startOefeningen(workoutPlan.oefeningen[0]);
    }

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
                duration: 30
            },
            
             {
                 details: new Oefening(
                     {
                         naam: "oef 2 pompen",
                         titel: "oef 2: pompen",
                         beschrijving: "pomp constant"
                     }),
                 duration: 30
             });
        console.log(workout);
        return workout;
    }


    /*
    De $interval service is een wrapper over de window.setInterval methode. Hoofddoel is om een 
    specifieke functie steeds weer op te roepen met een bepaald tijdsinterval.
    Door de interval op te roepen geven we een callback functie mee (als anonieme functie)
    We incrementeren tot de duration per oefening zodat de $interval automatisch stopt, anders blijft deze 
    oneindig doorlopen
    */
    var startOefeningen = function (oefening) {
        console.log("start oefeningen")

        $scope.huidigeOefening = oefening;
        $scope.huidigOefeningDuration = 0;
        console.log($scope.huidigeOefening);

        $interval(function () {
            console.log($scope.huidigOefeningDuration);
            $scope.huidigOefeningDuration++;
        },
        1000,
        $scope.huidigeOefening.duration);
    };

    init();
}]);