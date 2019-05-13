## Creating Components

Angular components are elements composed by a template that will render your application
To create a component we add @Component decorator in a class 
```
import { Component } from '@angular/core';
 
@Component({  
    selector: 'app-required',  
    styleUrls: ['required.component.scss'], 
      templateUrl: 'required.component.html', })
      
 export class RequiredComponent {

  }
```

> you can generate a component via the Angular CLI: ng generate component test or ng g c test

## Templates & Styles

Templates are HTML ﬁles that may contain logic. You can specify a template in two ways:
Passing template as a ﬁle path 

```
@Component({  
    templateUrl: 'hero.component.html', 
})
Passing a template as an inline code 

@Component({  
    template: `<div>My template here</div>`,
     })
```

Templates may contain styles. The styles declared in @Component are diﬀerent from your application style ﬁle, anything applied in the component will be restricted to this scope. For example, say you add:
```
div { background: red; }
```
All divs inside the component will be red, but if you have other components, other divs in your HTML they will not be changed at all.

## Testing a Component

Go to app.component.html and add the selector element into the html file:
```
<app-required></app-required>
```

# Interpolation

You have the possibily to display the data (properties or methods) from your component class into the HTML template.

> This is called one-way binding

You need to use double braces: {{ Property }} or {{ method() }}

E.g.: 

The class:
```
import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'This is my title';

  GetTitle(){
    return this.title;
  }
}
```
The template:
```
{{title}}
{{GetTitle()}}
```
## Property binding

you can also bind a property of your HTML object with the component class:

The template: 
```
<img [src]="currentImg">
```

```
import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownTimeComponent } from '../countdown-time/countdown-time.component';

@Component({
  selector: 'app-test',
  templateUrl: './app-test.component.html',
  styleUrls: ['./app-test.component.css']
})
export class TestComponent implements OnInit {

  currentImg;

  constructor() { 
      this.currentImg = "assets/images/tom1.jpg";
  }

  ngOnInit() {
  }

}
```

> Property binding is done with brackets [src]

Another example:
```
<button [disabled]=isDisabled>test-button</button>
```

```
import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  isDisabled = true;
}
```
The button is disabled when isDisabled property in the class is true.

Property binding is also done in 1 direction (one-way binding).

Alert:
> Property binding does not bind with HTML attributes, but with the properties of the DOM objects (Most of the time attributes and properties have the same name, but this is not always the case!)


e.g. if you want to bind with the text of a button, you need to use the textContent property of the DOM object:
```
<button [textContent]="myText">
```
Check out this site: https://www.w3schools.com/jsref/dom_obj_all.asp

# Event Binding

With event binding you can fire an event from the HTML template to the components class.

E.g. the click event:
```
<button (click)="DoSomething()">test-button</button>
```
In the components class:
```
import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  DoSomething(){
    console.log("ok");
  }
}
```

You also can find out specific event data by passing the eventobject ($event):

```
<div (mousemove)="DoSomething($event)"style="border:1px solid black">

  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem veritatis saepe quod possimus iste amet ad eveniet, dolorum consequuntur provident architecto voluptates quo. Maiores quidem provident eveniet id quas. Ea.
</div>
```


```
import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  DoSomething(arg){
    console.log(arg);
  }
}
```

More info on the event object parameter at:
https://www.w3.org/TR/uievents/#mouseevent

## Template reference variables

