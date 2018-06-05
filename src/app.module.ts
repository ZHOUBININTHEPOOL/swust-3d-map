import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './pages/';
import { RightPanelComponent } from './components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DisasterModelService } from './service/disaster-model.service';
import { SwustCesiumMapModule } from './components/swust-cesuim-map/swust-cesium-map.module';
import { FlightControlService } from './service/flight-control.service';

@NgModule({
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        LayoutModule,
        BrowserAnimationsModule,
        SwustCesiumMapModule,
        DropDownsModule
    ],
    exports: [],
    declarations: [
        IndexComponent,
        RightPanelComponent
    ],
    providers: [DisasterModelService, FlightControlService],
    bootstrap: [IndexComponent]
})
export class AppModule { }

