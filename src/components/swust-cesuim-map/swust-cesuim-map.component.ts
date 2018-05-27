import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UrlProviderService } from '../../service/url-provider.service';
import { Models } from './modelList';
import * as Rx from 'rxjs/';

@Component({
    selector: 'app-swust-cesium',
    templateUrl: './swust-cesuim-map.component.html',
    styleUrls: ['./swust-cesuim-map.component.scss']
})

export class SwustCesiumMapComponent implements OnInit {
    private mapContainer: Cesium.Viewer;
    private modelDisplayOperation: string;
    private showModel = true;

    private mapLoadComplete$ = new Rx.ReplaySubject<void>(1);
    private modelDisplayState$ = new Rx.Subject<boolean>();

    constructor(
        private urlProvider: UrlProviderService,
    ) { }

    ngOnInit() {
        this.InitEvent();

        this.InitMap();
    }

    private InitMap(): any {
        const terrainProvider = new Cesium.CesiumTerrainProvider({
            url: this.urlProvider.swustTerrainProviderUrl
        });

        const imageryProvider = new Cesium.UrlTemplateImageryProvider({
            url: this.urlProvider.swustImageProviderUrl,
            credit: new Cesium.Credit('swust'),
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

        this.mapLoadComplete$.next(null);
        this.modelDisplayState$.next(this.showModel);
    }

    private InitEvent() {
        this.mapLoadComplete$
            .subscribe(() => {
                this.flyToSwust();
                this.Load3dModel();
            });

        this.modelDisplayState$
            .subscribe((display) => {
                this.modelDisplayOperation = display ? 'Hide Model' : 'Show Model';
                this.mapContainer.scene.primitives.show = display;
            });
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

    private switchModelDisplayState() {
        this.showModel = !this.showModel;
        this.modelDisplayState$.next(this.showModel);
    }

    private flyToSwust() {
        const swust = Cesium.Cartesian3.fromDegrees(104.6951400, 31.5349400, 3000);
        this.mapContainer.camera.flyTo({
            destination: swust
        });
    }
}
