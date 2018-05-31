## how to use
> git clone git@github.com:smartlei24/swust-3d-map.git   
> cd swust-3d-map  
> npm install  
> ng server


## Questions about Cesium's version
  As of 05/01/2017, the latest version is 1.44.0 (the latest release of github is 1.45.0, but it has not been updated to npm), but because of a bug in 1.44.0 when adding resource url prefix for cesium, it is not fixed yet. So here we will temporarily use 1.42.1 until 1.45.0 is updated after npm update.

 
## Add type for cesium  
  -- Because typescript was used for development, and cesium officially didn't provide us with a type definition, here we found a [index.d.ts] on github (https://github.com/laixiangran/cesium- Typings) (already placed in the someting-else directory), thank you very much for the author, useful to point star. After downloading index.d.ts and putting it in /nodes_modules/@types/cesium, you can use the cesium type definition. It's nice to have code hints and type checking.
  The above method is abolished, and ng server will fail in some environments due to unknown reasons, so directly put its contents in /src/typings.d.ts

## Url Management and Environment Configuration
   In order to facilitate the management of Url, and to automatically adapt to the differences in Url under different circumstances, so a special service is provided in the project to configure: /src/service/url-provider.service.ts

## Add Resource MIME Type
  Extend Name | MIME Type
  --- | ---
  .gltf | model/vnd.gltf+json
