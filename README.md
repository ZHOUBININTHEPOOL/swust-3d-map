## 如何使用  
> git clone git@github.com:smartlei24/swust-3d-map.git   
> cd swust-3d-map  
> npm install  
> ng server


## 关于Cesium的版本问题
  截止05/01/2017，最新版本为1.44.0(github最新release版本为1.45.0，但未更新到npm)，但因为1.44.0在为cesium添加资源url前缀时出现bug，暂未修复，因此此处先暂时使用1.42.1，待1.45.0在npm更新后再进行更新  

## 为cesium添加type  
  -- 因为使用typescript进行开发，而cesium官方并没有为我们提供类型定义，因此此处我们在github上找到了一份[index.d.ts](https://github.com/laixiangran/cesium-typings) (已放入someting-else目录中)，在此十分感谢作者，有用到不妨点个star。将index.d.ts下载下来后，放入/nodes_modules/@types/cesium中，就可以使用cesium类型定义了，有代码提示和类型检查的感觉真是好啊 -- 
  以上方法废除，因未知原因在某些环境上ng server会失败，因此直接将其内容放入/src/typings.d.ts

## Url管理与环境配置
  为方便Url的管理，以及自动适应不同环境下Url的区别，因此在项目中专门提供一个service进行配置: /src/service/url-provider.service.ts  

## 添加资源MIME Type
  extend Name | MIME Type
  --- | --- 
  .gltf | model/vnd.gltf+json
