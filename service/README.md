# Services

## Sharing code tussen controllers door middel van Services

Om business logica te delen tussen controllers kan je gebruik maken van Services. Door dependency injection kan je een service in je controllers gebruiken.

Verder is het beter om bijvoorbeeld de $http service niet in de controller te implementeren, maar in een service. Op die manier laat je hergebruik van code toe. Buiten data-binding laat AngularJS ook toe om onze code in logische secties onder te verdelen.

In Angular worden controllers aangemaakt, maar ook verwijderd als ze verschijnen en verdwijnen van een pagina. Dit in tegenstelling tot services. Deze worden éénmaal aangemaakt (wanneer je ze nodig hebt), maar als andere componenten deze nodig hebben zal Angular dezelfde instantie van de service hergebruiken. Je "dependency inject" de service zoals bijvoorbeeld de $scope service.

De factory methode maakt een singleton UserService die 2 functies bevat. De controllers krijgen de UserService door deze te injecteren in de controller's functie als parameter.

## Requesting JSON data met AJAX

Dit is mogelijk door gebruik te maken van de $http service om data te fetchen en te bewaren in de scope.
De controller heeft een dependency naar de $scope en $http module.
Een http get request wordt naar data/post.json gestuurd en krijgt een
$promise object met een success en error methode terug.
Bij een success wordt de JSON data aan de $scope.posts variabele.

De $http service supporteert get,head,post,put, delete en jsonp.

De $http service voegt automatisch HTTP headers toe, maar je kon deze zelf aanbrengen:
$http.defaults.headers.common["X-custom-Headers"] = "Tom"

```html
app.controller("PostCtrl",function($scope,$http)
	{
		$http.get("data/post.json").success(function(data)
		{
			$scope.posts = data;
		}).error(function(data)
		{
			//log error
		});
	});
	```


http://viralpatel.net/blogs/angularjs-service-factory-tutorial/
