# NoSQL


## Introductie

De ontwikkeling van relationele databases betekende een geweldige verbetering in 
het data landschap. Gebaseerd op een simpel wiskundig model, had men een 
oplossing voor data anomaliën ( inconsistente data).
Maar door een exponentiële groei van e-commerce en sociale media wordt de 
focus in databases gelegd op scalability, low cost, flexible en highly 
available. Deze doelen zijn moeilijker te bereiken met relationele databases,
mede door de hoge kosten die deze met zich meebrengen.

### Scalability
Om op de gepaste tijdstippen een variërende workload te hebben. 
Bijvoorbeeld bij een spike in trafiek naar je website kan met extra
 servers online brengen om de load op te vangen. Bij gebruik van 
relationele databanken is een dergelijke scale moeilijk te beheren. 
NoSQL databases zijn zo gedesigned om servers toe te voegen of te 
verwijderen met een minimale interventie van de administrator.

### Cost
De kost van database licensies is steeds een belangrijke factor bij de 
keuze van technologie. De meeste NoSQL systemen zij open source.

### Flexibility
Database designers moeten bij de start van het project alle tabellen
 en kolommen reeds geimplementeerd hebben. NoSQL databases hebben
geen vaste structuur, met andere woorden een programma kan dynamisch
 nieuwe attributen toevoegen zonder het schema aan te passen.

### Availability
Je wil nooit dat je website niet beschikbaar is. No SQL databases hebben 
het voordeel om op verschillende low-cost servers te draaien. 
Wanneer 1 server faalt, de andere kunnen makkelijk de workload opvangen.

Er zijn 4 types NoSQL databases:

-	Key-value
-	Document
-	Column
-	Graph

We behandelen enkel document databases

Document databases
Deze bewaren records als documenten. Documenten zijn semi-gestructureerde entiteiten gemodelleerd in JSON of XML formaat (JSON: Javascript Object Notation) (XML: Extensible Markup Language).
Bijvoorbeeld:
{
  "firstName": "Tom",
  "LastName": "Peeters",
  "beroep":  "Lector"
}
Éen van de belangrijkste karakteristieken van een docuemnt database is dat 
het geen vast schema (zoals relationele databases) nodig heeft vooraleer je 
data kan toevoegen. Het toevoegen van een document maakt ook het onderliggende 
schema!
Omdat het geen vast schema heeft hebben ontwikkelaars meer flexibiliteit. 
Als een gebruiker gedefinieerd als bovenstaand JSON formaat wijzigt in:

{
  "firstName": "Tom",
  "LastName": "Peeters",
  "beroep": "Lector",
  "woonplaats": "Westerlo",
   "email": "tom.peeters@ap.be"
}

Dan is dit geen enkel probleem, en wordt de tweede record (eigenlijk document
 genoemd vanaf nu) in de collectie met extra attributen woonplaats en email 
gepusht.
Document databases voorizen ook een API of query taal om de documenten uit
de databank te halen.

Bijvoorbeeld:

Stap 1: maak een collectie aan

db.createCollection("employees");

Stap 2: Voeg data toe:

db.employees.insert( {"naam":"peeters","voornaam":"tom" })

Eigenlijk moet je stap 1 niet uitvoeren, want vanaf dat je data toevoegt, 
zal de document oriented database automatisch een collectie toevoegen.
Zoek operaties gebeuren bijvoorbeeld als volgt:

db.employees.find();
db.employees.find({"voornaam":"tom"});

## Verschillen met een relationele database

-	Ten eerste hebben we bij een NoSQL database geen vast schema meer nodig.
-	Een volgend belangrijk verschil is dat een document “embedded” documenten alsook een lijst van warden (array) kan bevatten.

