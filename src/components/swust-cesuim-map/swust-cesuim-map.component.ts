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
import { FlightControlService } from '../../service/flight-control.service';

@Component({
  selector: 'app-swust-cesium',
  templateUrl: './swust-cesuim-map.component.html',
  styleUrls: ['./swust-cesuim-map.component.scss']
})
export class SwustCesiumMapComponent implements OnInit {
  private mapContainer: Cesium.Viewer;
  modelDisplayOperation: string;
  private showModel = true;
  private routeStation: Cesium.Cartographic[] = [];

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
    private el: ElementRef,
    private flightControlSvc: FlightControlService
  ) {}

  ngOnInit() {
    this.InitEvent();

    this.InitMap();
  }

  private InitMap(): any {
    const terrainProvider = new Cesium.CesiumTerrainProvider({
      url: this.urlProvider.swustTerrainProviderUrl
    });

    const satelliteImageryProvider = new Cesium.ProviderViewModel({
      name: '卫星图',
      iconUrl: '../../assets/satelliteMap.png',
      tooltip: '',
      creationFunction: () => {
        return new Cesium.UrlTemplateImageryProvider({
          url: this.urlProvider.swustImageProviderUrl,
          maximumLevel: 18
        });
      }
    });

    const streetImageryProvider = new Cesium.ProviderViewModel({
      name: '街道图',
      iconUrl: '../../assets/streetMap.png',
      tooltip: '',
      creationFunction: () => {
        return new Cesium.UrlTemplateImageryProvider({
          url: this.urlProvider.swustStreetProviderUrl,
          maximumLevel: 18
        });
      }
    });

    const imageryViewModels = [satelliteImageryProvider, streetImageryProvider];

    this.mapContainer = new Cesium.Viewer('cesiumContainer', {
      terrainProvider: new Cesium.CesiumTerrainProvider({
        url: '//assets.agi.com/stk-terrain/world',
        requestVertexNormals: true
      }),
      baseLayerPicker: false,
      navigationHelpButton: false,
      homeButton: false,
      sceneModePicker: false,
      geocoder: false
    });

    const baseLayer = new Cesium.BaseLayerPicker('baseLayerSelector', {
      globe: this.mapContainer.scene.globe,
      imageryProviderViewModels: imageryViewModels
    });

    this.mapContainer.extend(Cesium.viewerCesiumNavigationMixin, {});
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

    this.modelDisplayState$.subscribe(state => {
      this.modelDisplayOperation = state ? '隐藏模型' : '显示模型';
      this.mapContainer.scene.primitives.show = state;
    });

    this.handleSelectPointEvent();

    this.handleDialogSubmit();

    this.handleFlightEvent();

    this.disasterSvc.result$.subscribe(entities => {
      entities.forEach(i => {
        this.mapContainer.entities.add(i);
      });
    });
  }

  private handleFlightEvent() {
    // 选点
    this.flightControlSvc.newRoute$.subscribe(() => {
      const handler = this.mapContainer.screenSpaceEventHandler;
      const pinBuilder = new Cesium.PinBuilder();

      this.el.nativeElement.querySelector('#cesiumContainer').style.cursor =
        'crosshair';
      this.cleanRouteStation();

      this.mapContainer.screenSpaceEventHandler.setInputAction(
        (movement: Cesium.PositionedEvent) => {
          const cartesian = this.mapContainer.camera.pickEllipsoid(
            movement.position,
            this.mapContainer.scene.globe.ellipsoid
          );

          const cartographic = this.mapContainer.scene.globe.ellipsoid.cartesianToCartographic(
            cartesian
          );

          let newPoint;
          Cesium.sampleTerrainMostDetailed(this.mapContainer.terrainProvider, [
            cartographic
          ]).then(i => {
            newPoint = new Cesium.Entity({
              id: `route-point${this.routeStation.length}`,
              position: Cesium.Cartographic.toCartesian(cartographic),
              billboard: {
                image: pinBuilder
                  .fromText(
                    (this.routeStation.length + 1).toString(),
                    Cesium.Color.fromAlpha(Cesium.Color.BLUE, 0.6),
                    32
                  )
                  .toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
              }
            });
            this.routeStation.push(i[0]);
            this.mapContainer.entities.add(newPoint);
          });
        },
        Cesium.ScreenSpaceEventType.LEFT_CLICK
      );

      handler.setInputAction(() => {
        this.el.nativeElement.querySelector('#cesiumContainer').style.cursor =
          '	auto';
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        // 右键结束选点，准备飞行
        this.flightControlSvc.points$.next(this.routeStation);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    });

    this.flightControlSvc.state$
      .filter(i => i.route.length > 1)
      .subscribe(state => {
        const points = state.route;
        const length = points.length;
        const property = new Cesium.SampledPositionProperty();

        const startTime = Cesium.JulianDate.fromDate(new Date());
        let i,
          secondsCount = 0,
          secondsPerLine,
          distancePerLine;
        const flySpeed = 0.0003;
        for (i = 0; i < length; i++) {
          if (i !== 0) {
            distancePerLine = this.calculateDistance(points[i - 1], points[i]);
            secondsCount = secondsCount + distancePerLine / flySpeed;
          }
          secondsPerLine = Cesium.JulianDate.addSeconds(
            startTime,
            secondsCount,
            new Cesium.JulianDate()
          );

          property.addSample(
            secondsPerLine,
            Cesium.Cartesian3.fromDegrees(
              Cesium.Math.toDegrees(points[i].longitude),
              Cesium.Math.toDegrees(points[i].latitude),
              points[i].height + state.height
            )
          );
        }

        // 设置各点之间路径插值方式
        property.setInterpolationOptions({
          interpolationDegree: 2,
          interpolationAlgorithm: Cesium.HermitePolynomialApproximation
        });

        const endTime = Cesium.JulianDate.addSeconds(
          startTime,
          secondsCount,
          new Cesium.JulianDate()
        );

        this.mapContainer.clock.startTime = startTime.clone();
        this.mapContainer.clock.stopTime = endTime.clone();
        this.mapContainer.clock.currentTime = startTime.clone();
        this.mapContainer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
        this.mapContainer.timeline.zoomTo(startTime, endTime);

        this.mapContainer.entities.removeById('plane');
        const entity = this.mapContainer.entities.add({
          id: 'plane',
          availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: startTime,
              stop: endTime
            })
          ]),
          position: property,
          orientation: new Cesium.VelocityOrientationProperty(property),
          model: new Cesium.ModelGraphics({
            uri: this.urlProvider.get3dModelUrl('Cesium_Air'),
            minimumPixelSize: 64
          }),
          path: new Cesium.PathGraphics({
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.1,
              color: Cesium.Color.YELLOW
            }),
            width: 10
          })
        });
      });

    this.flightControlSvc.exitFlight$.subscribe(() => {
      this.mapContainer.trackedEntity = undefined;
      this.cleanRouteStation();
    });

    this.flightControlSvc.viewFollowType$.subscribe(type => {
      switch (type) {
        case '顶视':
          this.mapContainer.trackedEntity = undefined;
          this.mapContainer.zoomTo(
            this.mapContainer.entities,
            new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90))
          );
          break;
        case '侧视':
          this.mapContainer.trackedEntity = undefined;
          this.mapContainer.zoomTo(
            this.mapContainer.entities,
            new Cesium.HeadingPitchRange(
              Cesium.Math.toRadians(-90),
              Cesium.Math.toRadians(-15),
              7500
            )
          );
          break;
        case '跟随':
          this.mapContainer.trackedEntity = this.mapContainer.entities.getById(
            'plane'
          );
          break;
      }
    });
  }

  private calculateDistance(
    point1: Cesium.Cartographic,
    point2: Cesium.Cartographic
  ): number {
    return Math.sqrt(
      Math.pow(
        Cesium.Math.toDegrees(point1.latitude) -
          Cesium.Math.toDegrees(point2.latitude),
        2
      ) +
        Math.pow(
          Cesium.Math.toDegrees(point1.longitude) -
            Cesium.Math.toDegrees(point2.longitude),
          2
        )
    );
  }

  private handleSelectPointEvent() {
    // 当有灾害类型流有数据传入时， 开始选点
    this.disasterSvc.disasterType$.subscribe(() => {
      const handler = this.mapContainer.screenSpaceEventHandler;

      this.el.nativeElement.querySelector('#cesiumContainer').style.cursor =
        'crosshair';

      handler.setInputAction((movement: Cesium.PositionedEvent) => {
        const cartesian = this.mapContainer.camera.pickEllipsoid(
          movement.position,
          this.mapContainer.scene.globe.ellipsoid
        );
        const cartographic = this.mapContainer.scene.globe.ellipsoid.cartesianToCartographic(
          cartesian
        );

        Cesium.sampleTerrainMostDetailed(this.mapContainer.terrainProvider, [
          cartographic
        ]).then(i => {
          this.disasterSvc.selectedPoint$.next(cartographic);
        });
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
        const result = this.disasterSvc.SteamCloud(
          Cesium.Cartographic.toCartesian(position),
          param
        );
      });

    this.poolFireDialog.clickSubmit
      .withLatestFrom(this.disasterSvc.selectedPoint$)
      .subscribe(([param, position]) => {
        const result = this.disasterSvc.PoolFire(
          Cesium.Cartographic.toCartesian(position),
          param
        );
      });
  }

  private cleanRouteStation() {
    this.mapContainer.entities.removeById('plane');
    this.routeStation.forEach((i, index) => {
      this.mapContainer.entities.removeById(`route-point${index}`);
    });
    this.routeStation.length = 0;
  }

  private Load3dModel() {
    const pinBuilder = new Cesium.PinBuilder();
    const labelScalar = new Cesium.NearFarScalar(2000, 0.8, 5000, 0.0);

    Models.forEach(i => {
      const hpr = i.headingPitchRoll
        ? i.headingPitchRoll
        : new Cesium.HeadingPitchRoll();

      // 获取模型位置的地形高程
      Cesium.sampleTerrainMostDetailed(this.mapContainer.terrainProvider, [
        i.postion
      ]).then(position => {
        const cartesian = Cesium.Cartographic.toCartesian(position[0]);
        const pinLocation = cartesian.clone();
        pinLocation.z = pinLocation.z + 5;
        this.mapContainer.entities.add({
          name: i.showName,
          position: pinLocation,
          billboard: {
            image: pinBuilder
              .fromText(
                i.showName,
                Cesium.Color.fromRandom({ red: 0.8, alpha: 0.6 }),
                128
              )
              .toDataURL(),
            scaleByDistance: labelScalar,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
          }
        });

        const model = this.mapContainer.scene.primitives.add(
          Cesium.Model.fromGltf({
            url: this.urlProvider.get3dModelUrl(i.fileName),
            modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
              cartesian,
              hpr
            ),
            shadows: true
          })
        );
      });
    });
  }

  switchModelDisplayState() {
    this.showModel = !this.showModel;
    this.modelDisplayState$.next(this.showModel);
  }

  flyToSwust() {
    const swust = Cesium.Cartesian3.fromDegrees(104.69514, 31.53494, 3000);
    this.mapContainer.camera.flyTo({
      destination: swust
    });
  }
}
