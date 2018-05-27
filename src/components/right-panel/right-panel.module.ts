import { NgModule } from '@angular/core';

import { RightPanelComponent } from './right-panel.component';
import { DisasterModelService } from '../../service/disaster-model.service';

import {
  PlumeDialogComponent,
  PuffDialogComponent,
  SteamCloudDialogComponent,
  PoolFireDialogComponent
} from '../';

@NgModule({
  imports: [],
  exports: [RightPanelComponent],
  declarations: [
    PlumeDialogComponent,
    PuffDialogComponent,
    SteamCloudDialogComponent,
    PoolFireDialogComponent
  ],
  providers: [DisasterModelService]
})
export class RightPanelModule {}
