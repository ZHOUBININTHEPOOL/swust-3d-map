import { GltfModel } from '../../entity';
import { HeadingPitchRoll } from 'cesium';

const Models: GltfModel[] = [
    {
        urlName: '107',
        showName: '107广场',
        postion: Cesium.Cartographic.fromDegrees(104.6859390000, 31.5376980000)
    },
    {
        urlName: '4shiTang',
        postion: Cesium.Cartographic.fromDegrees(104.6855560000, 31.5390870000),
        showName: '4食堂',
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_FOUR)
    },
    {
        urlName: 'bei2SuShe',
        postion: Cesium.Cartographic.fromDegrees(104.6877500000, 31.5380620000),
        showName: '北二宿舍',
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO)
    },
    {
        urlName: 'bei3SuShe',
        showName: '北三宿舍',
        postion: Cesium.Cartographic.fromDegrees(104.6864390000, 31.5385830000)
    },
    {
        urlName: 'bei4SuShe',
        postion: Cesium.Cartographic.fromDegrees(104.6855320000, 31.5398320000),
        showName: '北四宿舍',
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO - Cesium.Math.PI_OVER_SIX)
    },
    {
        urlName: 'bei5SuShe',
        postion: Cesium.Cartographic.fromDegrees(104.6852550000, 31.5404630000),
        showName: '北五宿舍',
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO - Cesium.Math.PI_OVER_SIX)
    },
    {
        urlName: 'bei6SuShe',
        postion: Cesium.Cartographic.fromDegrees(104.6852260000, 31.5392600000),
        showName: '北六宿舍',
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_FOUR)
    },
    // {
    //     name: 'dong7',
    //     postion: Cesium.Cartographic.fromDegrees(104.7038060000, 31.5344640000, 480),
    //     headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI)
    // },
    {
        urlName: 'dong8',
        postion: Cesium.Cartographic.fromDegrees(104.6962260000, 31.5351090000),
        showName: '东八',
        headingPitchRoll: new Cesium.HeadingPitchRoll(-Cesium.Math.PI_OVER_TWO - Cesium.Math.PI_OVER_SIX / 3)
    },
    {
        urlName: 'dongQuJiaoShi',
        showName: '东区教室',
        postion: Cesium.Cartographic.fromDegrees(104.6994150000, 31.5337370000)
    },
    {
        urlName: 'library-new',
        showName: '新区图书馆',
        postion: Cesium.Cartographic.fromDegrees(104.7008740000, 31.5361010000)
    },
    {
        urlName: 'qingHuaLou',
        postion: Cesium.Cartographic.fromDegrees(104.6870160000, 31.5349260000),
        showName: '清华楼',
        headingPitchRoll: new Cesium.HeadingPitchRoll(Cesium.Math.PI_OVER_TWO)
    },
    {
        urlName: 'shiTang5',
        showName: '五食堂',
        postion: Cesium.Cartographic.fromDegrees(104.6991630000, 31.5381450000)
    },
    {
        urlName: 'suShe-new',
        showName: '新区宿舍',
        postion: Cesium.Cartographic.fromDegrees(104.6976880000, 31.5373220000)
    },
    {
        urlName: 'teacher-SuShe-new',
        showName: '新区教师宿舍',
        postion: Cesium.Cartographic.fromDegrees(104.6965830000, 31.5315650000)
    },
    {
        urlName: 'xi5JiaoXueLou',
        showName: '西五教学楼',
        postion: Cesium.Cartographic.fromDegrees(104.6883640000, 31.5318490000)
    },
    {
        urlName: 'xi13-20-Old',
        showName: '老区西13宿舍楼',
        postion: Cesium.Cartographic.fromDegrees(104.6896380000, 31.5328690000)
    },
    {
        urlName: 'xingZhengLou',
        showName: '行政楼',
        postion: Cesium.Cartographic.fromDegrees(104.7004500000, 31.5333670000)
    },
    {
        urlName: 'xiQiSuShe',
        showName: '西区宿舍',
        postion: Cesium.Cartographic.fromDegrees(104.6892600000, 31.5335180000)
    },
    {
        urlName: 'xiYi',
        showName: '西一',
        postion: Cesium.Cartographic.fromDegrees(104.6861040000, 31.5363480000)
    },
    {
        urlName: 'xiYiSuShe',
        showName: '西一宿舍',
        postion: Cesium.Cartographic.fromDegrees(104.6871170000, 31.5343140000)
    },
    {
        urlName: 'xiYiSuSheLou',
        showName: '西一宿舍楼',
        postion: Cesium.Cartographic.fromDegrees(104.6871170000, 31.5343140000)
    }
];


export {Models};
