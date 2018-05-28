import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { DisasterModelService } from '../../service/disaster-model.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: 'right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  constructor(private disasterSvc: DisasterModelService) {}

  ngOnInit() {
    this.initEvent();
  }

  private clickDisasterModel(modelType: string) {
    this.disasterSvc.disasterType$.next(modelType);
  }

  private initEvent() {}
}
