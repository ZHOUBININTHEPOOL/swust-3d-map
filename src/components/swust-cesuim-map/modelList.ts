import { GltfModel } from '../../entity';
import { HeadingPitchRoll } from 'cesium';

const Models: GltfModel[] = [
    {
        fileName: '107',
        showName: '西七',
        postion: Cesium.Cartographic.fromDegrees(104.6859390000, 31.5376980000)
    },
    {
        fileName: '4shiTang',
        postion: Cesium.Cartographic.fromDegrees(104.6855560000, 31.5390870000),
        showName: '4食堂',
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_FOUR)
    },
    {
        fileName: 'bei2SuShe',
        postion: Cesium.Cartographic.fromDegrees(104.6877500000, 31.5380620000),
        showName: '北二',
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO)
    },
    {
        fileName: 'bei3SuShe',
        showName: '北三',
        postion: Cesium.Cartographic.fromDegrees(104.6864390000, 31.5385830000)
    },
    {
        fileName: 'bei4SuShe',
        postion: Cesium.Cartographic.fromDegrees(104.6855320000, 31.5398320000),
        showName: '北四',
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO - Cesium.Math.PI_OVER_SIX)
    },
    {
        fileName: 'bei5SuShe',
        postion: Cesium.Cartographic.fromDegrees(104.6852550000, 31.5404630000),
        showName: '北五',
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO - Cesium.Math.PI_OVER_SIX)
    },
    {
        fileName: 'bei6SuShe',
        postion: Cesium.Cartographic.fromDegrees(104.6852260000, 31.5392600000),
        showName: '北六',
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_FOUR)
    },
    // {
    //     fileName: 'dong7',
    //     postion: Cesium.Cartographic.fromDegrees(104.7038060000, 31.5344640000, 480),
    //     showName: '东七',
    //     headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI)
    // },
    {
        fileName: 'dong8',
        postion: Cesium.Cartographic.fromDegrees(104.6962260000, 31.5351090000),
        showName: '东八',
        headingPitchRoll: new Cesium.HeadingPitchRoll(-Cesium.Math.PI_OVER_TWO - Cesium.Math.PI_OVER_SIX / 3)
    },
    {
        fileName: 'dongQuJiaoShi',
        showName: '东一',
        postion: Cesium.Cartographic.fromDegrees(104.6994270000, 31.5361150000),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_SIX)
    },
    {
        fileName: 'dongQuJiaoShi',
        showName: '东二',
        postion: Cesium.Cartographic.fromDegrees(104.6991210000, 31.5353610000),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_SIX / 3)
    },
    {
        fileName: 'dongQuJiaoShi',
        showName: '东三',
        postion: Cesium.Cartographic.fromDegrees(104.6991210000, 31.5345700000),
        headingPitchRoll: new Cesium.HeadingPitchRoll(-Cesium.Math.PI_OVER_SIX / 3)
    },
    {
        fileName: 'dongQuJiaoShi',
        showName: '东四',
        postion: Cesium.Cartographic.fromDegrees(104.6994860000, 31.5337280000),
        headingPitchRoll: new Cesium.HeadingPitchRoll(-Cesium.Math.PI_OVER_SIX)
    },
    {
        fileName: 'library-new',
        showName: '图书馆',
        postion: Cesium.Cartographic.fromDegrees(104.7008860000, 31.5368330000),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO)
    },
    {
        fileName: 'qingHuaLou',
        postion: Cesium.Cartographic.fromDegrees(104.6870160000, 31.5349260000),
        showName: '清华楼',
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO)
    },
    {
        fileName: 'shiTang5',
        showName: '五食堂',
        postion: Cesium.Cartographic.fromDegrees(104.6991630000, 31.5381450000)
    },
    {
        fileName: 'suShe-new',
        showName: '东一',
        postion: Cesium.Cartographic.fromDegrees(104.7011250000, 31.5377890000)
    },
    {
        fileName: 'suShe-new',
        showName: '东二',
        postion: Cesium.Cartographic.fromDegrees(104.7011520000, 31.5386620000)
    },
    {
        fileName: 'suShe-new',
        showName: '东三',
        postion: Cesium.Cartographic.fromDegrees(104.7003040000, 31.5378480000)
    },
    {
        fileName: 'suShe-new',
        showName: '东四',
        postion: Cesium.Cartographic.fromDegrees(104.7003260000, 31.5387350000)
    },
    {
        fileName: 'suShe-new',
        showName: '东五',
        postion: Cesium.Cartographic.fromDegrees(104.6986060000, 31.5378120000)
    },
    {
        fileName: 'suShe-new',
        showName: '东六',
        postion: Cesium.Cartographic.fromDegrees(104.6987290000, 31.5394990000)
    },
    {
        fileName: 'suShe-new',
        showName: '东七',
        postion: Cesium.Cartographic.fromDegrees(104.6977640000, 31.5378480000)
    },
    {
        fileName: 'suShe-new',
        showName: '东八',
        postion: Cesium.Cartographic.fromDegrees(104.6981550000, 31.5387950000)
    },
    {
        fileName: 'suShe-new',
        showName: '东九',
        postion: Cesium.Cartographic.fromDegrees(104.6962300000, 31.5376520000)
    },
    {
        fileName: 'suShe-new',
        showName: '东十',
        postion: Cesium.Cartographic.fromDegrees(104.6957470000, 31.5384160000)
    },
    {
        fileName: 'suShe-new',
        showName: '东十一',
        postion: Cesium.Cartographic.fromDegrees(104.6954730000, 31.5376520000)
    },
    {
        fileName: 'suShe-new',
        showName: '东十二',
        postion: Cesium.Cartographic.fromDegrees(104.6960010000, 31.5391950000)
    },
    {
        fileName: 'xi5JiaoXueLou',
        showName: '西五',
        postion: Cesium.Cartographic.fromDegrees(104.6857450000, 31.5370140000)
    },
    {
        fileName: 'xingZhengLou',
        showName: '行政楼',
        postion: Cesium.Cartographic.fromDegrees(104.7004500000, 31.5333670000)
    },
    {
        fileName: 'xiQiSuShe',
        showName: '西七',
        postion: Cesium.Cartographic.fromDegrees(104.6895146370, 31.5341220333),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI - Cesium.Math.PI_OVER_SIX)
    },
    {
        fileName: 'xiQiSuShe',
        showName: '西八',
        postion: Cesium.Cartographic.fromDegrees(104.6898418665, 31.5334727718),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI - Cesium.Math.PI_OVER_SIX)
    },
    {
        fileName: 'xiQiSuShe',
        showName: '西九',
        postion: Cesium.Cartographic.fromDegrees(104.6901851892, 31.5327914996),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI - Cesium.Math.PI_OVER_SIX)
    },
    {
        fileName: 'xiYi',
        showName: '西一',
        postion: Cesium.Cartographic.fromDegrees(104.6861040000, 31.5363480000)
    },
    {
        fileName: 'xiYiSuSheLou',
        showName: '西一',
        postion: Cesium.Cartographic.fromDegrees(104.6871130000, 31.5344440000),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO)
    },
    {
        fileName: 'xiYiSuSheLou',
        showName: '西二',
        postion: Cesium.Cartographic.fromDegrees(104.6872790000, 31.5341380000),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO)
    },
    {
        fileName: 'xiYiSuSheLou',
        showName: '西三',
        postion: Cesium.Cartographic.fromDegrees(104.6874620000, 31.5338640000),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO)
    },
    {
        fileName: 'xiYiSuSheLou',
        showName: '西四',
        postion: Cesium.Cartographic.fromDegrees(104.6881970000, 31.5322590000),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO)
    },
    {
        fileName: 'xiYiSuSheLou',
        showName: '西五',
        postion: Cesium.Cartographic.fromDegrees(104.6883790000, 31.5319660000),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO)
    },
    {
        fileName: 'xiYiSuSheLou',
        showName: '西六',
        postion: Cesium.Cartographic.fromDegrees(104.6885510000, 31.5316510000),
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO)
    },
];

export {Models};
