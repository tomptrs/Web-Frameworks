# Template based Forms

## Setting up Angular Forms
Angular provides two ways for working with forms, the template-based forms and reactive forms. In this example, we'll be using template-based forms by including the FormsModule and by using directives such ngModel for data binding.
Open the src/app/auth/auth.module.ts file and import the FormsModule then add it in the importsarray of the module:



Creating the Registration Form: Using Template-based Forms with the ngModel, ngForm and ngSubmit Directives

In this section, we'll use Angular directives such as ngModel, ngForm and ngSubmit to create a template-based form for login:




<form #myform="ngForm" (ngSubmit)="login(myform)">



<input type="text" name="username" ngModel>

<input type="password" name="password" ngModel>

<input type="submit">Login

</form>



For each input control, we use the ngModel directive by itself to register the control as a child of the form.
For each input, we add a name attribute to the input control. This is required when using template-based forms and the ngModel directive.
We declare a template variable for the form using the #myform="ngForm" syntax. The variable myform becomes a reference to the NgForm instance which contains all the controls of the form.
Next, you need to define the login method that you passed in to the ngSubmit event of the form


login(form){



console.log(form.value);

}



We listen to the form ngSubmit event so when the user makes a form submission we execute the register(form) method which takes a reference to the NgForm instance that was submitted. We use the value attribute of NgForm to read the values of the form.

Now, if you fill your form and click on the register button you should see the values of the form printed on your browser's console as a JSON object.

Reactive Forms
Reactive forms use an explicit and immutable approach to managing the state of a form at a given point in time. Each change to the form state returns a new state, which maintains the integrity of the model between changes. 

Reactive forms differ from template-driven forms in distinct ways. Reactive forms provide more predictability with synchronous access to the data model, immutability with observable operators, and change tracking through observable streams. If you prefer direct access to modify data in your template, template-driven forms are less explicit because they rely on directives embedded in the template, along with mutable data to track changes asynchronously. 



Registering the Reactive Forms Module
We can use the reactive forms by importing ReactiveFormsModule from the @angular/forms package and add it to your app.module.ts file’s imports array. So add the module inside the app.module.ts file.



import { ReactiveFormsModule } from '@angular/forms';

@NgModule({

  imports: [

    // other imports ...

    ReactiveFormsModule

  ],

})



Add FormControl class
The FormControl class is the fundamental building block when using the reactive forms. If we want to register the single form control, we need to import the FormControl class into our component and create the new instance of a form control to save as the class property.



import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({

  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})

export class ReactiveformComponent implements OnInit {
  name = new FormControl('');
  constructor() { }

  ngOnInit() {

  }
}



Use the constructor  FormControl to set its initial value, which in this case is the name, and it is an empty string. By creating this control in your component class, you will get immediate access to listen, update, and validate the state of the form input and in our case it is name.


Registering the control into the template
After you create a control in the component class, you must associate it with the form control element in a template. Update that template with a form control using the formControl binding provided by a FormControlDirective included in the ReactiveFormsModule.



<label>

Name:

<input type="text" [formControl]="name">

</label>



Using a template binding syntax, the form control is now registered to an email input element in a template. A form control and the DOM element communicate with each other like the view reflects the changes in the model, and the model demonstrates the changes in the view. So this kind of feature called as a two way-data binding.

Updating the form control value

Reactive Forms have the methods to change the control’s value programmatically, which gives us the ability to update the value without any user interaction. The form control instance provides the setValue() method that updates a value of the form control and validates the structure of a value provided against the control’s structure.


UpdateName() {

this.name.setValue('Tom Peeters');

}







<label>

Name:

<input type="text" [formControl]="name">

</label>



Value is = {{name.value}}



<button (click)="UpdateName()">Update Name</button>




Grouping form controls

Just as a form control instance gives you control over a single input field, a form group instance tracks the form state of a group of form control instances (for example, a form). Each control in a form group instance is tracked by name when creating the form group. 

Creating a FormGroup instance
Create a property in the component class named persoonForm and set the property to a new form group instance. To initialize the form group, provide the constructor with an object of named keys mapped to their control.



import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';


@Component({

selector: 'app-reactivegroup',

templateUrl: './reactivegroup.component.html',

styleUrls: ['./reactivegroup.component.css']

})

export class ReactivegroupComponent implements OnInit {



persoonForm = new FormGroup({

voornaam: new FormControl(''),

achternaam: new FormControl(''),

leeftijd: new FormControl("")

});



constructor() { }



ngOnInit() {

}


The template


<form [formGroup]="persoonForm" (ngSubmit)="onSubmit()">

<label>

voornaam:

<input type="text" formControlName="voornaam">

</label>

<label>

achternaam:

<input type="text" formControlName="achternaam">

</label>



<label>

leeftijd:

<input type="number" formControlName="leeftijd">

</label>

<button type="submit">Submit</button>



</form>


Saving form data

The FormGroup directive listens for the submit event emitted by the form element and emits an ngSubmit event that you can bind to a callback function.

Add an ngSubmit event listener to the form tag with the onSubmit() callback method.

<form [formGroup]="persoonForm" (ngSubmit)="onSubmit()">
<button type="submit">Submit</button>



In the .ts class:



onSubmit(){

console.log(this.persoonForm.value);

}
