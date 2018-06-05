import { PuffParameter } from '../../entity';

export class PuffModel {
  private param: PuffParameter;

  constructor(param: PuffParameter) {
    this.param = param;
  }

  public getRelatePoints() {
    let points: number[][] = [];

    let pointsOfTheZ = [];
    let relateZ = 0;
    do {
      relateZ = relateZ + 0.5;
      pointsOfTheZ = this.CalculatePointOfRelateZ(relateZ);
      points = points.concat(pointsOfTheZ);
    } while (pointsOfTheZ.length > 0);

    return points;
  }

  private GetSigmaY(x: number) {
    return x / 4.3;
  }

  private GetSigmaZ(x: number) {
    return 5 / 2.15;
  }

  private CalculatePointOfRelateZ(relateZ) {
    const points = [];
    let relateY = 0;

    const cosAngle = Math.cos(2 * Math.PI / 360 * this.param.windAngle);
    const sinAngle = Math.sin(2 * Math.PI / 360 * this.param.windAngle);
    for (let x = 0; x < 1500; x = x + 0.5) {
      relateY = this.GetRelateY(x, relateZ);
      if (!isNaN(relateY)) {
        // 除以111000 是为了从米转为经纬度，高度不用转换
        points.push([
          (x * cosAngle + relateY * sinAngle) / 111000,
          (relateY * cosAngle - x * sinAngle) / 111000,
          relateZ
        ]);
        points.push([
          (x * cosAngle - relateY * sinAngle) / 111000,
          (-relateY * cosAngle - x * sinAngle) / 111000,
          relateZ
        ]);
        points.push([
          (x * cosAngle + relateY * sinAngle) / 111000,
          (relateY * cosAngle - x * sinAngle) / 111000,
          -relateZ
        ]);
        points.push([
          (x * cosAngle - relateY * sinAngle) / 111000,
          (-relateY * cosAngle - x * sinAngle) / 111000,
          -relateZ
        ]);
      }
    }

    return points;
  }

  private GetRelateY(x: number, z: number) {
    const sigmaY = this.GetSigmaY(x) * this.param.time;
    const sigmaZ = this.GetSigmaZ(x) * this.param.time;

    const temp =
      this.param.concentration *
      Math.pow(2 * Math.PI, 2 / 3) *
      sigmaY *
      sigmaY *
      sigmaZ /
      (2 *
        this.param.sourceIntensity *
        Math.exp(
          Math.pow((x - this.param.windSpeed * this.param.time) / sigmaY, 2) /
            -2
        ) *
        Math.exp(Math.pow(z / sigmaZ, 2) / -2));

    return Math.sqrt(-2 * Math.pow(sigmaY, 2) * Math.log(temp));
  }
}
