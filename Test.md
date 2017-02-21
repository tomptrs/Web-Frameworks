
# Testing AngularJS - Karma, Jasmine, and ngMock


## Introduction

Due to the complexities that come with AngularJS -- its layers of dependency injection, its digest cycle, its different components that make it an "MV*" framework, and so forth -- testing AngularJS requires a bit more than simply specifying all your .js files in karma.conf.js. We need a way to specify which Angular modules we're testing, inject our Angular components, etc.

### ngMock.

ngMock is an Angular module created by the Angular team -- similar to how ngRoute is a separate Angular module -- whose purpose is specifically to accomplish the task of testing AngularJS code!

### Setup

We're going to continue with the idea of a calculator, but this time we'll make a very simple web app to add some numbers using inputs on an HTML page and an Angular controller to do the math and output the results

### Project setup
Create a new folder called ng-calc somewhere logical on your computer and cd to it in a terminal window.

run >npm install angular


Create 2 new files, index.html and app.js, in the project root folder and add the following code:

´´´html

<!-- index.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="angular.js"></script>
    <script src="calcApp.js"></script>
    <script src="calcController.js"></script>
    
</head>
<body ng-app="CalcApp">
   <div ng-controller="calcController">
       <input type="text" ng-model="getal1">
       <input type="text" ng-model="getal2">
       <input type="button" ng-click="add(3,5)" value="add">
       {{resultaat}}
   </div>
    
</body>
</html>


´´´

´´´html

//  app.js

var calcApp = angular.module("CalcApp",[]);

´´´


´´´html

// controller.js

calcApp.controller("calcController",function($scope){    
    
    $scope.add=function(){
        console.log($scope.getal1+$scope.getal2);
        $scope.resultaat =  parseInt($scope.getal1)+parseInt($scope.getal2);
    }

});

```

Take a couple of minutes to look through that code and make sure everything makes sense. Then open the app in a browser and make sure everything is working as it should. (You can put a number in each box, click the "+" button, and the sum of the two numbers should appear below.) If you've done some Angular coding before, nothing here should be new to you.


### Set up for testing

We need to set up Karma and Jasmine for testing like we have in the past, and we also need to include Angular-Mocks so we can test AngularJS code.

In terminal,run >npm install angular-mocks
Run npm install --save-dev karma
npm install karma --save
npm install -g karma-cli
npm install karma-jasmine karma-chrome-launcher --save

Add a folder called tests to the project root.
In terminal, run karma init :

- Select "Jasmine" as the framework (should be the first one to show up).
- Choose "no" for using Require.js.
- Switch the browser from "Chrome" , then hit enter twice.
Enter node_modules/angular/angular.min.js, node_modules/angular-mocks/angular-mocks.js, app.js, calculatorController.js and tests/*.test.js, for the source and test files, hitting enter between each entry.
Hit enter to skip the exlusions.
Hit enter to choose "yes" to having Karma watch all the files and re-run the tests on changes.
Open package.json and change the test script to be "test": "./node_modules/karma/bin/karma start karma.conf.js".
After all these steps, we should be ready to write tests for our AngularJS application!

### Using ngMock
Angular-Mocks (A.K.A. ngMock) gives us an API to let us pull in our Angular Modules and inject Angular controllers, services, directives, and so forth so that we can actually test them.

### Setup
Under the tests folder, create a new file called calcController.test.js.
Write the basic describe block:

´´´html

describe("calculator", function () {

});
beforeEach

´´´

Jasmine comes with a method that allows you to keep your tests DRY (which stands for Don't Repeat Yourself) called beforeEach. This method will run any code you put inside it before each test spec (it() block). Since we may be adding a number of tests to this describe() block, we should use the beforeEach() method to both grab our Calculator Angular Module and inject the Angular controller CalcController we created in app.js.
Inside your describe() block, add the following code:


´´´html

describe("calculator", function () {

     beforeEach(angular.mock.module('CalcApp'));

});

´´´

This sets the module for this test to be the "Calculator" module, so that when we try to grab controllers, services, etc., we're grabbing them from the right Angular module.
There is also an afterEach() method available from Jasmine in case you ever need to break something back down before any further tests proceed. 

See the Jasmine docs for more information on both beforeEach() and afterEach()


### Our job
We've been spoiled a little bit by everything AngularJS automatically does under the hood for us so that we don't have to. We take for granted that Angular will instantiate all the Controllers, Directives, Services, Factories, etc. for us when the scripts are read into the browser's JavaScript engine.
When we're testing, however, we are missing some of the luxuries that come with Angular automatically doing things for us. In order to prepare our tests to work correctly, we need to manually take a few steps to bring the Controllers, Directives, etc. into our test so we can use them.


### Inject the correct controller and scope
ngMock comes with a service called $controller which is responsible for creating new and retrieving existing Angular controllers. (Angular calls this service automatically every time it finds app.controller(...) in its code in order to create a new controller).
There is also a service called $rootScope which is actually the parent to all $scope objects (also sometimes referred to as $childScopes. It also gives us the ability to instantiate new $scope objects with its .$new() method.
Why is this important? We need to inject the controller we want to test, but we need to use the $controller service to grab it first, and $rootScope to create a new scope object to pass to the controller so it knows what you mean when the code says $scope.add(), etc. We've become used to simply injecting the $scope service into the controller's function, but now we have to take these extra steps so our controller runs correctly during the test.
Notice at the top of the describe() block we add the var scope; line. This is so we can reference it inside the beforeEach block, but then use it inside our it() block without it disappearing due to regular JavaScript scoping issues.


´´´html

describe("Calculator",function(){
    
    beforeEach(angular.mock.module('CalcApp'));

	var $controller;

	beforeEach(angular.mock.inject(function(_$controller_){
	  $controller = _$controller_;
        console.log($controller)
	}));
    
    
´´´

Now we have a reference to our module and a reference to our controller with the correct $scope attached to it and everything! The last part is the easiest:

´´´html

describe("Test Calculator",function(){
    
    beforeEach(angular.mock.module('CalcApp'));

	var $controller;

	beforeEach(angular.mock.inject(function(_$controller_){
	  $controller = _$controller_;
        console.log($controller)
	}));

	describe('Add', function () {
        
        it("plus",function(){
            var $scope = {};
			var controller = $controller('calcController', { $scope: $scope });	
            
            $scope.getal1 = 2;
            $scope.getal2 = 2;
            $scope.add();
            expect($scope.result).toBe(4);
        })
    });
    
    
});

´´´


And there you have it! You now can do any refactoring to this set of functionality, add other methods (like subtraction, multiplication, division, etc.) and write new tests to make sure they're all working the way they're supposed to. You now have an insurance policy against mistakes made while changing code!



