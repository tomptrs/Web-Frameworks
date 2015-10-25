# Angularizing the page

In Controller/JavascriptController is een "twitterController" aangemaakt.
Vanuit dit voorbeeld kunnen we makkelijk databinding uitleggen, één van de betere
functionaliteiten van AngularJS.

Databinding = het proces om data te linken van het model aan de user interface. Databinding
is een "2-way proces": wanneer data op de web pagina wordt veranderd, zal het model automatisch
geupdate worden.

Het model is de enigste bron van data ter representatie in de UI.

```html


<body>
		
		<div class="container">
			<h1>Recent Posts</h1>
			<ul class="list-group">
				<li class="list-group-item">
					
					<strong>tom@ptrs</strong>
					<span>MEAN Stack</span>
				</li>
				
					<li class="list-group-item">					
					<strong>ea@ict</strong>
					<span>Web Technology rules!</span>
				</li>
			</ul>
			
		</div>

	</body>
	
	```
