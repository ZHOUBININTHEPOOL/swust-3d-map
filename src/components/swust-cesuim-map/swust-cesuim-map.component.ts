import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UrlProviderService } from '../../service/url-provider.service';
import { Models } from './modelList';
import * as Rx from 'rxjs/';
import { DisasterModelService } from '../../service/disaster-model.service';
import { PlumeDialogComponent } from '../plume-dialog/plume-dialog.component';
import { PuffDialogComponent } from '../puff-dialogs/puff-dialog.component';
import { SteamCloudDialogComponent } from '../steam-cloud-dialog/steam-cloud-dialog.component';
import { PoolFireDialogComponent } from '../pool-fire-dialog/pool-fire-dialog.component';
import { DisasterType } from '../../entity';

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

  @ViewChild(PlumeDialogComponent) private plumeDialog: PlumeDialogComponent;
  @ViewChild(PuffDialogComponent) private puffDialog: PuffDialogComponent;
  @ViewChild(SteamCloudDialogComponent)
  private steamCloudDialog: SteamCloudDialogComponent;
  @ViewChild(PoolFireDialogComponent)
  private poolFireDialog: PoolFireDialogComponent;

  constructor(
    private urlProvider: UrlProviderService,
    private disasterSvc: DisasterModelService,
    private el: ElementRef
  ) {}

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
    this.mapLoadComplete$.subscribe(() => {
      this.flyToSwust();
      setTimeout(() => {
        this.Load3dModel();
      }, 7000);
    });

    this.modelDisplayState$.subscribe(display => {
      this.modelDisplayOperation = display ? 'Hide Model' : 'Show Model';
      this.mapContainer.scene.primitives.show = display;
    });

    this.handlerSelectPointEvent();

    this.handleDialogSubmit();
  }

  private handlerSelectPointEvent() {
    // 当有灾害类型流有数据传入时， 开始选点
    this.disasterSvc.disasterType$.subscribe(() => {
      const handler = this.mapContainer.screenSpaceEventHandler;

      this.el.nativeElement.querySelector('#cesiumContainer').style.cursor =
        'crosshair';

      handler.setInputAction((click: Cesium.PositionedEvent) => {
        const position = new Cesium.Cartesian3(
          click.position.x,
          click.position.y,
          500
        );

        this.disasterSvc.selectedPoint$.next(position);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

      handler.setInputAction(() => {
        this.el.nativeElement.querySelector('#cesiumContainer').style.cursor =
          '	auto';
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    });

    // 选点结束后 弹出框
    this.disasterSvc.selectedPoint$
      .withLatestFrom(
        this.disasterSvc.disasterType$,
        (v1, disasterType) => disasterType
      )
      .subscribe(type => {
        switch (type) {
          case DisasterType.Plume:
            this.plumeDialog.open();
            break;
          case DisasterType.Puff:
            this.puffDialog.open();
            break;
          case DisasterType.SteamCloud:
            this.steamCloudDialog.open();
            break;
          case DisasterType.PoolFire:
            this.poolFireDialog.open();
            break;
        }
      });
  }

  private handleDialogSubmit() {
    this.plumeDialog.clickSubmit
      .withLatestFrom(this.disasterSvc.selectedPoint$)
      .subscribe(([param, position]) => {
        const result = this.disasterSvc.Plume(position, param);
      });

    this.puffDialog.clickSubmit
      .withLatestFrom(this.disasterSvc.selectedPoint$)
      .subscribe(([param, position]) => {
        const result = this.disasterSvc.Puff(position, param);
      });

    this.steamCloudDialog.clickSubmit
      .withLatestFrom(this.disasterSvc.selectedPoint$)
      .subscribe(([param, position]) => {
        const result = this.disasterSvc.SteamCloud(position, param);
      });

    this.poolFireDialog.clickSubmit
      .withLatestFrom(this.disasterSvc.selectedPoint$)
      .subscribe(([param, position]) => {
        const result = this.disasterSvc.PoolFire(position, param);
      });
  }

  private Load3dModel() {
    Models.forEach(i => {
      const hpr = i.headingPitchRoll
        ? i.headingPitchRoll
        : new Cesium.HeadingPitchRoll();
      const model = this.mapContainer.scene.primitives.add(
        Cesium.Model.fromGltf({
          url: this.urlProvider.get3dModelUrl(i.name),
          modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
            i.postion,
            hpr
          ),
          shadows: true
        })
      );
    });
  }

  private switchModelDisplayState() {
    this.showModel = !this.showModel;
    this.modelDisplayState$.next(this.showModel);
  }

  private flyToSwust() {
    const swust = Cesium.Cartesian3.fromDegrees(104.69514, 31.53494, 3000);
    this.mapContainer.camera.flyTo({
      destination: swust
    });
  }
}
