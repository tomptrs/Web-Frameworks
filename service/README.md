# Services

##Sharing code tussen controllers door middel van Services

Om business logica te delen te controllers kan je gebruik maken van Services. Door dependency injection kan je een service in je controllers gebruiken

De factory methode maakt een singleton UserService die 2 functies bevat. De controllers krijgen de UserService door deze te injecteren in de controller's functie als parameter.


Author: Tom Peeters
