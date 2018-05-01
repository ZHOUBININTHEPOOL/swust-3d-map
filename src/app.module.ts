import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IndexComponent } from './pages/';
import { CesiumDirective } from './direactive/';
import { UrlProviderService } from './service/url-provider.service';

@NgModule({
    imports: [BrowserModule],
    exports: [],
    declarations: [IndexComponent, CesiumDirective],
    providers: [UrlProviderService],
    bootstrap: [IndexComponent]
})
export class AppModule { }

