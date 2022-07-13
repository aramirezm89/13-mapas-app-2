import { Injectable } from '@angular/core';
import { LngLat, LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
   private _map?: Map;

   get isMapReady(){
    return !!this._map;
   }

  constructor() { }

  setMapa(mapa:Map){
  this._map = mapa;
  }

  flyto(coords : LngLatLike){
    if(!this.isMapReady){
      throw new Error('El mapa no esta inicializado')
    }

    this._map?.flyTo({
      zoom:14,
      center:coords
    })
  }
}
