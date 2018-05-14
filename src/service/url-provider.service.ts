import { Injectable, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class UrlProviderService implements OnInit {
    public swustTerrainProviderUrl: string;
    public swustImageProviderUrl: string;
    public imageryProvider: string;

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
        this.swustTerrainProviderUrl = 'http://localhost:5566/dem';
        this.swustImageProviderUrl = '# NOT IMPLEMENT #';
        this.imageryProvider = 'this.{s}.tianditu.com/Dataserver?T=img_w&x={x}&y={y}&l={z}';
    }
}
