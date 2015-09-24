## 1 Controllers

We gebruiken de ng-show directive samen met de controller om de visibiliteit te veranderen na een button click.

We gebruiken de ng-controller directive om ons div element samen met de child elementen te binden aan de context van de myctrl controller.
De ng-click directive roept de toggle functie op geimplementeerd in de controller. De ng-show directive is gebonden aan de visible scope variabele.

De visible variabele en de toggle functie zijn gedefinieerd in de $scope service. Deze $scope service wordt aan de controller doorgegeven door middel van dependency injection.

```html

<script>
	function myctrl($scope)
	{
		$scope.visible = true;
		
		$scope.toggle = function()
		{
			$scope.visible = !$scope.visible;
		}
	}
</script>
	</head>

	<body ng-app>
		
		<div ng-controller="myctrl">
			<button ng-click="toggle()">Toggle</button>
			<p ng-show="visible">Hallo</p>
		</div>

	</body>
	
```

## MVC pattern
Deze compositie noemen we het model-view-controller patroon. Het model is de javascript code. Terwijl de view de HTML template is. De controller is de lijm tussen template en model.
De controller maakt two-way binding mogelijk zodat veranderingen tussen beide in sync blijven.

In ons voorbeeld is het visible attribuut het model. De controller wordt gebruikt om de scope te definiëren en stelt het controller voor, en interreageert met onze HTML code (de view).

```html

<script>
	function myctrl($scope)
	{
		$scope.value = "Hallo Tom";
	}
</script>
	</head>

	<body ng-app>
		
		<div ng-controller="myctrl">
			<p>{{value}}</p>
		</div>


```


## 2 Toewijzen van een default waarde aan een model

Controllers voorzien de business logica. Bijvoorbeeld wanneer een gebruiker op een knop klikt zal de controller het model voorbereiden voor de view.
Als algemene regel kunnen we stellen dat de controller de DOM (document object model) niet manipuleert.

Om een default waarde aan de scope van de controller te hangen maak je gebruik van de ng-controller directive en definieer je de scope variabele in de controller's functie.

De scope is hierarchisch en volgt de DOM hierarchie.

## 3 Veranderen van het model door middel van de controller

We gaan bijvoorbeeld het 'value' model met 1 incrementeren door gebruik te maken
van de controller.
In voorbeeld3 wordt de ng-init directive gebruikt wanneer de pagina geladen wordt. Deze roept de increment functie , aangemaakt in de controller, aan.

## 4 Encapsulate een model  door middel van een controller's functie

(voorbeeld 4)In plaats van rechtstreeks het model aan te spreken (via scope service), gaan we het model encapsuleren binnen een functie van de controller.

## 5 Reageren op scope veranderingen

Als het model verandert wil je een actie triggeren. Hiervoor maak je gebruik van de watch functie in je controller.
Het eerste argument van de $watch functie is een angular expressie. Het tweede argument wordt opgeroepen waneer de expressie evaluatie een andere waarde terugkrijgt.


Author: Tom Peeters
