import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './pages/';
import { RightPanelComponent } from './components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DisasterModelService } from './service/disaster-model.service';
import { SwustCesiumMapModule } from './components/swust-cesuim-map/swust-cesium-map.module';

@NgModule({
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        LayoutModule,
        BrowserAnimationsModule,
        SwustCesiumMapModule
    ],
    exports: [],
    declarations: [
        IndexComponent,
        RightPanelComponent
    ],
    providers: [DisasterModelService],
    bootstrap: [IndexComponent]
})
export class AppModule { }

