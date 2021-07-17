import { Icon } from 'leaflet';

export const markerIcon = () => new Icon({
                              iconUrl: './assets/marker.png',
                              iconSize: [30.8, 44.1],
                              iconAnchor: [15.4, 44.1],
                              popupAnchor:  [0, -44],
                            });
