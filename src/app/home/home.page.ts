import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { circle, LayerGroup, Map as LMap, TileLayer } from 'leaflet';
import { BaseLayer } from './BaseLayer.enum';
import { placeLocationMarker } from './placeLocationMarker';

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

  public locating = false;

  private baseMapLayerGroup = new LayerGroup();
  private locationLayerGroup = new LayerGroup();
  private gpsLoadingEl: HTMLIonLoadingElement;

  constructor(private alertController: AlertController, private loadingController: LoadingController) {
  }

  public async onMapReady(lMap: LMap) {
    this.map = lMap;
    this.map.addLayer(this.baseMapLayerGroup);
    this.map.addLayer(this.locationLayerGroup);
    this.switchBaseLayer(this.selectedBaseLayer);
    setTimeout(() => lMap.invalidateSize(true), 0);
  }

  public switchBaseLayer(baseLayerName: string) {
    this.baseMapLayerGroup.clearLayers();
    const baseMapTileLayer = new TileLayer(this.baseMapUrls[baseLayerName]);
    this.baseMapLayerGroup.addLayer(baseMapTileLayer);
    this.selectedBaseLayer = BaseLayer[baseLayerName];
  }

  public async locate() {
    this.locationLayerGroup.clearLayers();
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      return;
    }
    await this.presentLoading();
    navigator.geolocation.getCurrentPosition(
      (position) => this.onLocationSuccess(position),
      (error) => this.onLocateError(error),
      {enableHighAccuracy: true}
    );
  }

  private onLocationSuccess(position: GeolocationPosition) {
    const {accuracy, latitude, longitude} = position.coords;
    const latlng = [latitude, longitude];
    this.hideLoading();
    this.map.setView(latlng, 18);
    const accuracyValue = accuracy > 1000 ? accuracy / 1000 : accuracy;
    const accuracyUnit = accuracy > 1000 ? 'km' : 'm';
    placeLocationMarker(this.locationLayerGroup, latlng, `Accuracy is ${accuracyValue} ${accuracyUnit}`);
    const locationCircle = circle(latlng, accuracy);
    this.locationLayerGroup.addLayer(locationCircle);
  }

  private async onLocateError(error) {
    this.hideLoading();
    const alert = await this.alertController.create({
      header: 'GPS error',
      message: error.message,
      buttons: ['OK']
    });

    await alert.present();
  }

  private async presentLoading() {
    this.gpsLoadingEl = await this.loadingController.create({
      message: 'Locating device ...',
    });
    await this.gpsLoadingEl.present();
  }

  private hideLoading() {
    this.gpsLoadingEl.dismiss();
  }

}
