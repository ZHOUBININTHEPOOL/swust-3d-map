import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IndexComponent } from './pages/';
import { CesiumDirective } from './direactive/';

@NgModule({
    imports: [BrowserModule],
    exports: [],
    declarations: [IndexComponent, CesiumDirective],
    providers: [],
    bootstrap: [IndexComponent]
})
export class AppModule { }

