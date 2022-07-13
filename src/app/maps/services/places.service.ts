import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _useLocation!:[number,number];

  public isLoadingPlaces : boolean = false;
  public places : Feature[] = [];

  get getUseLocation(){
    return this._useLocation
  }

  get isUserLocationReady():boolean{
    return !!this._useLocation;
  }

set setUseLocation(value:[number,number]){
  this._useLocation = value;
}
  constructor(private http : HttpClient) {
    this.getUserLocation();
  }

  public async getUserLocation():Promise<[number,number]>{
    return new Promise((resolve,reject) =>{
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this._useLocation = [coords.longitude, coords.latitude];
          resolve(this._useLocation)

        },
        (err) =>{
          alert('No se puedo obtener la geolocalización')
          console.log(err);
          reject();
        }
      )
    })
  }

  getPlacesByQuery(query : string = ''){

    this.isLoadingPlaces = true;
    this.http
      .get<PlacesResponse>(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=5&proximity=-70.70365756723677%2C-33.52580549491564&&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoiYXJhbWlyZXptIiwiYSI6ImNsNG9uZHZwNTAyYnczY21qMHlhNjE5cGsifQ.zzqVLt7oKnsSRwGzX6K5NA`
      )
      .subscribe((res) => {
        console.log(res.features);
        this.isLoadingPlaces = false;
        this.places = res.features;
      });
  }
}
