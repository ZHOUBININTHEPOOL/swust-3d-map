import { Injectable } from '@angular/core';
import { PlumeParameter, PuffParameter, PoolFireParameter } from '../entity';
import { SteamCloudParameter } from '../entity/SteamCloudParameter';
import * as Rx from 'rxjs/';

@Injectable()
export class DisasterModelService {
  constructor() {}

  public disasterType$ = new Rx.ReplaySubject<string>(1);
  public selectedPoint$ = new Rx.ReplaySubject<Cesium.Cartesian3>(1);
  public result$ = new Rx.ReplaySubject<Cesium.Entity[]>(1);

  public Plume(position: Cesium.Cartesian3, param: PlumeParameter) {

  }

  public Puff(position: Cesium.Cartesian3, param: PuffParameter) {}

  public SteamCloud(position: Cesium.Cartesian3, param: SteamCloudParameter) {
    const wt = 1.8 * 0.04 * param.heatOfCombustion * param.quality / 4520000;

    const radius = this.CalculateSteamCloudRadius(param, wt);
    const entities = this.CreateEntitiesOfSteamCloud(radius, position);

    this.result$.next(entities);
  }

  private CalculateSteamCloudRadius(param: SteamCloudParameter, wt: number) {
    const radius: number[] = [];

    radius.push(Math.round(13.6 * Math.pow(wt / 1000, 0.37)));
    radius.push(
      Math.round(
        1.672 *
          Math.pow(
            1.8 * 0.04 * param.heatOfCombustion * param.quality / 101325,
            0.33
          )
      )
    );
    radius.push(
      Math.round(
        0.996 *
          Math.pow(
            1.8 * 0.04 * param.heatOfCombustion * param.quality / 101325,
            0.33
          )
      )
    );

    return radius;
  }

  private CreateEntitiesOfSteamCloud(
    radius: number[],
    position: Cesium.Cartesian3
  ) {
    const entities: Cesium.Entity[] = [];
    let alpha = 0.1;
    radius.forEach(i => {
      alpha = alpha + 0.2;
      const circle = new Cesium.EllipsoidGraphics({
        radii: new Cesium.Cartesian3(i, i, i),
        material: Cesium.Color.fromAlpha(Cesium.Color.ORANGERED, alpha)
      });
      entities.push(
        new Cesium.Entity({
          position: position,
          ellipsoid: circle
        })
      );
    });

    return entities;
  }

  public PoolFire(position: Cesium.Cartesian3, param: PoolFireParameter) {
    const fireSpeed =
      0.001 *
      param.combustionHeat /
      (param.cp * (param.tb - param.to) + param.vaporizationHeat);
    const fireHeight =
      84 *
      param.poolRadius *
      Math.pow(
        fireSpeed /
          (param.airDensity * Math.pow(2 * 9.8 * param.poolRadius, 0.5)),
        0.6
      );
    const Q =
      Math.PI *
      (Math.pow(param.poolRadius, 2) +
        2 * Math.PI * param.poolRadius * fireHeight) *
      fireSpeed *
      0.25 *
      param.combustionHeat /
      (72 * Math.pow(fireSpeed, 0.6) + 1);
    const grade = [37.5, 25, 12.5, 4, 1.6];

    const radius = [];
    grade.forEach(i => {
      radius.push(Math.sqrt(4 * Math.PI * i / Q));
    });

    const entity: Cesium.Entity[] = [];
    let alpha = 0.1;
    radius.forEach(i => {
      alpha = alpha + 0.2;
      const circle = new Cesium.EllipsoidGraphics({
        radii: new Cesium.Cartesian3(i, i, i),
        material: Cesium.Color.fromAlpha(Cesium.Color.LAVENDER, alpha)
      });
      entity.push(
        new Cesium.Entity({
          position: position,
          ellipsoid: circle
        })
      );
    });

    this.result$.next(entity);
  }
}