{
  "firstName": "Tom",
  "LastName": "Peeters",
  "beroep": "Lector",
  "woonplaats": "Westerlo",
  "email": "tom.peeters@ap.be"
  "VorigeBeroepen": [
    {
      "positie": "developer",
      "werkgever": "Agfa-Gevaert"
    },
    {
      "positie": "project manager",
      "Werkgever":  "Agfa Gevaret"
    }
  ]
}

Het embedden van documenten of lijsten zorgt ervoor dat we geen joins moeten uitvoeren zoals bij relational databases.

- Document databases hebben dus ook de mogelijkheid om data te query-en en te filteren zoals relationele databanken

## Wat is een document?

Voor de gemakkelijkheid beginnen we met een HTML document. Deze bevatten content en formatting commando’s. HTML documenten gebruiken voor gedefinieerde tags om de content te formatteren. Documents in een document database hebben deze voor gedefinieerde beperkingen niet. Ontwikkelaars zijn vrij om de structuur te kiezen.
Bijvoorbeeld een customer record in JSON notatie:
{
  "customer_id": 123,
  "naam": "Peeters",
  "adres": {
    "straat": "Ellermanstraat 33",
    "plaats": "Antwerpen"
  },
  "first_order": "1/9/2015",
  "last_order":  "7/9/2015"
}

## Structuur van een JSON object

-	Data wordt georganiseerd als key-value pairs
-	Documenten bevatten name-value pairs, gescheiden door een komma
-	Een document start met { en eindigt met }
-	Namen zijn strings: bijvoorbeeld: customer_id, adres,..
-	Waarden kunnen numbers, strings, Booleans, arrays, objecten, NULL zijn.
-	De waarden van een array worden opgelijst beginnende met [ en eindigen met ]
-	De waarden van een object zijn opnieuw key-value pairs beginnend met { en eindigen met }

Dus een document is een set key-value pairs. De keys worden als strings voorgesteld, terwijl de values basic types kunnen bevatten, of structuren kunnen zijn (arrays, objecten).

Documenten bevatten zowel de structuur als de data. JSON en XML zijn 2 formaten die hiervoor vaak gebruikt worden.
Meerdere documenten worden in een collectie gestopt. Collecties zijn dus een lijst van documenten. Document database designers moeten denken aan het zo snel mogelijk kunnen toevoegen, verwijderen, updaten en zoeken naar documenten. Belangrijk te weten is dat documenten binnen een collectie niet persé dezelfde structuur moeten aannemen.

# Tips in Collectie design

Collecties bevatten een lijst van documenten. Omdat collecties geen vaste structuur van documenten vereisen kunnen met andere woorden verschillende document types in een collectie zitten. Bijvoorbeeld klant info en server log data kunnen in dezelfde collectie terecht komen. Dit is niet aan te raden!
Algemeen beschouwen we dat collecties documenten bewaren over hetzelfde “onderwerp”.
Vermijden van abstracte entiteitstypes! Bijvoorbeeld je wil logging data bewaren over de clicks op je webpagina, alsook algemene server logs. Deze 2 entiteiten hebben een id en timestamp gemeen. Ga deze dan niet als 1 collectie modelleren omwille van het weinige gemeenschappelijke, want als je uiteindelijk de weblog en server log er apart wil uithalen, zul je een extra attribuut “type” moeten bewaren om de data eruit te filteren. En filteren is dikwijls trager dan het werken met meerdere collecties.
Let wel, bovenstaande zijn tips!

Een voobeeld: we willen bijhouden welke producten klanten hebben besteld. We gaan 1 document aanmaken dat boeken, cd’s en kleine keukenapparaten kan bevaten. Voorlopig zijn er dus 3 type producten, maar op termijn kan dit uitbreiden.
Alle producten hebben:
-	Produkt naam
-	Beschrijving
-	SKU (stock keeping unit)
-	Afmetingen
-	Gewicht
-	Gemiddelde klantenscore
-	Prijs
Elk type product heeft zijn specifieke attributen:
Boek:
-	Auteurs naam
-	Publisher
-	Jaar publicatie
-	Aantal pagina’s
CD’s:
-	Artiest naam
-	Producer naam
-	Aantal tracks
-	Tijdsduur
Kleine keuken apparaten:
-	Kleur
-	Spanning (voltage)

