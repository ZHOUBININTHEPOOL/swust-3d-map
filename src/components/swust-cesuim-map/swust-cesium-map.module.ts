import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { SwustCesiumMapComponent } from './swust-cesuim-map.component';
import { UrlProviderService } from '../../service/url-provider.service';

import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogModule } from '@progress/kendo-angular-dialog';

import {
  PlumeDialogComponent,
  PuffDialogComponent,
  SteamCloudDialogComponent,
  PoolFireDialogComponent
} from '../';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    InputsModule,
    DialogModule
  ],
  exports: [SwustCesiumMapComponent],
  declarations: [
    PlumeDialogComponent,
    PuffDialogComponent,
    SteamCloudDialogComponent,
    PoolFireDialogComponent,
    SwustCesiumMapComponent
  ],
  providers: [UrlProviderService]
})
export class SwustCesiumMapModule {}
