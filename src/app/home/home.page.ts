import { Component } from '@angular/core';
import { LayerGroup, Map as LMap, TileLayer } from 'leaflet';
import { BaseLayer } from './BaseLayer.enum';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public map: LMap;
  public center = [
    -37.8182711,
    144.9648731
  ];

  public options = {
    zoom: 15,
    maxZoom: 18,
    zoomControl: false,
    preferCanvas: true,
    attributionControl: true,
    center: this.center,
  };

  public baseMapUrls = {
    [BaseLayer.cycling]: 'http://c.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
    [BaseLayer.transport]: 'http://c.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
  };

  public selectedBaseLayer = BaseLayer.cycling;

  public baseLayer = BaseLayer;

  private baseMapLayerGroup = new LayerGroup();

  constructor() {
  }

  public async onMapReady(lMap: LMap) {
    this.map = lMap;
    this.map.addLayer(this.baseMapLayerGroup);
    this.switchBaseLayer(this.selectedBaseLayer);
    setTimeout(() => lMap.invalidateSize(true), 0);
  }

  public switchBaseLayer(baseLayerName: string) {
    this.baseMapLayerGroup.clearLayers();
    const baseMapTileLayer = new TileLayer(this.baseMapUrls[baseLayerName]);
    this.baseMapLayerGroup.addLayer(baseMapTileLayer);
    this.selectedBaseLayer = BaseLayer[baseLayerName];
  }

}
