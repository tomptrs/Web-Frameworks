# Filters

## Formateren met een currency filter

Deze currency filter zit ingebouwd in Angular.

```html

<body ng-app>
		
		<input type="text" ng-model="amount" placeholder="Enter amount"/>
		
		<p>Default : {{ amount | currency }}</p>
		
		<p> Euro : {{ amount | currency:"Euro" }}</p>

	</body>
	
```

## Schrijven van een eigen filter

Onze filter zal de tekst omgekeerd weergeven. Angular's filter
functie verwacht een filter naam en een functie als parameter. Deze functie moet 
de filterfunctie teruggeven alwaar je de logica zal programmeren.

```html

var app = angular.module("MyApp",[]);
	
	app.filter("reverse",function()
	{
		return function(input)
		{
			var result = "";
			input = input || "";
			for(var i=0; i<input.length;i++)
			{
				result = input.charAt(i) + result;
			}
			return result;
		};
	});
	
</script>
	</head>

	<body ng-app = "MyApp">
		
		<input type="text" ng-model="text" placeholder="Enter text"/>
		
		<p>input : {{ text }}</p>
		
		<p> Filtered Input : {{ text | reverse }}</p>

	</body>
	
```

## Schrijven van een eigen filter met opties

Aan een Angular filter kan je parameters meegeven. Deze parameters worden als een hash doorgegeven en kunnen 
onmiddellijk worden verwerkt in de filter functie.
De suffix ! wordt doorgegeven als een optie aan de filter functie en wordt toegevoegd aan de output

## Filters met arrays

De filter gaat door alle namen en maakt een nieuwe array aan zonder één bepaald element.

## Chaining filters

Filters kunnen gecombineerd worden door middel van de "unix" pipe syntax.

