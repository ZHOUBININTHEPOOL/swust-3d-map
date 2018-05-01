import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class UrlProviderService implements OnInit {
    public swustDemProviderUrl: string;
    public swustImageProviderUrl: string;

    constructor() { }

    ngOnInit(): void {
        if (environment.production) {
            this.setProductionUrl();
        } else {
            this.setDevelopmentUrl();
        }
    }

    private setDevelopmentUrl(): void {
    }

    private setProductionUrl(): void {
        this.swustDemProviderUrl = 'http://localhost:5566/AMap-Satellite/dem';
        this.swustImageProviderUrl = '# NOT IMPLEMENT #';
    }
}
