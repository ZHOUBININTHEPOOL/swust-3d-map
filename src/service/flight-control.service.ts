import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/';
import { FlightState } from '../entity';

@Injectable()
export class FlightControlService {
  public height$ = new Rx.BehaviorSubject<number>(20);
  public newRoute$ = new Rx.Subject();
  public points$ = new Rx.ReplaySubject<Cesium.Cartographic[]>(1);
  public viewFollowType$ = new Rx.ReplaySubject<string>(1);
  public exitFlight$ = new Rx.Subject();

  public state$ = Rx.Observable.combineLatest<FlightState>(
    this.points$,
    this.height$,
    (points, height) => ({ route: points, height: height })
  );
  constructor() {}
}
