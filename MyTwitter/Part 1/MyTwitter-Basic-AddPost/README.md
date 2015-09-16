# Angularizing the page

# Toevoegen van een nieuwe Post

In de UI kunnen we een ng-click directive gebruiken die wordt gebruikt om een functie
op het $scope object op te roepen.

$scope.addPost =  function()
	{
		$scope.posts.unshift({
			username:"hannes & arno",
			body:"Hallo, een nieuwe entry"
		});
	};

Unshift is een JavaScript methode op arrays die een nieuwe element op positie 0 zet 
(het begin van de array).

Je moet geen code schrijven om de UI up to date te houden, want door de databinding
eigenschap van AngularJS wordt dit automatisch gedaan, want de $scope.posts is gebonden
aan een unordered list <ul> in de UI.


## DataBinding

In Controller/JavascriptController is een "twitterController" aangemaakt.
Vanuit dit voorbeeld kunnen we makkelijk databinding uitleggen, één van de betere
functionaliteiten van AngularJS.

Databinding = het proces om data te linken van het model aan de user interface. Databinding
is een "2-way proces": wanneer data op de web pagina wordt veranderd, zal het model automatisch
geupdate worden.

Het model is de enigste bron van data ter representatie in de UI.


