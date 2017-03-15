import {expect} from "chai";
import {Observable, Subject, BehaviorSubject, ReplaySubject} from "../src/rxjs";

describe('Rxjs', () => {
  describe('Subject', () => {
    var subject = new Subject();

    describe('Is an observable', () => {
      it('Should have a subscribe function', () => {
        expect(subject.subscribe).to.be.a('function');
      });
    });

    describe('Is an observer', () => {
      it('Is an observer', () => {
        expect(subject.next).to.be.a('function');
        expect(subject.error).to.be.a('function');
        expect(subject.complete).to.be.a('function');
      });

      it('Has a collection of observers', () => {   
        expect(subject.observers).deep.equals([]);
      });
    });

    describe('Using a subject', () => {
      it('Should sync the streams', (done) => {
        const source$ = Observable.interval(10);
        const subject = new Subject();
       
        source$.subscribe(subject);
       
        let lastValue = 0;
       
        subject.subscribe(value => {
          lastValue = value
        });
       
        setTimeout(() => {
          subject.subscribe(value => {
            expect(value).equals(lastValue);
          });
          done();
        }, 20)
      });
    });

  });

  describe('Behavior Subject', () => {
    it('Should receive a value as soon as it subscribes', (done) => {
      const source$ = Observable.interval(10);
      const behaviorSubject = new BehaviorSubject();

      source$.subscribe(behaviorSubject);

      let lastValue = undefined;

      behaviorSubject.subscribe(value => lastValue = value);

      setTimeout(() => {
        expect(lastValue).equals(0);
        done();
      }, 5);
    });
  });

  describe('Replay Subject', () => {
    describe('Building a replay Subject', () => {
      it('Should be a function', () => {
        expect(ReplaySubject).to.be.a('function');
      });
    });

    describe('Using a replay subject', () => {
      it('Should receive the n last values when it subscribes', (done) => {
        const source = Observable.interval(100);
        const replaySubject = new ReplaySubject(2);

        source.subscribe(replaySubject);
        let lastValues = [];

        setTimeout(() => {
          replaySubject.subscribe(value => lastValues = [...lastValues, value]);
        }, 310);

        setTimeout(() => {
          expect(lastValues).deep.equals([2, 3]);
          done();
        }, 350)
      });

      it('Should receive all the previous values when it subscribes if no argument is passed', (done) => {
        const source = Observable.interval(100);
        const replaySubject = new ReplaySubject();

        let lastValues = [];
        source.subscribe(replaySubject);

        setTimeout(() => {
          replaySubject.subscribe(value => lastValues = [...lastValues, value]);
        }, 310);

        setTimeout(() => {
          expect(lastValues).deep.equals([0, 1, 2, 3])
          done();
        }, 350)
      });
    });
  });

  describe('Builing rxjs\' share method', () => {
    it('Should be a method of Observable', () => {
      const myObservable = new Observable();
      expect(myObservable.share).to.be.a('function');
    });

    it('Should sync the streams', (done) => {
      const timer$ = Observable.interval(100).share();
      let lastValue = 0;
      timer$.subscribe(value => lastValue = value);
      setTimeout(() => {
        timer$.subscribe(value => {
          expect(value).equals(lastValue);
        });
        done();
      }, 300);
    });
  });
});
