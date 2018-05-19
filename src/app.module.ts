import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IndexComponent } from './pages/';
import { UrlProviderService } from './service/url-provider.service';
import { SwustCesiumMapComponent } from './components';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        BrowserModule,
        NgbModule.forRoot()
    ],
    exports: [],
    declarations: [
        IndexComponent,
        SwustCesiumMapComponent
    ],
    providers: [UrlProviderService],
    bootstrap: [IndexComponent]
})
export class AppModule { }

