import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UrlProviderService } from '../../service/url-provider.service';

import './swust-cesuim-map.component.less';

@Component({
    selector: 'app-swust-cesium',
    templateUrl: './swust-cesuim-map.component.html',
})

export class SwustCesiumMapComponent implements OnInit {
    private mapContainer: Cesium.CesiumWidget;

    constructor(
        private urlProvider: UrlProviderService,
    ) { }

    ngOnInit() {
        this.InitMap();

        this.AddWidget();
    }

    InitMap(): any {
        const terrainProvider = new Cesium.CesiumTerrainProvider({
            url: 'http://localhost:5566/dem'
        });

        const imageryProvider = new Cesium.UrlTemplateImageryProvider({
            url: 'http://localhost:5566/cesium-swust-tiles/{z}/{x}/{y}.jpg',
            credit: new Cesium.Credit('西科大卫星全景图'),
            tilingScheme: new Cesium.WebMercatorTilingScheme(),
            maximumLevel: 18
        });

        this.mapContainer = new Cesium.CesiumWidget('cesiumContainer', {
            terrainProvider: terrainProvider,
            imageryProvider: imageryProvider,
        });

        const swust = Cesium.Cartesian3.fromDegrees(104.6951400, 31.5349400, 5000);
        setTimeout(() => {
            this.mapContainer.camera.flyTo({
                destination: swust,
            });
        }, 3000);
    }

    AddWidget(): any {

    }
}
