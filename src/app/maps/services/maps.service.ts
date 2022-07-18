import { Injectable } from '@angular/core';
import {
  AnySourceData,
  LngLatBounds,
  LngLatLike,
  Map,
  Marker,
  Popup,
} from 'mapbox-gl';
import { DirectionsApliClient } from '../api/directionsApliClient';
import { DirectionResponse, Route } from '../interfaces/directions';
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

  constructor(private directionApi: DirectionsApliClient) {}

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

  createMarker(places: Feature[], useLocation: [number, number]) {
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
      this.markers.push(
        new Marker({
          color: 'red',
        })
          .setLngLat(useLocation)
          .setPopup(popup)
          .addTo(this._map!)
      );
    });

    if (places.length === 0) return;

    //limites del mapa

    const bounds = new LngLatBounds();

    this.markers.forEach((marker) => bounds.extend(marker.getLngLat()));

    this._map.fitBounds(bounds, {
      padding: 200,
    });
  }

  deleteMarkers() {
    this.markers.forEach((m) => m.remove());

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { longitude, latitude } = coords;
      this._map?.flyTo({
        zoom: 14,
        center: [longitude, latitude],
        duration: 1000,
      });
    });
  }

  getRouteBetweenPoints(start: [number, number], end: [number, number]) {
    this.directionApi
      .get<DirectionResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe((res) => {
        this.drawPolyLine(res.routes[0]);
      });
  }

  private drawPolyLine(route: Route) {
    console.log({
      distanceKms: (route.distance / 1000).toFixed(2),
      duration: (route.duration / 60).toFixed(2),
    });

    if (!this._map) throw new Error('Mapa no inicializado');

    const coords = route.geometry.coordinates;

    const bounds = new LngLatBounds();

    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });
    this._map?.fitBounds(bounds, {
      padding: 200,
    });

    /*  Dibujar Poliline */
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: { type: 'LineString', coordinates: coords },
          },
        ],
      },
    };

    //remover source y el layer para siempre crear uno nuevo
     if (this._map.getLayer('RouteString')){

       this._map.removeLayer('RouteString');
       this._map.removeSource('RouteString');
     }


       this._map.addSource('RouteString', sourceData);

 //
    this._map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#2D8ED6',
        'line-width': 3,
      },
    });
  }
}
