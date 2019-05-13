## Introduction
The Angular Router enables navigation from one view to the next .
The Angular Router can interpret a browser URL as an instruction to navigate to a client-generated view. It can pass optional parameters along to the supporting view component that help it decide what specific content to present. 

## Router imports
The Angular Router is an optional service that presents a particular component view for a given URL. It is not part of the Angular core. It is in its own library package, @angular/router. Import what you need from it as you would from any other Angular package.

The app.module.ts

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({

declarations: [

AppComponent

],

imports: [

BrowserModule,

AppRoutingModule

],

providers: [],

bootstrap: [AppComponent]

})

export class AppModule { }

```

## Configuration

A routed Angular application has one singleton instance of the Router service. When the browser's URL changes, that router looks for a corresponding Route from which it can determine the component to display.

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:"prop",component:PropComponent},
  {path:"test",component:TestComponent},
  {path:"teller",component:TellerComponent},
  {path:"",redirectTo:"test", pathMatch:"full"},
  {path:"**", component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  constructor(){   
  }
}
```

The appRoutes array of routes describes how to navigate. Pass it to the RouterModule.forRoot() method in the module imports to configure the router.

> Each Route maps a URL path to a component

## Router outlet

The RouterOutlet is a directive from the router library that is used like a component. It acts as a placeholder that marks the spot in the template where the router should display the components for that outlet.

<router-outlet></router-outlet>

## Router links
Now you have routes configured and a place to render them, but how do you navigate? The URL could arrive directly from the browser address bar. But most of the time you navigate as a result of some user action such as the click of an anchor tag.

Consider the following template in app.component.html

```
<nav>
<ul>

<li><a routerLink="prop">Prop</a></li>
<li><a routerLink="test">Test</a></li>
<li><a routerLink="teller">teller</a></li>

<router-outlet></router-outlet>
```

The RouterLink directives on the anchor tags give the router control over those elements. The navigation paths are fixed, so you can assign a string to the routerLink (a "one-time" binding).

### Define a Wildcard route
```
{path:"**",component:PagenotfoundComponent}
```
A wildcard route has a path consisting of two asterisks. It matches every URL. The router will select this route if it can't match a route earlier in the configuration. A wildcard route can navigate to a custom "404 Not Found" component or redirect to an existing route.

## Activated Route in action

Import the Router, ActivatedRoute, and ParamMap tokens from the router package.

```
import { Component, OnInit } from '@angular/core';
import {MyService} from "../my.service";
import { Router } from '@angular/router';

@Component({

selector: 'app-tom',
templateUrl: './tom.component.html',
styleUrls: ['./tom.component.css']
})

export class TomComponent implements OnInit {

constructor(private service:MyService, private route:Router)
{
console.log(this.route);
this.route.navigate(["/teller"]);

}

ngOnInit() {

}

}
```

The router navigate method takes the same one-item link parameters array that you can bind to a [routerLink] directive.
```
this.route.navigate(["/teller"]);
```
