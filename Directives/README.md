# Directives

Directives zijn belangrijke componenten in het AngularJS framework. Directives breiden de DOM / HTML syntax uit. Een element als een datepicker is voor ons normaal, alhoewel HTML dit niet kent. Dankzij jQuery code of directives in AngularJS kunnen we deze functionaliteit gebruiken.

Je komt dikwijls built-in directives tegen: ng-model, ng-repeat, ng-show,.. Het ng-repeat directive herhaalt een element en de ng-show toont een element afhankelijk van de conditionele logica. Buiten built-in directives kan je zelf eigen directives schrijven.

### Verschil tussen jQuery en Angular mbt directives

In jQuery schrijf je een datepicker door een input field <input> te schrijven in HTML om vervolgens met jQuery: $(element).datePicker(). Deze code converteert het input field naar een datepicker.

Wanneer een designer je code ziet zal hij de code moeten vertalen om te weten dat je input field een datepicker is, en niet een gewoon tekstveld..

De angular approach gebruikt een directive om HTML uit te breiden. Een datepicker met AngularJS code ziet er bijvoorbeeld als volgt uit:
```html
<date-picker></date-picker>
of
<input type="text" date-picker/>
```

Deze benadering is veel intuitiever! Gewoon naar het element kijken om te weten wat het is.


## 1. Enabling/disabling DOM elements

Afhankelijk van de checkbox state wensen we de knop te disablen.
De ng-disabled directive staat in directe verbinding met de disabled HTML attribuut.
Het wordt gebonden aan het checked model door de attribuut waarde terwijl de checkbox een ng-model directive gebruikt/

Andere voorbeelden van directives zijn: ng-hide, ng-checked , ng-mouseenter..


```html

<body ng-app>
		<label><input type="checkbox" ng-model="checked"/>Toggle button</label>
    <button ng-disabled="checked">Press me</button>
</body>
	
```


Meer info op deze blog:
http://www.sitepoint.com/practical-guide-angularjs-directives/
http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-i-the-fundamentals

## Voorbeeld eigen directive

```html

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<title>directive1</title>
<script type="text/javascript" src="angular.min.js"></script>
	<script>
		var app = angular.module("app", []);
		app.directive('helloWorld', function() {
			return {
				restrict : 'AE',
				replace : 'true',
				template : '<h3>Hello World!!</h3>'
			};
		});
		</script>
		
		<script>
		
		
		app.directive('myClock', function () {
			return {
				template: '<p>My clock! </p>'
			};
		});
		
	</script>
	
	</head>

	<body ng-app="app">


<div data-my-clock></div>

<hello-World></hello-World>
<div hello-world></div>

OR

<div x-hello-world></div>
	</body>
</html>
```

## Voorbeeld 2 

```html

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<title>directive1</title>
<script type="text/javascript" src="angular.min.js"></script>
	<script>
		var app = angular.module("app", []);
		app.directive('helloWorld', function() {
			return {
				restrict : 'AE',
				replace : 'true',
				template : '<h3>Hello World!!</h3>'
			};
		});
		</script>
		
	<script>
		
		app.directive('myClock', function () {
			return {
				template: '<p>{{ time }}</p>',
				restrict: 'AE',
				replace: true,				
				//TODO: veranderen met interval service
				controller: function ($scope) {
					// bootstrapper
					$scope.time = new Date();
					// interval loop
					setInterval(function () {
						$scope.time = new Date(); 
						$scope.$apply(); // handmatig tijd bijwerken in de scope
					}, 1000);
				
				}
				
			};
		});
		
	</script>
	
	</head>

	<body ng-app="app">


<div data-my-clock></div>


	</body>
</html>


```
