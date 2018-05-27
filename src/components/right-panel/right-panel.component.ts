import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { DsiasterModelResult } from '../../entity';
import {
  SteamCloudDialogComponent,
  PoolFireDialogComponent,
  PlumeDialogComponent,
  PuffDialogComponent
} from '..';
import { DisasterModelService } from '../../service/disaster-model.service';

@Component({
  selector: 'app-right-panel',
  templateUrl: 'right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  @Output() disasterResult = new EventEmitter<Cesium.Geometry[]>();

  @ViewChild(PlumeDialogComponent)
  private plumeDialog: PlumeDialogComponent;
  @ViewChild(PuffDialogComponent)
  private puffDialog: PuffDialogComponent;
  @ViewChild(SteamCloudDialogComponent)
  private steamCloudDialog: SteamCloudDialogComponent;
  @ViewChild(PoolFireDialogComponent)
  private poolFireDialog: PoolFireDialogComponent;

  constructor(private disasterSvc: DisasterModelService) {}

  ngOnInit() {
    this.initEvent();
  }

  private clickDisasterModel(modelType: string) {
    switch (modelType) {
      case 'plume':
        this.plumeDialog.open();
        break;
      case 'puff':
        this.puffDialog.open();
        break;
      case 'steamCloud':
        this.steamCloudDialog.open();
        break;
      case 'poolFire':
        this.poolFireDialog.open();
        break;
    }
  }

  private initEvent() {
    this.plumeDialog.clickSubmit
      .subscribe((param) => {
        const result = this.disasterSvc.Plume(param);
        this.disasterResult.next(result);
      });

    this.puffDialog.clickSubmit
    .subscribe((param) => {
      const result = this.disasterSvc.Puff(param);
      this.disasterResult.next(result);
    });

    this.steamCloudDialog.clickSubmit
    .subscribe((param) => {
      const result = this.disasterSvc.Puff(param);
      this.disasterResult.next(result);
    });

    this.steamCloudDialog.clickSubmit
    .subscribe((param) => {
      const result = this.disasterSvc.Puff(param);
      this.disasterResult.next(result);
    });
  }
}
