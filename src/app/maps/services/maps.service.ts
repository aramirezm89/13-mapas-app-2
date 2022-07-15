import { Injectable } from '@angular/core';
import { LngLat, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  private _map?: Map;
  private markers: Marker[] = [];

  get getMap(): Map {
    return this._map!;
  }
  get isMapReady() {
    return !!this._map;
  }

  constructor() {}

  setMapa(mapa: Map) {
    this._map = mapa;
  }

  flyto(coords: LngLatLike) {
    if (!this.isMapReady) {
      throw new Error('El mapa no esta inicializado');
    }

    this._map?.flyTo({
      zoom: 14,
      center: coords,
    });
  }

  createMarker(places: Feature[]) {
    if (!this._map) throw new Error('Mapa no inicializado');

    this.markers.forEach((m) => m.remove());

    places.forEach((place) => {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
      <h6>${place.text_es}</h6>
      <span>${place.place_name_es}</span>
    `);
      this.markers.push(
        new Marker({
          color: 'green',
        })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(this._map!)
      );
    });
  }

  deleteMarkers() {
    this.markers.forEach((m) => m.remove());
  }
}
