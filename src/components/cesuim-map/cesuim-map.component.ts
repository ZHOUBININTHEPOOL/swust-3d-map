import { Component, OnInit, ElementRef } from '@angular/core';

import './cesuim-map.component.less';

@Component({
    selector: 'app-cesium-map',
    templateUrl: 'cesuim-map.component.html'
})

export class CesiumMapComponent implements OnInit {
    private mapContainer: Element;

    constructor() { }

    ngOnInit() {
        this.mapContainer = new Cesium.Viewer('cesium-container', {

        });
    }
}
