## 如何使用  
> git clone git@github.com:smartlei24/swust-3d-map.git   
> cd swust-3d-map  
> npm install  
> 将 /src/service/url-provider.service.ts 中的基地址换为你的服务地址
> ng server

### 添加资源MIME Type
  发布地图资源后，访问如果遇到404，请添加MIME类型，如下表  
| extend Name | MIME Type |
| ----------- | ------------------- |
| .gltf       | model/vnd.gltf+json |
| .terrain    | application/vnd.quantized-mesh |

## 其他
### 为cesium添加type  
  cesium官方并没有提供类型文件，因此找到了一份由laixiangran维护的[index.d.ts](https://github.com/laixiangran/cesium-typings)，已放入cesium.d.ts，并根据自己使用的地方进行部分修改，十分感谢原作者。

### Url管理与环境配置
  为方便Url的管理，以及自动适应不同环境下Url的区别，因此在项目中专门提供一个service进行配置: /src/service/url-provider.service.ts  