Hoe beslissen dat we onze data in 1 of meerdere collecties gaan opslaan? Je vraagt je eerst af wat de noden van de klant zijn. Je klant wil volgende zaken te weten komen:
-	Het gemiddeld aantal producten die door elke klant worden gekocht
-	Top 20 van de populairste producten
-	Gemiddel de prijs verkochte goederen
-	Hoeveel producten per type zijn de laatste 30 dagen gekocht?
Alle queries gebruiken data van alle product types, behalve de laatste. Dit kan al een indicatie zijn om één collectie te gebruiken.
Een andere indicatie tot gebruik van 1 enkele collectie is  de mogelijkheid dat de klant zal groeien en andere product types introduceert.


# Operaties op Document databases

De basis operaties zijn net zoals bij relationele databases:
-	Insert
-	Delete
-	Update
-	Select
Wij gaan MongoDB gebruikt als document database (is voorlopig de meest gebruikte). De taal voor de manupulatie is die voor MongoDB – er is geen uniforme taal.

## Toevoegen van documenten in een collectie

db.employees.insert({"naam":"peeters","voornaam":"tom"}) 
Je kan ook in bulk data toevoegen: [ en ] zorgen dat je een array van documenten toevoegd.

## Delete documenten

db.employees.remove()

Met de remove methode verwijder je documenten. Bovenstaand commando verwijdert alle documenten in de collectie employees, maar de collectie blijft nog steeds bestaan.

### Verwijderen van een geselecteerd document:

db.employees.remove({"naam":"peeters"});

Deze query verwijdert alle documenten met naam "peeters".

## Updaten van documenten

De update method heeft 2 parameters nodig:
-	Document query
-	Keys en values te updaten:

db.employees.update({"id":"10",{$set: {"voornaam":"arno"}});

## Selecteren van data

De find methode wordt gebruikt om documenten van een collectie te selecteren.

db.employees.find();

db.employees.find({"naam":"peeters"})

Deze 2 find methodes geven alle keys en values terug in de documenten.

Je kan ook een extra parameter meegeven om te specifiëren welke keys je wil laten zien, samen met een 1 om aan te duiden dat deze moet getoond worden.

db.employees.find({"naam":"peeters"}, {"voornaam":1});


db.employees.find({"naam":"peeters"}, {"voornaam":1,"id":1});

Je merkt dat MongoDB by default ook een unique identifier weergeeft, zelfs als deze niet gevraagd is.

## Complexe queries door conditionele logica

Bijvoorbeeld: 
db.employees.find({"id": {"gte":10} })

De logica dat je kan gebruiken:

- $lt : kleiner dan
- $let: kleiner of gelijk aan
- $gt : groter dan
- $gte: groter of gelijk aan
- $in : selecteert documenten waar de waarde van een veld gelijk is aan die gespecifieerd in de array. Bijvoorbeeld: db.employees.find({"id":{$in : [10,11]}})
- $or : voorbeeld: db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } ) : deze query selecteert alle documenten in de inventory collection waarbij de
	quantity kleiner is dan 20 of de prijs gelijk aan 10
- $not: db.inventory.find( { price: { $not: { $gt: 1.99 } } } ) : deze query selecteert alle documenten waarbij de prijs kleiner of gelijk is aan 1.99


# MongoDB commando's

Om een database aan te maken gebruik je het use commando, bijvoorbeeld “use news”
Om te kijken welke databanken beschikbaar zijn : show dbs
De goede lezer merkt dat onze news database niet beschikbaar is, dit komt omdat deze nog geen collecties bevat.
Om een collectie aan te maken: db.createCollection(“EenCollection”)



