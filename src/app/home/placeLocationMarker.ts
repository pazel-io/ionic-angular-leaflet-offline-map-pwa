import { LatLng, LayerGroup, marker, Marker } from 'leaflet';
import { fromEvent, Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { markerIcon } from './markerIcon';

const subscribeToDeleteLocationMarker = (id: string, marco: Marker, layerGroup: LayerGroup): Subscription => {
  return fromEvent(document, 'click')
    .pipe(
      tap((event) => event.stopPropagation()),
      map((event) => event.target),
      filter((target: HTMLElement) => target.id === id),
    )
    .subscribe(($event) => layerGroup.clearLayers());
};

const bindMarkerPopup = (marco: Marker, text: string, layerGroup: LayerGroup) => {
  const id = `location-marker-${Date.now()}`;
  marco.bindPopup(`
        <p>${text}</p>
        <div class="location-marker-popup__buttons">
            <a class="location-marker-popup__button" id="${id}">delete</a>
        </div>
      `,          {
    maxWidth: 200,
    maxHeight: 120,
    className: 'location-marker-popup',
  });
  let deleteMarkerSubscription;
  marco.on('popupopen', () => deleteMarkerSubscription = subscribeToDeleteLocationMarker(id, marco, layerGroup));
  marco.on('popupclose', () => deleteMarkerSubscription.unsubscribe());
  marco.openPopup();
};

export const placeLocationMarker = (layerGroup: LayerGroup, latLng: LatLng, text: string) => {
  layerGroup.clearLayers();
  const marco = marker(latLng, {icon: markerIcon()});
  layerGroup.addLayer(marco);
  bindMarkerPopup(marco, text, layerGroup);
};
