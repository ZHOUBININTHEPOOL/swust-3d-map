import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IndexComponent } from './pages/';
import { UrlProviderService } from './service/url-provider.service';
import { SwustCesiumMapComponent } from './components';

@NgModule({
    imports: [
        BrowserModule
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

