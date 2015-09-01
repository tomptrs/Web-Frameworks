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
