# Services

## Sharing code tussen controllers door middel van Services

Om business logica te delen tussen controllers kan je gebruik maken van Services. Door dependency injection kan je een service in je controllers gebruiken

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



