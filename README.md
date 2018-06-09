## 如何使用  
> git clone git@github.com:smartlei24/swust-3d-map.git   
> cd swust-3d-map  
> npm install  
> ng server

## 添加你自己的

## 为cesium添加type  
  因为使用typescript进行开发，而cesium官方并没有为我们提供类型文件，因此找到了一份由laixiangran维护的[index.d.ts](https://github.com/laixiangran/cesium-typings)，放入cesium.d.ts，已根据自己使用的地方进行部分修改，十分感谢原作者。

## Url管理与环境配置
  为方便Url的管理，以及自动适应不同环境下Url的区别，因此在项目中专门提供一个service进行配置: /src/service/url-provider.service.ts  

## 添加资源MIME Type
  | extend Name | MIME Type           |
  | ----------- | ------------------- |
  | .gltf       | model/vnd.gltf+json |
