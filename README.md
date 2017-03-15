# hackjam.rxjs: Subject
Rebuild rxjs' Subject from scratch.

## Getting started
```bash
git clone whereverthisrepowillbehostedat
git checkout subject-starting-point
cd hackjam.rxjs
yarn start
# Edit src/rxjs.js to make the tests in test/rxjs.spec.js pass
# Happy Hacking ! 🎉
```

##  Introduction
### Problem
Lets say we have an observable that emits a new value every second.

If I subscribe to that stream then subscribe again a few moments later what do you think will happen?
```JavaScript
import Rx from 'rxjs';
const timer$ = Rx.Observable.interval(1000);

// My first observer
timer$.subscribe((value) => {
  console.log(value, 'Observer A');
});

// My 2nd observer
setTimeout(() => {
  console.log(value, 'Observer B');
}, 3000);
```
#### Output:
![](https://i.imgur.com/pK59iKM.gif)
![](http://i.imgur.com/3nc1QDL.png)

That's right, streams are out of sync 😑. When you re-subscribe you get the values from the begining instead of getting the next value.

### Solution
Rxjs gives us a nice way of solving this issue. The .share() method.

```JavaScript
import Rx from 'rxjs';
const timer$ = Rx.Observable.interval(1000).share();

// My first observer
timer$.subscribe((value) => {
  console.log(value, 'Observer A');
});

// My 2nd observer
setTimeout(() => {
  console.log(value, 'Observer B');
}, 3000);
```
#### Output: 
![](https://i.imgur.com/rJj6J6Z.gif)
![](http://i.imgur.com/VTLmQJQ.png)

And now our streams are synced !

## What we want you to build:
Using the previous version of RxJS you guys built (You dont need to dig in your folders to find it, we're nice people and we included that for you 🙌):
- A Subject that will allow you to sync the streams.
- A Behavior subject, it'll act the same way the subject does but when an observer subscribes it should receive a value without having to wait for the next one.
- A Replay subject that allows you to replay the n last values when you subscribe.