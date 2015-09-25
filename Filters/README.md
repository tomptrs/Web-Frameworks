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

```html

<script>
	
	var app = angular.module("MyApp",[]);
	
	app.filter("reverse",function()
	{
		return function(input,options)
		{
			var result = "";
			input = input || "";
			var suffix = options["suffix"] || "";
			for(var i=0; i<input.length;i++)
			{
				result = input.charAt(i) + result;
			}
			
			if(input.length > 0)
				result += suffix;
			return result;
		};
	});
	
</script>
	</head>

	<body ng-app = "MyApp">
		
		<input type="text" ng-model="text" placeholder="Enter text"/>
		
		<p>input : {{ text }}</p>
		
		<p> Filtered Input : {{ text | reverse: { suffix: "!"} }}</p>

	</body>
	

```

## Filters met arrays

De filter gaat door alle namen en maakt een nieuwe array aan zonder één bepaald element.

```html

<script>
	
	var app = angular.module("MyApp",[]);
	
	app.filter("exclude",function()
	{
		return function(input,name)
		{
			var result =[];
			
			
			for(var i=0; i<input.length;i++)
			{
				if(input[i] != name)
					result.push(input[i]);
			}
			
			return result;
		};
	});
	
</script>
	</head>

	<body ng-app = "MyApp">
		
		<ul ng-init="names = ['Tom','Arno','Hannes','Mieke']">
			<li ng-repeat="name in names | exclude: 'Mieke' | orderBy:'-name' ">
				{{name}}
			</li>
		</ul>
		
		

	</body>
	
```

## Chaining filters

Filters kunnen gecombineerd worden door middel van de "unix" pipe syntax.

