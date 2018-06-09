import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, BehaviorSubject } from 'rxjs/';
import { combineLatest } from 'rxjs/operators';
import { FlightState } from '../entity';

@Injectable()
export class FlightControlService {
  public height$ = new BehaviorSubject<number>(20);
  public newRoute$ = new Subject();
  public points$ = new ReplaySubject<Cesium.Cartographic[]>(1);
  public viewFollowType$ = new ReplaySubject<string>(1);
  public exitFlight$ = new Subject();

  public state$ = this.points$.pipe(
    combineLatest( this.height$, (points, height) => ({ route: points, height: height }))
  );
  constructor() {}
}
