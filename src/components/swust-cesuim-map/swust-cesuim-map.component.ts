import { Component, OnInit, ElementRef } from '@angular/core';

import './cesuim-map.component.less';
import { UrlProviderService } from '../../service/url-provider.service';

@Component({
    selector: 'app-cesium-map',
    templateUrl: 'cesuim-map.component.html',
})

export class CesiumMapComponent implements OnInit {
    private viewer: any;

    constructor(
        private urlProvider: UrlProviderService
    ) { }

    ngOnInit() {
        const demProvider = new Cesium.CesiumTerrainProvider({
            url: this.urlProvider.swustDemProviderUrl
        });

        const imageryProvider = new Cesium.UrlTemplateImageryProvider({
            url: this.urlProvider.swustImageProviderUrl,
            credit: new Cesium.Credit('西科大卫星全景图'),
            subdomains: ['t15', 't16', 't17', 't18'],
            tilingScheme: new Cesium.WebMercatorTilingScheme(),
            maximumLevel: 18
        });

        this.viewer = new Cesium.Viewer('cesium-container', {
            terrainProvider: demProvider,
            imageryProvider: imageryProvider,
            baseLayerPicker: false
        });
    }
}
