import { Component, OnInit } from '@angular/core';
import { Feature } from '../../interfaces/places';
import { PlacesService } from '../../services/places.service'
import { MapsService } from '../../services/maps.service'
import { Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  placeSelectedId? : string;

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get isPlaces(): Feature[] {
    return this.placesService.places;
  }
  constructor(
    private placesService: PlacesService,
    private mapService: MapsService
  ) {}

  ngOnInit(): void {}

  flyTo(place : Feature){
    this.placeSelectedId = place.id
   const [lng,lat] = place.center
    this.mapService.flyto([lng,lat])

  }

  getDirections(place : Feature){

    if(!this.placesService.getUserLocation) throw new Error('No hay localizacion del usuario disponible')
    const [startLng,startLat]  = this.placesService.getUseLocation
    const [endLng,endLat]  = place.center
    this.placesService.setPlaces = []
    this.mapService.getRouteBetweenPoints([startLng,startLat],[endLng,endLat])
  }
}
