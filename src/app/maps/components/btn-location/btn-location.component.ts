import { Component, OnInit } from '@angular/core';
import { MapsService } from '../../services/maps.service';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-btn-location',
  templateUrl: './btn-location.component.html',
  styleUrls: ['./btn-location.component.css'],
})
export class BtnLocationComponent implements OnInit {
  constructor(private mapService : MapsService, private placesService : PlacesService) {}

  ngOnInit(): void {}

  goToMyLocation(){

    if(!this.placesService.isUserLocationReady){
      throw new Error('No hay ubucación de usuario.')
    }
    if (!this.mapService.isMapReady) {
      throw new Error('No hay mapa disponible.');
    }
    this.mapService.flyto(this.placesService.getUseLocation)
  }
}
