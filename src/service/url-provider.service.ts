import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class UrlProviderService {
    public get swustTerrainProviderUrl(): string {
        return `${this.baseUrl}/dem`;
    }

    public get swustImageProviderUrl(): string {
        return `${this.baseUrl}/cesium-swust-tiles/{z}/{x}/{y}.jpg`;
    }

    public get swustStreetProviderUrl(): string {
        return `${this.baseUrl}/street/{z}/{x}/{y}.jpg`;
    }

    public get3dModelUrl(modelName: string): string {
        return `${this.baseUrl}/3dModel/${modelName}.gltf`;
    }

    private get baseUrl(): string {
        return environment.production ? '' : 'http://localhost:5566';
    }

    constructor() { }

    private setProductionUrl(): void {
    }
}
