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
  }
}


Observable.interval = (milliseconds) => {
  const producer = (observer) => {
    observer.next(0);
    let c = 1;
    const id = setInterval(() => {
      observer.next(c++);
    }, milliseconds);
    return () => clearInterval(id); 
  }
  return new Observable(producer);
}

export const Subject = () => ({

});

export const BehaviorSubject = () => ({

});

export const ReplaySubject = () => ({

});
