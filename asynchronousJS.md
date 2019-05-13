# Introduction

In the synchronous model everything happens in a sequence one at a time. But in the asynchronous model, operations can start or finish in any order at any point in time. A function is called “asynchronously,” because the action finishes not now, but later. JavaScript has several possibilities how to deal with asynchronous functions

- callback
- promises
- async/await

# Callback

A callback function in its simplest terms is a function that is passed to another function, as a parameter. The callback function then gets executed inside the function where it is passed and the final result is returned to the caller.

The first possibility to do something asynchronous is using a callback method:

```
 GetAsyncFunction(getal,callback){
    setTimeout(()=>{
      getal*=2;
      callback(getal);
    },3000);
  }

```
If you do a call to this function, you will get the result only after 3 seconds. 
How can I deal with GetAsyncFunction(getal,callback)? 

```
  AsyncWithCallback(){
    GetAsyncFunction(10,(data)=>{
      console.log("na 3 seconde krijg ik dit resultaat terug");
      console.log(data);
    });
  }
```
Once inside AsyncWithCallback() function, we call the GetAsyncFunction with parameters as a number (10 in this case) and our callback function().
When we call GetAsyncFunction() inside AsyncWithCallback() function's scope, in an asynchronous way, javascript executes the function GetAsyncFunction() and the main thread keeps on going ahead with the remaining part of our code.

This means we can do all kind of operations like fetching data from an API, doing some math etc., everything which can be time-consuming and hence we won't be blocking our main thread for it. Once the function(GetAsyncFunction()) has done with its operations, it can execute the callback function we passed earlier (as an arrow function). This is an immensely useful feature of functional programming as callbacks lets us handle code asynchronously without us have to wait for a response. 

But Callbacks can get nasty if there are multiple levels of callbacks to be executed in a chain.

```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor() {

//nested!!!
    this.levelOne(0,(data)=>{
      this.levelTwo(data,(data)=>{
        this.levelThree(data,(data)=>{
          console.log("After level 3, your score = " + data);
        })
      });

    });

   }

  ngOnInit() {
  }

  
levelOne(value, callback) {

  setTimeout(()=>{
    let newScore = value+5;
    callback(newScore);
    }, 5000);
}

levelTwo(value, callback) {
  setTimeout(()=>{
    let newScore = value+5;
    callback(newScore);
    }, 5000);
}

levelThree(value, callback) {
  setTimeout(()=>{
    let newScore = value+5;
    callback(newScore);
    }, 5000);
}

}
```

Now just imagine what this code will become if we had to implement the same logic for another 10 levels. As the number of nested callback functions increases, it becomes tougher to read your code and even harder to debug. This is often affectionately known as a callback hell. 

Instead of using callbacks, you better use promises.

# Promises

Javascript started supporting Promises from ES6. Promises are basically objects representing the eventual completion (or failure) of an asynchronous operation, and its resulting value. you promise to send it to them when it’s published. 

```
GetAsyncFunctionWithPromise(getal){

    let p = new Promise((resolve,reject)=>{
      setTimeout(()=>{
        getal*=10;
        resolve(getal);
        }, 5000);
    });

    return p;
  }
```
  The function passed to new Promise is called the executor. When the promise is created, this executor function runs automatically. It contains the producing code, that should eventually produce a result. In this case it takes 5 seconds to multiply a number with 10.

```
 let pObject = this.GetAsyncFunctionWithPromise(9).then((result)=>{
      console.log("result after 5 seconds");
      console.log(result);
    });  
  }
```

Let's rewrite the nasty callback nested function:

```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.css']
})
export class PromiseComponent implements OnInit {

  constructor() {

    this.levelOne(0)
    .then(result=>{return this.levelTwo(result)})
    .then(result =>{ 
        return this.levelThree(result)})
    .then(result=>{
      console.log("endresult = " + result);
    });

   }

  ngOnInit() {
  }
  
levelOne(value) {
let p = new Promise((resolve,result)=>{
  setTimeout(()=>{
    let newScore = value+5;
    resolve(newScore);
    }, 2000);
  });
  return p;
}

levelTwo(value) {
  
  let p = new Promise((resolve,result)=>{
    setTimeout(()=>{
      let newScore = value+10;     
      resolve(newScore);
      }, 2000);
    });
    return p;
}

levelThree(value) {  
  let p = new Promise((resolve,result)=>{
    setTimeout(()=>{
      let newScore = value+20;     
      resolve(newScore);
      }, 2000);
    });
    return p;
}

}
```

We have re-wrote our level(One/Two/Three) functions to remove callbacks from the function param and instead of calling the callback function inside them, replaced with promises. we can simply call a .then() method on it and handle the result. We can chain multiple promises one after another with .then() chaining.
This makes the whole code much more readable and easier to understand in terms of what is happening, and then what happens next and so on.

# Async / Await

## Async
Async- await is being supported in javascript since ECMA2017. They allow you to write promise-based code as if it were synchronous code, but without blocking the main thread. They make your asynchronous code less "clever" and more readable.

There’s a special syntax to work with promises in a more comfortable fashion, called “async/await”. It’s surprisingly easy to understand and 

```
async function f() {
  return 1;
}
```

The word “async” before a function means one simple thing: a function always returns a promise. Even If a function actually returns a non-promise value, prepending the function definition with the “async” keyword directs JavaScript to automatically wrap that value in a resolved promise.

```
async function f() {
  return 1;
}

f().then(alert); // 1

```
## 
Await

It works only inside async functions!

```
let value = await promise;
```

The` keyword await makes JavaScript wait until that promise settles and returns its result.

```
async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });

  let result = await promise; // wait till the promise resolves (*)

  alert(result); // "done!"
}

f();
```

The function execution “pauses” at the line (*) and resumes when the promise settles, with result becoming its result. So the code above shows “done!” in one second.

Let’s emphasize: await literally makes JavaScript wait until the promise settles, and then go on with the result. That doesn’t cost any CPU resources, because the engine can do other jobs meanwhile: execute other scripts, handle events etc.

It’s just a more elegant syntax of getting the promise result than promise.then, easier to read and write.

## Async / Await example 
Now we wewrite our level function with async await:

```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-await',
  templateUrl: './await.component.html',
  styleUrls: ['./await.component.css']
})
export class AwaitComponent implements OnInit {

  
  constructor() {

   this.StartGame();

   }

  ngOnInit() {
  }

  async StartGame(){

    let result = await this.levelOne(0);
    result = await this.levelTwo(result);
    result = await this.levelThree(result);
    console.log("eindresult = " + result);

  }
  
levelOne(value) {
let p = new Promise((resolve,result)=>{
  setTimeout(()=>{
    let newScore = value+5;
    resolve(newScore);
    }, 2000);
  });
  return p;
}

levelTwo(value) {
  
  let p = new Promise((resolve,result)=>{
    setTimeout(()=>{
      let newScore = value+10;     
      resolve(newScore);
      }, 2000);
    });
    return p;
}

levelThree(value) {  
  let p = new Promise((resolve,result)=>{
    setTimeout(()=>{
      let newScore = value+20;     
      resolve(newScore);
      }, 2000);
    });
    return p;
}

}
```
