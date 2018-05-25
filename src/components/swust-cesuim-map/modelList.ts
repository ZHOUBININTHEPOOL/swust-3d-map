import { GltfModel } from '../../entity';
import { HeadingPitchRoll } from 'cesium';

const Models: GltfModel[] = [
    {
        name: '107',
        postion: Cesium.Cartesian3.fromDegrees(104.6859390000, 31.5376980000, 512)
    },
    {
        name: '4shiTang',
        postion: Cesium.Cartesian3.fromDegrees(104.6855560000, 31.5390870000, 510),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_FOUR)
    },
    {
        name: 'bei2SuShe',
        postion: Cesium.Cartesian3.fromDegrees(104.6877500000, 31.5380620000, 510),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO)
    },
    {
        name: 'bei3SuShe',
        postion: Cesium.Cartesian3.fromDegrees(104.6864390000, 31.5385830000, 510)
    },
    {
        name: 'bei4SuShe',
        postion: Cesium.Cartesian3.fromDegrees(104.6855320000, 31.5398320000, 510),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO - Cesium.Math.PI_OVER_SIX)
    },
    {
        name: 'bei5SuShe',
        postion: Cesium.Cartesian3.fromDegrees(104.6852550000, 31.5404630000, 510),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO - Cesium.Math.PI_OVER_SIX)
    },
    {
        name: 'bei6SuShe',
        postion: Cesium.Cartesian3.fromDegrees(104.6852260000, 31.5392600000, 510),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_FOUR)
    },
    {
        name: 'dong7',
        postion: Cesium.Cartesian3.fromDegrees(104.7038060000, 31.5344640000, 480),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI)
    },
    {
        name: 'dong8',
        postion: Cesium.Cartesian3.fromDegrees(104.6962260000, 31.5351090000, 480),
        headingPitchRoll: new Cesium.HeadingPitchRoll(-Cesium.Math.PI_OVER_TWO - Cesium.Math.PI_OVER_SIX / 3)
    },
    {
        name: 'dongQuJiaoShi',
        postion: Cesium.Cartesian3.fromDegrees(104.6994150000, 31.5337370000, 570)
    },
    {
        name: 'library-new',
        postion: Cesium.Cartesian3.fromDegrees(104.7008740000, 31.5361010000, 570)
    },
    {
        name: 'qingHuaLou',
        postion: Cesium.Cartesian3.fromDegrees(104.6870160000, 31.5349260000, 510),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO)
    },
    {
        name: 'shiTang5',
        postion: Cesium.Cartesian3.fromDegrees(104.6991630000, 31.5381450000, 480)
    },
    {
        name: 'suShe-new',
        postion: Cesium.Cartesian3.fromDegrees(104.6976880000, 31.5373220000, 490)
    },
    {
        name: 'teacher-SuShe-new',
        postion: Cesium.Cartesian3.fromDegrees(104.6965830000, 31.5315650000, 490)
    },
    {
        name: 'xi5JiaoXueLou',
        postion: Cesium.Cartesian3.fromDegrees(104.6883640000, 31.5318490000, 550)
    },
    {
        name: 'xi13-20-Old',
        postion: Cesium.Cartesian3.fromDegrees(104.6896380000, 31.5328690000, 500)
    },
    {
        name: 'xingZhengLou',
        postion: Cesium.Cartesian3.fromDegrees(104.7004500000, 31.5333670000, 500)
    },
    {
        name: 'xiQiSuShe',
        postion: Cesium.Cartesian3.fromDegrees(104.6892600000, 31.5335180000, 520)
    },
    {
        name: 'xiYi',
        postion: Cesium.Cartesian3.fromDegrees(104.6861040000, 31.5363480000, 500)
    },
    {
        name: 'xiYiSuShe',
        postion: Cesium.Cartesian3.fromDegrees(104.6871170000, 31.5343140000, 490)
    },
    {
        name: 'xiYiSuSheLou',
        postion: Cesium.Cartesian3.fromDegrees(104.6871170000, 31.5343140000, 600)
    }
];


export {Models};
