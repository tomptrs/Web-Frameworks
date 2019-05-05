# Angular Material

Material is an adaptable system of guidelines, components, and tools that support the best practices of user interface design. Backed by open-source code, Material streamlines collaboration between designers and developers, and helps teams quickly build beautiful products. It is developed by Google.
Material Design is a visual language that synthesizes the classic principles of good design with the innovation of technology and science.

https://material.angular.io/

## Get started

- Step 1: https://material.angular.io/guide/getting-started
- Step 2:

Make  a different file called material.module.ts. Here you keep all the material Module dependencies.

```
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import {MatButtonModule,MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule,
MatIconModule} from '@angular/material';

@NgModule({

imports: [MatButtonModule, MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule,MatIconModule],

exports: [MatButtonModule, MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule, MatIconModule]

})

export class MaterialModule{}
```



Now add the material.module.ts file in app.module.ts :

```
import { MaterialModule } from "./material/material.module";

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

providers: [DataService],

bootstrap: [AppComponent]

})

export class AppModule { }

```

## Using Angular Material components example:

https://material.angular.io/

```
<form class="example-form">
  <mat-form-field class="example-full-width">
    <input matInput placeholder="Favorite food" value="Sushi">
  </mat-form-field>

  <mat-form-field class="example-full-width">
    <textarea matInput placeholder="Leave a comment"></textarea>
  </mat-form-field>
</form>
 ```
