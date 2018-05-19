import { GltfModel } from '../../entity';

const Models: GltfModel[] = [
    {
        name: '107',
        matrix: DegreesToMatrix4(104.6859390000, 31.5376980000, 512)
    },
    {
        name: '4shiTang',
        matrix: 
    },
    {
        name: 'bei2SuShe',
        matrix: 
    },
    {
        name: 'bei3SuShe',
        matrix: 
    },
    {
        name: 'bei4SuShe',
        matrix: 
    },
    {
        name: 'bei5SuShe',
        matrix:
    },
    {
        name: 'bei6SuShe',
        matrix: 
    },
    {
        name: 'dong7',
        matrix: DegreesToMatrix4(104.7025150000, 31.5332030000, 500)
    },
    {
        name: 'dong8',
        matrix:
    },
    {
        name: 'dongQuJiaoShi',
        matrix: 
    },
    {
        name: 'library-new',
        matrix:
    },
    {
        name: 'qingHuaLou',
        matrix:
    },
    {
        name: 'shiTang5',
        matrix:
    },
    {
        name: 'suShe-new',
        matrix:
    },
    {
        name: 'teacher-SuShe-new',
        matrix:
    },
    {
        name: 'xi5JiaoXueLou',
        matrix:
    },
    {
        name: 'xi13-20-Old',
        matrix:
    },
    {
        name: 'xingZhengLou',
        matrix:
    },
    {
        name: 'xiQiSuShe',
        matrix:
    },
    {
        name: 'xiYi',
        matrix:
    },
    {
        name: 'xiYiSuShe',
        matrix: 
    },
    {
        name: 'xiYiSuSheLou',
        matrix:
    }
]

function DegreesToMatrix4(longitude: number, latitude: number, height: number) {
    return Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(longitude, latitude, height));
}


export {Models};
