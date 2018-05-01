import { Component, OnInit, ElementRef } from '@angular/core';

import './cesuim-map.component.less';

@Component({
    selector: 'app-cesium-map',
    templateUrl: 'cesuim-map.component.html'
})

export class CesiumMapComponent implements OnInit {
    private mapContainer: any;

    constructor() { }

    ngOnInit() {
        const demProvider = new Cesium.CesiumTerrainProvider({
            url: 'http://localhost:5566/AMap-Satellite/dem'
        });

        this.mapContainer = new Cesium.Viewer('cesium-container', {
        });
    }
}
