import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndexComponent } from './pages/';
import { UrlProviderService } from './service/url-provider.service';
import { SwustCesiumMapComponent, RightPanelComponent } from './components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { LayoutModule } from '@progress/kendo-angular-layout';

@NgModule({
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        DialogsModule,
        LayoutModule,
        BrowserAnimationsModule
    ],
    exports: [],
    declarations: [
        IndexComponent,
        SwustCesiumMapComponent,
        RightPanelComponent
    ],
    providers: [UrlProviderService],
    bootstrap: [IndexComponent]
})
export class AppModule { }

