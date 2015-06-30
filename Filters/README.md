# Controllers

We gebruiken de ng-show directive samen met de controller om de visibiliteit te veranderen na een button click.

We gebruiken de ng-controller directive om ons div element samen met de child elementen te binden aan de context van de myctrl controller.
De ng-click directive roept de toggle functie op geimplementeerd in de controller. De ng-show directive is gebonden aan de visible scope variabele.

De visible variabele en de toggle functie zijn gedefinieerd in de $scope service. Deze $scope service wordt aan de controller doorgegeven door middel van dependency injection.

#MVVM pattern
Deze compositie noemen we het model-view-viewmodel patroon. Het model is de javascript code. Terwijl de view de HTML template is. De viewmodel is de lijm tussen template en model.
De viewmodel maakt two-way binding mogelijk zodat veranderingen tussen beide in sync blijven.

In ons voorbeeld is het visible attribuut het model. De controller wordt gebruikt om de scope te definiëren en stelt het viewmodel voor, en interreageert met onze HTML code (de view).

Author: Tom Peeters
