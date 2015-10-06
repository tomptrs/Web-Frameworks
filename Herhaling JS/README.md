# Javascript herhaling

1. Schrijf een functie die 2 argumenten aanneemt - een array van strings en een string.
De functie geeft true terug als de string in de array aanwezig is. Anders wordt false
teruggegeven.

2. Tel paren auto's die naar het oosten en naar het westen rijden
	 	
	 	bijvoorbeeld: A[0] = 0 - A[1] = 1 - A[2] = 0 -A[3] = 1 - A[4] = 1
	 	We vinden 5 paren: (0,1) , (0,3) , (0,4), (2,3), (2,4)
	 	
Schrijf hiervoor een functie die een array van auto's aanneemt en het aantal teruggeeft

3. jQuery
-  Kleur enkel de ```html <h1> ``` tag rood
-  Selecteer de eerste paragraaf van de .relevant paragrafen en voeg een stijlelement toe
-  Na klikken op de ```html <h2> ``` tag itereer je over alle paragrafen van de .relevant klasse en 
bij de 2de 4de en 6de voeg je een stijlelement toe.

```html

<!doctype html> 
 <html> 
 	<head> 
 		<title>Template.html</title> 
 		<link rel="stylesheet" type="text/css" href="reset.css"> 
 		<link rel="stylesheet" type="text/css" href="style.css"> 
 		<meta charset="utf-8"> 
 	</head> 
 	<body> 
         <h1>Hallo. Goeiedag</h1> 
         <h2 class="belangrijk">Hallo opnieuw</h2>  
         <p>Zomaar een paragraaf</p> 
         <div class="relevant">  
	<p class="a">Eerste</p>  
             <p class="a">Tweede</p>  
             <p>Derde</p>  
             <p>Vierde</p> 
             <p class="a">Vijfde</p>  
             <p class="a">Zesde</p>  
             <p>Zevende</p> 
         </div> 
         <script src="http://code.jquery.com/jquery-2.1.1.min.js"></script> 
     	<script src="app.js"></script> 
 	</body> 
 </html> 


```

4. Maak het spelletje CRAPS
Een speler gooit met 2 dobbelstenen. Als de som bij de eerste worp 7 of 11 is wint de speler. Als de som 2,3 of 12 is tijdens eerste worp (=craps) verliest hij. Als
de som 4,5,6,8,9,10 is dan wordt deze som de speler zijn punten, en probeert vanaf dan met de dobbelstenen te gooien totdat hij deze som opnieuw heeft gesmeten. Maar smijt
hij vanaf dan een 7 verliest hij.

Uitbreiding:
Zorg ervoor dat je dit spel met meerdere personen kan spelen (OO ?!)

![xampp](/crap.PNG)

5. Maak een online kwis. Maak een aantal vragen met bijhorende meerkeuze antwoorden. Zorg ervoor dat je doorheen je vragenlijst kan navigeren.