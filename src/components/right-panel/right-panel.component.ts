import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { DisasterModelService } from '../../service/disaster-model.service';
import { FlightControlService } from '../../service/flight-control.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: 'right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  private flightHeightTextboxShow = false;
  private followTypes: string[] = ['顶视', '侧视', '跟随'];

  constructor(
    private disasterSvc: DisasterModelService,
    private flightControlSvc: FlightControlService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.initEvent();
  }

  private clickDisasterModel(modelType: string) {
    this.disasterSvc.disasterType$.next(modelType);
  }

  private initEvent() {}

  private onNewRouteClick() {
    this.flightControlSvc.newRoute$.next();
  }

  private switchFlightHeightTextbox() {
    this.flightHeightTextboxShow = true;
  }

  private submitHeight() {
    const height = parseInt(
      this.el.nativeElement.querySelector('#heightInput').value,
      10
    );
    this.flightControlSvc.height$.next(height);
    this.flightHeightTextboxShow = false;
  }

  private followTypeChange(value) {
    if (value) {
      this.flightControlSvc.viewFollowType$.next(value);
    }
  }

  private exitFlight() {
    this.flightControlSvc.exitFlight$.next([]);
  }
}
