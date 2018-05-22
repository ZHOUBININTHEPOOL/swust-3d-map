import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UrlProviderService } from '../../service/url-provider.service';
import { Models } from './modelList';

@Component({
    selector: 'app-swust-cesium',
    templateUrl: './swust-cesuim-map.component.html',
    styleUrls: ['./swust-cesuim-map.component.less']
})

export class SwustCesiumMapComponent implements OnInit {
    private mapContainer: Cesium.Viewer;

    private mouseOverPoint = {
        longtitude: 0,
        latitude: 0,
        height: 0,
    };

    constructor(
        private urlProvider: UrlProviderService,
    ) { }

    ngOnInit() {
        this.InitMap();

        this.InitEvent();

        this.Load3dModel();
    }

    InitMap(): any {
        const terrainProvider = new Cesium.CesiumTerrainProvider({
            url: this.urlProvider.swustTerrainProviderUrl
        });

        const imageryProvider = new Cesium.UrlTemplateImageryProvider({
            url: this.urlProvider.swustImageProviderUrl,
            credit: new Cesium.Credit('西科大卫星全景图'),
            tilingScheme: new Cesium.WebMercatorTilingScheme(),
            maximumLevel: 18
        });

        this.mapContainer = new Cesium.Viewer('cesiumContainer', {
            terrainProvider: terrainProvider,
            imageryProvider: imageryProvider,
            animation: false,
            timeline: false,
            baseLayerPicker: false,
            navigationHelpButton: false,
            homeButton: false,
            sceneModePicker: false,
            geocoder: false,
            requestRenderMode: true
        });

        this.mapContainer.extend(Cesium.viewerCesiumInspectorMixin);

        // this.mapContainer.cesiumWidget.creditContainer.style.display = 'none';
        setTimeout(this.flyToSwust(), 3000);
    }

    private Load3dModel() {
        Models.forEach((i) => {
            const hpr = i.headingPitchRoll ? i.headingPitchRoll : new Cesium.HeadingPitchRoll();
            const model = this.mapContainer.scene.primitives.add(Cesium.Model.fromGltf({
                url: this.urlProvider.get3dModelUrl(i.name),
                modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(i.postion, hpr),
                shadows: true
            }));
        });
    }

    private InitEvent() {

        const testArray = [Cesium.Cartographic.fromDegrees(104.6866607666, 31.5377248954)];
        const promise = Cesium.sampleTerrainMostDetailed(this.mapContainer.terrainProvider, testArray);
    }

    private flyToSwust() {
        const swust = Cesium.Cartesian3.fromDegrees(104.6951400, 31.5349400, 3000);
        this.mapContainer.camera.flyTo({
            destination: swust,
        });
    }
}
