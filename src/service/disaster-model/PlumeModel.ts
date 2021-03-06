import { PlumeParameter } from '../../entity';

export class PlumeModel {
  private param: PlumeParameter;
  private h = 2;

  constructor(param: PlumeParameter) {
    this.param = param;
  }

  public getRelatePoints() {
    let points: number[][] = [];

    let pointsOfTheZ = [];
    let relateZ = 0;
    do {
      pointsOfTheZ = this.CalculatePointOfRelateZ(relateZ);
      points = points.concat(pointsOfTheZ);
      relateZ = relateZ + 1;
    } while (pointsOfTheZ.length > 0);

    return points;
  }

  private GetSigmaY(x: number) {
    return Math.pow(1 + 0.0004 * x, -0.5) * 0.32 * x;
  }

  private GetSigmaZ(x: number) {
    return Math.pow(1 + 0.0001 * x, -0.5) * 0.24 * x;
  }

  private CalculatePointOfRelateZ(relateZ) {
    const points = [];
    let relateY = 0;

    const cosAngle = Math.cos(2 * Math.PI / 360 * this.param.windAngle);
    const sinAngle = Math.sin(2 * Math.PI / 360 * this.param.windAngle);
    for (let x = 0; x < 1500; x = x + 1) {
      relateY = this.GetContourY(x, relateZ);
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

  private GetContourY(x: number, z: number) {
    const sigmaY = this.GetSigmaY(x);
    const sigmaZ = this.GetSigmaZ(x);

    const temp1 =
      2 *
      Math.PI *
      this.param.windSpeed *
      sigmaY *
      sigmaZ *
      this.param.concentration;

    const temp2 =
      this.param.sourceIntensity *
      (Math.exp(Math.pow((z - this.h) / sigmaY, 2) / -2) +
        Math.exp(Math.pow((z + this.h) / sigmaY, 2) / -2));

    return Math.sqrt(-2 * Math.log(temp1 / temp2)) * sigmaY;
  }
}