A template reference variable is a local variable inside the scope of the HTML template (use the hashtag #):
```
<input #in1 type="text" value="Tom">
<button (click)="DoSomething(in1.value)">CLICK HER</button>
```
In the components class:
```
import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  DoSomething(arg){
    console.log(arg);
  }
}
```

# Two-way binding

Two-way binding is mostly used when the user can give any input. 

If you want to use two-way binding, you have to make use of the ngModel keyword. To use this keyword you need to import the FormsModule in e.g. the app.module.ts:

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## example of two-way binding
```
<input type="text" [(ngModel)]="name">
{{name}}
```
The components class:

```
import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  name:string = "Tom"; 
}
```

You use the banana in the box syntax: 
[(ngModel)]="PROPERTY"

The angular frameworks takes care of the synchronisation between the input value and the property.

### Another example

We use a select element, to give the user some options:
```
<select [(ngModel)]="selectedElement">
  <option value="1">red</option>
  <option value="2">blue</option>
  <option value="3">green</option>
</select>

{{selectedElement}}
```
The code behind:
```
import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  selectedElement:number = 2;
  
}
```

If the user changes the selection, the property will be changed automatically, and visa versa if the property is changed, the select element will be adjusted.


# Parent - Child Components

## From Parent to child

You can share data between parent and child components. You can use external properties:
e.g. : @Input title:string;

### An example

We make a user class (ng generate class user):
```
export class User {

    constructor(public LastName:string, public FirstName:string){}
}
```

We make two components:
- parent component
- child component

### Child component

#### the component class: 
- Check the Input() variable.
- To use the Input() variable you need to import Input from @angular/core.
```
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input() theUser:User;
  constructor() { }

  ngOnInit() {
  }

}
```
#### The template
```
My User:
<p>
  {{theUser | json}}
</p>
```

## The parent class

Here we create a list of Users and push some example users into:
```
import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})

export class ParentComponent implements OnInit {

  lijst:User[]
  constructor() {
    this.lijst = [];
    this.lijst.push(new User("Super","Man"));
    this.lijst.push(new User("Bat","Woman"));
    this.lijst.push(new User("Spider","Man"));
   }

  ngOnInit() {
  }

}
```
#### The parent template
```
<app-child *ngFor="let user of lijst" [theUser]="user"></app-child>
```
In the parent component, we use the child component. The child component gets a user from the parent.
This code will send the inputPropValue from the parent component to the child and it will have the value we have set in the parent component when it arrives there.

## Parent listens for child event

The child component exposes an EventEmitter property with which it emits events when something happens. The parent binds to that event property and reacts to those events. The child's EventEmitter property is an output property, typically adorned with an @Output decoration.

### The child

The component class: 
```
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input() theUser:User;
  @Output() onClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  DoSomething(){   
    this.onClicked.emit("Hello");
  }

}
```
The Template:
```
My User:
<p>
  {{theUser | json}}

  <button (click)="DoSomething()">CLICK HERE</button>
</p>
```
The parent Template:
```
<app-child *ngFor="let user of lijst" [theUser]="user" (onClicked)="clicked($event)"></app-child>
```
Clicking a button triggers emission of a string (the string payload).
The parent component binds an event handler (onClicked) that responds to the child event payload ($event).


The parent class:
```
import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  lijst:User[]
  constructor() {
    this.lijst = [];
    this.lijst.push(new User("Super","Man"));
    this.lijst.push(new User("Bat","Woman"));
    this.lijst.push(new User("Spider","Man"));
   }

  ngOnInit() {
  }

  clicked(arg){
    console.log(arg + "from child to parent");
  }

}
```
## Parent interacts with child via local variable

A parent component cannot use data binding to read child properties or invoke child methods. We can do both by creating a template reference variable for the child element and then reference that variable within the parent template as seen in the following example:

The parent component cannot data bind to the child's start method.
We can place a local variable (#child) on the tag representing the child component. That gives us a reference to the child component itself and the ability to access any of its properties or methods from within the parent

Let's change our parent template and class:
```
<app-child #child [theUser]="user" (onClicked)="clicked($event)"></app-child>
<button (click)="child.Start()">start</button>
```

```
import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  user:User;
  
  constructor() {
    
    this.user = new User("Super","Man");
  
  }

  ngOnInit() {
  }

  clicked(arg){
    console.log(arg + "from child to parent");
  }

}
```

In the child component class you define the start method, e.g. :
  ```
  Start(){
    console.log("started");
  }
```

## Parent calls a ViewChild

The local variable approach is simple and easy. But it is limited because the parent-child wiring must be done entirely within the parent template. The parent component itself has no access to the child. We can't use the local variable technique if an instance of the parent component class must read or write child component values or must call child component methods. When the parent component class requires that kind of access, we inject the child component into the parent as a ViewChild.

The components class:
```
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  @ViewChild(ChildComponent)  
  private childComponent: ChildComponent; 
  user:User;
  
  constructor() {
    
    this.user = new User("Super","Man");  
  }

  ngOnInit() {
  }

  clicked(arg){
    this.childComponent.Start();
  }

}
```
We import references to the ViewChild decorator and the AfterViewInit lifecycle hook.
We inject the child ChildComponent into the private childComponent property via the @ViewChild property decoration.
The template reference local variable is gone from the component metadata. Instead we bind the buttons to the parent component's own start method.
These methods access the injected child component directly.






