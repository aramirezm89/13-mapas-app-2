import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _useLocation!:[number,number];

  get getUseLocation(){
    return this._useLocation
  }

  get isUserLocationReady():boolean{
    return !!this._useLocation;
  }

set setUseLocation(value:[number,number]){
  this._useLocation = value;
}
  constructor() {
    this.getUserLocation();
  }

  getUserLocation():Promise<[number,number]>{
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
}
