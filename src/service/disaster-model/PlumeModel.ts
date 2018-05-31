import { PlumeParameter } from '../../entity';

export class PlumeModel {
  private param: PlumeParameter;

  constructor(param: PlumeParameter) {
    this.param = param;
  }

  private GetGammaY(x: number) {
    return Math.pow(1 + 0.0004 * x, -0.5) * 0.32 * x;
  }

  private GetGammaZ(x: number) {
    return Math.pow(1 + 0.0001 * x, -0.5) * 0.24 * x;
  }
}
