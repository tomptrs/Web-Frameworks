## Introduction
A service is typically a class with a narrow, well-defined purpose. It should do something specific and do it well.
Angular distinguishes components from services to increase modularity and reusability. By separating a component's view-related functionality from other kinds of processing, you can make your component classes lean and efficient.
Ideally, a component's job is to enable the user experience and nothing more. A component should present properties and methods for data binding, in order to mediate between the view (rendered by the template) and the application logic (which often includes some notion of a model).
A component can delegate certain tasks to services, such as fetching data from the server, validating user input, or logging directly to the console. By defining such processing tasks in an injectable service class, you make those tasks available to any component. 

Example

```
import { Injectable } from '@angular/core';

@Injectable({

providedIn: 'root'

})

export class MyService {



data: any = [1, 2, 3];

constructor() { }

getData() {

return this.data;

}

}

```

The service provider registration in the bootstrap method will make the service available globally.

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MyService} from "../app/myservice.service";

@NgModule({

declarations: [

AppComponent,

],

imports: [

BrowserModule,

AppRoutingModule,

FormsModule,

ReactiveFormsModule,

BrowserAnimationsModule,

MaterialModule,

HttpClientInMemoryWebApiModule.forRoot(TestData)  

],

providers: [MyService],

bootstrap: [AppComponent]

})

export class AppModule { }

```

## Dependency injection (DI)

Dependency Injection is wired into the Angular framework and used everywhere to provide new components with the services or other things they need. Components consume services; that is, you can inject a service into a component, giving the component access to that service class.
To define a class as a service in Angular, use the @Injectable() decorator to provide the metadata that allows Angular to inject it into a component as a dependency.
When Angular discovers that a component depends on a service, it first checks if the injector has any existing instances of that service. If a requested service instance doesn't yet exist, the injector makes one using the registered provider, and adds it to the injector before returning the service to Angular.
When all requested services have been resolved and returned, Angular can call the component's constructor with those services as arguments.

### Use the Service

```
import { Component, OnInit } from '@angular/core';
import {MyService} from "../my.service";

@Component({

selector: 'app-tom',

templateUrl: './tom.component.html',

styleUrls: ['./tom.component.css']

})

export class TomComponent implements OnInit {



constructor(private service:MyService) { }



ngOnInit() {

}

}
```
