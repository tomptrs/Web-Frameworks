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