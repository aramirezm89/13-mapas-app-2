import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api/placesApiClient';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _useLocation!: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get getUseLocation() {
    return this._useLocation;
  }

  get isUserLocationReady(): boolean {
    return !!this._useLocation;
  }

  set setUseLocation(value: [number, number]) {
    this._useLocation = value;
  }

  constructor(private http: PlacesApiClient) {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this._useLocation = [coords.longitude, coords.latitude];
          resolve(this._useLocation);
        },
        (err) => {
          alert('No se puedo obtener la geolocalización');
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    this.isLoadingPlaces = true;
    this.http
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this._useLocation.join(','),
        },
      })
      .subscribe((res) => {
        console.log(res.features);
        this.isLoadingPlaces = false;
        this.places = res.features;
      });
  }
}
