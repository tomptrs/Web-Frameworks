# Directives

## 1. Enabling/disabling DOM elements

Afhankelijk van de checkbox state wensen we de knop te disablen.
De ng-disabled directive staat in directe verbinding met de disabled HTML attribuut.
Het wordt gebonden aan het checked model door de attribuut waarde terwijl de checkbox een ng-model directive gebruikt/

Andere voorbeelden van directives zijn: ng-hide, ng-checked , ng-mouseenter..


```html

<body ng-app>
		<label><input type="checkbox" ng-model="checked"/>Toggle button</label>
    <button ng-disabled="checked">Press me</button>
</body>
	
```
