# Introduction

The data for our application is on a server somewhere or in the cloud. How do we get that data into our view?
we learn how to use HTTP with observables to retrieve data. Most Angular applications obtain data using HTTP. The application issues an HTTP GET request to a web service. That web service retrieves the data, often using a database, and returns it to the application in an HTTP response. The application then processes that data. 

Data sequences can take many forms, such as a response from a back-end web service, a set of system notifications or a stream of events, such as user input. 
Reactive extensions represent a data sequence as an observable sequence, commonly just called an observable. Observables help us manage asynchronous data, such as data coming from a back-end service. Observables treat events as a collection. We can think of an observable as an array whose items arrive asynchronously over time. A method in our code can subscribe to an observable to receive asynchronous notifications as new data arrives. The method can then react as data is pushed to it. The method is notified when there is no more data or when an error occurs. Observables are used within Angular itself, including Angular's event system and its HTTP client service. 

# Creating Angular Observables

Use the Observables constructor to create an observable stream of any type. The constructor takes as its argument the subscriber function to run when the observable’s subscribe()  method executes. The subscriber function receives an Observer object and can publish the values to the observer’s next() method.

```
let one = new Observable(observer => {

    
      observer.next(111);
      observer.complete();
    });

```

Use the Observable constructor to create an observable stream of any type. The constructor takes as its argument the subscriber function to run when the observable’s subscribe() method executes. A subscriber function receives an Observer object, and can publish values to the observer's next() method.

So, here we have done is first import the Observable from rxjs. Then defined one function that will return an observable. The observable object gets one argument that has a timeout function. So after 1 second, it will produce the whole student’s array if the subscriber subscribes the observable.

In simple terms, here studentObservable are publishing our primary data array that is students. So if any entity needs to get the values out of observable, then it first needs to subscribe that observable and then studentObservable starts to publish the values, and then subscriber get the values.
```
 one.subscribe((result)=>{
      console.log(result);
    });

```
The subscribe() method can accept callback function definitions in line, for next, error, and complete handlers. For example, the following subscribe() call is the same as the one that specifies the predefined observer:
```
myObservable.subscribe(
  x => console.log('Observer got a next value: ' + x),
  err => console.error('Observer got an error: ' + err),
  () => console.log('Observer got a complete notification')
);
```

Or you alternatively can work with an observer object

```
const myObserver = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};
 
// Execute with the observer object
myObservable.subscribe(myObserver);

```

## An example:


```
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  constructor() 
  {

    this.LevelOne(10).subscribe((result)=>{
      console.log(result);
      }, (msg)=>{
      console.log(msg);
      },()=>{
      console.log("completed");
    });

    this.LevelOne(20).subscribe({
      next:(value)=>{
        console.log(value);
      },
      error:(err)=>{
        console.log(err);
      },
      complete:()=>{
        console.log("complete");
      }
    })
   }

  ngOnInit() {
  }

  LevelOne(value):Observable<number>{

    let one = new Observable<number>(observer => {

      setTimeout(()=>{
        let newScore = value+20;     
        observer.next(newScore);
        observer.error("HELP..ERROR");
        observer.complete();
        }, 2000); 
    
    });
    
    return one;
  }

}


```

## Difference Promise and Observable

https://medium.com/@mpodlasin/promises-vs-observables-4c123c51fe13


E.G.:

#### The dataservice:


```
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { 

  }

  DoPromise(){

    let numberPromise = new Promise((resolve) => {
      
      setInterval( ()=>{
        let g = Math.floor(Math.random()*10);
        resolve(g);
      },2000)
 
    });

    return numberPromise;

  }


  DoObservable(){

    let obs = new Observable((observer) => {
      
      setInterval( ()=>{
        let g = Math.floor(Math.random()*10);
        observer.next(g);
      },2000)
 
    });

    return obs;

  }

}


```

### The component

```
import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private service: DataService){

    this.service.DoPromise().then((data)=>{
      console.log(data);
    })


    this.service.DoObservable().subscribe((data)=>{
      console.log(data);
    })
  } 
}

```
