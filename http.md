# Introduction

Most front-end applications communicate with backend services over the HTTP protocol. The HttpClient in @angular/common/http offers a simplified client HTTP API for Angular applications that rests on the XMLHttpRequest interface exposed by browsers. 

Angular provides an HTTP service that allows us to communicate with a back-end web server using the familiar HTTP request and response protocol. For example, we call a get method of the HTTP service, which in turn sends a GET request to the web server. The web server response is returned from the HTTP service to our own service class as an observable. 

## Setup

Before you can use the HttpClient, you need to import the Angular HttpClientModule. Most apps do so in the root AppModule.

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


```


In your service, you use dependency injection for the http service:



```
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  
  constructor(private http:HttpClientModule) { }   
}


```

## Implementation of the service

```
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  
  constructor(private http:HttpClient) { }


  GetQuoteOfTheDay(){

    let observable = this.http.get("http://quotes.rest/qod.json");
    return observable;

  }   
}


```

Because the service method returns an Observable of any data, the component subscribes to the method's return value. The subscription callback copies the data fields into the component's variable, which can be databound in the component template for display.

How to retrieve the data in the component:

```
 GetQuoteOfTheDay(){
    this.myservice.GetQuoteOfTheDay().subscribe({
      next:(result)=>{
        console.log("result of HTTP call in service")
        console.log(result);
      }
    })
  }
  

```

## Type-checking the response

Instead of requesting data from the service as an any type, you can get typed information. If you browse e.g. to http://quotes.rest/qod.json , you get the quote of the day as JSON data:



```
{
    "success": {
        "total": 1
    },
    "contents": {
        "quotes": [
            {
                "quote": "If you respect yourself in stressful situations, it will help you see the positive… It will help you see the message in the mess.",
                "length": "135",
                "author": "Steve Maraboli",
                "tags": [
                    "inspire",
                    "self-respect",
                    "stress"
                ],
                "category": "inspire",
                "date": "2019-05-10",
                "permalink": "https://theysaidso.com/quote/nwW3g7V0xszGDNIehz6yTgeF/steve-maraboli-if-you-respect-yourself-in-stressful-situations-it-will-help-you",
                "title": "Inspiring Quote of the day",
                "background": "https://theysaidso.com/img/bgs/man_on_the_mountain.jpg",
                "id": "nwW3g7V0xszGDNIehz6yTgeF"
            }
        ],
        "copyright": "2017-19 theysaidso.com"
    }
}


```

Go to http://json2ts.com/ and paste the json data string into the text field. The site generates typescript interfaces/classes for you.



```
    export interface Success {
        total: number;
    }

    export interface Quote {
        quote: string;
        length: string;
        author: string;
        tags: string[];
        category: string;
        date: string;
        permalink: string;
        title: string;
        background: string;
        id: string;
    }

    export interface Contents {
        quotes: Quote[];
        copyright: string;
    }

    export interface RootObject {
        success: Success;
        contents: Contents;
    }


```

Now you can add the interfaces/classes in your angular project and import the classes where needed. E.g. 



```
My service looks like:

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootObject } from 'src/classes/quote';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  
  constructor(private http:HttpClient) { }

  GetQuoteOfTheDay(){
    let observable = this.http.get("http://quotes.rest/qod.json");
    return observable;
  }


  GetQuoteOfTheDayTyped():Observable<RootObject>{
    return this.http.get<RootObject>("http://quotes.rest/qod.json");
  }
   
}


```
And in my component I created following method:


```
  GetQuoteOfTheDayTyped(){

    this.myservice.GetQuoteOfTheDayTyped().subscribe({
      next:(result)=>{       
        let root:RootObject = result;   

        let myQuotes:Quote[] = root.contents.quotes;
        console.log(myQuotes);
        console.log(myQuotes[0]);
      }
    })
  }



```











