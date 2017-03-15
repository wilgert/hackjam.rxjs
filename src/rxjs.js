// a observable is a function that accepte  an producer in parameter and have a subscribe method
// a producer is  a function that throws/produce values and accept an observer
// a observer is just an object that have 3 function : next, error, complete
//  and listen the value emitted  by the producer

export function Observable(producer) {
    this._producer = producer;
    this.subscribe = (next, error, complete) => {
        const observer = (typeof next !== 'function')
            ? next
            : {next, error, complete};
        return this._producer(observer);
    };
    this.share = ()=>{
      const subject = new Subject();
      this.subscribe(subject);
      return subject;
    };
}


Observable.interval = (milliseconds) => {
    const producer = (observer) => {
        observer.next(0);
        let c = 1;
        const id = setInterval(() => {
            observer.next(c++);
        }, milliseconds);
        return () => clearInterval(id);
    };
    return new Observable(producer);
}


export class Subject{
    observers = [];

    subscribe(observer) {
        this.observers.push(observer);
    }

    next(val){
        this.observers.forEach((observer) => {
            this.callNext(observer, val);
        });
    }

    error(){

    }

    complete(){

    }

    callNext(observer, val){
        if(typeof observer === 'function'){
            observer(val);
        }else{
            observer.next && observer.next(val);
        }
    }
}

export class BehaviorSubject extends Subject {
    lastValue;

    subscribe(observer){
        super.subscribe(observer);
        if(this.lastValue!==undefined){
            this.callNext(observer, this.lastValue)
        }
    }

    next(val){
        super.next(val);

        this.lastValue = val;
    }
}

export class ReplaySubject extends Subject {
    previousValues = [];

    constructor(maxNumberOfValues){
       super();
       this.maxNumberOfValues = maxNumberOfValues;
    }

    next(val){
        super.next(val);
        this.previousValues.push(val);
        this.previousValues = this.previousValues.slice(-this.maxNumberOfValues)
    }

    subscribe(observer){
        super.subscribe(observer);
        this.previousValues.forEach(val => {
            this.callNext(observer, val);
        });
    }
}
